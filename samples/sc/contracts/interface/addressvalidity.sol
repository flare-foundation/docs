// SPDX-License-Identifier: MIT
pragma solidity >=0.7.6 <0.9;

/**
 * @title AddressValidity
 * @custom:name AddressValidity
 * @custom:id 0x05
 * @custom:supported BTC, DOGE, XRP
 * @author Flare
 * @notice This interface defines types and structures for validating addresses on various external blockchains.
 * It is used to ascertain whether a given address string conforms to the validity criteria of a specific blockchain.
 * @custom:verification Verification involves checking the address against the validity criteria of the respective blockchain as identified by `sourceId`.
 * Validity criteria documentation for each supported chain can be found at specified URLs.
 * @custom:lut 0xffffffffffffffff (2^{64}-1 in hex)
 *
 * This interface is part of a system that allows for cross-chain verification of address validity, supporting chains like Bitcoin, Dogecoin, and XRP Ledger.
 */
interface AddressValidity {
    /**
     * @notice Struct representing a request for address attestation.
     * @dev This struct is used to initiate a request for verifying the validity of an address on a specified blockchain.
     * @param attestationType Identifier for the attestation type, defined in the state connector protocol repository.
     * @param sourceId Identifier of the blockchain data source.
     * @param messageIntegrityCode A hash value ensuring the integrity of the expected response, as per the defined standards.
     * @param requestBody Details of the specific request, varying based on the attestationType.
     */
    struct Request {
        bytes32 attestationType;
        bytes32 sourceId;
        bytes32 messageIntegrityCode;
        RequestBody requestBody;
    }

    /**
     * @notice Struct representing a response to an address attestation request.
     * @dev This struct includes information from the request and additional data relevant to the attestation response.
     * @param attestationType, sourceId Extracted from the request for reference.
     * @param votingRound Identifier of the state connector round during which the request was processed.
     * @param lowestUsedTimestamp Earliest timestamp used in generating the response, ensuring timeliness of the data.
     * @param requestBody, responseBody Details of the request and the corresponding response, specific to the attestation type.
     */
    struct Response {
        bytes32 attestationType;
        bytes32 sourceId;
        uint64 votingRound;
        uint64 lowestUsedTimestamp;
        RequestBody requestBody;
        ResponseBody responseBody;
    }

    /**
     * @notice Struct representing the proof of an attestation.
     * @dev Contains a Merkle proof and the attestation response, serving as evidence for the validity of an address.
     * @param merkleProof A series of hashes used to validate the response against a stored Merkle root.
     * @param data The attestation response data, confirming the validity of an address.
     */
    struct Proof {
        bytes32[] merkleProof;
        Response data;
    }

    /**
     * @notice Struct defining the request body for AddressValidity attestation.
     * @dev Used to specify the address that needs to be validated.
     * @param addressStr The address string to be verified on its native blockchain.
     */
    struct RequestBody {
        string addressStr;
    }

    /**
     * @notice Struct defining the response body for AddressValidity attestation.
     * @dev Provides a standardized form of the validated address and its hash.
     * @param standardAddress The standardized format of the verified address.
     * @param standardAddressHash A hash of the standard address, for cryptographic verification.
     */
    struct ResponseBody {
        string standardAddress;
        bytes32 standardAddressHash;
    }
}
