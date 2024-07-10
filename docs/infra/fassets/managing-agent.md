---
title: Managing an Agent with the Admin Console
---

# Managing an FAssets Agent with the FAssets Agent Admin Console

The FAssets Agent Admin Console (Admin Console) helps you manage agent tasks like depositing collateral and setting up alerts.

Although managing the [agent bot](../../tech/fassets/index.md#agents) is simplified by the Admin Console UI, installation of both the agent bot and the Admin Console UI is done from the command line.

The following procedures teach you how to configure the components required to use the Admin Console, including:

* A backend that reads the state of the agent bot and makes it available to the UI
* The UI, which talks to the backend

Afterward, these procedures explain how to use the Admin Console to manage agent tasks.

--8<-- "./include/fassets/open-beta.md"

## Prerequisites

You need to [have deployed an agent bot and have it running](./deploying-agent.md).

## Configuration Guide

### Configuring the Backend Bot

After you have successfully deployed the agent bot and it is running, you can configure the backend that links it with the Admin Console UI.

1. In the folder where you installed the agent bot (typically `fasset-bots`), navigate to `packages/fasset-bots-api`, and create an `.env` file.
    This file is not the same file that you created when you deployed the bot.
2. Copy the following text, and paste it into the `.env` file you just created:

    ```ini
    ## Path to config file for the agent bot (and other bots)
    FASSET_BOT_CONFIG="../fasset-bots-core/run-config/coston-bot.json"

    ## Path to secrets file for the agent bot (and other bots)
    FASSET_BOT_SECRETS="../../secrets.json"

    ## Enable the following line on Windows to allow reading secrets, since
    ## secrets file permission check does not work
    # ALLOW_SECRETS_ON_WINDOWS=true

    ## (Optional) Path to config file for users, instead you can use `-c`
    ## parameter
    # FASSET_USER_CONFIG="../fasset-bots-core/run-config/coston-user.json"

    ## (Optional) Path to secrets json file for users, instead you can use `-s`
    ## parameter.
    # FASSET_USER_SECRETS=""

    ## (Optional) Path to directory, used for storing unexecuted minting.
    ## Defaults to `fasset` subdirectory in user's home directory.
    # FASSET_USER_DATA_DIR=""

    ## (Optional) Path to database file for the bot.
    FASSET_BOT_SQLITE_DB="../../path-to-.db-file"
    ```

3. Choose one of the following options:
    * If you already have [agent vaults](../../tech/fassets/collateral.md#vault-collateral):
        1. Navigate to the root of the `fasset-bots` repository, and locate the `.db` file.
            The file name will be in the
             `fasset-bots-coston.SOME_HEX_VALUE.db` format.
        2. Copy the file name of the `.db` file.
        3. Return to the `.env` file you created in step 1, and paste the file name of the `.db` file as the value for `FASSET_BOT_SQLITE_DB`.
            For example, `FASSET_BOT_SQLITE_DB="../../fasset-bots-coston.43B835D3.db"`.
    * If you do not have [agent vaults](../../tech/fassets/collateral.md#vault-collateral):
        1. Open the `.env` file you created when you deployed the agent bot, and add 
            `FASSET_BOT_SQLITE_DB ="./fasset-bots-coston.db"`.
        2. Open the `.env` file you created in step 1, and specify `../../fasset-bots-coston.db` as the value of `FASSET_BOT_SQLITE_DB`.

### Enabling Alerts

You can enable alerts to be sent to the backend and displayed in the frontend.

1. In the root of the respository, create a file named `alerts.json`.
2. Copy the following text and paste it into the `alerts.json` file.

    ```json
    {
         "extends": "coston-bot.json",
         "apiNotifierConfigs": [
         {
                 "apiKey": "",
                 "apiUrl": "http://localhost:1234/"
         }
         ]
    }
    ```

3. Open the `.env` file in this same folder, and change the path specified for `FASSET_BOT_CONFIG` to the `alerts.json` file:

    ```ini
    FASSET_BOT_CONFIG="./alerts.json"
    ```

### Running the Admin Console Backend

1. In the root of the repository, run the command:

    ```bash
    yarn start_agent_api_debug
    ```

This command must continue to run for as long as you intend to use the UI.
When you are finished using the UI and want to stop the server, press Ctrl + C.

!!! info

    Run start_agent_api_debug as a service to maximize uptime for production use. Here, you have instructions to run the agent as a `systemd` service for [running the bot as a daemon](https://github.com/flare-labs-ltd/fasset-bots/blob/main/docs/systemd/systemd-service.md).

### Setting Up the Admin Console

1. Navigate outside of the `fasset-bots` folder.
2. Clone the UI repository and enter the `src` directory:

    ```bash
    git clone https://github.com/flare-labs-ltd/fasset-agent-ui.git
    cd fasset-agent-ui/src
    ```

3. Create `.env` file, copy the following text, paste it in the `.env` file, and save it.

    ```ini
    WALLETCONNECT_PROJECT_ID=44e7bd998ec5a65ca096ab99c9b71af8
    API_URL=http://localhost:1234/api
    ```

### Running the Admin Console

1. Ensure both the [agent bot](deploying-agent.md#running-the-agent) and the [backend](#run-the-fasset-bots-backend) are running.
2. Navigate to the `src` directory.
3. You can run the app locally or from Docker:
    * To run the app locally:
        1. Run `npm install`.
        2. Run `npm run dev`.
        3. Open <http://localhost:3000> in a browser.
    * To run the app from Docker:
        1. Run `docker-compose up -d --build`.
        2. Open <http://localhost:3000> in a browser.

    The Admin Console dashboard is displayed.

    <figure markdown>
    ![Admin Console dashboard](fassets-admin-dashboard.png){ loading=lazy .allow-zoom }
    <figcaption>Admin Console dashboard.</figcaption>
    </figure>

## Usage Guide

Ensure the [agent bot](deploying-agent.md#running-the-agent), the [backend](#run-the-fasset-bots-backend), and the [Admin Console](#running-the-admin-console) are running and that <http://localhost:3000> is open in a browser showing the Admin Console dashboard.

The Admin Console dashboard shows:

* The agent's management address, which you [configured in the `secrets.json` file](./deploying-agent.md#configure-the-access-keys)
* The [whitelist status](./deploying-agent.md#whitelist-the-management-address) of the management address
* One or more of the agent's bots, all of which are managed from the one management address, and the agents' vaults
* A list of alerts, if you [enabled them](#enabling-alerts), and notifications sent from Flare

### Connecting to the Admin Console

Some operations in the Admin Console can be done only by the management address, so you must connect using this address.

1. On the Admin Console dashboard, click **Connect Wallet**, and sign in with your management address.

### Adding Agent Vaults

1. On the Admin Console dashboard, locate the agent bot for which you want to add a vault, and click the three dots icon in the **Actions** column.
    The **Agent Bot Actions** menu is displayed.
2. Click **Add Vault**.
3. Specify values for required settings [**FASSET TYPE**](../../tech/fassets/index.md#fasset-type), [**VAULT COLLATERAL TOKEN**](../../tech/fassets/collateral.md#vault-collateral), and the [**POOL TOKEN SUFFIX**](../../tech/fassets/collateral.md#pool-collateral).
    The suffix identifies your vault and is used to complete the name of the collateral pool token (CPT).
    For example, `LBD`.
4. If necessary, adjust the default values for the other settings.
5. Click **Save and execute**, and then click **Confirm** to proceed.

### Changing Agent Vault Settings

1. In the **Vaults** section on the dashboard, locate the [agent vault](../../tech/fassets/collateral.md#vault-collateral) you want to modify, and click the three dots icon in the **Actions** column.
    The **Vault options** menu is displayed.

    <figure markdown>
    ![Vault Options](fassets-admin-vaults-menu.png){ loading=lazy .allow-zoom }
    <figcaption>Vault Options.</figcaption>
    </figure>

2. Under **Vault actions**, click **View Vault**.
    The settings for the agent vault are displayed.

    <figure markdown>
    ![Agent Vault Settings](fassets-admin-vaults-view.png){ loading=lazy .allow-zoom }
    <figcaption>Admin Vault Settings.</figcaption>
    </figure>

3. Click **Edit** at the top of the page.
4. Update your settings.
    These settings always have [time locks](../../tech/fassets/parameters.md#time-locks) to minimize abuse.
    During the Open Beta, the time-locks are further reduced so that you can try different configurations.
    Before you save your updates, ensure you understand the [time-locks associated with settings](../../tech/fassets/parameters.md#time-locks) you are changing.
5. Click **Save and execute**.

### Depositing Vault Collateral

1. In the **Vaults** section on the dashboard, locate the [vault](../../tech/fassets/collateral.md#vault-collateral) you want to update, and click the three dots icon in the **Actions** column.
    The **Vault options** menu is displayed.
2. In the **Agent Vault Operations** section, click **Deposit collateral**.
    The **Deposit Collateral** window is displayed.
3. In the **AMOUNT** field, specify the amount of collateral to deposit into the vault.
    You can deposit only the type of collateral that your vault was created to support.
    For example, if you created a `testUSDC` vault, you can deposit only `testUSDC`.
4. Click **Deposit**.
    A confirmation message is displayed.

### Depositing Pool Collateral

1. In the **Vaults** section on the dashboard, locate the [vault](../../tech/fassets/collateral.md#pool-collateral) you want to update, and click the three dots icon in the **Actions** column.
    The **Vault options** menu is displayed.
2. In the **Agent Vault Operations** section, click **Deposit FLR in Pool**.
    The **Deposit FLR in Pool** window is displayed.
3. In the **AMOUNT FLR** field, specify the amount of `$FLR` to deposit into the collateral pool.
4. Click **Deposit**.
    A confirmation message is displayed.

### Activating and Closing Vaults

Activating a vault makes it publicly available for minting FAssets.
To be activated, a vault must contain at least 1 [lot](../../tech/fassets/minting.md#lots) for minting.

Closing a vault makes it unavailable for minting FAssets.

* To activate a vault:
    1. On the dashboard, locate the [vault](../../tech/fassets/collateral.md#vault-collateral) you want to activate, and click the three dots icon in the **Actions** column.
        The **Vault options** menu is displayed.
    2. In the **Agent Vault Operations** section, click **Activate Vault (Enter)**.
        The **Activate Vault** window is displayed.
    3. Read the message in the **Activate Vault** window about minting requirements, ensure your vault contains at least 1 lot to meet the requirement, and then click **Confirm** to activate the vault.
        A confirmation message is displayed.

* To close a vault:

    1. On the dashboard, locate the [vault](../../tech/fassets/collateral.md#vault-collateral) you want to close, and click the three dots icon in the **Actions** column.
        The **Vault options** menu is displayed.
    2. In the **Agent Vault Operations** section, click **Close Vault (Exit)**.
        The **Deactivate Vault** window is displayed.
    3. Ensure you want to close the vault, and click **Confirm** to close it.
        A confirmation message is displayed.
