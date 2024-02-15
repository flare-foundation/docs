# Simple Attestation Request

Introduction: What this tutorial is going to show, link to the State Connector concept page. List of things you will learn from this tutorial.

Use diagram from https://docs.google.com/presentation/d/1BM1OurenafpbId5SPR35tLo_EcQd7v4F-sGa7DSUZwY/edit?pli=1#slide=id.g13a80eaeff0_0_0
(The numbers need to be updated to match this tutorial. Then it needs to be exported to PNG and all whitespace trimmed.)

## Code

{% import "runner.md" as runner %}

{{ runner.js(folder="sc/", filename="AddressValidity", requiresWallet='true', params=[
  {"name": "Network (e.g. btc, eth)", "value": "btc"},
  {"name": "Address to Verify", "value":"tb1p4mdyx3dvgk4dhvv8yv2dtuymf00wxhgkkjheqm7526fu7znnd6msw3qxvj"}
  ]) }}

<script>
--8<-- "samples/sc/AddressValidity.js::155"
</script>

<div class="tutorial" markdown>

## Tutorial

### 1. Setup

Import required dependencies.
Explain that this tutorial needs to send transactions, so it needs an account with funds.
Explain how to get test funds on Coston2.
Explain that when running from a browser, an account can be retrieved from a connected wallet.
For these docs, an auxiliary script called [`connect_wallet.js`](/assets/javascripts/connect_wallet.js) takes care of that.
Explain tha when running from Node.js, for simplicity, the private key of the account to use is hardcoded in the `TEST_PRIVATE_KEY` variable but this is obviously not a good practice.

### 2. Prepare Attestation Request

Requests are complex and require a lot of information, so we use the AP to build a request for us.
In this particular case, where we're making an AddressValidity request, the request is NOT complicated, but others are.
We provide a raw attestation request and obtain an encoded attestation request.
Explain that providers will typically be paid services and require an API key.

### 3. Access the Contract Registry

Obtain the Flare Contract Registry, which provides all other Flare contract addresses directly from on-chain.
As done in the FTSO tutorial and explained in the [Contract Addresses](../../getting-started/contract-addresses.md) page.

### 4. Retrieve the State Connector Contract Address

Retrieve the State Connector's address from the registry.

### 5. Request Attestation from the State Connector Contract

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
