# ConfirmedBlockHeightExists

## Description

<div class="api-node-source" markdown>
[Source](https://github.com/flare-foundation/songbird-state-connector-protocol/tree/main/contracts/interface/types/ConfirmedBlockHeightExists.sol?ref_type=heads)
</div>

An assertion that a block with `blockNumber` is confirmed.
It also provides data to compute the block production rate in the given time range.

**Supported sources:** BTC, DOGE, XRP, testBTC, testDOGE, testXRP

## Request body

| Field         | Solidity type | Description                                                                    |
| ------------- | ------------- | ------------------------------------------------------------------------------ |
| `blockNumber` | `uint64`      | The number of the block the request wants a confirmation of.                   |
| `queryWindow` | `uint64`      | The length of the period in which the block production rate is to be computed. |

## Response body

| Field                             | Solidity type | Description                                                                                                                     |
| --------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `blockTimestamp`                  | `uint64`      | The timestamp of the block with `blockNumber`.                                                                                  |
| `numberOfConfirmations`           | `uint64`      | The depth at which a block is considered confirmed depending on the chain. All attestation providers must agree on this number. |
| `lowestQueryWindowBlockNumber`    | `uint64`      | The block number of the latest block that has a timestamp strictly smaller than `blockTimestamp` - `queryWindow`.               |
| `lowestQueryWindowBlockTimestamp` | `uint64`      | The timestamp of the block at height `lowestQueryWindowBlockNumber`.                                                            |

`blockNumber`, `lowestQueryWindowBlockNumber`, `blockTimestamp` and `lowestQueryWindowBlockTimestamp` can be used to compute the average block production time in the specified block range.

## Verification

It is checked that the block with `blockNumber` is confirmed by at least `numberOfConfirmations`.
If it is not, the request is rejected. We note a block on the tip of the chain is confirmed by 1 block.
Then `lowestQueryWindowBlock` is determined and its number and timestamp are extracted.

Current confirmation heights consensus:

| `Chain` | `chainId` | `numberOfConfirmations` | `timestamp` |
| ------- | --------- | ----------------------- | ----------- |
| `BTC`   | 0         | 6                       | mediantime  |
| `DOGE`  | 2         | 60                      | mediantime  |
| `XRP`   | 3         | 3                       | close_time  |

## Lowest Used Timestamp

For `lowestUsedTimestamp`, `lowestQueryWindowBlockTimestamp` is used.
