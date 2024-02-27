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

Requests to the SC must be extremely specific. For example, to request proof of the existence of a given transaction, the transaction ID is not enough: the block number and block timestamp where the transaction was included must also be given.
Furthermore, requests must be encoded into a hex string before being submitted to the SC.

You can perform all these operations yourself, but, as a convenience, attestation providers can prepare requests for you, filling in all missing information and taking care of formatting.

The attestation type chosen for this tutorial, [`AddressValidity`](../../../apis/attestation-types/AddressValidity.md), is the simplest one and does not require additional information besides the address being validated.
However, it is still a good example of the process.

To prepare a request using an attestation provider, begin with a raw attestation request:

```javascript linenums="29"
--8<-- "samples/sc/AddressValidity.js:29:36"
```

Key points about the block of code above:

* `attestationType`: A unique identifier for the type of attestation you want, which is just an encoded version of its name. View a list of available [attestation types](../../../apis/attestation-types/index.md).
* `sourceId`: The network on which you want to make the request. Available networks depend on the attestation type and are listed in the documentation of each one. This example uses a test network (Coston) so network names are prepended with `test`.
* `requestBody`: A JSON object specific to each attestation type. In this example, it is just the address that you want to validate.

Then obtain an encoded attestation request:

```javascript linenums="44"
--8<-- "samples/sc/AddressValidity.js:44:52"
```

Key points about the block of code above:

* It makes a simple `POST` request to the [`prepareRequest`](../../../apis/REST/btcverifier.md) endpoint.
* `ATTESTATION_PROVIDER_API_KEY` is the API key of the chosen attestation provider, which typically costs money to use.
* `encodedAttestationRequest` is the returned encoded request that will be submitted to the SC.

Note that attestation providers are typically paid services and require an API key to be used.
Flare offers free-to-use APs for testing. These are rate-limited and not suitable for production.

### 3. Access the Contract Registry

The [`FlareContractRegistry`](FlareContractRegistry.md) contains the current addresses for all Flare smart contracts, and it is [the only recommended way](../../getting-started/contract-addresses.md) to retrieve them.

```javascript linenums="63"
--8<-- "samples/sc/AddressValidity.js:63:67"
```

