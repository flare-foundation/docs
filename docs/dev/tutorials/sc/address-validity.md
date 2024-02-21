# Simple Attestation Request

This tutorial shows basic use of the [State Connector](https://docs.flare.network/tech/state-connector/) (SC) protocol.

In this tutorial, you will learn how to:

* Make a query to the State Connector.
* Get the result from an Attestation Provider (AP).

Use diagram from https://docs.google.com/presentation/d/1BM1OurenafpbId5SPR35tLo_EcQd7v4F-sGa7DSUZwY/edit?pli=1#slide=id.g13a80eaeff0_0_0
(The numbers need to be updated to match this tutorial. Then it needs to be exported to PNG and all whitespace trimmed.)

## Code

Choose your preferred programming language and ensure you have a working [development environment](../../getting-started/setup/index.md).

For easy navigation, numbered comments in the source code link to the tutorial sections below.

{% import "runner.md" as runner %}

{{ runner.js(folder="sc/", filename="AddressValidity", requiresWallet='true', params=[
  {"name": "Network (e.g. btc, eth)", "value": "btc"},
  {"name": "Address to Verify", "value":"tb1p4mdyx3dvgk4dhvv8yv2dtuymf00wxhgkkjheqm7526fu7znnd6msw3qxvj"}
  ]) }}

<div class="tutorial" markdown>

## Tutorial

### 1. Setup

The tutorial uses the following dependencies:

* The [Flare Periphery Artifacts Package](https://www.npmjs.com/package/@flarenetwork/flare-periphery-contract-artifacts) which provides the API for all Flare smart contracts.

* The [ethers](https://www.npmjs.com/package/ethers) package, which is also needed to work with smart contracts.

```javascipt
--8<-- "samples/sc/AddressValidity.js:20:24"
```

The Periphery Package simplifies working with the Flare smart contracts significantly.
If you remove this dependency, you must manually provide the signatures for all the methods you want to use.

This tutorial needs you to send transactions, so an account with enough tokens to pay for gas is required.

The [Getting Started](../../getting-started/setup/index.md) guides explain how to comfigure your wallet and get test tokens from the [faucet](https://faucet.flare.network/).

!!! warning
    The private key of the wallet being used is hardcoded in the `TEST_PRIVATE_KEY` variable in `AddressValidity.js`.

    ```javascipt
    --8<-- "samples/sc/AddressValidity.js:8:8"
    ```

    This was done strictly for the sake of keeping the tutorial simple.

    In a real setting, your private key should be retrieved from an external source (such as a `.env` file) and not embedded directly in the code.

### 2. Prepare Attestation Request

Requests are quite complex and require a lot of information, which is why use the AP to build them.

For this tutorial, we're making an AddressValidity request, which is much simpler than other requests.

To do so, we provide a raw attestation request:

```javascript
--8<-- "samples/sc/AddressValidity.js:27:33"
```

And obtain an encoded attestation request:

```javascript
--8<-- "samples/sc/AddressValidity.js:46:46"
```

Note that Attestation Providers will typically be paid services and require an API key to be used.

Flare offers free-to-use APs for testing. These are rate-limited and not suitable for production.

### 3. Access the Contract Registry

The [`FlareContractRegistry`](FlareContractRegistry.md) contains the current addresses for all Flare smart contracts, and it is [the only recommended way](../../getting-started/contract-addresses.md) to retrieve them.

Its address is the same on all of [Flare's networks](../../../tech/flare.md#flare-networks), and it is the only Flare address that needs to be hard-coded into any program.

```javascript
--8<-- "samples/sc/AddressValidity.js:55:58"
```

### 4. Retrieve the State Connector Contract Address

Retrieve the State Connector's address from the `FlareContractRegistry`.

```javascript
--8<-- "samples/sc/AddressValidity.js:61:66"
```

Note that we're using the Coston testnet here rather than the main Flare Network.

### 5. Request Attestation from the State Connector Contract

Now we request an attestation from the SC.

We retrieve the result of the transaction to the `result` object and store info regarding the relevant block in  `block`.

```javascript
--8<-- "samples/sc/AddressValidity.js:70:73"
```

### 6. Calculate Round ID

We need to find out the attestation round ID where our request was accepted, based on the timestamp of the block where the tx was included.
BUFFER_TIMESTAMP_OFFSET and BUFFER_WINDOW should be cached instead of retrieved from the blockchain every time.

### 7. Wait for the Attestation Round to Finalize

CODE NEEDS UPDATING!
Instead of waiting a fix amount, poll `StateConnector.lastFinalizedRoundId` until it matches our round ID.
Talk also about how proofs are only kept on chain for a week.

### 8. Retrieve Proof

Retrieve proof from Attestation Provider.

Retrieve full proof from attestation provider for the round where
we made the request. This should be available now.
The proof will include our request and all other requests made
during that round, encoded in a single Merkle root.

### 9. Send Proof to Verifier Contract

Use an example smart contract that will compare the obtained proof to the Merkle root in the State Connector smart contract, to see if our original request was valid (true) or not.
Explain that apps will typically use their own smart contracts to do this verification.
Provide the link to the block explorer showing the code of the verifier contract.

</div>

## Conclusion

Repeat what we have learned in this tutorial.
List other things that can be done with the State Connector.
Remind reader that, for simplicity, this tutorial used the `AddressValidity` attestation type which does not require accessing connected networks.
Link to Attestation Types repo, where readers can learn how to do other types of attestations.