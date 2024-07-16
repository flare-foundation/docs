---
title: Depositing Collateral (CLI)
---

# Using the Command Line to Deposit Collateral

As a user of the [FAssets](../../tech//fassets/index.md) system, you can deposit collateral into an agent's [collateral pool](../../tech/fassets/collateral.md#pool-collateral) to provide additional financial backing for the agent.
In exchange for your collateral, you will earn shares of the agent's fees.
Additionally, you will receive [collateral pool tokens](../../tech/fassets/collateral.md#pool-collateral), which you will be able to redeem, transfer, or trade.

While the functionality to deposit collateral via a dapp is being developed, this guide is for users who have some experience using a terminal.
It provides the following information:

* How to set up the FAssets command-line tool
* How to get a list of available agents
* How to deposit collateral into a selected agent's collateral pool

--8<-- "./include/fassets/open-beta.md"

--8<-- "./include/fassets/setup-commandline.md"

### Configure User's Access Keys

The FAsset user operates with multiple keys for the Flare and underlying network chains.

1. Generate the user's secrets using this command:

    ```console
    yarn key-gen generateSecrets --user -o secrets.json
    ```

    --8<-- "./include/fassets/generate-keys-info.md"

2. Fund the user's FLR wallet with some CFLR to pay the gas fees.
    You can find the user wallet's address in the `secrets.json` file under the `user.native.address` key.
    You can get the CFLR tokens from the [Flare faucet](https://faucet.flare.network/).

3. Prevent other users from reading the `secrets.json` file:

    ```console
    chmod 600 secrets.json
    ```

4. Fill the `indexer` field in the `secrets.json` file with the following values:

    ```json
    "indexer": "123456",
    ```

    !!! info

        These values apply only to the [Coston Testnet](../../dev/reference/network-config.md) and will be different for other networks.

## Depositing Collateral into an Agent's Collateral Pool

The collateral pool can contain only `$CFLR`, so ensure you funded your wallet with tokens from the faucet, as described in step 2 above.

1. Use the command below to list all available agents:

    ```console
    yarn user-bot --fasset FTestXRP agents
    ```

    A list of agents is displayed.

2. Copy the address of an agent in the list.
3. Use the command below to send your collateral to the agent.
    Replace `AGENT_ADDRESS` with the address you copied in the previous step, and replace `CFLR_AMOUNT` with a portion of the funds you received from the faucet.

    ```console
    yarn agent-bot buyPoolCollateral AGENT_ADDRESS CFLR_AMOUNT --fasset FTestXRP
    ```

    A message indicates the amount of collateral you successfully provided to the selected agent's collateral pool.
