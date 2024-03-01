# ReferencedPaymentNonexistence

## Description

<div class="api-node-source" markdown>
[Source](https://github.com/flare-foundation/songbird-state-connector-protocol/tree/main/contracts/interface/types/ReferencedPaymentNonexistence.sol?ref_type=heads)
</div>

Assertion that an agreed-upon payment has not been made by a certain deadline.
A confirmed request shows that a transaction meeting certain criteria (address, amount, reference) did not appear in the specified block range.

This type of attestation can be used to e.g. provide grounds to liquidate funds locked by a smart contract on Flare when a payment is missed.

**Supported sources:** BTC, DOGE, XRP, testBTC, testDOGE, testXRP

## Request body

| Field                      | Solidity type | Description                                                                   |
| -------------------------- | ------------- | ----------------------------------------------------------------------------- |
| `minimalBlockNumber`       | `uint64`      | The start block of the search range.                                          |
| `deadlineBlockNumber`      | `uint64`      | The `blockNumber` to be included in the search range.                         |
| `deadlineTimestamp`        | `uint64`      | The timestamp to be included in the search range.                             |
| `destinationAddressHash`   | `bytes32`     | The standard address hash of the address to which the payment had to be done. |
| `amount`                   | `uint256`     | The requested amount in minimal units that had to be paid.                    |
| `standardPaymentReference` | `bytes32`     | The requested standard payment reference.                                     |

The `standardPaymentReference` should not be zero (as a 32-byte sequence).

## Response body

| Field                         | Solidity type | Description                                |
| ----------------------------- | ------------- | ------------------------------------------ |
| `minimalBlockTimestamp`       | `uint64`      | The timestamp of the `minimalBlock`.       |
| `firstOverflowBlockNumber`    | `uint64`      | The height of the `firstOverflowBlock`.    |
| `firstOverflowBlockTimestamp` | `uint64`      | The timestamp of the `firstOverflowBlock`. |

`firstOverflowBlock` is the first block that has block number higher than `deadlineBlockNumber` and timestamp later than `deadlineTimestamp`.
The specified search range are blocks between heights including `minimalBlockNumber` and excluding `firstOverflowBlockNumber`.

## Verification

If `firstOverflowBlock` cannot be determined or does not have a sufficient [number of confirmations](https://github.com/flare-foundation/songbird-state-connector-protocol/blob/main/specs/attestations/configs.md#finalityconfirmation), the attestation request is rejected.
If `firstOverflowBlockNumber` is higher or equal to `minimalBlockNumber`, the request is rejected.
The search range are blocks between heights including `minimalBlockNumber` and excluding `firstOverflowBlockNumber`.
If the verifier does not have a view of all blocks from `minimalBlockNumber` to `firstOverflowBlockNumber`, the attestation request is rejected.
The request is confirmed if no transaction meeting the specified criteria is found in the search range.
The criteria and timestamp are chain specific.

### UTXO (Bitcoin and Dogecoin)

Criteria for the transaction:

* It is not a coinbase transaction.
* The transaction has the specified [standardPaymentReference](https://github.com/flare-foundation/songbird-state-connector-protocol/blob/main/specs/attestations/external-chains/standardPaymentReference.md#btc-and-doge-blockchains).
* The sum of values of all outputs with the specified address minus the sum of values of all inputs with the specified address is greater than `amount` (in practice the sum of all values of the inputs with the specified address is zero).

Timestamp is `mediantime`.

### XRPL

Criteria for the transaction:

* The transaction is of type payment.
* The transaction has the specified [standardPaymentReference](https://github.com/flare-foundation/songbird-state-connector-protocol/blob/main/specs/attestations/external-chains/standardPaymentReference.md#xrp),
* One of the following is true:
    * Transaction status is `SUCCESS` and the amount received by the specified destination address is greater than the specified `value`.
    * Transaction status is `RECEIVER_FAILURE` and the specified destination address would receive an amount greater than the specified `value` had the transaction been successful.

Timestamp is `close_time` converted to UNIX time.

## Lowest Used Timestamp

For `lowestUsedTimestamp`, `minimalBlockTimestamp` is used.
