# Fetch EVM Transactions

This tutorial is almost identical to the [Basic Attestation Request](./address-validity.md) one, and shows how to use the [State Connector](../../../tech/state-connector.md) protocol to retrieve information about a transaction that happened on a different EVM blockchain.

In this tutorial, you will learn how to:

* Make a query to the State Connector smart contract.
* Get the result from an attestation provider.
* Use a smart contract to verify that the result returned by the attestation provider matches the result agreed upon by the State Connector.

The diagram below shows the process that this tutorial follows.
Arrows that match one of the steps in the tutorial are numbered.

<figure markdown>
  ![State Connector usage process](SC-basic-tutorial.png){ loading=lazy .allow-zoom }
  <figcaption>State Connector usage process</figcaption>
</figure>

## Code

For easy navigation, numbered comments in the source code (as in `// 1.`) link to the tutorial sections below.

{% import "runner.md" as runner with context %}

{{ runner.js(folder="sc/", filename="EVMTransaction", params=[
  {"name": "Network (e.g. eth, sgb)", "value": "eth"},
  {"name": "Transaction Hash to retrieve", "value":"0x58d98ffe5f960f63ac55184ef5215f5cf2c1ab1983ac3c11a39e24477299170d"}
  ]) }}

<div class="tutorial" markdown>

## Tutorial

### 1. Set up

The tutorial uses the following dependencies:

