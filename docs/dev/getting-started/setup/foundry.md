# Setting Up Your Environment Using Foundry

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
cd hello_foundry
```

This creates a new directory `hello_foundry` from the default template which should look something like this:

<figure markdown>
  ![Foundry project structure](foundry1.png){ loading=lazy .allow-zoom }
  <figcaption>Foundry project structure.</figcaption>
</figure>

Add the highlighted line to the `foundry.toml` file, to make sure the correct EVM version is used:

```toml hl_lines="5"
[profile.default]
src = "src"
out = "out"
libs = ["lib"]
evm_version = "london"
```

### 3. Build the Contract

To build the `Counter.sol` contract in the sample project run:

```bash
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

!!! info

    Learn more about [Advanced Testing using Foundry](https://book.getfoundry.sh/forge/advanced-testing).

### 5. Deploy the Contract

Forge can deploy only one contract at a time to a given network.
To do so, you must provide the **URL of the RPC node** to access the network, and the **private key** of the account that will deploy the contract.

The URL can be stored in an environment variable named `FOUNDRY_ETH_RPC_URL)` so you do not need to supply it every time.

!!! warning

    Before proceeding with Deployment:

    * Make sure that you have added and selected the Coston2 test network to your Wallet.
      The [Wallets section](../../../user/wallets/index.md) shows how to do it.
      Use the values for Coston2 that you will find in the [Network Configurations](../../reference/network-config.md) page.
    * Ensure that you have enough Coston2 native tokens `$C2FLR` to pay for gas.
      Visit the [Coston2 Faucet](https://faucet.flare.network/coston2) to request some `$C2FLR`.

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
forge create --rpc-url https://coston2-api.flare.network/ext/bc/C/rpc \
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

!!! info

    Learn more about [Deploying and Verifying Smart Contracts using Foundry](https://book.getfoundry.sh/forge/deploying)!

### 6. Verify the Contract

Verifying smart contracts is essential for transparency and security in the blockchain ecosystem.

Verification allows inspecting Solidity source code instead of bytecode and direct interaction with smart contracts through a block explorer.

For the contract verification process, you need to get two values.
The first is the contract address you got in the [previous step](#5-deploy-the-contract) when you deployed the contract on the blockchain.
The second value is the chain identifier, which you can find on the [Flare Networks page](../../reference/network-config.md).

Now replace `CONTRACT_ADDRESS` with the deployed contract address and `CHAIN_ID` with the network identifier and run this command:

```bash
forge verify-contract CONTRACT_ADDRESS \
  --verifier-url 'https://api.routescan.io/v2/network/testnet/evm/CHAIN_ID/etherscan' \
  --etherscan-api-key "verifyContract" \
  src/Counter.sol:Counter
```

It will take a minute or two to verify the smart contract on the blockchain and you should get an output like this:

```text
Start verifying contract `0x86d0D7957f0BF3Cee98A60338B19fBf91390A9bA` deployed on mainnet

Submitting verification for [src/Counter.sol:Counter] 0x86d0D7957f0BF3Cee98A60338B19fBf91390A9bA.
Submitted contract for verification:
  Response: `OK`
  GUID: `d9c8ec3f-fc14-5e9b-af03-b264467314bd`
  URL: https://etherscan.io/address/0x86d0D7957f0BF3Cee98A60338B19fBf91390A9bA
```

When you open the smart contract on the [block explorer](../../../user/block-explorers/index.md), you will see a green checkbox in the **Contract** tab.
You can see that the smart contract code is visible to anyone.
You can now see the Solidity code instead of bytecode and interact with the smart contract from the block explorer.
