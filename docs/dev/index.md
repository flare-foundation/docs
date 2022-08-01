# Developer Docs

!!! info inline end "Quick links"

    * Main repos:

        [Validator node](https://github.com/flare-foundation/flare),
        [Smart contracts](https://gitlab.com/flarenetwork/flare-smart-contracts)

    * Price provider:

        [NPM Kickoff package](https://www.npmjs.com/package/@flarenetwork/ftso_price_provider_kick_off_package),
        [Reference implementation](https://github.com/flare-foundation/FTSO-price-provider)

    * Explorers:

        [Flare](https://flare-explorer.flare.network),
        [Songbird](https://songbird-explorer.flare.network),
        [Coston](https://coston-explorer.flare.network)

    * [Discord](https://discord.com/invite/XqNa7Rq)

## Flare and the EVM

Songbird (later Flare) network runs the Ethereum EVM. Which means Ethereum contracts and tools can be used to develop on top of these chains. Both networks are layer 1 networks, and are running independent of main-net Ethereum. Check network documentation and whitepaper for more info.

All existing tools and technologies available for Ethereum can be leveraged on Songbird network. The main infrastructure (FTSO, State Connectors,F-Assets) is written in Solidity using standard tools: ethers, web3, hardhat. State of the network can be observed using a block explorer, MetaMask and a few other [wallets](../user/wallets/index.md).

## FAQ

### How can I interact with the Songbird network

You can interact with Songbird network through:

* the [block explorer](https://songbird-explorer.flare.network),
* [MetaMask](https://metamask.io) or other [wallets](../user/wallets/index.md),
* local development tools such as [hardhat](https://hardhat.org).

Connection configuration for Songbird is described in [the Networks section](songbird.md).

### Does Songbird support Ethereum-style contracts?

Ethereum style contracts are supported by Songbird.

### Does Songbird support NFTs?

Songbird network supports NFTs and many were already created on Songbird. The Blockscout explorer supports displaying NFTs.

### How to verify if a transaction is finalized using web3?

On Songbird network obtaining the receipt of a submitted transaction does not guarantee that the transaction is finalized. One has to wait until the sender's account nonce increases. Here is an example of a helper function with exponential backoff that can be used to send signed transactions and wait for finalization.

``` javascript
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

### How to obtain a revert reason for a reverting contract call (web3)?

In order to obtain the revert message of a reverted contract call transaction one has to follow the following steps:

* Catch the exception, and verify, if the revert reason is a part of the exception data.

if not:

* Repeat the same contract call while using `.call(...)` syntax and parse the revert reason.

Note that repeating the same call with the `.call()` method is better done quickly, to assure that the chain has a similar state for both calls.

### Is there a code example for reading the revert reason?

Below is a generic helper function to demonstrate this. Note that it relies on the function `sendAndFinalize` (see one of the previous answers above).

``` javascript
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

``` javascript
let account = web3.eth.accounts.privateKeyToAccount(privateKey)
let fnToEncode = web3Contract.methods.someMethodOnContract(param1, param2)
```

### How to reliably read events with web3?

Subscription to events, for example using listeners in `ethers` library, proved to be unreliable, especially when higher traffic exists on the network. To reliably read events it is recommended to use [`getPastEvents`](https://web3js.readthedocs.io/en/v1.5.2/web3-eth-contract.html?highlight=getPastEvents#getpastevents) function on web3 contracts. This function has parameters `fromBlock` and `toBlock`. User has to track for which blocks the information was obtained and for which not. The number of blocks the user can specify in one web3 RPC call depends on the configuration of the RPC (network) node being used. In particular, if while running a node environment variable `WEB3_API` is set to `debug`(so-called full node) usually 100 blocks of events can be read from the node through RPC call, while if `WEB3_API=enabled`(light node) only 1 block of events can be read.
