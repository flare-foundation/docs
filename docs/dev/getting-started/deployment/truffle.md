# Contract Deployment Using Truffle

[Truffle](https://trufflesuite.com/) is a blockchain development environment, which you can use to create and test smart contracts by leveraging the Ethereum Virtual Machine(EVM), aiming to make life as a developer easier.

This article shows you how to set up Truffle and Use it to Build & Deploy a smart contract on Flare

## Guide

### 1. Set up the Environment

Install the following dependencies:

* [NodeJSv12+ LTS and npm/Yarn Package Installer](https://nodejs.org/en/).

Once the above dependencies are installed, You can now install Truffle:

```bash
npm install -g truffle
```

To verify that Truffle is installed properly, type `truffle version` into the terminal.

### 2. Create a Truffle Project

In this article we will use one of Truffle's boilerplates which you can find on their [Truffle Boxes page](https://trufflesuite.com/boxes/). [MetaCoin box](https://trufflesuite.com/boxes/metacoin/) is an example of a completed coin-like contract.

Let's create a new directory for this Truffle project by running the following commands in a terminal:

```bash
mkdir flare-truffle-tutorial
cd flare-truffle-tutorial
```

Install the MetaCoin box:

```bash
truffle unbox metacoin
```

Once this operation is complete, you'll now have a project structure with the following items:
<figure markdown>
  ![Truffle Project](truffle1.png){ loading=lazy .allow-zoom }
  <figcaption>Truffle Project.</figcaption>
</figure>

### 3. Compile the Contract

If you take a look in the `contracts` folder, you should find two sample source file called `MetaCoin.sol` & `ConvertLib.sol`.

To compile the contracts, simply run:

```bash
truffle compile
```
Upon successful compilation, you will see the following output:

<figure markdown>
  ![Truffle Project](truffle2.png){ loading=lazy .allow-zoom }
  <figcaption>Truffle Project.</figcaption>
</figure>


### 4. Test the Contract

In the `test` folder you should find examples for testing your smart contracts in both Javascript and Solidity that verifies the contract works as expected.

To run tests you just need to run:

```bash
truffle test
```

<figure markdown>
  ![Truffle Project](truffle3.png){ loading=lazy .allow-zoom }
  <figcaption>Truffle Project.</figcaption>
</figure>

### 5. Configure the Project

In order to be deployed on any of the [Flare networks](../../reference/network-configs.md), the project needs to be configured.
Edit the `truffle-config.js` file and replace its contents with the following:

``` javascript
const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();
const fs = require('fs');

module.exports = {


  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    flare: {
      are: {
      provider: () => new HDWalletProvider(process.env.MNENOMIC, `https://flare-api.flare.network/ext/C/rpc`),
      network_id: 14,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    coston2: {
      provider: () => new HDWalletProvider(process.env.MNENOMIC, `https://coston2-api.flare.network/ext/C/rpc`),
      network_id: 114,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.13",      // Fetch exact version from solc-bin
    }
  }
};
```

Make sure you have `@truffle/hdwallet-provider` dependency installed, Install it using the below command.

```bash
npm i @truffle/hdwallet-provider
```

Then, create a file called `.env` at the root of you project (where the `truffle-config.js` file resides) to store the [mnemonic seed phrase](https://metamask.zendesk.com/hc/en-us/articles/360015290032-How-to-reveal-your-Secret-Recovery-Phrase) for the account to use for testing.

```ini
PRIVATE_KEY="0x0000000000000000000000000000000000000000000000000000000000000000"
```

[`.env` files](https://www.npmjs.com/package/dotenv) are useful to store local information which should not be committed into the source repository.

!!! Caution

    Make sure you never upload your `.env` file to a remote repository.

    For this reason, the `.gitignore` file that Hardhat created for you already ignores `.env` files.


### 6. Deploy the Contract

Make sure you have C2FLR in your wallet (Add using [Coston2 Faucet](https://coston2-faucet.towolabs.com/)). Next, run this command in the root folder of the project directory to Deploy your Contract on Coston2 Network:

```bash
truffle migrate --network coston2
```

You should get an output similar to:

<figure markdown>
  ![Truffle Project](truffle4.png){ loading=lazy .allow-zoom }
  <figcaption>Truffle Project.</figcaption>
</figure>

You can check the status of the contract by copy and pasting this address in the [Block Explorer](https://coston2-explorer.flare.network/).