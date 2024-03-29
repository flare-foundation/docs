---
title: IConfirmedBlockHeightExistsVerification
search:
  boost: 0.5
---

<!-- This is an autogenerated file. Do not edit! -->

# `IConfirmedBlockHeightExistsVerification` { #ct_iconfirmedblockheightexistsverification }

<div class="api-node-source" markdown>
[Source](https://github.com/flare-foundation/songbird-state-connector-protocol/tree/main/contracts/generated/verification/interface/IConfirmedBlockHeightExistsVerification.sol)
</div>

<div class="api-node-internal" markdown>

Interface for verifying [`ConfirmedBlockHeightExists`](../attestation-types/ConfirmedBlockHeightExists.md) attestations within the [State Connector](https://docs.flare.network/tech/state-connector/).
This interface can be utilized at the end of the attestation request process to verify that the data
returned by an attestation provider matches the on-chain Merkle proof.

</div>

<div class="api-node-type" markdown>

## Functions

<div class="api-node" markdown>

### `verifyConfirmedBlockHeightExists` { #fn_verifyconfirmedblockheightexists_5e30ebfb }

<div class="api-node-source" markdown>
Defined in `IConfirmedBlockHeightExistsVerification` ([Docs](./IConfirmedBlockHeightExistsVerification.md), [Source](https://github.com/flare-foundation/songbird-state-connector-protocol/tree/main/contracts/generated/verification/interface/IConfirmedBlockHeightExistsVerification.sol)).
</div>

<div class="api-node-internal" markdown>

```solidity
function verifyConfirmedBlockHeightExists(
    struct ConfirmedBlockHeightExists.Proof _proof
) external view returns (
    bool _proved);
```

Verifies the [`ConfirmedBlockHeightExists`](../attestation-types/ConfirmedBlockHeightExists.md) attestation using a Merkle proof.
It checks whether the provided proof corresponds to the on-chain Merkle root for the voting round specified inside the proof.

| Parameters | Type | Description |
| ---------- | ---- | ----------- |
| `_proof` | `struct ConfirmedBlockHeightExists.Proof` | The [`ConfirmedBlockHeightExists`](../attestation-types/ConfirmedBlockHeightExists.md) attestation proof, which includes the Merkle proof and the attestation data.               This proof is obtained directly from attestation providers.               To learn about the format of this data, see [Attestation types](https://github.com/flare-foundation/songbird-state-connector-protocol/blob/main/specs/attestations/attestation-type-definition.md). |

| Returns | Type | Description |
| ------- | ---- | ----------- |
| `_proved` | `bool` | Whether the attestation is successfully verified. |
</div>
</div>

</div>