Its address is the same on all of [Flare's networks](../../../tech/flare.md#flare-networks), and it is the only Flare address that needs to be hard-coded into any program.

### 4. Retrieve the State Connector Contract Address

```javascript linenums="70"
--8<-- "samples/sc/AddressValidity.js:70:76"
```

Use the [`getContractAddressByName()`](FlareContractRegistry.md#fn_getcontractaddressbyname_82760fca) method from the [`FlareContractRegistry`](FlareContractRegistry.md) to retrieve the address of the [`State Connector`](state-connector.md).

Note that this tutorial uses the Coston testnet here rather than the main Flare Network.

### 5. Request Attestation from the State Connector Contract

Now, request an attestation from the SC contract by sending the encoded attestation request to it.

```javascript linenums="80"
--8<-- "samples/sc/AddressValidity.js:80:84"
```

Key points about the block of code above:

* `attestationTx` is the returned transaction ID.
* You then wait for the request to be submitted and obtain a receipt in `receipt`.
* Finally, you retrieve the block where the transaction was accepted from the confirmation receipt in `block`.

### 6. Calculate Round ID

```javascript linenums="87"
--8<-- "samples/sc/AddressValidity.js:87:91"
```

Now, determine the attestation round ID where the request was accepted (`submissionRoundID`).
This calculation is based on the timestamp of the block where the transaction was included and will be required later to retrieve the proof, once it is available.

!!! tip

    To optimize performance, consider caching the `BUFFER_TS_OFFSET` and `BUFFER_WINDOW` values instead of retrieving them from the blockchain every time.

### 7. Wait for the Attestation Round to Finalize

Now wait for the Attestation Round to finalize, results are only available after finalization.

```javascript linenums="95"
--8<-- "samples/sc/AddressValidity.js:96:108"
```

Attestation rounds happen in four 90-second phases (6 minutes in total), known as the [Collect-Choose-Commit-Reveal (CCCR)](../../../tech/state-connector.md#overlapped-cccr-protocol) phases.
However, the request might have been submitted at any time during the **Collect phase**, so the results might be available earlier than 6 minutes.
For this reason, the State Connector's last finalized round ([`StateConnector.lastFinalizedRoundID`](IStateConnector.md#fn_lastfinalizedroundid_dd862157)) is polled every 10 seconds so that results are obtained as soon as they are available.

!!! note
    #### Proof Accessibity Window

    Proofs are kept on-chain for just a week.
    After this period, the proofs will no longer be accessible.

!!! note
    #### Polling vs Waiting

    The amount of time you need to wait depends on the moment in the
    [Collect phase](../../../tech/state-connector.md#overlapped-cccr-protocol)
    where the request was performed, and it can range from 3 phases (270s) to 4 phases (360s).
    Polling every 10 seconds is a good tradeoff to minimize the waiting time, but you can choose to always wait the maximum amount of time (360s), or even wait the minimum amount (270s)
    and then poll.

### 8. Retrieve Proof

Obtain the full proof for the submission round (`submissionRoundID`) from the attestation provider.

```javascript linenums="111"
--8<-- "samples/sc/AddressValidity.js:111:125"
```

This full proof (Attestation Proof) provides the proofs for a potentially unlimited number of requests (including yours) made during the same attestation round, encoded in a single hash (Merkle root).
So to check whether this hash validates your request or not, you need to rebuild the Merkle tree.

After constructing a `proofRequest`, you make a `POST` request to the [`get-specific-proof`](../../../apis/REST/btcverifier.md) API endpoint which returns the full proof as a response.
Notably, the proof object's Merkle proof (`proof.data.merkleProof`) property consists of one or more Merkle nodes (hashes).
If the tree is rebuilt using these nodes and the root hash matches the agreed-upon value stored in the SC, it means that the proof is correct and the answer can be trusted.
You can use a Verifier smart contract for this instead of handling it by yourself, as shown in the next step.

### 9. Send Proof to Verifier Contract

Now send the proof to an [`addressVerifier`](AddressValidityVerification.md) smart contract for verification.
This smart contract verifies the request by rebuilding the Merkle tree using the hashes returned in the `proof.data.merkleProof` object and comparing them to the Merkle root stored in the SC smart contract.

```javascript linenums="134"
--8<-- "samples/sc/AddressValidity.js:134:152"
```

This tutorial uses [one of Flare's](AddressValidityVerification.md) verification contracts, but dapps can embed the same logic into their own smart contracts if they wish to.

### 10. Check if the Address is Valid

Finally, check if the address is valid or invalid according to the attestation providers, but only after your attestation has been verified.
Here's how this works:

* `isVerified` tells you whether the attestation has been successfully verified.
    If it is `false`, there is no need to look further, since the attestation provider is
    probably lying and its results cannot be trusted. You need to perform the request
    again.
* If `isVerified` is `true`, then you can look at the actual result of your request, in the
    [`isValid`](AddressValidity.md#response-body) field of `fullProof.data.responseBody` obtained in step 8. 
    If this is `true`, then your address is valid.

```javascript linenums="153"
--8<-- "samples/sc/AddressValidity.js:156:167"
```

</div>

## Conclusion

This tutorial has shown how to:

* Make a query to the State Connector smart contract using `stateConnector.requestAttestations()`.
* Get the result from an attestation provider by making a `POST` request to the attestation provider's [`get-specific-proof`](../../../apis/REST/btcverifier.md) API endpoint.
* Use a smart contract ([`AddressValidityVerification`](AddressValidityVerification.md)) to verify that the result returned by the attestation provider (`proof`) matches the result agreed upon by the State Connector (`isVerified` is `true` if the proof is correct).
* Check the answer to your query ([`isValid`](AddressValidity.md#response-body)) after verifying that `isVerified` is `true`.

The State Connector can be used for a host of other things beyond just verifying address correctness.

```javascript linenums="30"
--8<-- "samples/sc/AddressValidity.js:30:36"
```

The `attestationType` property of the attestation request object (`rawAttestationRequest`) is used to select the desired type of attestation.

Other attestation types include:

* [**Payment**](../../../apis/attestation-types/Payment.md): Verifies whether a payment transaction occurred in which funds were sent from one address to another address.
* [**Balance-decreasing transaction**](../../../apis/attestation-types/BalanceDecreasingTransaction.md): Verifies whether a transaction that might have decreased a balance occurred.
* [**Referenced payment nonexistence**](../../../apis/attestation-types/ReferencedPaymentNonexistence.md): Verifies whether an account did not receive funds from a different account by a specific deadline.
* [**Confirmed block height**](../../../apis/attestation-types/ConfirmedBlockHeightExists.md): Verifies whether a block on a certain height exists and was confirmed.

More attestation types are to be added in the future, subject to community approval and support.

Also, recall that the [`AddressValidity`](../../../apis/attestation-types/AddressValidity.md) attestation type used in this tutorial is the simplest one to use as it does not require accessing any connected networks.
Other attestation types do, however, and so tend to be more complex to use.

See the [state-connector-attestation-types repository](../../../apis/attestation-types/index.md) for more information on other attestation types.