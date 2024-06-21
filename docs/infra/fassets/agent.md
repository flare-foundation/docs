# Deploying an FAssets Agent

The [FAssets](./../../tech/fassets/index.md) agents play an essential role and help to run the system, allowing tokens on blockchains that do not support smart contracts to be used trustlessly with smart contracts on the Flare blockchain.

This guide provides the following information:

* How to set up the FAssets command line interface;
* How to set up access keys for interacting with the Flare test and test XRP Ledger network;
* How to set up an FAssets agent and provide collateral;
* How to run the agent so FAssets system users can convert (mint and redeem) assets from the testnet XRP Ledger to the Flare test network and back.

!!! info "Open Beta"

    The FAssets system is currently in the [Open Beta](../../tech/fassets/open-beta.md) period.
    During this phase, user-friendly tools are still being developed.

    --8<-- "./include/fassets/issue-collector.html"

    Alternatively, you can contact [support@flarelabs.org](mailto:support@flarelabs.org).

## Contract Addresses

These are important FAssets smart contract addresses representing test tokens and notable system components, provided for your convenience during the Open Beta on the Coston test network. Please note that these addresses are exclusive to the Coston test network and unavailable on other Flare networks.

### Test Tokens

These are ERC-20 representations of test tokens to be used by the FAssets system:

