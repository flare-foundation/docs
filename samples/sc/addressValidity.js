import { AddressValidity } from "@flarenetwork/state-connector-protocol/dist/generated/types/typescript/index.js"
import AddressValidityVerificationABI from  "../artifacts/@flarenetwork/state-connector-protocol/contracts/generated/verification/AddressValidityVerification.sol/AddressValidityVerification.json" assert {type:'json'};
import { encodeAttestationName } from '@flarenetwork/state-connector-protocol/dist/libs/ts/utils.js';
import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

//Intialize script variables

const Wallet_Key = process.env.PRIVATE_KEY;
const API_KEY = "123456";
const addressToValidate ="tb1p4mdyx3dvgk4dhvv8yv2dtuymf00wxhgkkjheqm7526fu7znnd6msw3qxvj";
const FLARE_PACKAGE = "@flarenetwork/flare-periphery-contract-artifacts";
const FLARE_RPC = "https://coston-api.flare.network/ext/C/rpc";
const VALIDITY_ADDRESS = process.env.VALIDITY_CONTRACT_ADDRESS
const REGISTRY_ADDRESS = process.env.FLARE_REGISTRY_ADDRESS
const providers = new ethers.JsonRpcProvider(FLARE_RPC);
const signer = new ethers.Wallet(Wallet_Key, providers);
const VERIFICATION_API_URL = "https://attestation-coston.aflabs.net/verifier/btc/AddressValidity/prepareRequest";
const ATTESTATION_API_URL = "https://attestation-coston.aflabs.net/attestation-client/api/proof/get-specific-proof";

// Function to prepare attestation request using API endpoint, parameter object, returns object.
async function prepareRequest(requestBody) {

    const response = await fetch(`${VERIFICATION_API_URL}`, {
        method:"POST",
        headers:{ "X-API-KEY": API_KEY, "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
    });
    const data = await response.json();
    console.log("Prepared Request", data);
    return data;

}


//Function to request attestation from the StateConnector protocol, parameter object, returns Number.
async function getAttestation(data){
    const flare = await import(FLARE_PACKAGE);
    const flareContractRegistry = new ethers.Contract(REGISTRY_ADDRESS
        ,
        flare.nameToAbi("FlareContractRegistry", "coston").data, signer);
    const stateConnectorAddress = await flareContractRegistry.getContractAddressByName("StateConnector");
    const stateConnector = new ethers.Contract(stateConnectorAddress,flare.nameToAbi("StateConnector", "coston").data,
        signer);

    //Call to the StateConnector protocol to provide attestation.
    const tx = await stateConnector.requestAttestations(data.abiEncodedRequest);
    const receipt = await tx.wait();

    const blockNumber = receipt.blockNumber;
    const block = await providers.getBlock(blockNumber);

    const BUFFER_TIMESTAMP_OFFSET = await stateConnector.BUFFER_TIMESTAMP_OFFSET();
    const BUFFER_WINDOW = await stateConnector.BUFFER_WINDOW();

    //calculate roundId
    const bigroundId = (BigInt(block.timestamp) - BUFFER_TIMESTAMP_OFFSET) /BUFFER_WINDOW;
    const scRound = Number(bigroundId);
    console.log("scRound:",scRound);

    return scRound;
}

//Function to verify atestation using verifier's API, parameters Number and Object.
async function testAttestation(scRound,requestData) {

    const attestationProof={
        "roundId":scRound,
        "requestBytes":requestData.abiEncodedRequest
    };

    const response  = await fetch( `${ATTESTATION_API_URL}`,
        {
            method:"POST",
            headers: { "X-API-KEY": API_KEY, "Content-Type": "application/json" },
            body:JSON.stringify(attestationProof)
        }
    );
    //Verified attesation proof from verifiers API endpoint.
    const data = await response.json();
    console.log(data);

    // Unpacked attesatation proof to be used in a Solidity contract.
    let fullProof={
        merkleProof:data.data.merkleProof,
        data:{
            roundID:data.data.roundId,
            hash:data.data.hash,
            requestByte:data.data.requestBytes,
            attestationType:data.data.request.attestationType,
            messageIntegrityCode:data.data.request.messageIntegrityCode,
            lowestUsedTimestamp: data.data.response.lowestUsedTimestamp,
            sourceId:data.data.response.sourceId,
            votingRound:data.data.response.votingRound,
            status:data.status,
            requestBody:data.data.response.requestBody,
            responseBody:data.data.response.responseBody

        }
    };

    console.log("fullproof",fullProof);
    const addressVerifier = new ethers.Contract(VALIDITY_ADDRESS, AddressValidityVerificationABI.abi, signer);
    // Call to Solidity contract that will make use of proof provided by the attestation provider.
    const tx = await addressVerifier.verifyAddressValidity(fullProof);
    console.log("Attestation:", tx);

}

async function AddressValidity_run() {

    const ATTESTATION_TYPE = AddressValidity.TYPE;

    const sourceType = encodeAttestationName("testBTC");

    //Attestation Request object to be sent to API endpoint
    const requestNoMic = {
        "attestationType": ATTESTATION_TYPE,
        "sourceId": sourceType,
        "requestBody": {
            "addressStr" : addressToValidate
        }
    }
    try{
        const preparedData = await prepareRequest(requestNoMic);
        const scRound = await getAttestation(preparedData);
        setTimeout(()=> {
            testAttestation(scRound,preparedData);
        },340000);
    }
    catch(error){
        console.error(error);
    }

}

AddressValidity_run();