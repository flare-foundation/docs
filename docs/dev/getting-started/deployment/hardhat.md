# Contract Deployment Using Hardhat

[Hardhat](https://hardhat.org/) is an environment developers use to test, compile, deploy and debug dApps based on the Ethereum blockchain. It's a flexible and extensible task runner that helps you manage and automate the recurring tasks inherent to developing smart contracts and dApps.

This article shows you how to set up Hardhat and use it to build, test and deploy any smart contract on Flare.


## Guide

### 1. Setting up the Environment

There are a few technical requirements for developers to start using Hardhat. Please Install the following dependencies:

* [NodeJSv12+ LTS & Npm/Yarn Package Installer](https://nodejs.org/en/)

!!! tip
    You can also checkout [Official Guide by Hardhat](https://hardhat.org/tutorial/setting-up-the-environment) to install Node.js for different OS - Ubuntu, MacOS and Windows.


Once the above dependencies are installed successfully, you need to create an npm project, Run the following commands step by step in your terminal -

```shell
mkdir flare-tutorial
cd flare-tutorial
npm init
npm install --save-dev hardhat

```

### 2. Creating a Hardhat Project

To create a sample project, run **npx hardhat** in your project folder.

```shell
npx hardhat

```

You should see the following prompt:

<figure markdown>
  ![Hardhat Prompt](hardhat1.png){ loading=lazy .allow-zoom }
  <figcaption>Hardhat Prompt</figcaption>
</figure>

**Choose the JavaScript project** and Press **Enter** & choose **'Y'** for rest of the prompts

### 3. Compiling your contracts

Next, if you take a look in the ***contracts/*** folder, you'll see Lock.sol which consistis of a simple digital lock, where users could only withdraw funds after a given period of time:

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

To compile it, simply run:
```shell
npx hardhat compile
```

### 4. Configuring Hardhat for Flare

* Go to **hardhat.config.js** file and update the hardhat-config with [flare-network-configurations]((../../reference/network-configs.md))
* Create [.env](https://www.npmjs.com/package/dotenv) file in the root that can store your [private key](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key)
* Make sure to install hardhat-ethers & dotenv by running ```npm i @nomiclabs/hardhat-ethers``` & ```npm i dotenv```

You can copy and paste the following code to **hardhat.config.js** file

```javascript
require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");
require('@nomiclabs/hardhat-ethers');

/** @type import('hardhat/config').HardhatUserConfig */
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
      url: "https://coston2-api.flare.network/ext/C/rpc",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 114,
    },
    flare: {
      url: "https://flare-api.flare.network/ext/C/rpc",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 14,
    }
  },
};

```

!!! Caution
    Make sure to add your mnemonic or private key and add it to a separate file named ".env" & make sure never to upload this file to GitHub or GitLab.

### 5. Testing the Contract

If you take a look in the ***test/*** folder, you'll see a test file that comes with tests that use Mocha, Chai, and Ethers.js which we have to install -

```shell
npm install mocha
npm install chai
npm install --save ethers
```

To run tests with Hardhat, you just need to type the following:

```shell
npx hardhat test
```
Expected Results:

<figure markdown>
  ![Hardhat Prompt](hardhat2.png){ loading=lazy .allow-zoom }
  <figcaption>Hardhat Prompt</figcaption>
</figure>

### 6. Deploying the Contract

Let's deploy our contract to Coston2 testnet, To deploy the contract we will use a Hardhat script that is already present Inside the ***scripts/*** folder 

Run this command in root of the project directory:

```shell
npx hardhat run scripts/deploy.js --network coston2
```

You can check the status of your contract by copy and pasting the address on [Block Explorer](https://coston2-explorer.flare.network/)

**Congratulations! You have successfully deployed Greeter Smart Contract. Now you can interact with the Smart Contract by building a dApp.**








