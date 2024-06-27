# Setting up an FAssets Liquidator

As a critical component of the [FAssets](../../tech/fassets/index.md) system, [liquidators](../../tech/fassets/index.md#liquidators) oversee agents and ensure their self-sufficiency, contributing to the overall stability and efficiency of the system by carrying out [liquidation](../../tech/fassets/liquidation.md).
They initiate a process where FAssets are sent into the system in exchange for collateral plus a premium. 
This process involves burning the FAssets, which effectively reduces the agent collateral requirement and allows them to earn rewards in the process.
Anyone can become a liquidator, supporting the FAssets system and earning rewards.

This guide explains how to run a program called an FAssets bot that observes the FAssets system and reacts to its state. The bot must be running at all times and be constantly online to avoid the risk of missing liquidation opportunities and earning rewards.

--8<-- "./include/fassets/open-beta.md"

--8<-- "./include/fassets/setup-commandline.md"

## Configure the Access Keys

The FAsset liquidators operate with an address for the Flare network chain. You must generate these keys to set up the liquidator.

1. Create or use an existing management wallet that will be your liquidator's management address. Fund this wallet with some CFLR so you can pay the gas fees for various smart contract calls using the [Flare faucet](https://faucet.flare.network/).

2. Generate the secrets using this command by replacing the `MANAGEMENT_WALLET_ADDRESS` with your cold wallet address:

    ```bash
    yarn key-gen generateSecrets --other MANAGEMENT_WALLET_ADDRESS --other -o secrets.json
    ```

    --8<-- "./include/fassets/generate-keys-info.md"

3. Prevent other users from reading the `secrets.json` file:

    ```bash
    chmod 600 secrets.json
    ```

4. The `native_rpc` is the API key used to connect to a public node on the Coston blockchain network.
This key is necessary for authenticating and enabling secure communication between your application and the blockchain network.
To configure your connection, you must fill the `native_rpc` field in the `secrets.json` file with the API key provided by the Flare team during the FAssets testing period.
Use this value in the `secrets.json` file:

    ```json
    "native_rpc": "AavSehMLhcgz3crQHH5YJ3Rt8GMQGdV9aViGilADXGnTcjij",
    ```

1. The `secrets.json` file contains the `liquidator.address` and `liquidator.private_key` fields, representing the Flare account responsible for running the liquidator and covering gas fees for the smart contract calls. Ensure this address has enough tokens to cover gas fees by transferring some CFLR to it. You can obtain CFLR tokens from the [Flare faucet](https://faucet.flare.network/).

2. The `liquidator` account must hold enough FAssets to execute [liquidation tasks](../../tech/fassets/index.md#liquidators) and cover the liquidated agent FAssets amount.
Therefore, you must mint FAssets and move them to the `liquidator` account.
For a more detailed explanation, please refer to the [Minting and Redeeming](../../user/fassets/index.md) guide.

## Running the Liquidator

The liquidator observes the FAssets system and reacts to its state.
To run the liquidator, you need to run the following command:

```console
yarn run-liquidator
```

When you want to stop the server, press Ctrl + C.

### Running the Liquidator as System Service

In production scenarios, run the `run-liquidator` command as a service to maximize uptime 
Here, you have instructions to run the liquidator as a `systemd` service for [running the liquidator as a daemon](https://github.com/flare-labs-ltd/fasset-bots/blob/main/docs/systemd/systemd-service.md).
Using this guide, you must change the `agent-bot` to the `liquidator-bot`.


## Related Pages

* [Minting and Redeeming FAssets](../../user/fassets/index.md)
* [Deploying an FAssets Agent](agent.md)
* [FAssets Open Beta](../../tech/fassets/open-beta.md)
