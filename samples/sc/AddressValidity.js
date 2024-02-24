const FLARE_PACKAGE = "@flarenetwork/flare-periphery-contract-artifacts";
const FLARE_RPC = "https://coston-api.flare.network/ext/C/rpc";
const ATTESTATION_PROVIDER_URL = "https://attestation-coston.aflabs.net";
const ATTESTATION_PROVIDER_API_KEY = "123456";

// You should get your private keys from an external source.
// DO NOT embed them in source code in a production environment!
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
  const utils = await import(
    `${FLARE_PACKAGE}/dist/coston/StateConnector/libs/ts/utils.js`
  );
  const provider = new ethers.JsonRpcProvider(FLARE_RPC);
  const signer = new ethers.Wallet(TEST_PRIVATE_KEY, provider);

  // 2. Prepare Attestation Request
  const { encodeAttestationName } = utils;
  const rawAttestationRequest = {
    attestationType: encodeAttestationName("AddressValidity"),
    sourceId: encodeAttestationName(`test${network.toUpperCase()}`),
    requestBody: {
      addressStr: addressToValidate,
    },
  };
  console.log(
    "Preparing attestation request using verifier",
    ATTESTATION_PROVIDER_URL,
    "..."
  );
  console.log("Request:", rawAttestationRequest);

  const verifierResponse = await fetch(VERIFICATION_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": ATTESTATION_PROVIDER_API_KEY,
    },
    body: JSON.stringify(rawAttestationRequest),
  });
  const encodedAttestationRequest = await verifierResponse.json();
  if (encodedAttestationRequest.status !== "VALID") {
    console.log("Received error:", encodedAttestationRequest);
    return;
  }
  console.log(
    "  Received encoded attestation request:",
    encodedAttestationRequest.abiEncodedRequest
  );

  // 3. Access the Contract Registry
  const flareContractRegistry = new ethers.Contract(
    "0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019",
    flare.nameToAbi("FlareContractRegistry", "coston").data,
    provider
  );

  // 4. Retrieve the State Connector Contract Address
  const stateConnectorAddress =
    await flareContractRegistry.getContractAddressByName("StateConnector");
  const stateConnector = new ethers.Contract(
    stateConnectorAddress,
    flare.nameToAbi("StateConnector", "coston").data,
    signer
  );

  // 5. Request Attestation from the State Connector Contract
  console.log("Submitting attestation to State Connector...");
  const attestationTx = await stateConnector.requestAttestations(
    encodedAttestationRequest.abiEncodedRequest
  );
  const receipt = await attestationTx.wait();
  const block = await provider.getBlock(receipt.blockNumber);

  // 6. Calculate Round ID
  const BUFFER_TS_OFFSET = await stateConnector.BUFFER_TIMESTAMP_OFFSET();
  const BUFFER_WINDOW = await stateConnector.BUFFER_WINDOW();
  const submissionRoundID = Number(
    (BigInt(block.timestamp) - BUFFER_TS_OFFSET) / BUFFER_WINDOW
  );

  console.log("  Attestation submitted in round", submissionRoundID);

  // 7. Wait for the Attestation Round to Finalize
  var prevFinalizedRoundID = 0;
  setTimeout(async function poll() {
    const lastFinalizedRoundID = Number(
      await stateConnector.lastFinalizedRoundId()
    );
    if (prevFinalizedRoundID != lastFinalizedRoundID) {
      console.log("  Last finalized round is", lastFinalizedRoundID);
      prevFinalizedRoundID = lastFinalizedRoundID;
    }
    if (lastFinalizedRoundID < submissionRoundID) {
      setTimeout(poll, 10000);
      return;
    }

    // 8. Retrieve Proof
    const proofRequest = {
      roundId: submissionRoundID,
      requestBytes: encodedAttestationRequest.abiEncodedRequest,
    };

    console.log("Retrieving proof from attestation provider...");
    const providerResponse = await fetch(ATTESTATION_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": ATTESTATION_PROVIDER_API_KEY,
      },
      body: JSON.stringify(proofRequest),
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
            ...proof.data,
            ...proof.data.request,
            ...proof.data.response,
            status: proof.status,
        }
    };

    console.log("Sending the proof for verification...");
    const addressVerifier = new ethers.Contract(
      flare.nameToAddress("IAddressValidityVerification", "coston"),
      flare.nameToAbi("IAddressValidityVerification", "coston").data,
      signer
    );
    const isVerified = await addressVerifier.verifyAddressValidity(fullProof);
    console.log("  Attestation result:", isVerified);

    // 10. Check if Address is Valid
    if (isVerified) {
    const { isValid } = fullProof.data.responseBody;
    console.log(
        isValid
          ? "Attestation providers agree that the address is valid."
          : "Attestation providers agree that the address is invalid."
      );
    } else {
      console.log(
        "Could not verify attestation. Validity of address is unknown."
      );
    }
  }, 10000);
}

AddressValidity_run(
  "btc",
  "tb1p4mdyx3dvgk4dhvv8yv2dtuymf00wxhgkkjheqm7526fu7znnd6msw3qxvj"
);