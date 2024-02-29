# Simple Attestation Request

This tutorial shows basic use of the [State Connector](../../../tech/state-connector.md) protocol.

In this tutorial, you will learn how to:

* Make a query to the State Connector smart contract.
* Get the result from an attestation provider (AP).
* Use a smart contract to verify that the result returned by the attestation provider matches the result agreed upon by the State Connector.

The diagram below shows the process that this tutorial follows.
Arrows that match one of the steps in the tutorial are numbered.

<figure markdown>
  ![State Connector usage process](SC-basic-tutorial.png){ loading=lazy .allow-zoom }
  <figcaption>State Connector usage process</figcaption>
</figure>

## Code

Choose your preferred programming language and ensure you have a working [development environment](../../getting-started/setup/index.md).

For easy navigation, numbered comments in the source code (as in `// 1.`) link to the tutorial sections below.

{% import "runner.md" as runner %}

{{ runner.js(folder="sc/", filename="AddressValidity", params=[
  {"name": "Network (e.g. btc, eth)", "value": "btc"},
  {"name": "Address to Verify", "value":"tb1p4mdyx3dvgk4dhvv8yv2dtuymf00wxhgkkjheqm7526fu7znnd6msw3qxvj"}
  ]) }}

<div class="tutorial" markdown>

## Tutorial

### 1. Set up

The tutorial uses the following dependencies:

