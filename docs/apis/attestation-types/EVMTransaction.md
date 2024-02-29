# EVMTransaction

## Description

<div class="api-node-source" markdown>
[Source](https://github.com/flare-foundation/songbird-state-connector-protocol/tree/main/contracts/interface/types/EVMTransaction.sol?ref_type=heads)
</div>

A relay of a transaction from an EVM chain.
This type is only relevant for EVM-compatible chains.

**Supported sources:** ETH, FLR, SGB, testETH, testFLR, testSGB

## Request body

| Field                   | Solidity type | Description                                                                                                                                                                                                                                                                                                                  |
| ----------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `transactionHash`       | `bytes32`     | Hash of the transaction(transactionHash).                                                                                                                                                                                                                                                                                    |
| `requiredConfirmations` | `uint16`      | The height at which a block is considered confirmed by the requestor.                                                                                                                                                                                                                                                        |
| `provideInput`          | `bool`        | If true, "input" field is included in the response.                                                                                                                                                                                                                                                                          |
| `listEvents`            | `bool`        | If true, events indicated by `logIndices` are included in the response. Otherwise, no events are included in the response.                                                                                                                                                                                                   |
| `logIndices`            | `uint32[]`    | If `listEvents` is `false`, this should be an empty list, otherwise, the request is rejected. If `listEvents` is `true`, this is the list of indices (logIndex) of the events to be relayed (sorted by the requestor). The array should contain at most 50 indices. If empty, it indicates all events in order capped by 50. |

Note that events (logs) are indexed in block not in each transaction. The contract that uses the attestation should specify the order of event logs as needed and the requestor should sort `logIndices`
with respect to the set specifications. If possible, the contact should only require one `logIndex`.

## Response body

| Field              | Solidity type | Description                                                                                                                                       |
| ------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `blockNumber`      | `uint64`      | Number of the block in which the transaction is included.                                                                                         |
| `timestamp`        | `uint64`      | Timestamp of the block in which the transaction is included.                                                                                      |
| `sourceAddress`    | `address`     | The address (from) that signed the transaction.                                                                                                   |
| `isDeployment`     | `bool`        | Indicate whether it is a contract creation transaction.                                                                                           |
| `receivingAddress` | `address`     | The address (to) of the receiver of the initial transaction. Zero address if `isDeployment` is `true`.                                            |
| `value`            | `uint256`     | The value transferred by the initial transaction in wei.                                                                                          |
| `input`            | `bytes`       | If `provideInput`, this is the data send along with the initial transaction. Otherwise, it is the default value `0x00`.                           |
| `status`           | `uint8`       | Status of the transaction 1 - success, 0 - failure.                                                                                               |
| `events`           | `Event[]`     | If `listEvents` is `true`, an array of the requested events. Sorted by the logIndex in the same order as `logIndices`. Otherwise, an empty array. |

The fields are in line with [transaction](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gettransactionbyhash) provided by EVM node.

An `Event` is a struct with the following fields:

| Field            | Solidity type | Description                                                                                         |
| ---------------- | ------------- | --------------------------------------------------------------------------------------------------- |
| `logIndex`       | `uint32`      | The consecutive number of the event in block.                                                       |
| `emitterAddress` | `address`     | The address of the contract that emitted the event.                                                 |
| `topics`         | `bytes32[]`   | An array of up to four 32-byte strings of indexed log arguments.                                    |
| `data`           | `bytes`       | Concatenated 32-byte strings of non-indexed log arguments. At least 32 bytes long.                  |
| `removed`        | `bool`        | It is `true` if the log was removed due to a chain reorganization and `false` if it is a valid log. |

The fields are in line with [EVM event logs](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getfilterchanges).

## Verification

If a transaction with the `transactionId` is in a block on the main branch with at least `requiredConfirmations`, the specified data is relayed.
If an indicated event does not exist, the request is rejected.

## Lowest Used Timestamp

For `lowestUsedTimestamp`, `timestamp` is used.
