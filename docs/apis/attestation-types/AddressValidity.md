# AddressValidity

## Description

<div class="api-node-source" markdown>
[Source](https://github.com/flare-foundation/songbird-state-connector-protocol/tree/main/contracts/interface/types/AddressValidity.sol?ref_type=heads)
</div>

An assertion whether a string represents a valid address on an external chain.

**Supported sources:** BTC, DOGE, XRP, testBTC, testDOGE, testXRP

## Request body

| Field        | Solidity type | Description             |
| ------------ | ------------- | ----------------------- |
| `addressStr` | `string`      | Address to be verified. |

## Response body

| Field                 | Solidity type | Description                                                                                     |
| --------------------- | ------------- | ----------------------------------------------------------------------------------------------- |
| `isValid`             | `bool`        | Boolean indicator of the address validity.                                                      |
| `standardAddress`     | `string`      | If `isValid`, standard form of the validated address. Otherwise, an empty string.               |
| `standardAddressHash` | `bytes32`     | If `isValid`, standard address hash of the validated address. Otherwise, a zero bytes32 string. |

## Verification

The address is checked against all validity criteria of the chain with `sourceId`.
Indicator of validity is provided.
If the address is valid, its standard form and standard hash are computed.
Validity criteria for each supported chain:

* [BTC](https://github.com/flare-foundation/songbird-state-connector-protocol/blob/main/specs/attestations/external-chains/address-validity/BTC.md)
* [DOGE](https://github.com/flare-foundation/songbird-state-connector-protocol/blob/main/specs/attestations/external-chains/address-validity/DOGE.md)
* [XRPL](https://github.com/flare-foundation/songbird-state-connector-protocol/blob/main/specs/attestations/external-chains/address-validity/XRPL.md)

## Lowest Used Timestamp

For `lowestUsedTimestamp`, `0xffffffffffffffff` ($2^{64}-1$ in hex) is used.
