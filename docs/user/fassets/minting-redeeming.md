# Minting and Redeeming FAssets

Users of the [FAssets](../../tech//fassets/index.md) system can mint and redeem FAssets, allowing tokens on blockchains that do not support smart contracts to be used trustlessly with smart contracts on the Flare blockchain.

This guide provides the following information:

* How to set up the FAssets command-line tool.
* How to convert testnet XRP to FAssets (FTestXRP) on the Flare test network (minting).
* How to convert FAssets (FTestXRP) from Flare test network back to testnet XRP Ledger network (redemption).

!!! info "Open Beta"

    The FAssets system is currently in the [Open Beta](../../tech/fassets/open-beta.md) period.
    During this phase, user-friendly tools are still being developed.

    --8<-- "./include/fassets/issue-collector.html"

    Alternatively, you can contact [support@flarelabs.org](mailto:support@flarelabs.org).

--8<-- "./include/fassets/setup-commandline.md"

### Configure User's Access Keys

The FAsset user operates with multiple keys for the Flare and underlying network chains.

1. Generate the user's secrets using this command:

    ```console
    yarn key-gen generateSecrets --user -o secrets.json
    ```

    Among other things, this command creates wallets on the XRP Ledger and Flare networks that you will use throughout the rest of this guide.

    --8<-- "./include/fassets/generate-keys-info.md"

2. Fund the user's FLR wallet with some CFLR to pay the gas fees. You can find the user wallet's address in the `secrets.json` file under the `user.native.address` key.
You can get the CFLR tokens from the [Flare faucet](https://faucet.flare.network/).

3. Prevent other users from reading the `secrets.json` file:

    ```console
    chmod 600 secrets.json
    ```

4. Fill the `native_rpc`, `xrp_rpc` and `indexer` fields in the `secrets.json` file with the following values:

    ```json
    "native_rpc": "AavSehMLhcgz3crQHH5YJ3Rt8GMQGdV9aViGilADXGnTcjij",
    "xrp_rpc": "4tg3AxysaZodxTqsCtcMnBdBIEkR6KDKGTdqBEA8g9MKq4bH",
    "indexer": "123456",
    ```

    !!! info

        These values apply only to the [Coston Testnet](../../dev/reference/network-config.md) and will be different for other networks.

## Minting FAssets

1. Use the command below to list all available agents and their minting fees. Then chose one.

    ```console
    yarn user-bot --fasset FTestXRP agents
    ```

2. Use this command to determine the FAssets [lot](../../tech/fassets/minting.md#lots) size, since you will need it next:

    ```console
    yarn user-bot info -f FTestXRP
    ```

    You need to find the line in the command output that displays the lot size in this format:

    ```console
    Lot size: 20 FTestXRP
    ```

3. Find your generated XRP Ledger testnet wallet address in `user.testXRP.address` from the `secrets.json` file you created above, and fund it using one of the faucets:

    * [XRP Testnet Faucet](https://test.bithomp.com/faucet/)
    * [XRP Ledger Faucet](https://faucet.tequ.dev/)

    !!! info

        The minimum amount of FAssets you can mint is one lot, determined by the previous command.
        Furthermore, agents charge a fee, and you should pay for a transaction on the XRP network.
        Once you have selected an agent and know its fee, request enough XRP from the faucet to pay for it, plus the transaction cost.

4. Mint the FTestXRP FAssets by running the following command, replacing `AGENT_ADDRESS` with an agent address from the list obtained before, and `LOTS` with the number of [lots](../../tech/fassets/minting.md#lots) to mint:

    ```console
    yarn user-bot mint -a AGENT_ADDRESS LOTS --fasset FTestXRP --secrets secrets.json
    ```

    Alternatively, you can rely on the FAssets system to automatically select the agent with the lowest fee by removing the `-a AGENT_ADDRESS` parameter from the previous command:

    ```console
    yarn user-bot mint LOTS --fasset FTestXRP --secrets secrets.json
    ```

## Redeeming FAssets

Redeem the FTestXRP for the underlying asset obtained in the previous step by running the following command and replacing `LOTS` with the number of lots you want to redeem:

 ```console
 yarn user-bot redeem LOTS --fasset FTestXRP --secrets secrets.json
 ```

!!! info

    The [redemption](../../tech/fassets/redemption.md) may take an hour or more for the underlying funds to arrive at the user's address. If the agent pays immediately, redemption takes about 5 minutes.
    However, if the agent delays, the redeemer must wait 500 testXRP blocks or 900 seconds, plus 5 minutes for [state connector](../../tech/state-connector.md) proof, to execute redemption default.

## Related Pages

* [Deploying an FAssets Agent](../../infra//fassets//agent.md)
* [FAssets Open Beta](../../tech/fassets/open-beta.md)
