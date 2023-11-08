# Setting Up Your Environment Using Truffle

[Truffle](https://trufflesuite.com/) is a blockchain development environment, which you can use to create and test smart contracts by leveraging the Ethereum Virtual Machine (EVM), aiming to make life as a developer easier.

This article shows you how to set up Truffle and use it to build and deploy a smart contract on the Flare network.

## Guide

### 1. Set up the Environment

Install the following dependencies:

* [NodeJSv12+ LTS and npm/Yarn Package Installer](https://nodejs.org/en/).

Once the above dependencies are installed, install Truffle:

```bash
npm install -g truffle
```

To verify that Truffle is installed properly, type `truffle version` into the terminal.

### 2. Create a Truffle Project

In this article you will use one of Truffle's boilerplate projects which you can find on the [Truffle Boxes page](https://trufflesuite.com/boxes/).
[MetaCoin box](https://trufflesuite.com/boxes/metacoin/) is an example of a completed coin-like contract.

Create a new directory for this Truffle project by running:

```bash
mkdir flare-truffle-tutorial
cd flare-truffle-tutorial
```

Then install the `MetaCoin` box:

```bash
truffle unbox metacoin
```

Once this operation is complete, you should have a project structure with the following items:

<figure markdown>
  ![Truffle Project structure](truffle1.png){ loading=lazy .allow-zoom }
  <figcaption>Truffle Project structure.</figcaption>
</figure>

Finally, install the following dependencies which will be needed to deploy contracts:

```bash
npm i @truffle/hdwallet-provider dotenv
```

### 3. Compile the Contract

In the `contracts` folder you should find two sample source files called `MetaCoin.sol` and `ConvertLib.sol`.

To compile them, simply run:

```bash
truffle compile
```

Upon successful compilation, you should see the following output:

<figure markdown>
  ![Truffle compilation output](truffle2.png){ loading=lazy .allow-zoom }
  <figcaption>Truffle compilation output.</figcaption>
</figure>

### 4. Test the Contract

In the `test` folder you should find examples for testing your smart contracts in both JavaScript and Solidity that verify the contracts work as expected.

To run tests:

```bash
truffle test
```

When successful, the output should look like this:

<figure markdown>
  ![Truffle test output](truffle3.png){ loading=lazy .allow-zoom }
  <figcaption>Truffle test output.</figcaption>
</figure>

### 5. Configure the Project

In order to be deployed on any of the [Flare networks](../../reference/network-config.md), the project needs to be configured.
Edit the `truffle-config.js` file and replace its contents with the following:

```javascript
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
      provider: () => new HDWalletProvider(process.env.PRIVATE_KEY, `https://flare-api.flare.network/ext/C/rpc`),
      network_id: 14,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    coston2: {
      provider: () => new HDWalletProvider(process.env.PRIVATE_KEY, `https://coston2-api.flare.network/ext/C/rpc`),
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

Then, create a file called `.env` at the root of you project (where the `truffle-config.js` file resides) to store the private key for the account to use for testing.

```ini
PRIVATE_KEY="d8936f6eae35c73a14ea7c1aabb8d068e16889a7f516c8abc482ba4e1489f4cd"
```

[`.env` files](https://www.npmjs.com/package/dotenv) are useful to store local information which should not be committed into the source repository.

!!! warning

    Make sure you never upload your `.env` file to a remote repository.

    For this reason, the `.gitignore` file that Truffle created for you already ignores `.env` files.

### 6. Deploy the Contract

!!! warning

    You are going to deploy the contract on the [Coston 2 network](../../reference/network-config.md).
    Make sure you have enough `C2FLR` in the account that will deploy the contract to pay the gas fees!

    You can add `C2FLR` to any account using the [Coston 2 Faucet](https://coston2-faucet.towolabs.com/).

Run this command in the root folder of the project:

```bash
truffle migrate --network coston2
```

You should get an output similar to:

<figure markdown>
  ![Truffle deployment output](truffle4.png){ loading=lazy .allow-zoom }
  <figcaption>Truffle deployment output.</figcaption>
</figure>

You can check the status of the contract by copy and pasting the `contract address:` in the [Block Explorer](https://coston2-explorer.flare.network/).
