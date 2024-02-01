# Setting Up Your Environment Using Hardhat

[Hardhat](https://hardhat.org/) is an environment developers use to test, compile, deploy and debug dapps based on any blockchain compatible Ethereum's [EVM](glossary.md#evm).
Hardhat is a flexible and extensible task runner that helps you manage and automate the recurring tasks inherent to developing smart contracts and dapps.

This article, partially based on the [Hardhat documentation](https://hardhat.org/hardhat-runner/docs/getting-started) shows you how to set up Hardhat and use it to build, test and deploy smart contracts on Flare.

## Guide

### 1. Set up the Environment

!!! warning
    
    If you are using Windows, Hardhat strongly [recommends](https://hardhat.org/tutorial/setting-up-the-environment#windows) to use [WSL 2](https://docs.microsoft.com/en-us/windows/wsl/about).

Install the following dependencies:

* [NodeJSv16+ LTS and npm Package Installer](https://nodejs.org/en/).

!!! tip
    Check the [Official Guide by Hardhat](https://hardhat.org/tutorial/setting-up-the-environment) if you have issues installing this package.

Once the above dependencies are installed, create an npm empty project by running the following commands in a terminal:

```bash
mkdir flare-tutorial
cd flare-tutorial
npm init
```

Press **Enter** on each of the prompts.

Finally, add Hardhat and a few dependencies to the project, since you will use them in this tutorial.

```bash
npm install --save-dev \
  hardhat \
  dotenv
```

### 2. Create a Hardhat Project

Hardhat can quick-start your development by providing a sample project.
Just run:

```bash
npx hardhat init
```

You should see the following prompt:

<figure markdown>
  ![Hardhat project creation prompt](hardhat1.png){ loading=lazy .allow-zoom }
  <figcaption>Hardhat project creation prompt.</figcaption>
</figure>

Choose the `Create a JavaScript project` with the **Up** and **Down** keys, and Press **Enter**.
Then press **Y** for rest of the prompts.

When done, it should print `Project created`.

!!! tip
    If you use the Windows command prompt, Hardhat might warn you that you need to install some dependencies manually. Do it using the command that the Hardhat setup guide provides.

If you take a look in the `contracts` folder, you should find a sample source file called `Lock.sol`.
It is a Solidity smart contract implementing a digital lock, where users can only withdraw funds after a given period of time:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Lock {
    uint public unlockTime;
    address payable public owner;

    event Withdrawal(uint amount, uint when);

    constructor(uint _unlockTime) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}
```

### 3. Compile the Contracts

To compile the sample project, run:

```bash
npx hardhat compile
```

Upon successful compilation it will print `Compiled 1 Solidity file successfully`.

### 4. Configure the Project

In order to be deployed on any of the [Flare networks](../../reference/network-config.md), the project needs to be configured.
Edit the `hardhat.config.js` file and replace its contents with the following:

```javascript
require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
    },
    coston: {
      url: "https://coston-api.flare.network/ext/bc/C/rpc",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 16
    },
    songbird: {
      url: "https://songbird-api.flare.network/ext/bc/C/rpc",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 19
    },
    coston2: {
      url: "https://coston2-api.flare.network/ext/bc/C/rpc",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 114,
    },
    flare: {
      url: "https://flare-api.flare.network/ext/bc/C/rpc",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 14,
    }
  },
};
```

Then, create a file called `.env` at the root of you project (where the `hardhat.config.js` file resides) to store the private key for the account to use for testing.
[`.env` files](https://www.npmjs.com/package/dotenv) are useful to store local information which should not be committed into the source repository.
In this tutorial, you need to store your test account's [private key](https://support.metamask.io/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key) in this format:

```bash
PRIVATE_KEY="0000000000000000000000000000000000000000000000000000000000000000"
```

!!! warning

    Make sure you never upload your `.env` file to a remote repository.

    For this reason, the `.gitignore` file that Hardhat created for you already ignores `.env` files.

### 5. Test the Contract

In the `test` folder you should find a ready-made test file that verifies the contract works as expected.

To run tests with Hardhat, you just need to run:

```bash
npx hardhat test
```

You should get:

<figure markdown>
  ![Lock contract test results](hardhat2.png){ loading=lazy .allow-zoom }
  <figcaption>Lock contract test results.</figcaption>
</figure>

### 6. Deploy the Contract

Finally, you will deploy the contract to Flare's test network, [Coston2](../../reference/network-config.md), using a Hardhat script from the `scripts` folder.

!!! warning

    Before proceeding with Deployment:

    * Make sure that you have added and selected the Coston2 test network to your Wallet.
      The [Wallets section](../../../user/wallets/index.md) shows how to do it.
      Use the values for Coston2 that you will find in the [Network Configurations](../../reference/network-config.md) page.
    * Ensure that you have enough Coston2 native tokens `$C2FLR` to pay for gas.
      Visit the [Coston2 Faucet](https://faucet.flare.network/coston2) to request some `$C2FLR`.

Run this command at the root of the project:

```bash
npx hardhat run scripts/deploy.js --network coston2
```

You should get an output similar to:

```text
Lock with 1 ETH and unlock timestamp 1705592309 deployed to 0xdC7781FA9fA7e2d0313cd0229a5080B4e30663a5
```

The last part is the address where the contract has been deployed.
You can check the status of the contract by copying and pasting this address in the [Block Explorer](../../../user/block-explorers/index.md)