* The [Flare periphery artifacts package](https://www.npmjs.com/package/@flarenetwork/flare-periphery-contract-artifacts), which provides the API for all Flare smart contracts.

* The [ethers](https://www.npmjs.com/package/ethers) package, which is also needed to work with smart contracts.

```javascript linenums="23"
--8<-- "./docs/samples/sc/EVMTransaction.js:23:27"
```

The periphery package significantly simplifies working with the Flare smart contracts.
If you remove this dependency, you must manually provide the signatures for all the methods you want to use.

This tutorial needs to send transactions on [the Coston test network](../../../tech/flare.md#flare-networks), so you will need an account with enough `$CFLR` tokens to pay for gas.
The [Getting Started](../../getting-started/setup/index.md) guides explain how to configure your wallet and get test tokens from the [faucet](https://faucet.flare.network/coston).

!!! warning
    For simplicity, this tutorial hard-codes the private key of the wallet being used in the `PRIVATE_KEY` variable.

    ```javascript linenums="11"
    --8<-- "./docs/samples/sc/EVMTransaction.js:11:12"
    ```

    In a production setting, the private key should be retrieved from an external source (such as a [`.env` file](https://www.npmjs.com/package/dotenv)) and NOT embedded directly in the code.

### 2. Prepare Attestation Request

Requests to the State Connector must be extremely specific.
For example, to request a proof that a given transaction exists, the transaction ID alone is not enough.
The block number and block timestamp where the transaction was included must also be provided.
Furthermore, requests must be encoded into a hex string before being submitted to the State Connector.

You can perform all these operations yourself, but, as a convenience, attestation providers can prepare requests for you, filling in all missing information and taking care of formatting.

The attestation type chosen for this tutorial, [`EVMTransaction`](EVMTransaction.md), requires the hash of the transaction to retrieve and a bit of configuration to select the retrieved information.

To prepare a request using an Attestation Provider, begin with a raw attestation request:

```javascript linenums="32"
--8<-- "./docs/samples/sc/EVMTransaction.js:32:43"
```

The raw attestation request contains:

* `attestationType`: A unique identifier for the type of attestation you want, which is just an encoded version of its name.
    See the list of the currently available [attestation types](../../../apis/attestation-types/index.md).
* `sourceId`: The network on which you want to make the request.
    Available networks depend on the attestation type and are listed in the documentation of each one.
    This example uses the Coston test network, so network names are prepended with `test`.
* `requestBody`: A JSON object specific to each attestation type.
    In this example, it is an [`EVMTransaction`](EVMTransaction.md) object.

Then obtain an encoded attestation request:

```javascript linenums="51"
--8<-- "./docs/samples/sc/EVMTransaction.js:51:59"
```

This code performs a `POST` request to the [`prepareRequest`](../../../apis/REST/evmverifier.md?tag=EVMTransaction&ctrl=ETHEVMTransactionVerifierController&op=prepareRequest) endpoint of the attestation provider, using the standard [`fetch` API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

`VERIFIER_API_KEY` is the API key of the chosen attestation provider, if it needs one.
Attestation providers are typically paid services and require an API key to operate.

Finally, `encodedAttestationRequest` is the returned encoded request ready to be submitted to the State Connector.

### 3. Access Contract Registry

The [`FlareContractRegistry`](FlareContractRegistry.md) contains the current addresses for all Flare smart contracts, and it is [the only recommended way](../../getting-started/contract-addresses.md) to retrieve them.

Its address is the same on all of [Flare's networks](../../../tech/flare.md#flare-networks), and it is the only Flare address that needs to be hard-coded into any program.

```javascript linenums="6"
--8<-- "./docs/samples/sc/EVMTransaction.js:6:7"
```

```javascript linenums="70"
--8<-- "./docs/samples/sc/EVMTransaction.js:70:74"
```

Note that this tutorial uses the Coston test network here rather than the main Flare Network.

### 4. Retrieve the State Connector Contract Address

Retrieve the State Connector's address from the `FlareContractRegistry`.

```javascript linenums="77"
--8<-- "./docs/samples/sc/EVMTransaction.js:77:83"
```

Use the [`getContractAddressByName()`](FlareContractRegistry.md#fn_getcontractaddressbyname_82760fca) method from the [`FlareContractRegistry`](FlareContractRegistry.md) smart contract to retrieve the address of the [`StateConnector`](IStateConnector.md) smart contract.

### 5. Request Attestation from the State Connector Contract

Now, request an attestation from the State Connector contract by sending the encoded attestation request from [step 2](#2-prepare-attestation-request).

Use the [`requestAttestations()`](IStateConnector.md#fn_requestattestations_f64b6fda) method from the [`StateConnector`](IStateConnector.md) smart contract.

```javascript linenums="87"
--8<-- "./docs/samples/sc/EVMTransaction.js:87:91"
```

`attestationTx` contains the [`TransactionResponse`](https://docs.ethers.org/v5/api/providers/types/#providers-TransactionResponse).
After you `wait` on it and the transaction is added to the blockchain, you obtain a [`TransactionReceipt`](https://docs.ethers.org/v5/api/providers/types/#providers-TransactionReceipt).

From this receipt you finally retrieve the `block` that includes the request transaction.
This block is needed in the next step.

### 6. Calculate Round ID

In order to recover the attestation result when it becomes available, you will need the _round ID_ where the request was submitted.
This is calculated from the block timestamp:

```javascript linenums="94"
--8<-- "./docs/samples/sc/EVMTransaction.js:94:98"
```

Attestation rounds last `roundDuration` seconds, starting `roundOffset` seconds after the [Unix epoch](https://en.wikipedia.org/wiki/Unix_time).
You will use `submissionRoundID` later.

!!! tip

    To optimize performance, consider caching the `roundOffset` and `roundDuration` values instead of retrieving them from the blockchain every time.

### 7. Wait for the Attestation Round to Finalize

You need to wait for the attestation round to finalize, because results are only available after finalization.

```javascript linenums="103"
--8<-- "./docs/samples/sc/EVMTransaction.js:103:115"
```

Attestation rounds use the [Collect-Choose-Commit-Reveal (CCCR)](../../../tech/state-connector.md#overlapped-cccr-protocol) protocol, which requires 270 - 360 seconds, depending on attestation provider's submissions, and the point inside the **Collect phase** in which the request was submitted.

For this reason, this tutorial polls the State Connector's last finalized round ([`StateConnector.lastFinalizedRoundID`](IStateConnector.md#fn_lastfinalizedroundid_dd862157)) every 10 seconds so that results are obtained as soon as they are available.

!!! note "Polling vs Waiting"

    Polling every 10 seconds is a good tradeoff to minimize the waiting time, but you can choose to always wait the maximum amount of time (360s), or even wait the minimum amount (270s), and then poll.

!!! note "Proof Accessibility Window"

    Proofs are kept on-chain for just a week.
    After this period, the proofs will no longer be accessible, so timely verification is crucial.

### 8. Retrieve Proof

It is time now to fetch from the attestation provider the result for the round ID where the request was submitted (`submissionRoundID`).

The result is a [Merkle root](glossary.md#merkle_root), which is the root of a [Merkle tree](glossary.md#merkle_tree).
This tree has been constructed with the hashes of all the requests received during that round that were considered valid by a majority of attestation providers.

If your request was valid, i.e., if a transaction with the provided hash was found on the requested network, then the hash of the request will be part of the received Merkle root.

```javascript linenums="118"
--8<-- "./docs/samples/sc/EVMTransaction.js:118:132"
```

You need to construct a `proofRequest` and make a `POST` request to the [`get-specific-proof`](../../../apis/REST/attestation-client.md?tag=Proof&ctrl=ProofController&op=getSpecificProofController) endpoint of the attestation provider.

Doing so returns, among other things, a Merkle proof consisting of one or more nodes (hashes).
If the Merkle tree is rebuilt using these nodes plus the hash of your request, and the resulting root hash matches the agreed-upon value stored in the State Connector, it means that the proof can be trusted.

You can perform these operations yourself or you can use a verifier smart contract, as shown in the next step.

The received proof already contains a field, `proof.data.responseBody`, which contains the requested transaction's content, as seen by this particular attestation provider.
But this result cannot be trusted until you verify that it matches what the rest of attestation providers submitted, as explained next.

### 9. Send Proof to Verifier Contract

Send the proof to the [`EVMTransactionVerification`](EVMTransactionVerification.md) smart contract.
This smart contract verifies the request by rebuilding the Merkle root using the hashes contained in the `proof.data.merkleProof` object and comparing it to the Merkle root stored in the State Connector.

```javascript linenums="141"
--8<-- "./docs/samples/sc/EVMTransaction.js:141:160"
```

`isVerified` contains the result of the verification, analyzed next.

!!! note
    This tutorial uses a verification contract provided by Flare, but dapps can embed the same logic into their own smart contracts if they wish to.

### 10. Check if the Address is Valid

Finally, check if the transaction could be retrieved and all attestation providers agree on its contents, but only if the attestation has been verified.

`isVerified` indicates whether the attestation you received from the attestation provider matches what the majority of them agreed upon.
If the value is `false`, you do not need to look further because the attestation provider is probably lying and its results cannot be trusted.
In this case, you need to make the request again, ideally through a different provider.

If `isVerified` is `true`, then you can look at the actual result of your request in the [`responseBody`](EVMTransaction.md#response-body) field of `fullProof.data` obtained in [step 8](#8-retrieve-proof).

```javascript linenums="164"
--8<-- "./docs/samples/sc/EVMTransaction.js:164:171"
```

</div>

## Conclusion

This tutorial has shown how to:

* Prepare a State Connector request using the [`prepareRequest`](../../../apis/REST/evmverifier.md?tag=EVMTransaction&ctrl=ETHEVMTransactionVerifierController&op=prepareRequest) REST endpoint of an attestation provider.
* More precisely, make an [`EVMTransaction`](EVMTransaction.md) request that retrieves information about a transaction that happened on another blockchain.
* Make a request to the State Connector smart contract using [`requestAttestations()`](IStateConnector.md#fn_requestattestations_f64b6fda).
* Get the result from an attestation provider by making a `POST` request to the [`get-specific-proof`](../../../apis/REST/attestation-client.md?tag=Proof&ctrl=ProofController&op=getSpecificProofController) REST endpoint.
* Use the [`EVMTransactionVerification`](EVMTransactionVerification.md) smart contract to verify that the result returned by the attestation provider matches the result agreed upon by the State Connector.

## Next Steps

The State Connector can be used for a host of other things beyond retrieving transactions from other blockchains.
The attestation type of the request selects the type of information you want.

```javascript linenums="34"
--8<-- "./docs/samples/sc/EVMTransaction.js:34:34"
```

Other attestation types include:

* [**Payment**](Payment.md): Verifies whether a payment transaction occurred in which funds were sent from one address to another address.
* [**Balance-decreasing transaction**](BalanceDecreasingTransaction.md): Verifies whether a transaction that might have decreased a balance occurred.
* [**Referenced payment nonexistence**](ReferencedPaymentNonexistence.md): Verifies whether an account did not receive funds from a different account by a specific deadline.
* [**Confirmed block height**](ConfirmedBlockHeightExists.md): Verifies whether a block on a certain height exists and was confirmed.

More attestation types are to be added in the future, subject to community approval and support.

See the [state connector attestation types](../../../apis/attestation-types/index.md) for more information on other attestation types.