* `testUSDC`: [0xd20D9284E8b43C60365BcA90662C67B5A0B91dd6](https://coston-explorer.flare.network/address/0xd20D9284E8b43C60365BcA90662C67B5A0B91dd6)

* `testUSDT`: [0x18bd7bE80F76055aeB4F1575A99d0c4d7893B8b5](https://coston-explorer.flare.network/address/0x18bd7bE80F76055aeB4F1575A99d0c4d7893B8b5)

* `testETH`: [0x17c3E6318cb45B4267998940d7D65BA95A32954F](https://coston-explorer.flare.network/address/0x17c3E6318cb45B4267998940d7D65BA95A32954F)

### FAssets System Contracts

* `AgentOwnerRegistry`: [0xDb6c11b8D074D4488f5fFd0129AA5F91C4f00fb6](https://coston-explorer.flare.network/address/0xDb6c11b8D074D4488f5fFd0129AA5F91C4f00fb6)

    Allows whitelisting agents, and setting, and retrieving information like their work and management address, name, description and icon.

* `FTestXRP`: [0x5905Df703221d4Ea311E85edEa860734b2072C7d](https://coston-explorer.flare.network/address/0x5905Df703221d4Ea311E85edEa860734b2072C7d)

    The FAsset-wrapped TestXRP token, ready to be used on Coston.

--8<-- "./include/fassets/setup-commandline.md"

### Configure the Access Keys

The FAsset agents operate with multiple keys for the Flare and underlying network chains. You should generate these keys to make the agent operational.

1. Create or use an existing management wallet that will be your agent's management address. Fund this wallet with some CFLR so you can pay the gas fees for various smart contract calls using the [Flare faucet](https://faucet.flare.network/).

2. Generate the secrets using this command by replacing the `MANAGEMENT_WALLET_ADDRESS` with your cold wallet address:

    ```console
    yarn key-gen generateSecrets --user --agent MANAGEMENT_WALLET_ADDRESS --other -o secrets.json
    ```

    --8<-- "./include/fassets/generate-keys-info.md"

3. Follow [the whitelisting process](#whitelist-the-management-address) to grant your agent's management address access to the FAssets system. While waiting for approval, you can proceed to the next steps.

4. The `secrets.json` file contains the `owner.native.address` field, representing the Flare account responsible for funding agent vaults and covering gas fees for smart contract calls. Please ensure this wallet has enough CFLR tokens to cover gas fees for smart contract calls. You can obtain CFLR tokens from the [Flare faucet](https://faucet.flare.network/).

5. Prevent other users from reading the `secrets.json` file:

    ```console
    chmod 600 secrets.json
    ```

6. Fill the `native_rpc`, `xrp_rpc` and `indexer` fields in the `secrets.json` file with the following values:

    ```json
    "native_rpc": "AavSehMLhcgz3crQHH5YJ3Rt8GMQGdV9aViGilADXGnTcjij",
    "xrp_rpc": "4tg3AxysaZodxTqsCtcMnBdBIEkR6KDKGTdqBEA8g9MKq4bH",
    "indexer": "123456",
    ```

    !!! info

        These values apply only to the [Coston Testnet](../../dev/reference/network-config.md) and will be different for other networks.

### Whitelist the Management Address

To access the FAssets system during the open beta, you must be whitelisted for security reasons.
This ensures only authorized participants interact with the system, maintaining a secure and controlled environment for testing and platform improvement.
The whitelisting process will be removed after the opening beta.

1. Find your agent owner address, which is the value from the `secrets.json` file in the `owner.management.address` field.
2. Use the [FlareFAssetsBot Telegram channel](https://t.me/FlareFAssetsBot), specifically designed for registration, and provide the necessary information, including your agent name and description and, optionally, a link to your icon.
3. Enter the information and confirm, and the Telegram bot will inform you about the successful process.
4. You need to wait for Flare support engineers to approve registrations and issue test assets such as Coston Flare (CFLR), testUSDC, testUSDT, and testETH assets, which will be sent to your `owner.management.address`.
While you wait, you can continue with the rest of this guide.
5. If the information you entered is correct, the Telegram Bot will notify you that you have been whitelisted for the FAssets Open Beta.

#### Check Whitelist Status

Checking if your agent's management address has been whitelisted is a straightforward process. Follow these steps:

1. Navigate with the Coston block explorer to `AgentOwnerRegistry` smart contract on address [0xDb6c11b8D074D4488f5fFd0129AA5F91C4f00fb6](https://coston-explorer.flare.network/address/0xDb6c11b8D074D4488f5fFd0129AA5F91C4f00fb6/read-contract#address-tabs) and open the Read Contract tab.
2. Connect your wallet with any address to the block explorer so you can gain access to read functions from the smart contract.
3. Execute the `isWhitelisted` function with the value of `owner.management.address` from the `secrets.json` file. This function returns `bool`: `true` for whitelisted or `false` for not whitelisted.

## Setting Up the Agent

### Configure the Native Address

Configuring the native address links your agent's work address to the management address and grants access.

1. Navigate with the Coston block explorer to `AgentOwnerRegistry` smart contract on address [0xDb6c11b8D074D4488f5fFd0129AA5F91C4f00fb6](https://coston-explorer.flare.network/address/0xDb6c11b8D074D4488f5fFd0129AA5F91C4f00fb6/write-contract#address-tabs) and open the Write Contract tab.

2. Connect the cold wallet you used to generate the access keys.

3. Register the work address by executing the `setWorkAddress` function with the value of `owner.native.address` from the `secrets.json` file.

### Configure the Agent

You need to set up your agent's parameters like name, collateral, and fund with underlying assets.

1. Prepare the agent settings `tmp.agent-settings.json` file:

    ```console
    yarn agent-bot --fasset FTestXRP create --prepare
    ```

2. Choose a suffix for your agent's collateral pool and fill in the `poolTokenSuffix` field in the `tmp.agent-settings.json` file with it.
The `poolTokenSuffix` should only include uppercase letters, numbers, and the `-` symbol.
This suffix will be used for the [FAsset Collateral Pool Token](../../tech/fassets/collateral.md#pool-collateral). For example, if you use `MY-ALPHA-AGENT-1`, it would be `FCPT-TXRP-MY-ALPHA-AGENT-1`.

3. Choose one of the stable tokens (`testUSDT` or `testUSDC`) or wrapped ETH in `vaultCollateralFtsoSymbol` to back up the agent vault collateral.

4. In the `secrets.json` file, the `owner.testXRP.address` field is the underlying testnet XRP Ledger account that pays the underlying chain's transaction fees.
Activate your underlying XRP Ledger account by sending at least 100 test-XRP to it by using one of the XRP Ledger testnet faucets:

    * [XRP Testnet Faucet](https://test.bithomp.com/faucet/)
    * [XRP Ledger Faucet](https://faucet.tequ.dev/)

5. Create the agent by specifying the FAsset and agent settings, noting that this operation can take up to 10 minutes because the FAssets verifies the underlying assets.
This command will print out your agent's address.

    ```console
    yarn agent-bot --fasset FTestXRP create tmp.agent-settings.json
    ```

### Deposit Collateral

To make your newly created agent public, it must hold enough [collateral](../../tech/fassets/collateral.md) to mint one lot.
This means its agent vault contract needs to be funded with the two collaterals (CFLR and a stablecoin or wrapped ETH) held by your `owner.native.address`.
Flare support sends test assets to your `owner.management.address`, so remember to move these funds to the `owner.native.address`.

You have two options: either deposit the vault collateral and buy pool collateral separately or use the system function to calculate the needed collateral for you.

#### Deposit Collaterals Together

To deposit both vault and pool collateral together and let the tool calculate the [minimum required collateral](../../tech/fassets/collateral.md#the-collateral-ratio) to back the lots, you can use the `depositCollateral` function to the agent, specifying your created agent address in the `AGENT_ADDRESS` and lot size in the `LOTS`:

```console
yarn agent-bot depositCollaterals AGENT_ADDRESS LOTS --fasset FTestXRP
```

#### Deposit Collateral Separately

1. Deposit enough vault collateral to the agent specifying your created agent address in the `AGENT_ADDRESS` and the amount of the stablecoin or wrapped ETH in the `AMOUNT` field.

    ```console
    yarn agent-bot depositVaultCollateral AGENT_ADDRESS AMOUNT --fasset FTestXRP
    ```

2. Buy enough pool collateral for the agent specifying your agent's address in the `AGENT_ADDRESS` and the amount of the CFLR in the `CFLR_AMOUNT` field.

    ```console
    yarn agent-bot buyPoolCollateral AGENT_ADDRESS CFLR_AMOUNT --fasset FTestXRP
    ```

### Register the Agent as Available

You need to make your agent available to mint and redeem FAssets.

1. Register your agent as available to the network by executing this command replacing the `AGENT_ADDRESS` with your agent address:

    ```console
    yarn agent-bot enter AGENT_ADDRESS --fasset FTestXRP
    ```

    !!! info

        Note that your agent owner's Flare account has to be whitelisted via the [FlareFAssetsBot Telegram channel](https://t.me/FlareFAssetsBot).
        Otherwise, it will fail.

2. If you deposited enough collateral, you should see that your agent has at least one lot available by running the command.

    ```console
    yarn user-bot agents --fasset FTestXRP
    ```

If you don't have available lots, check if the vault and pool [collaterals are enough](../../tech/fassets/collateral.md#the-collateral-ratio).

## Running the Agent

The agent bot responds to all requests made to the agent vaults you have created.
To run the agent bot, you need to run the following command:

```console
yarn run-agent
```

When you want to stop the server, press Ctrl + C.

!!! info

    Run the run-agent as a service to maximize uptime for production use. Here, you have instructions to run the agent as a `systemd` service for [running the bot as a daemon](https://github.com/flare-labs-ltd/fasset-bots/blob/main/docs/systemd/systemd-service.md).

## Related Docs

* [Minting and Redeeming FAssets](../../user/fassets/minting-redeeming.md)
* [FAssets Open Beta](../../tech/fassets/open-beta.md)
