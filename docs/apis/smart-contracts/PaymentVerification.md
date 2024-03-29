---
title: PaymentVerification
search:
  boost: 0.5
---

<!-- This is an autogenerated file. Do not edit! -->

# `PaymentVerification` { #ct_paymentverification }

<div class="api-node-source" markdown>
[Source](https://github.com/flare-foundation/songbird-state-connector-protocol/tree/main/contracts/generated/verification/PaymentVerification.sol) | Inherits from [IPaymentVerification](./IPaymentVerification.md)
</div>

<div class="api-node-internal" markdown>

Contract for verifying [`Payment`](../attestation-types/Payment.md) attestations within the [State Connector](https://docs.flare.network/tech/state-connector/).
This contract can be utilized at the end of the attestation request process to verify that the data
returned by an attestation provider matches the on-chain Merkle proof.

</div>

<div class="api-node-type" markdown>

## Functions

<div class="api-node" markdown>

### `constructor` { #fn_constructor_undefined }

<div class="api-node-source" markdown>
Defined in `PaymentVerification` ([Docs](./PaymentVerification.md), [Source](https://github.com/flare-foundation/songbird-state-connector-protocol/tree/main/contracts/generated/verification/PaymentVerification.sol)).
</div>

<div class="api-node-internal" markdown>

```solidity
constructor(
    contract IMerkleRootStorage _merkleRootStorage
) public;
```

</div>
</div>

<div class="api-node" markdown>

### `verifyPayment` { #fn_verifypayment_8cc386ce }

<div class="api-node-source" markdown>
Defined in `PaymentVerification` ([Docs](./PaymentVerification.md), [Source](https://github.com/flare-foundation/songbird-state-connector-protocol/tree/main/contracts/generated/verification/PaymentVerification.sol)).
</div>

<div class="api-node-internal" markdown>

```solidity
function verifyPayment(
    struct Payment.Proof _proof
) external view returns (
    bool _proved);
```

Verifies the [`Payment`](../attestation-types/Payment.md) attestation using a Merkle proof.
It checks whether the provided proof corresponds to the on-chain Merkle root for the voting round specified inside the proof.

| Parameters | Type | Description |
| ---------- | ---- | ----------- |
| `_proof` | `struct Payment.Proof` | The [`Payment`](../attestation-types/Payment.md) attestation proof, which includes the Merkle proof and the attestation data.               This proof is obtained directly from attestation providers.               To learn about the format of this data, see [Attestation types](https://github.com/flare-foundation/songbird-state-connector-protocol/blob/main/specs/attestations/attestation-type-definition.md). |

| Returns | Type | Description |
| ------- | ---- | ----------- |
| `_proved` | `bool` | Whether the attestation is successfully verified. |
</div>
</div>

</div>

<div class="api-node-type" markdown>

## Variables

<div class="api-node" markdown>

### `merkleRootStorage` { #va_merklerootstorage }

<div class="api-node-source" markdown>
Defined in `PaymentVerification` ([Docs](./PaymentVerification.md), [Source](https://github.com/flare-foundation/songbird-state-connector-protocol/tree/main/contracts/generated/verification/PaymentVerification.sol)).
</div>

<div class="api-node-internal" markdown>

```solidity
    contract IMerkleRootStorage merkleRootStorage
```

</div>
</div>

</div>

