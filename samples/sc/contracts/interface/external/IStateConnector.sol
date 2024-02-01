// SPDX-License-Identifier: MIT
pragma solidity >=0.7.6 <0.9;

/**
 * @title IStateConnector
 * @dev This interface defines the functionality for requesting attestations and managing attestation rounds within a blockchain system.
 * It allows for the initiation of attestation requests and provides access to key round information.
 * The interface is crucial in systems where attestations are used to verify or validate certain states or transactions.
 * It also manages the details of attestation rounds, such as their identifiers and corresponding Merkle roots,
 * which are essential for the integrity and verification of the attestation process.
 */
// solhint-disable func-name-mixedcase
interface IStateConnector {
    /**
     * @notice Emitted when a new attestation request is made.
     * @param sender The address initiating the attestation request.
     * @param timestamp The timestamp when the attestation request was made.
     * @param data The data associated with the attestation request.
     */
    event AttestationRequest(
        address sender,
        uint256 timestamp,
        bytes data
    );

    /**
     * @notice Emitted when an attestation round is finalized.
     * @param roundId The identifier of the finalized round.
     * @param merkleRoot The Merkle root associated with the finalized round, crucial for verifying attestations.
     */
    event RoundFinalised(
        uint256 indexed roundId,
        bytes32 merkleRoot
    );

    /**
     * @notice Initiates an attestation request.
     * @dev Emits the `AttestationRequest` event, which triggers actions from attestation providers.
     * This function is used to start the process of attesting to a particular state or transaction.
     * @param _data The data that needs to be attested, packed in bytes format.
     */
    function requestAttestations(bytes calldata _data) external;

    /**
     * @notice Retrieves the identifier of the last finalized attestation round.
     * @dev This function is essential for understanding the current state of the attestation process.
     * @return _roundId The identifier of the most recently finalized round.
     */
    function lastFinalizedRoundId() external view returns (uint256 _roundId);

    /**
     * @notice Retrieves the Merkle root for a specified round.
     * @dev Similar to `IMerkleRootStorage`, this function provides access to the Merkle root for a given round.
     * The Merkle root is crucial for validating attestations tied to that round.
     * @param _roundId The identifier of the round for which the Merkle root is requested.
     * @return A bytes32 representation of the Merkle root for the specified round.
     */
    function merkleRoot(uint256 _roundId) external view returns (bytes32);

    /**
     * @notice Retrieves the start time offset for the buffer used in round calculations.
     * @dev This value is used in converting timestamps to round numbers, marking the start of the buffer period.
     * @return The start time in seconds for the buffer period.
     */
    function BUFFER_TIMESTAMP_OFFSET() external view returns (uint256);

    /**
     * @notice Retrieves the duration of each buffer window used in round calculations.
     * @dev This value defines the length of time a buffer is active, used in converting timestamps to round numbers.
     * @return The duration in seconds of each buffer window.
     */
    function BUFFER_WINDOW() external view returns (uint256);
}
