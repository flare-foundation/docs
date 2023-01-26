# Contract Deployment Using Foundry

[Foundry](https://book.getfoundry.sh/) is a fast, portable and modular testing and deployment tool for developing EVM smart contracts.
Tests are written in Solidity to keep the workflow consistent with smart contract development and testing before deployments.
Foundry itself is written in Rust.

This article, partially based on the [Foundry documentation](https://book.getfoundry.sh/), shows how to set up Foundry and use it to build and deploy smart contracts on Flare.

## Guide

### 1. Set up the Environment

Follow the instructions for your operating system in the [Foundry's Installation guide](https://book.getfoundry.sh/getting-started/installation).

### 2. Create a Foundry Project

Foundry can quick-start your development by providing a sample project:

```bash
forge init hello_foundry
```

This creates a new directory `hello_foundry` from the default template which should look something like this:

<figure markdown>
  ![Foundry project structure](foundry1.png){ loading=lazy .allow-zoom }
  <figcaption>Foundry project structure.</figcaption>
</figure>

### 3. Build the Contract

To build the `Counter.sol` contract in the sample project run:

```bash
cd hello_foundry
forge build
```

When done, it should print `Compiler run successful`.

You will notice that two new directories have been created, `out` and `cache`:

<figure markdown>
  ![Foundry project after build](foundry2.png){ loading=lazy .allow-zoom }
  <figcaption>Foundry project after build.</figcaption>
</figure>

The `out` directory contains your contract artifact, such as the ABI, while the `cache` is used by forge to only recompile what is necessary.

### 4. Test the Contract

In the `test` folder you should find a ready-made test file that verifies the contract works as expected.

To run tests with Foundry, you just need to run:

```bash
forge test
```

When finished, it should print something similar to `Test result: ok. 2 passed; 0 failed; finished in 24.43ms`.

!!! Info

    Learn more about [Advanced Testing using Foundry](https://book.getfoundry.sh/forge/advanced-testing).

### 5. Deploy the Contract

Forge can deploy only one contract at a time to a given network.
To do so, you must provide the **URL of the RPC node** to access the network, and the **private key** of the account that will deploy the contract.

The URL can be stored in an environment variable named `FOUNDRY_ETH_RPC_URL)` so you do not need to supply it every time.

!!! Important

    You are going to deploy the contract on the [Coston 2 network](../../reference/network-configs.md).
    Make sure you have enough `C2FLR` in the account that will deploy the contract to pay the gas fees!

    You can add `C2FLR` to any account using the [Coston 2 Faucet](https://coston2-faucet.towolabs.com/).

The general Foundry command to deploy a contract is:

```bash
forge create --rpc-url <your_rpc_url> \
  --private-key <your_private_key> \
  <contract_file>:<contract_name>
```

Since Solidity files may contain multiple contracts, the `:<contract_name>` parameter specifies which contract to deploy from the `<contract_file>` source file.
Learn more about [Deploying and Verifying Smart Contracts using Foundry](https://book.getfoundry.sh/forge/deploying).

To deploy the sample `Counter` contract to Flare's Coston 2 Network, run:

```bash
forge create --rpc-url https://coston2-api.flare.network/ext/C/rpc \
  --private-key d8936f6eae35c73a14ea7c1aabb8d068e16889a7f516c8abc482ba4e1489f4cd \
  src/Counter.sol:Counter
```

Using the private key for your account.

Execution should look similar to this:

<figure markdown>
  ![Foundry project deployment](foundry3.png){ loading=lazy .allow-zoom }
  <figcaption>Foundry project deployment.</figcaption>
</figure>

You can check the status of the contract by copy and pasting the `Deployed to:` address into the [Coston 2 Block Explorer](https://coston2-explorer.flare.network/).

!!! Info

    Learn more about [Deploying and Verifying Smart Contracts using Foundry](https://book.getfoundry.sh/forge/deploying)!
