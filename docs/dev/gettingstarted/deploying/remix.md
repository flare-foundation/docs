# Deploy a Smart Contract Using Remix

[Remix IDE](https://remix.ethereum.org/) is a powerful, open source tool that helps you write Solidity contracts straight from the browser & does not require any downloads, creating accounts, or logins.

This article guides you to deploy a hello world contract to Flare blockchain using Remix IDE & Metamask wallet.

### 1. Visit [Remix IDE](https://remix.ethereum.org/) and create a New File
To start building a smart contract, click on 'New File' under contracts and name it - **"HelloWorld.sol"**
<figure markdown>
  ![Remix IDE](remix.png){ loading=lazy .allow-zoom }
  <figcaption>Remix IDE.</figcaption>
</figure>

### 2. Write your smart contract 

Copy and paste the Smart Contract code provided below into the newly created **HelloWorld.sol** file.

```  solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.17; // Specifies the version of Solidity, using semantic versioning.

contract HelloWorld { // Defines a contract named `HelloWorld`

   string public message; // Declares a state variable `message` of type `string`.

   constructor(string memory initMessage) {    // Constructors are used to initialize the contract's data.
      message = initMessage;      // Accepts a string argument `initMessage`.
   }

   function update(string memory newMessage) public { // A public function that accepts a string argument.
      message = newMessage;
   }

}
```

### 3. Compile your Contract

Go to the Solidity Compiler tab (on the left), Select compiler version to 0.8.17. Now, compile HelloWorld.sol

After successful compilation, it will show a **Green tick mark** on the Compiler tab button

<figure markdown>
  ![Compile your Contract](compile.png){ loading=lazy .allow-zoom }
  <figcaption>Compile your Contract</figcaption>
</figure>

###  4. Deploying on Flare Testnet - Coston2

Now, let's deploy our smart contract on Coston2 - Flare Network's Testnet. When a smart contract is deployed on Flare Mainnet, it not only costs money (such as gas fees), but it also becomes immutable and cannot be modified. Deploying your smart contract to the Testnet first is therefore recommended.

!!! note "Important"

    Before jumping onto Remix Deployment:

    - Please make sure that you have Added & Selected Coston2 Test Network to your Metamask Wallet, Check [Network Configurations](network-configs.md) for more details
    - Check if you have enough CFLR2 to pay for gas on the Coston2 network. Visit [Coston2 Faucet](https://coston2-faucet.towolabs.com/) to request some CFLR2


- Now go to Deploy & Run Transactions section and select Injected Provider Metamask in the Environment dropdown and your contract. (Accept the Connect request received in MetaMask)
<figure markdown>
  ![Deploy your Contract](deploy1.png){ loading=lazy .allow-zoom }
  <figcaption>Deploy your Contract</figcaption>
</figure>

- Click the Deploy button & Confirm the deploy transaction in MetaMask.
<figure markdown>
  ![Deploy your Contract](deploy2.png){ loading=lazy .allow-zoom }
  <figcaption>Deploy your Contract</figcaption>
</figure>

!!! note

    The process to deploy your contract on Flare mainnet is same as above, you only have to select Flare Network in the Metamask and use real FLR tokens


### 5. Interact with Contract 

Now let's interact with our contract, Check the Deployed Contracts section & click on the dropdown to expand & see the functions, Type your message and click on **update.**

Confirm the deploy transaction in MetaMask & Check if the contract has been updated.
<figure markdown>
  ![Interact with Contract](deploy3.png){ loading=lazy .allow-zoom }
  <figcaption>Interact with Contract</figcaption>
</figure>












