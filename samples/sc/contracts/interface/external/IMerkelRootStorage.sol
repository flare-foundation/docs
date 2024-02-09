// SPDX-License-Identifier: MIT
pragma solidity >=0.7.6 <0.9;

/**
 * @title IMerkleRootStorage
 * @dev This interface defines a standard for accessing Merkle root data.
 * It is intended to be implemented by contracts that store and manage Merkle roots,
 * which are essential components in cryptographic proofs, particularly in blockchain applications.
 * Merkle roots provide a compact representation of the state of a dataset, allowing for efficient verification.
 * This interface is crucial for systems that rely on Merkle proofs for activities like validating transactions,
 * verifying blockchain state, or implementing various cryptographic protocols.
 */
// solhint-disable func-name-mixedcase
interface IMerkleRootStorage {
    /**
     * @notice Retrieves the Merkle root for a specified round.
     * @dev This function returns the Merkle root associated with a given round identifier.
     * It is essential for validating Merkle proofs for transactions or data states tied to that specific round.
     * Implementations of this interface should ensure that the retrieval process handles buffer overflows
     * and any other potential data integrity issues to ensure the accuracy and security of the returned Merkle root.
     * @param _roundId The identifier of the round for which the Merkle root is requested.
     * @return A bytes32 representation of the Merkle root for the specified round.
     */
    function merkleRoot(uint256 _roundId) external view returns (bytes32);
}
