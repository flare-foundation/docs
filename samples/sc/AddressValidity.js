/*
import AddressValidityVerificationABI from "../artifacts/@flarenetwork/state-connector-protocol/contracts/generated/verification/AddressValidityVerification.sol/AddressValidityVerification.json" assert {type: 'json'};
*/

const FLARE_PACKAGE = "@flarenetwork/flare-periphery-contract-artifacts";
const FLARE_RPC = "https://coston-api.flare.network/ext/C/rpc";
const VALIDITY_ADDRESS = "0x67743178E5386c2f33b7f84249EcDDe5e15483BB";
const ATTESTATION_PROVIDER_URL = "https://attestation-coston.aflabs.net";
const ATTESTATION_PROVIDER_API_KEY = "123456";
const ATTESTATION_WAIT_SECONDS = 340;

// Get private keys from an external source.
// DO NOT embed them in source code!
const TEST_PRIVATE_KEY = "0x6607fc65548ffe231ce954018b3ee01fedb242281227e42a30a9bffa759557d7";

async function AddressValidity_run(network, addressToValidate) {

    const VERIFICATION_ENDPOINT =
        `${ATTESTATION_PROVIDER_URL}/verifier/${network.toLowerCase()}` +
            `/AddressValidity/prepareRequest`;
    const ATTESTATION_ENDPOINT =
        `${ATTESTATION_PROVIDER_URL}/attestation-client/api/proof/` +
            `get-specific-proof`;

    // 1. Setup
    const ethers = await import("ethers");
    const flare = await import(FLARE_PACKAGE);
    ({ AddressValidity } = await import(`${FLARE_PACKAGE}/dist/coston/StateConnector/typescript/AddressValidity.js`));
    var utils, provider, signer;
    if (typeof window === "undefined") {
        // Node.js
        utils = await import(`${FLARE_PACKAGE}/dist/coston/StateConnector/libs/ts/utils.js`);
        provider = new ethers.JsonRpcProvider(FLARE_RPC);
        signer = new ethers.Wallet(TEST_PRIVATE_KEY, provider);
    } else {
        // Browser
        utils = await import(`https://esm.run/${FLARE_PACKAGE}/dist/coston/StateConnector/libs/ts/utils.js`);
        provider = new ethers.BrowserProvider(window.tutorialData.provider);
        signer = await provider.getSigner();
    }

    // 2. Prepare Attestation Request
    // First the raw request:
    // It is not encoded and contains no Message Integrity Code (MIC).
    const rawAttestationRequest = {
        "attestationType": AddressValidity.TYPE,
        "sourceId": utils.encodeAttestationName(`test${network.toUpperCase()}`),
        "requestBody": {
            "addressStr": addressToValidate
        }
    }
    console.log("Preparing attestation request using verifier",
        ATTESTATION_PROVIDER_URL, "...");
    console.log("Request:", rawAttestationRequest);

    // Then we obtain an encoded attestation request from a verifier,
    // including MIC.
    const verifierResponse = await fetch(VERIFICATION_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": ATTESTATION_PROVIDER_API_KEY
        },
        body: JSON.stringify(rawAttestationRequest)
    });
    const encodedAttestationRequest = await verifierResponse.json();
    if (encodedAttestationRequest.status !== "VALID") {
        console.log("Received error:", encodedAttestationRequest);
        return;
    }
    console.log("  Received encoded attestation request:",
        encodedAttestationRequest.abiEncodedRequest);

    // 3. Access the Contract Registry
    const flareContractRegistry = new ethers.Contract(
        "0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019",
        flare.nameToAbi("FlareContractRegistry", "coston").data,
        provider);

    // 4. Retrieve the State Connector Contract Address
    const stateConnectorAddress = await
        flareContractRegistry.getContractAddressByName("StateConnector");
    const stateConnector = new ethers.Contract(
        stateConnectorAddress,
        flare.nameToAbi("StateConnector", "coston").data,
        signer);

    // 5. Request Attestation from the State Connector Contract.
    console.log ("Submitting attestation to State Connector...");
    const attestationTx = await stateConnector.requestAttestations(
        encodedAttestationRequest.abiEncodedRequest);
    const receipt = await attestationTx.wait();
    const block = await provider.getBlock(receipt.blockNumber);

    // 6. Calculate Round ID.
    // These constants should be cached.
    const BUFFER_TS_OFFSET = await stateConnector.BUFFER_TIMESTAMP_OFFSET();
    const BUFFER_WINDOW = await stateConnector.BUFFER_WINDOW();
    const roundID = Number(
        (BigInt(block.timestamp) - BUFFER_TS_OFFSET) / BUFFER_WINDOW);

    console.log("  Attestation submitted in round", roundID);

    // 7. Wait for the Attestation Round to Finish
    // Providers must reach consensus before the proof is available.
    console.log("Waiting", ATTESTATION_WAIT_SECONDS, "seconds...");
    setTimeout(async () => {
        // Retrieve full proof from attestation provider for the round where
        // we made the request. This should be available now.
        // The proof will include our request and all other requests made
        // during that round, encoded in a single Merkle root.
        const proofRequest = {
            "roundId": roundID,
            "requestBytes": encodedAttestationRequest.abiEncodedRequest
        };

        // 8. Retrieve Proof
        console.log("Retrieving proof from attestation provider...");
        const providerResponse = await fetch(ATTESTATION_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": ATTESTATION_PROVIDER_API_KEY
            },
            body: JSON.stringify(proofRequest)
        });
        const proof = await providerResponse.json();
        if (proof.status !== "OK") {
            console.log("Received error:", proof);
            return;
        }
        console.log("  Received Merkle proof:", proof.data.merkleProof);

        // 9. Send Proof to Verifier Contract
        // Unpacked attestation proof to be used in a Solidity contract.
        const fullProof = {
            merkleProof: proof.data.merkleProof,
            data: {
                roundID: proof.data.roundId,
                hash: proof.data.hash,
                requestByte: proof.data.requestBytes,
                attestationType: proof.data.request.attestationType,
                messageIntegrityCode: proof.data.request.messageIntegrityCode,
                lowestUsedTimestamp: proof.data.response.lowestUsedTimestamp,
                sourceId: proof.data.response.sourceId,
                votingRound: proof.data.response.votingRound,
                status: proof.status,
                requestBody: proof.data.response.requestBody,
                responseBody: proof.data.response.responseBody
            }
        };

        console.log("Sending the proof for verification...");
        const addressVerifier = new ethers.Contract(VALIDITY_ADDRESS,
            AddressValidityVerificationABI.abi, signer);
        const tx = await addressVerifier.verifyAddressValidity(fullProof);
        console.log("  Attestation result:", tx);

    }, ATTESTATION_WAIT_SECONDS * 1000);
}

AddressValidity_run(
    "btc",
    "tb1p4mdyx3dvgk4dhvv8yv2dtuymf00wxhgkkjheqm7526fu7znnd6msw3qxvj");