* The [Flare periphery artifacts package](https://www.npmjs.com/package/@flarenetwork/flare-periphery-contract-artifacts), which provides the API for all Flare smart contracts.

* The [ethers](https://www.npmjs.com/package/ethers) package, which is also needed to work with smart contracts.

```javascript linenums="20"
--8<-- "samples/sc/AddressValidity.js:20:24"
```

The periphery package significantly simplifies working with the Flare smart contracts.
If you remove this dependency, you must manually provide the signatures for all the methods you want to use.

This tutorial needs to send transactions on the Coston test network, so you will need an account with enough `$CFLR` tokens to pay for gas.
The [Getting Started](../../getting-started/setup/index.md) guides explain how to configure your wallet and get test tokens from the [faucet](https://faucet.flare.network/coston).

!!! warning
    For simplicity, this tutorial hard-codes the private key of the wallet being used in the `TEST_PRIVATE_KEY` variable.

    ```javascript linenums="8"
    --8<-- "samples/sc/AddressValidity.js:8:8"
    ```

    In a production setting, the private key should be retrieved from an external source (such as a [`.env` file](https://www.npmjs.com/package/dotenv)) and NOT embedded directly in the code.

### 2. Prepare Attestation Request

Requests to the State Connector must be extremely specific.
For example, to request a proof that a given transaction exists, the transaction ID alone is not enough.
The block number and block timestamp where the transaction was included must also be provided.
Furthermore, requests must be encoded into a hex string before being submitted to the State Connector.

You can perform all these operations yourself, but, as a convenience, attestation providers can prepare requests for you, filling in all missing information and taking care of formatting.

The attestation type chosen for this tutorial, [`AddressValidity`](AddressValidity.md), is the simplest one and requires only the address to be validated.
However, it is still a good example of the process.

To prepare a request using an Attestation Provider, we begin with a raw attestation request:

```javascript linenums="28"
--8<-- "samples/sc/AddressValidity.js:28:34"
```

The raw attestation request contains:

* `attestationType`: A unique identifier for the type of attestation you want, which is just an encoded version of its name.
    See the list of the currently available [attestation types](../../../apis/attestation-types/index.md).
* `sourceId`: The network on which you want to make the request.
    Available networks depend on the attestation type and are listed in the documentation of each one.
    This example uses the Coston test network, so network names are prepended with `test`.
* `requestBody`: A JSON object specific to each attestation type.
    In this example, it is just the address that you want to validate.

Then obtain an encoded attestation request:

```javascript linenums="39"
--8<-- "samples/sc/AddressValidity.js:39:46"
```

This code performs a simple `POST` request to the [`prepareRequest`](../../../apis/REST/btcverifier.md) endpoint of the attestation provider, using the standard [`fetch` API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

`ATTESTATION_PROVIDER_API_KEY` is the API key of the chosen attestation provider, if it needs one.
Attestation providers are typically paid services and require an API key to operate.

Finally, `encodedAttestationRequest` is the returned encoded request ready to be submitted to the State Connector.

### 3. Access Contract Registry

The [`FlareContractRegistry`](FlareContractRegistry.md) contains the current addresses for all Flare smart contracts, and it is [the only recommended way](../../getting-started/contract-addresses.md) to retrieve them.

Its address is the same on all of [Flare's networks](../../../tech/flare.md#flare-networks), and it is the only Flare address that needs to be hard-coded into any program.

```javascript linenums="62"
--8<-- "samples/sc/AddressValidity.js:62:67"
```

Use the [`getContractAddressByName()`](FlareContractRegistry.md#fn_getcontractaddressbyname_82760fca) method from the [`FlareContractRegistry`](FlareContractRegistry.md) smart contract to retrieve the address of the [`StateConnector`](IStateConnector.md) smart contract.

Note that this tutorial uses the Coston test network here rather than the main Flare Network.

### 5. Request Attestation from the State Connector Contract

Now, request an attestation from the State Connector contract by sending the encoded attestation request from [step 2](#2-prepare-attestation-request).

Use the [`requestAttestations()`](IStateConnector.md#fn_requestattestations_f64b6fda) method from the [`StateConnector`](IStateConnector.md) smart contract.

```javascript linenums="78"
--8<-- "samples/sc/AddressValidity.js:78:84"
```

`attestationTx` contains the [`TransactionResponse`](https://docs.ethers.org/v5/api/providers/types/#providers-TransactionResponse).
After you `wait` on it and the transaction is added to the blockchain, you obtain a [`TransactionReceipt`](https://docs.ethers.org/v5/api/providers/types/#providers-TransactionReceipt).

From this receipt you finally retrieve the `block` that includes the request transaction.
This block is needed in the next step.

### 6. Calculate Round ID

Now we need to determine the attestation round ID where our request was accepted (`submissionRoundID`). This calculation is based on the timestamp of the block where the transaction was included and ensures that our proof is anchored to a confirmed round.
This is needed to maintain the validity of our proof.

```javascript linenums="86"
--8<-- "samples/sc/AddressValidity.js:86:91"
```

!!! tip

    To optimize performance, consider caching the `BUFFER_TS_OFFSET` and `BUFFER_WINDOW` values instead of retrieving them from the blockchain every time.

### 7. Wait for the Attestation Round to Finalize

You need to wait for the attestation round to finalize, because results are only available after finalization.

```javascript linenums="96"
--8<-- "samples/sc/AddressValidity.js:96:108"
```

Attestation rounds use the [Collect-Choose-Commit-Reveal (CCCR)](../../../tech/state-connector.md#overlapped-cccr-protocol) protocol, which requires 270 - 360 seconds, depending on attestation provider's submissions, and the point inside the **Collect phase** in which the request was submitted.

For this reason, this tutorial polls the State Connector's last finalized round ([`StateConnector.lastFinalizedRoundID`](IStateConnector.md#fn_lastfinalizedroundid_dd862157)) every 10 seconds so that results are obtained as soon as they are available.

!!! note "Polling vs Waiting"

    Polling every 10 seconds is a good tradeoff to minimize the waiting time, but you can choose to always wait the maximum amount of time (360s), or even wait the minimum amount (270s), and then poll.

!!! note "Proof Accessibility Window"

    Proofs are kept on-chain for just a week.
    After this period, the proofs will no longer be accessible, so timely verification is crucial.

!!! note

    The request usually takes anywhere from 3 minutes (180 seconds) to 6 minutes (360 seconds) to be confirmed, which is why we poll `StateConnector.lastFinalizedRoundID` every 10 seconds.
    You may choose to get rid of the polling (`setTimeout`) and just wait for the maximum amount of time.

### 8. Retrieve Proof

It is time now to fetch from the attestation provider the result for the round ID where the request was submitted (`submissionRoundID`).

The result is a Merkle root, which is the root of a [Merkle tree](https://en.wikipedia.org/wiki/Merkle_tree).
This tree has been constructed with the hashes of all the requests received during that round that were considered valid by a majority of attestation providers.

If your request was valid, i.e., if the provided address was a valid Bitcoin address, then its hash will be part of the received Merkle root.

```javascript linenums="111"
--8<-- "samples/sc/AddressValidity.js:111:125"
```

You need to construct a `proofRequest` and make a `POST` request to the [`get-specific-proof`](../../../apis/REST/btcverifier.md) endpoint of the attestation provider.

Doing so returns a full proof, containing, among other things, a Merkle proof consisting of one or more nodes (hashes).
If the Merkle tree is rebuilt using these nodes plus the hash of your request, and the resulting root hash matches the agreed-upon value stored in the State Connector, it means that the proof can be trusted.

You can perform these operations yourself or you can use a Verifier smart contract, as shown in the next step.

The received proof already contains a field, `proof.data.responseBody.isValid`, which indicates whether this particular attestation provider believes the queried address to be valid or not.
But this result cannot be trusted until you verify that it matches what the rest of attestation providers submitted, as explained next.

### 9. Send Proof to Verifier Contract

Send the proof to the [`AddressValidityVerification`](AddressValidityVerification.md) smart contract.
This smart contract verifies the request by rebuilding the Merkle root using the hashes contained in the `proof.data.merkleProof` object and comparing it to the Merkle root stored in the State Connector.

```javascript linenums="134"
--8<-- "samples/sc/AddressValidity.js:134:152"
```

!!! note
    This tutorial uses a verification contract provided by Flare, but dapps can embed the same logic into their own smart contracts if they wish to.

```javascript linenums="132"
--8<-- "samples/sc/AddressValidity.js:132:146"
```

### 10. Check if the Address is Valid

Finally, check if the address is valid or invalid according to the attestation providers, but only if the attestation has been verified.

`isVerified` indicates whether the attestation you received from the attestation provider matches what the majority of them agreed upon.
If the value is `false`, you do not need to look further because the attestation provider is probably lying and its results cannot be trusted.
In this case, you need to make the request again, ideally through a different provider.

If `isVerified` is `true`, then you can look at the actual result of your request in the [`isValid`](AddressValidity.md#response-body) field of `fullProof.data.responseBody` obtained in [step 8](#8-retrieve-proof).
If this value is `true` too, then the queried address is valid.

```javascript linenums="155"
--8<-- "samples/sc/AddressValidity.js:155:168"
```

</div>

## Conclusion

This tutorial has shown how to:

* Make a query to the State Connector smart contract using `stateConnector.requestAttestations()`.
* Get the result from an attestation provider (AP) by making a `POST` request to the provider's API endpoint (`ATTESTATION_ENDPOINT`).
* Use a smart contract (`IAddressValidityVerification`) to verify that the result returned by the attestation provider (`proof`) matches the result agreed upon by the State Connector (`isVerified` is true is a match is found).

The State Connector can be used for a host of other things beyond just verifying address correctness.
The attestation type of the request selects the type of information you want.

```javascript linenums="31"
--8<-- "samples/sc/AddressValidity.js:31:31"
```

Other attestation types include:

* [**Payment**](https://github.com/flare-foundation/state-connector-attestation-types/blob/main/attestation-types/00001-payment.md): Verifies whether a payment transaction occurred in which funds were sent from one address to another address.
* [**Balance-decreasing transaction**](https://github.com/flare-foundation/state-connector-attestation-types/blob/main/attestation-types/00002-balance-decreasing-transaction.md): Verifies whether a transaction that might have decreased a balance occurred.
* [**Referenced payment nonexistence**](https://github.com/flare-foundation/state-connector-attestation-types/blob/main/attestation-types/00004-referenced-payment-nonexistence.md): Verifies whether an account did not receive funds from a different account by a specific deadline.
* [**Confirmed block height**](https://github.com/flare-foundation/state-connector-attestation-types/blob/main/attestation-types/00003-confirmed-block-height-exists.md): Verifies whether a block on a certain height exists and was confirmed.

More attestation types are to be added in the future, subject to community approval and support.

Also, recall that the [`AddressValidity`](AddressValidity.md) attestation type used in this tutorial is the simplest one to use as it does not require accessing any connected networks.
Other attestation types do, however, and so they tend to be more complex to use.

See the [state connector attestation types](../../../apis/attestation-types/index.md) for more information on other attestation types.
