# Contract Deployment Using Foundry

[Foundry](https://book.getfoundry.sh/) is a fast, portable and modular testing and deployment tool for developing EVM smart contracts. Tests are written in Solidity to keep the workflow consistent with smart contract development and testing before deployments. It is written in Rust

This article partially based on the [Foundry documentation](https://book.getfoundry.sh/) shows you how to set up Foundry and Use it to Build & Deploy smart contracts on Flare

## Guide

### 1. Set up the Environment

Install [Foundry](https://book.getfoundry.sh/getting-started/installation) - There are various installation methods in [Foundry's README](https://book.getfoundry.sh/getting-started/installation) based on your OS Requirements.

### 2. Create a Foundry Project

Foundry can quick-start your development by providing a sample project.

``` bash
mkdir flare-foundry-tuto
cd flare-foundry-tuto
forge init hello_foundry
```

This creates a new directory hello_foundry from the default template and should look something like this:

<figure markdown>
  ![Foundry Project](foundry1.png){ loading=lazy .allow-zoom }
  <figcaption>Foundry Project</figcaption>
</figure>

Next, To build the project Run:

```bash
cd hello_foundry
forge build
```

When done, it should print `Compiler run successful`.

### 3. Test the Contract

In the `test` folder you should find a ready-made test file that verifies the contract works as expected.

To run tests with Foundry, you just need to run:

```bash
forge test
```

When done, it should print: `Test result: ok. 2 passed; 0 failed; finished in 24.43ms`

You'll notice that two new directories have popped up: **out and cache.**

<figure markdown>
  ![Foundry Project](foundry2.png){ loading=lazy .allow-zoom }
  <figcaption>Foundry Project</figcaption>
</figure>

The out directory contains your contract artifact, such as the ABI, while the cache is used by forge to only recompile what is necessary.

!!! Info

    Learn more about [Advance Testing using Foundry](https://book.getfoundry.sh/forge/advanced-testing)!


### 4. Deploy the Contract

Forge can deploy only one contract at a time to a given network. To deploy a contract, you must provide a `RPC URL (env: ETH_RPC_URL)` and the `private key` of the account that will deploy the contract.

!!! Important

    Make sure you have C2FLR in your wallet (Add using [Coston2 Faucet](https://coston2-faucet.towolabs.com/))

To deploy Counter Contract to a network, Use:

 ```bash
 forge create --rpc-url <your_rpc_url> --private-key <your_private_key> src/Counter.sol:Counter
 ```
 Solidity files may contain multiple contracts. `:Counter` above specifies which contract to deploy from the `src/MyContract.sol` file.

 Learn more about [Deploying and Verifying Smart Contracts using Foundry](https://book.getfoundry.sh/forge/deploying)

 Example to deploy a contract on Coston2 Network

 ```bash
 forge create --rpc-url https://coston2-api.flare.network/ext/C/rpc --private-key d8936f6eae35c73a14ea7c1aabb8d068e16889a7f516c8abc482ba4e1489f4cd src/Counter.sol:Counter
 ```
!!! Caution

    Make sure you update the `private keys` in the command above & Never share you private keys with anyone


When done, it should show following details:

<figure markdown>
  ![Foundry Project](foundry3.png){ loading=lazy .allow-zoom }
  <figcaption>Foundry Project</figcaption>
</figure>
  
You can check the status of the contract by copy and pasting the above address in the [Block Explorer](https://coston2-explorer.flare.network/).

!!! Info

    Learn more about [Deploying and Verifying using Foundry](https://book.getfoundry.sh/forge/deploying)!