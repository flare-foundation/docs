# Developer Docs

!!! info inline end "Quick links"

    * Main code repositories:

        [Validator node](https://github.com/flare-foundation/flare),
        [Smart contracts](https://gitlab.com/flarenetwork/flare-smart-contracts)

    * Data provider:

        [NPM Kickoff package](https://www.npmjs.com/package/@flarenetwork/ftso_price_provider_kick_off_package),
        [Reference implementation](https://github.com/flare-foundation/FTSO-price-provider)

    * Explorers:

        [Flare](https://flare-explorer.flare.network),
        [Songbird](https://songbird-explorer.flare.network),
        [Coston](https://coston-explorer.flare.network)

    * [Discord](https://discord.com/invite/XqNa7Rq)

## Flare and the EVM

The Songbird and Flare networks runs the Ethereum EVM, which means that Ethereum contracts and tools can be used to develop on top of these chains.
Both networks are layer 1 networks, and are running independently of main-net Ethereum.

All existing tools and technologies available for Ethereum can be leveraged on Songbird and Flare.
The main infrastructure ([FTSO](glossary.md#ftso), [State Connector](glossary.md#state_connector), ...) is written in Solidity using standard tools: ethers, web3, hardhat.

## FAQ

### How can I interact with Flare's networks?

You can interact with Flare and Songbird through:

* The [block explorers](../user/block-explorer.md).
* [MetaMask](https://metamask.io) and other [wallets](../user/wallets/index.md).
* Local development tools such as [hardhat](https://hardhat.org).

Connection configuration for all networks is described in [the Networks Configuration section](reference/network-configs.md).

### Does Flare support Ethereum-style contracts?

Ethereum style contracts are supported by both Flare and Songbird.

### Does Flare support NFTs?

Flare and Songbird networks support NFTs and many have already been created on Songbird.
The [block explorers](../user/block-explorer.md) support displaying NFTs.

### How do I verify if a transaction is finalized using web3?

On Flare and Songbird obtaining the receipt of a submitted transaction does not guarantee that the transaction is finalized.
One has to wait until the sender's account nonce increases.
Here is an example of a helper function with exponential backoff that can be used to send signed transactions and wait for finalization.

```javascript
async function sendAndFinalize(senderAddress, signedTx, delay = 1000) {
  let oldNonce = await web3.eth.getTransactionCount(senderAddress);
  let receipt = await sendSignedTransaction(signedTx.rawTransaction)
  let backoff = 1.5;
  let maxRetries = 8;
  while ((await web3.eth.getTransactionCount(senderAddress)) == oldNonce) {
    await new Promise((resolve) => {setTimeout(()=>{resolve()}, delay)})
    maxRetries--;
    if(maxRetries == 0) {
      throw new Error("Response timeout");
    }
    delay = Math.floor(delay * backoff);
  }
  return receipt;
}
```

### How do I obtain a revert reason for a reverting contract call using web3?

In order to obtain the revert message of a reverted contract call transaction one has to follow the following steps:

* Catch the exception, and check if the revert reason is part of the exception data.

If not:

* Repeat the same contract call while using `.call(...)` syntax and parse the revert reason.

Note that second step should be performed as soon as possible, to ensure that the chain has a similar state for both calls.

### Is there a code example for reading the revert reason?

Below is a generic helper function to demonstrate this.
Note that it relies on the function `sendAndFinalize` (see one of the previous answers above).

```javascript
async contractCall(account, from, to, gas, gasPrice, fnToEncode, nonce) {
  let tx = {from, to, gas, gasPrice, data: fnToEncode.encodeABI(), nonce};
  let signedTx = await account.signTransaction(tx);
  try {
    return await sendSignedTransaction(signedTx.rawTransaction);
  } catch (e) {
    if (e.message.indexOf("Transaction has been reverted by the EVM") < 0) {
      throw new Error(e.message);
    } else {
      // throws Exception with revert message
      await fnToEncode.call({ from: account.address })
      throw Error('unlikely to happen: ' + JSON.stringify(result))
    }
  }
}
```

Here `account` and `fnToEncode` are obtained, for example, as follows:

```javascript
let account = web3.eth.accounts.privateKeyToAccount(privateKey)
let fnToEncode = web3Contract.methods.someMethodOnContract(param1, param2)
```

### How do I reliably read events with web3?

Subscription to events, for example using listeners in the `ethers` library, has proved to be unreliable, especially when high traffic exists on the network.
To reliably read events it is recommended to use the [`getPastEvents`](https://web3js.readthedocs.io/en/v1.5.2/web3-eth-contract.html?highlight=getPastEvents#getpastevents) function on web3 contracts.
This function has parameters `fromBlock` and `toBlock`.
User has to track for which blocks the information was obtained and for which it wasn't.
The number of blocks the user can specify in one web3 RPC call depends on the configuration of the RPC node being used.
In particular, if the node is run with the environment variable `WEB3_API` set to `debug` (so-called "full node"), usually 100 blocks of events can be read from the node through RPC call, whereas if `WEB3_API=enabled` ("light node") only 1 block of events can be read.
