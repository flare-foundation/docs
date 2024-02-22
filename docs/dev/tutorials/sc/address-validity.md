# Simple Attestation Request

This tutorial shows basic use of the [State Connector](https://docs.flare.network/tech/state-connector/) (SC) protocol.

In this tutorial, you will learn how to:

* Make a query to the State Connector smart contract.
* Get the result from an Attestation Provider (AP).
* Use a smart contract to verify that the result returned by the attestation provider matches the result agreed upon by the State Connector.

<figure markdown>
  ![State Connector schematic diagram.](SC-basic-tutorial.png){ loading=lazy .allow-zoom }
  <figcaption>State Connector schematic diagram.</figcaption>
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

```javascript linenums="20"
--8<-- "samples/sc/AddressValidity.js:20:24"
```

The Periphery Package simplifies working with the Flare smart contracts significantly.
If you remove this dependency, you must manually provide the signatures for all the methods you want to use.

This tutorial needs to send transactions on the Coston test network, so an account with enough `$CFLR` tokens to pay for gas is required.
The [Getting Started](../../getting-started/setup/index.md) guides explain how to configure your wallet and get test tokens from the [faucet](https://faucet.flare.network/coston2).

!!! warning
    For simplicity, this tutorial hard-codes the private key of the wallet being used in the `TEST_PRIVATE_KEY` variable.

    ```javascript linenums="8"
    --8<-- "samples/sc/AddressValidity.js:8:8"
    ```

    In a production setting, the private key should be retrieved from an external source (such as a [`.env` file]((https://www.npmjs.com/package/dotenv))) and NOT embedded directly in the code.

### 2. Prepare Attestation Request

Requests to the SC must be extremely specific. For example, to request proof of the existence of a given transaction, the transaction ID is not enough: the block and block timestamp where the transaction was included must also be given.
Furthermore, requests must be encoded into a hex string before being submitted to the SC.

You can perform all these operations yourself, but, as a convenience, attestation providers can prepare requests for you, filling in all missing information and taking care of formatting.

The attestation type chosen for this tutorial, `AddressValidity`, is the simplest one and does not require additional information besides the address being validated. However, it is still a good example of the process.

To prepare a request using an Attestation Provider, we begin with a raw attestation request:

```javascript linenums="28"
--8<-- "samples/sc/AddressValidity.js:28:34"
```

Then obtain an encoded attestation request:

```javascript linenums="39"
--8<-- "samples/sc/AddressValidity.js:39:46"
```

This encoded request is what will be submitted to the SC.

Note that attestation providers will typically be paid services and require an API key to be used.
Flare offers free-to-use APs for testing. These are rate-limited and not suitable for production.

### 3. Access the Contract Registry

The [`FlareContractRegistry`](FlareContractRegistry.md) contains the current addresses for all Flare smart contracts, and it is [the only recommended way](../../getting-started/contract-addresses.md) to retrieve them.

Its address is the same on all of [Flare's networks](../../../tech/flare.md#flare-networks), and it is the only Flare address that needs to be hard-coded into any program.

```javascript linenums="56"
--8<-- "samples/sc/AddressValidity.js:56:59"
```

### 4. Retrieve the State Connector Contract Address

Retrieve the State Connector's address from the `FlareContractRegistry`.

```javascript linenums="61"
--8<-- "samples/sc/AddressValidity.js:62:67"
```

Note that we are using the Coston testnet here rather than the main Flare Network.

### 5. Request Attestation from the State Connector Contract

Now we request an attestation from the SC.

We retrieve the result of the transaction to the `result` object and store info regarding the relevant block in `block`.

```javascript linenums="70"
--8<-- "samples/sc/AddressValidity.js:71:74"
```

### 6. Calculate Round ID

Now we need to determine the attestation round ID where our request was accepted (`submissionRoundID`). This calculation is based on the timestamp of the block where the transaction was included and ensures that our proof is anchored to a confirmed round.
This is needed to maintain the validity of our proof.

```javascript linenums="77"
--8<-- "samples/sc/AddressValidity.js:77:82"
```

!!! tip

    To optimize performance, consider caching the `BUFFER_TS_OFFSET` and `BUFFER_WINDOW` values instead of retrieving them from the blockchain every time.

### 7. Wait for the Attestation Round to Finalize

Here, we wait for the attestation round to be finalized on the Flare Network to ensure that our attestation request is processed and included in a finalized round (i.e. block).
This is done to sync our process with Flare Network's round finalization, maintaining the validity of our proof.

**Round Finalization** occurs when a round is confirmed and accepted by the network as an immutable part of the blockchain’s history.

To this end, after submitting the attestation request, we monitor the network until our request is confirmed. This is done by continuously polling and comparing the State Connector's last finalized round (`StateConnector.lastFinalizedRoundID`) with our submission round (`submissionRoundID`) until there's a match, indicating that our proof has been included in a finalized block.

```javascript linenums="85"
--8<-- "samples/sc/AddressValidity.js:85:96"
```

!!! warning

    Proofs are kept on-chain for just a week.
    After this period, the proofs will no longer be accessible, so timely verification is crucial.

!!! note

    The request usually takes anywhere from 3 minutes (180 seconds) to 6 minutes (360 seconds) to be confirmed, which is why we poll `StateConnector.lastFinalizedRoundID` every 10 seconds.
    You may choose to get rid of the polling (`setTimeout`) and just wait for the maximum amount of time.

### 8. Retrieve Proof

Now we obtain the full proof (which should now be available) from the attestation provider for our submission round (`submissionRoundID`). This proof (Attestation Proof) includes valid answers to our request and all other requests made during the same attestation round, encoded in a single Merkle root. This is essential for verifying the validity of our attestation.

After constructing our `proofRequest` and making a `POST` request to our `ATTESTATION_ENDPOINT`, we receive our proof as a response. Notably, the proof object's Merkle proof (`proof.data.merkleProof`) property consists of one or more Merkle nodes (hashes) that collectively prove the inclusion of our request in the attestation round.

```javascript linenums="99"
--8<-- "samples/sc/AddressValidity.js:99:118"
```

### 9. Send Proof to Verifier Contract

Now we send the proof to an `addressVerifier` smart contract for verification. This smart contract verifies whether our request is valid or not by comparing our proof to the Merkle root stored in the SC smart contract.

In this tutorial, we used the [`IAddressValidityVerification`](https://coston-explorer.flare.network/address/0x6493D7c0e4d81a73873067d14dfBFfaade072c5a/contracts#address-tabs) smart contract but most apps use their own smart contracts for this verification.

```javascript linenums="122"
--8<-- "samples/sc/AddressValidity.js:122:136"
```

### 10. Check if the Address is Valid

Finally, we check if our address is valid or invalid according to the attestation providers, given that our request was found to be valid. Meaning if our attestation request is found to be valid by our `addressVerifier` smart contract, we then check whether or not the address provided is a valid one (represented by `isValid`).

```javascript linenums="139"
--8<-- "samples/sc/AddressValidity.js:139:143"
```

</div>

## Conclusion

In this tutorial, we have learned how to:

* Check the validity of a wallet address using the SC smart contract and an attestation provider.
* Verify whether or not the result from the SC matches that from the AP via the use of a smart contract.

The State Connector can be used for a host of other things beyond just verifying wallet addresses, such as:

* [**Payment**](https://github.com/flare-foundation/state-connector-attestation-types/blob/main/attestation-types/00001-payment.md): Verifying whether a payment transaction occurred in which funds were sent from one address to another address.
* [**Balance-decreasing transaction**](https://github.com/flare-foundation/state-connector-attestation-types/blob/main/attestation-types/00002-balance-decreasing-transaction.md): Verifying whether a transaction that might have decreased a balance occurred.
* [**Referenced payment nonexistence**](https://github.com/flare-foundation/state-connector-attestation-types/blob/main/attestation-types/00004-referenced-payment-nonexistence.md): Verifying whether an account did not receive funds from a different account by a specific deadline.
* [**Confirmed block height**](https://github.com/flare-foundation/state-connector-attestation-types/blob/main/attestation-types/00003-confirmed-block-height-exists.md): Verifying whether a block on a certain height exists and was confirmed.

More attestation types are to be added in the future, subject to community approval and support.

Also, recall that the `AddressValidity` attestation type used in this tutorial is the simplest one to use as it does not require accessing any connected networks.
Other attestation types do, however, and so tend to be more complex to use.

See the [state-connector-attestation-types repository](https://github.com/flare-foundation/state-connector-attestation-types) for more information on other attestation types.