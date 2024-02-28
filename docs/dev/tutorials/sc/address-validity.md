# Simple Attestation Request

This tutorial shows basic use of the [State Connector](../../../tech/state-connector.md) (SC) protocol.

In this tutorial, you will learn how to:

* Make a query to the State Connector smart contract.
* Get the result from an attestation provider (AP).
* Use a smart contract to verify that the result returned by the attestation provider matches the result agreed upon by the State Connector.

The diagram below shows the process that this tutorial follows.
It is the same process given in the [State Connector page](../../../tech/state-connector.md#procedure-overview), but the numbers have been changed to match the steps in this tutorial.

<figure markdown>
  ![State Connector usage process](SC-basic-tutorial.png){ loading=lazy .allow-zoom }
  <figcaption>State Connector usage process</figcaption>
</figure>

## Code

Choose your preferred programming language and ensure you have a working [development environment](../../getting-started/setup/index.md).

For easy navigation, numbered comments in the source code link to the tutorial sections below.

{% import "runner.md" as runner %}

{{ runner.js(folder="sc/", filename="AddressValidity", params=[
  {"name": "Network (e.g. btc, eth)", "value": "btc"},
  {"name": "Address to Verify", "value":"tb1p4mdyx3dvgk4dhvv8yv2dtuymf00wxhgkkjheqm7526fu7znnd6msw3qxvj"}
]) }}

<div class="tutorial" markdown>

## Tutorial

### 1. Setup

The tutorial uses the following dependencies:

* The [Flare Periphery Artifacts Package](https://www.npmjs.com/package/@flarenetwork/flare-periphery-contract-artifacts) which provides the API for all Flare smart contracts.

* The [ethers](https://www.npmjs.com/package/ethers) package, which is also needed to work with smart contracts.

* The `utils.js` file, which provides auxiliary functions that simplify working with the State Connector.

```javascript linenums="20"
--8<-- "samples/sc/AddressValidity.js:20:24"
```

The Periphery Package simplifies working with the Flare smart contracts significantly.
If you remove this dependency, you must manually provide the signatures for all the methods you want to use.

This tutorial needs to send transactions on the Coston test network, so an account with enough `$CFLR` tokens to pay for gas is required.
The [Getting Started](../../getting-started/setup/index.md) guides explain how to configure your wallet and get test tokens from the [faucet](https://faucet.flare.network/coston).

!!! warning
    For simplicity, this tutorial hard-codes the private key of the wallet being used in the `TEST_PRIVATE_KEY` variable.

    ```javascript linenums="8"
    --8<-- "samples/sc/AddressValidity.js:8:9"
    ```

    In a production setting, the private key should be retrieved from an external source (such as a [`.env` file](https://www.npmjs.com/package/dotenv)) and NOT embedded directly in the code.

### 2. Prepare Attestation Request

Requests to the State Connector must be extremely specific.
For example, to request proof of the existence of a given transaction, the transaction ID is not enough: the block number and block timestamp where the transaction was included must also be given.
Furthermore, requests must be encoded into a hex string before being submitted to the SC.

You can perform all these operations yourself, but, as a convenience, attestation providers can prepare requests for you, filling in all missing information and taking care of formatting.

The attestation type chosen for this tutorial, [`AddressValidity`](AddressValidity.md), is the simplest one and does not require additional information besides the address being validated.
However, it is still a good example of the process.

To prepare a request using an attestation provider, begin with a raw attestation request:

```javascript linenums="29"
--8<-- "samples/sc/AddressValidity.js:29:36"
```

The raw attestation request contains:

* `attestationType`: A unique identifier for the type of attestation you want, which is just an encoded version of its name.
    See the list of the currently available [attestation types](../../../apis/attestation-types/index.md).
* `sourceId`: The network on which you want to make the request.
    Available networks depend on the attestation type and are listed in the documentation of each one.
    This example uses a test network (Coston) so network names are prepended with `test`.
* `requestBody`: A JSON object specific to each attestation type.
    In this example, it is just the address that you want to validate.

Then obtain an encoded attestation request:

```javascript linenums="44"
--8<-- "samples/sc/AddressValidity.js:44:52"
```

This is a simple `POST` request to the [`prepareRequest`](../../../apis/REST/btcverifier.md) endpoint of the attestation provider, using the standard [`fetch` API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

`ATTESTATION_PROVIDER_API_KEY` is the API key of the chosen attestation provider, if it needs one.
These are typically paid services and require an API key to operate.

Finally, `encodedAttestationRequest` is the returned encoded request ready to be submitted to the State Connector.

### 3. Access the Contract Registry

The [`FlareContractRegistry`](FlareContractRegistry.md) contains the current addresses for all Flare smart contracts, and it is [the only recommended way](../../getting-started/contract-addresses.md) to retrieve them.

```javascript linenums="63"
--8<-- "samples/sc/AddressValidity.js:63:67"
```

Its address is the same on all of [Flare's networks](../../../tech/flare.md#flare-networks), and it is the only Flare address that needs to be hard-coded into any program.

### 4. Retrieve State Connector Contract Address

```javascript linenums="70"
--8<-- "samples/sc/AddressValidity.js:70:76"
```

Use the [`getContractAddressByName()`](FlareContractRegistry.md#fn_getcontractaddressbyname_82760fca) method from the [`FlareContractRegistry`](FlareContractRegistry.md) to retrieve the address of the [`StateConnector`](IStateConnector.md) smart contract.

Note that this tutorial uses the Coston testnet here rather than the main Flare Network.

### 5. Request Attestation from State Connector Contract

Now, request an attestation from the SC contract by sending the encoded attestation request from [step 2](#2-prepare-attestation-request).

Use the [`requestAttestations()`](IStateConnector.md#fn_requestattestations_f64b6fda) method from the [`StateConnector`](IStateConnector.md) smart contract.

```javascript linenums="80"
--8<-- "samples/sc/AddressValidity.js:80:84"
```

`attestationTx` contains the [`TransactionResponse`](https://docs.ethers.org/v5/api/providers/types/#providers-TransactionResponse).
Once you `wait` on it and the transaction gets included in the blockchain, you obtain a [`TransactionReceipt`](https://docs.ethers.org/v5/api/providers/types/#providers-TransactionReceipt).

From this receipt you finally retrieve the `block` that includes the request transaction.
This is needed in the next step.

### 6. Calculate Round ID

Later, when you retrieve the result of the attestation, you will need to provide the _Round ID_, which is calculated from the timestamp of the block including the request.

```javascript linenums="87"
--8<-- "samples/sc/AddressValidity.js:87:91"
```

Attestation rounds happen every `BUFFER_WINDOW` seconds, starting `BUFFER_TS_OFFSET` seconds after the [Unix epoch](https://en.wikipedia.org/wiki/Unix_time).

`submissionRoundID` now contains the round ID for your request, which you will use later once the result is available.

!!! tip

    To optimize performance, consider caching the `BUFFER_TS_OFFSET` and `BUFFER_WINDOW` values instead of retrieving them from the blockchain every time.

### 7. Wait for Attestation Round to Finalize

You need to wait for the attestation round to finalize, because results are only available after finalization.

```javascript linenums="96"
--8<-- "samples/sc/AddressValidity.js:96:108"
```

Attestation rounds use the [Collect-Choose-Commit-Reveal (CCCR)](../../../tech/state-connector.md#overlapped-cccr-protocol) protocol, which requires anything between 270 and 360 seconds, depending on attestation provider's submissions, and the point inside the **Collect phase** in which the request was submitted.

For this reason, this tutorial polls the State Connector's last finalized round ([`StateConnector.lastFinalizedRoundID`](IStateConnector.md#fn_lastfinalizedroundid_dd862157)) every 10 seconds so that results are obtained as soon as they are available.

!!! note "Polling vs Waiting"

    Polling every 10 seconds is a good tradeoff to minimize the waiting time, but you can choose to always wait the maximum amount of time (360s), or even wait the minimum amount (270s) and then poll.

!!! note "Proof Accessibility Window"

    Proofs are kept on-chain for just a week.
    After this period, the proofs will no longer be accessible.

### 8. Retrieve Proof

It is time now to fetch from the attestation provider the result for the round ID where the request was submitted (`submissionRoundID`).

The result is a Merkle root, this is, the root of a [Merkle tree](https://en.wikipedia.org/wiki/Merkle_tree).
This tree has been constructed with the hashes of all the requests received during that round that were considered valid by a majority of attestation providers.

If your request was valid, i.e., if the provided address was a valid Bitcoin address, then its hash will be part of the received Merkle root.

```javascript linenums="111"
--8<-- "samples/sc/AddressValidity.js:111:125"
```

You need to construct a `proofRequest` and make a `POST` request to the [`get-specific-proof`](../../../apis/REST/btcverifier.md) endpoint of the attestation provider.

This will return a full proof, containing, among other things, a Merkle proof consisting of one or more nodes (hashes).
If the Merkle tree is rebuilt using these nodes plus the hash of your request, and the resulting root hash matches the agreed-upon value stored in the State Connector, it means that the proof can be trusted.

You can perform these operations yourself, or you can use a Verifier smart contract, as shown in the next step.

The received proof already contains a field, `proof.data.responseBody.isValid`, telling whether this particular attestation provider believes the queried address to be valid or not.
But this result cannot be trusted until you verify that it matches what the rest of attestation providers submitted, as explained next.

### 9. Send Proof to Verifier Contract

Send the proof to the [`AddressValidityVerification`](AddressValidityVerification.md) smart contract.
This smart contract verifies the request by rebuilding the Merkle root using the hashes contained in the `proof.data.merkleProof` object, and comparing it to the Merkle root stored in the State Connector.

```javascript linenums="134"
--8<-- "samples/sc/AddressValidity.js:134:152"
```

!!! note
    This tutorial uses a verification contract provided by Flare, but dapps can embed the same logic into their own smart contracts if they wish to.

`isVerified` is the final piece that you need to answer the original request.

### 10. Check if Address is Valid

Finally, check if the address is valid or invalid according to the attestation providers, but only if the attestation has been verified.

`isVerified` tells you whether the attestation you received from the attestation provider matches what the majority of them agreed upon.
If it is `false`, there is no need to look further, since the attestation provider is probably lying and its results cannot be trusted.
In this case, you need to perform the request again, ideally through a different provider.

If `isVerified` is `true`, then you can look at the actual result of your request, in the [`isValid`](AddressValidity.md#response-body) field of `fullProof.data.responseBody` obtained in [step 8](#8-retrieve-proof).
If this is `true` too, then the queried address is valid.

```javascript linenums="156"
--8<-- "samples/sc/AddressValidity.js:156:167"
```

</div>

## Conclusion

This tutorial has shown how to:

* Prepare a State Connector request by making a `POST` request to an attestation provider's [`prepareRequest`](../../../apis/REST/btcverifier.md) endpoint.
* Make a query to the State Connector smart contract using [`requestAttestations()`](IStateConnector.md#fn_requestattestations_f64b6fda).
* Get the result from an attestation provider by making a `POST` request to the attestation provider's [`get-specific-proof`](../../../apis/REST/btcverifier.md) endpoint.
* Use a smart contract like [`AddressValidityVerification`](AddressValidityVerification.md) to verify that the result returned by the attestation provider matches the value agreed upon by the rest of attestation providers.
* Only if the result is verified, check the answer to your request ([`isValid`](AddressValidity.md#response-body)).

## Next Steps

The State Connector can be used for a host of other things beyond just verifying address correctness.

The `attestationType` property of the attestation request object in [step 2](#2-prepare-attestation-request) is used to select the desired type of attestation.
In this tutorial, it is:

```javascript linenums="31"
--8<-- "samples/sc/AddressValidity.js:31:31"
```

Other attestation types include:

* [**Payment**](Payment.md): Verifies whether a payment transaction occurred in which funds were sent from one address to another address.
* [**Balance-decreasing transaction**](BalanceDecreasingTransaction.md): Verifies whether a transaction that might have decreased a balance occurred.
* [**Referenced payment nonexistence**](ReferencedPaymentNonexistence.md): Verifies whether an account did not receive funds from a different account by a specific deadline.
* [**Confirmed block height**](ConfirmedBlockHeightExists.md): Verifies whether a block on a certain height exists and was confirmed.

More attestation types are to be added in the future, subject to community approval and support.

Also, recall that the [`AddressValidity`](AddressValidity.md) attestation type used in this tutorial is the simplest one to use as it does not require accessing any connected networks.
Other attestation types do, however, and so tend to be more complex to use.

See the [state connector attestation types](../../../apis/attestation-types/index.md) for more information on other attestation types.