# Contract Deployment at same address in different chains

Every time we deploy a new smart contract on the blockchain, we receive a unique address for the contract. There is a proper mechanism based on which smart contract addresses are generated. 

Deploying Contracts at the same address in different chains makes the smart contract much more developer-friendly and can be useful for testing purposes. Also it helps to Keep track easily and helpful to users interacting with your addresses across various networks.

There are two ways you can deterministically deploy a contract across multiple networks.

1. Using **CREATE** opCode (Keeping the Nonce Value same):

Using [`CREATE`](https://ethereum.stackexchange.com/questions/68943/create-opcode-what-does-it-really-do) opCode the address is derived from three factors - **wallet address, wallet's transaction count - `the nonce`, and your contract's bytecode.**

So if you want to deploy on the **SAME address** in different chains than you need to manage the same Nonce in different chain keeping in mind that you use the same wallet address for deployment.

However Maintaining the **nonces** can be a hassle. For instance, if you need to use the address to sign a transaction on one network, you must ensure that you update the nonces on all other networks if you want to deploy another contract deterministically and also there is no way to predetermine what that deployment address will be in the counterfactual.

2. Using **CREATE2** opCode: 

Create2 is a more robust alternative to deployment & deriving contract addresses that does not rely on setting the nonces. The CREATE2 opcode also gives us the ability predict the address where a contract will be deployed.

Using the EVM opCode `CREATE2` a contract can be deployed on the same address using:

* Bytecode: compiled version of smart contract that can be read by the EVM.
* Salt: A required arbitrary value provided by the user. For eg: ‘hello’.
* Deployer address: The Ethereum wallet address used to deploy a contract.

Instead of the nonce, create2 uses a random salt hex set by the user. With the salt hex, a specific contract address can then be derived with the wallet address and bytecode. 

The whole idea behind [`CREATE2`](https://eips.ethereum.org/EIPS/eip-1014) opcode is to make the resulting address independent of future events.

!!! Info

    If you run a transaction again on the same network with same Bytecode, Salt and Address it will fail because a contract has already been deployed to that address.


## Guide

### 1. Create a Project

You can use Hardhat or Truffle to create a project, We will use Hardhat in this article!

Please check [Hardhat Tutorial]((./hardhat.md)) and setup a Project.

### 2. Writing & Deploying the Contracts

Because create2 is a solidity feature, we can only utilize it on the Ethereum network. Hence, we will code a contract deployment factory with a create2 function and deploy the factory. Then our factory should be able to deploy any contract deterministically using a given salt.

Create a new file under the contracts directory and name it `DeterministicDeployFactory.sol`

Copy and Paste the following code in the file:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract DeterministicDeployFactory {
    event Deploy(address addr);

    function deploy(bytes memory bytecode, uint _salt) external {
        address addr;
        assembly {
            addr := create2(0, add(bytecode, 0x20), mload(bytecode), _salt)
            if iszero(extcodesize(addr)) {
        revert(0, 0)
      }
    }

    emit Deploy(addr);
    }
}
```

Before we continue, let's compile our contract with the following Hardhat command:

```bash
npx hardhat compile
```

Upon successful compilation it will print `Compiled 1 Solidity file successfully`.

Now let's create a deploy script and deploy our factory, In your scripts folder, create a new file named `deployFactory.js` and paste the following:

``` javascript
const main = async () => {
    const Factory = await ethers.getContractFactory("DeterministicDeployFactory");
    const factory = await Factory.deploy();
    await factory.deployed();
    console.log("Factory deployed to:", factory.address);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
```

!!! important

    * Please make sure you use private keys of a fresh account to make sure the nonce on each network is set to 0
    * Add Goerli, Coston, Coston2 networks to `hardhat.config.js` file

Because our nonces are set equally on each network, this factory will deploy to the same address everywhere. Let's deploy to each network by running the following Hardhat commands:

```bash
npx hardhat run scripts/deployFactory.js --network goerli
npx hardhat run scripts/deployFactory.js --network coston
npx hardhat run scripts/deployFactory.js --network coston2
```
If successful, each deployment should return the same address on every network:

``` bash
Factory deployed to: 0x437E85F89866d3D3dcE3bc91D4FBFfa0e050AADB
Factory deployed to: 0x437E85F89866d3D3dcE3bc91D4FBFfa0e050AADB
Factory deployed to: 0x437E85F89866d3D3dcE3bc91D4FBFfa0e050AADB
```
!!! Tip

    Be sure to save your factory address so we can use it to later deploy other contracts.

!!! Info

    As discussed above, If you closely observe here we used our first method to deploy a contract on same address across multiple networks where we kept the value of nonce same across every network

Now, we will create one more contract in order to use the deployUsingCreate2 function.

Create a new file inside the contract directory and name the file `HelloWorld.sol` and paste the following:

``` solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;
contract HelloWorld {
    function greeting() public pure returns (string memory) {
        return "Hello World!";
    }
}
```
This is a simple contract that will print the string “Hello World!”

Now let's create a deploy script and deploy our contract, In your scripts folder, create a new file named `deployHelloWorld.js` and paste the following:

``` javascript
const { ethers } = require("hardhat");
const fs = require('fs/promises');
const main = async () => {
  const Factory = await ethers.getContractFactory("DeterministicDeployFactory");
  const factoryAddress = "Replace this with your Factory Deployed Address"
  const factory = await Factory.attach(factoryAddress);
  const HW = await ethers.getContractFactory("HelloWorld");
  const byteCode = HW.bytecode;
  await factory.deployUsingCreate2(byteCode,"flare");
  factory.once("Deploy", async (address) => {
    const helloWorldContract = HW.attach(address);
    console.log("hello world contract has been deployed at ", address);
    const greeting = await helloWorldContract.greeting();
  })
  
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

Here we have used the **DeterministicDeployFactory** contract to deploy the **HelloWorld** contract, in order to use the create2 function.

!!! Important

    Do change the factoryAddress in the above file with your own Factory deployed address

Now use the following command to deploy the `HelloWorld` contract across mutiple networks:

```bash
npx hardhat run scripts/deployHelloWorld.js --network goerli
npx hardhat run scripts/deployHelloWorld.js --network coston
npx hardhat run scripts/deployHelloWorld.js --network coston2
```

If successful, each deployment should return the same address on every network:

```bash
hello world contract has been deployed at  0x8929912256646340496f3cF5d17d56F967cc554A
hello world contract has been deployed at  0x8929912256646340496f3cF5d17d56F967cc554A
hello world contract has been deployed at  0x8929912256646340496f3cF5d17d56F967cc554A
```
This is done with the help of the create2 function.
You can always check the status of the contract by copy and pasting this address in the respective Block Explorer.


You can use this method to deploy your smart contract at the same address across mutiple EVM networks like Flare, Songbird, Ethereum, Polygon, Optimism etc.










