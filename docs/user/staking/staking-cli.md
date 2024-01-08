---
title: Using the Command Line
---

# Using the Command Line to Stake

Flare has a command-line interface (CLI) tool called FlareStake CLI, which allows performing stake operations on validator nodes from a terminal.

A staking app with a graphical user interface (GUI) is also available to simplify the staking process.
See the [Using FlareStake to Stake](./staking-flarestake.md) guide to learn about it.
Still, a CLI tool has other advantages, like allowing it to be part of automated processes.

!!! question "Table of Contents"

    * [Staking Overview](#staking-overview): What you need to know about staking.
    * [Installing the Flare Stake CLI](#installing-the-flare-stake-cli): Install required tools.
    * [Staking Guide](#staking-guide): How to perform staking.
    * [Claiming Guide](#reward-claiming-guide): How to claim staking rewards.
    * [Troubleshooting](#troubleshooting): Addressing common issues.

## Staking Overview

If you already know how staking on validators works on the Flare network, skip this section.

!!! note

    Proof of stake is being implemented on Flare in phases.
    Ensure that you have read the [Validators page](../../tech/validators.md#deployment-phases) to learn about them.

Staking works by locking funds for a period of time to support a specific [network validator](../../tech/validators.md).
When validator owners stake to their own nodes they _self-bond_, whereas all other participants are said to _delegate_ their stake to that validator.

Participants choose how much to stake and for how long their stake will be locked.
The minimum values are:
{ #minimum-values }

|                  | Self-bond | Delegation |
| ---------------- | --------: | ---------: |
| Minimum amount   | 1M `$FLR` | 50K `$FLR` |
| Minimum duration |   60 days |    14 days |

At the end of every [reward epoch](../../tech/ftso.md#reward-epoch), participants are rewarded according to how well their chosen validator performed in that period.

!!! info "Staking amounts and rewards are limited"

    When you choose your validator and amount to stake, consider the [delegation factor and the staking cap](./index.md#limits).

The [deployment phases summary](../../tech/validators.md#summary) shows other rewards that staked funds can still earn while they are locked.

Given that the Flare network uses two [independent underlying chains](../../tech/flare.md#flare-chains), there is one extra step that must be considered.
Funds must be transferred from the C-chain, where smart contracts run, to the P-chain, where staking happens.
After the staking period expires and funds are unlocked, they can be transferred back to the C-chain.

This guide explains how to perform the above operations using the Flare Stake CLI tool.

## Installing the Flare Stake CLI

This tool is open source, so it can be installed from [its source code](https://github.com/flare-foundation/p-chain-staking-code).
However, it is more convenient to use the [prepackaged npm version](https://www.npmjs.com/package/@flarenetwork/flare-stake-tool).

The Flare Stake CLI works on Windows, Mac, and Linux.

!!! note

    It is not recommended to run this tool using the Windows Subsystem for Linux (WSL), as it might have issues accessing hardware wallets through USB ports.
    On Windows, use the standard Windows command prompt or terminal instead.

### Prerequisites

[Install the npm package manager](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
This guide has been tested with **Node.js v18.16.0** and **npm v9.5.1**.

### Installation

After npm is available, type this command into a terminal to make the tool available from any folder:

```bash
npm install @flarenetwork/flare-stake-tool -g
```

Check that the tool has been correctly installed by running:

```bash
flare-stake-tool
```

The tool's banner is displayed:

```text
  _____ _                  ____  _        _           ____ _     ___
 |  ___| | __ _ _ __ ___  / ___|| |_ __ _| | _____   / ___| |   |_ _|
 | |_  | |/ _` | '__/ _ \ \___ \| __/ _` | |/ / _ \ | |   | |    | |
 |  _| | | (_| | | |  __/  ___) | || (_| |   <  __/ | |___| |___ | |
 |_|   |_|\__,_|_|  \___| |____/ \__\__,_|_|\_\___|  \____|_____|___|

Version: 3.0.2
```

Make sure at least version **3.0.0** has been installed.

### Configuration

You can specify the account from which staking will take place in different ways.

Choose one of the following two options.

Note that using a [Ledger hardware wallet](https://www.ledger.com) is the only recommended way.

??? example "Ledger Configuration"

    Your device must be configured before it can be used:
    { #ledger-configuration }

    1. **Install the Avalanche application**:
        1. Connect the device to your computer and unlock it using your PIN code.
        2. Open the [Ledger Live](https://www.ledger.com/ledger-live) application.
            Go to the **My Ledger** tab and make sure the device is using the latest firmware.
        3. In the **App catalog** tab, search for "Avalanche" and click on the **Install** button.

            Note that this app requires all available space on a **Ledger Nano S** device (138 KB).
            You might need to remove other apps first to free up space.

    2. **Select your desired account**:
        1. Exit the Ledger Live application and make sure the device is not connected to any other application like MetaMask.
        2. Open the Avalanche app on the Ledger. The screen should show "Avalanche Ready".
        3. From a terminal, enter:

            ```text
            flare-stake-tool interactive
            ```

            This command starts the staking tool in interactive mode.
            In this mode the tool asks questions until it has enough information to execute a command.

        4. Then, after the welcome banner:

            ```text
            ? How do you want to connect your wallet? (Use arrow keys)
            > Ledger
              Public Key
              Private Key (not recommended)
            ```

            Select **Ledger** with the cursor keys and press **Enter**.

        5. The next question is:

            ```text
            ? Which network do you want to connect to? (Use arrow keys)
            > Flare (Mainnet)
              Coston2 (Testnet)
              LocalHost (for development only)
            ```

            Select **Flare (Mainnet)** and press **Enter**.

            This message shows for a few seconds:

            ```text
            Fetching Addresses...
            ```

        6. Eventually a list of addresses is shown.
            These are the addresses that can be used from this device.

            Choose the one you want to stake from and press **Enter**.

            Keep in mind that this address needs to have a positive `$FLR` balance to pay for transaction fees and be able to stake.
            You can transfer funds to it later on.

        7. Finally the main menu appears:

            ```text
            ? What do you want to do? (Use arrow keys)
              View chain addresses
            > Check on-chain balance
              Get network info
              Get validator info
              Move assets from C-chain to P-chain
              Move assets from P-chain to C-chain
              Add a validator node
            ```

            As an example, choose **Check on-chain balance** and press **Enter**.

            The balance of your selected account is shown for both the C-chain and the P-chain and the tool exits.

        At this point, a `ctx.json` file has been created in the current folder containing the selected account.
        When you run the tool from the same folder again, you will be given the option to use the same account.
        Using the same account saves you the inconvenience of repeating the above steps every time.

??? example "Private Key Configuration"

    If you have a Ledger device and you have already configured it, skip this step.
    { #private-key-configuration }

    If you do not have access to a Ledger device, you can still provide your account's private key in a plain text file, but this method is **significantly less secure**.

    1. Create a text file in a secure folder, i.e., one that is visible only to you.
        Give it any name you want.
    2. Inside, add one of the following two lines, depending on the format of your private key:

        ```text
        PRIVATE_KEY_CB58=""
        PRIVATE_KEY_HEX=""
        ```

        If your key is in [CB58](https://support.avax.network/en/articles/4587395-what-is-cb58) format, use the `CB58` line.
        If your key is 64 hexadecimal characters, use the `HEX` line.
        Put the key inside the quotes.
    3. Enter this command on a terminal to check that the key works correctly:

        ```text
        flare-stake-tool interactive
        ```

        This command starts the staking tool in interactive mode.
        In this mode the tool asks questions until it has enough information to execute a command.

    4. After the welcome banner you see:

        ```text
        ? How do you want to connect your wallet? (Use arrow keys)
          Ledger
          Public Key
        > Private Key (not recommended)
        ```

        Select **Private Key** with the cursor keys and press **Enter**.

    5. The next question is:

        ```text
        Warning: You are connecting using your private key which is not recommended
        ? Enter Path to Private Key file (E.g. /home/wallet/pvtKeyFile):
        ```

        Enter the name and path to the file you and created in step 1 and press **Enter**.

    6. Then:

        ```text
        ? Which network do you want to connect to? (Use arrow keys)
        > Flare (Mainnet)
          Coston2 (Testnet)
          LocalHost (for development only)
        ```

        Select **Flare (Mainnet)** and press **Enter**.

    7. Finally the main menu appears:

        ```text
        ? What do you want to do? (Use arrow keys)
          View chain addresses
        > Check on-chain balance
          Get network info
          Get validator info
          Move assets from C-chain to P-chain
          Move assets from P-chain to C-chain
          Add a validator node
        ```

        As an example, choose **Check on-chain balance**, and press **Enter**.

        The balance of your selected account is shown for both the C-chain and the P-chain and the tool exits.

    You can follow the rest of this guide by selecting the **Private Key** option when prompted.

## Staking Guide

To stake on a validator node, you need to:

1. Check your current P-chain balance.
2. Move funds from the C-chain to the P-chain.
3. Stake them on a validator.
4. Optionally, check that the request has been recorded.
5. Optionally, move the staked funds back to the C-chain once they become unlocked.
    { #before-you-start }

!!! tool "Before you start"

    During the process you will need three pieces of information.
    Take note of them before you start so you can follow the rest of the steps uninterrupted.

    * The **node ID** of the validator you want to stake to.

        If you created the validator, its `nodeID` was shown to you during the [deployment process](../../infra/observation/deploying.md).

        If you want to stake to somebody else's validator, you can:

        * Obtain a list of current validators from any of the tools listed in [the Staking page](./index.md).
            Remember to add the `NodeID-` prefix if it is missing from the listed ID.
        * Use `flare-stake-tool info validators` to get a JSON list of all validators.

    * The desired staking **start time** and **end time**.

        When staking to an existing validator, both these times must be inside the period when the validator is active,
        which you can find in the lists of any of the above tools, or using `flare-stake-tool info validators`.
        If you specify a period when the validator is inactive, your transaction on the P-chain reverts.

        You need to provide these times as a [UNIX timestamp](https://en.wikipedia.org/wiki/Unix_time),
        so you might need to use an online conversion tool like [Epoch Converter](https://epochconverter.com) or the Linux `date` command.

        As an example, the 1693185095 timestamp corresponds to Monday, August 28, 2023 1:11:35 AM.

### 1. Check your Balances

Check your balance by executing `flare-stake-tool interactive` and selecting the **Check on-chain balance** option:

```text hl_lines="7"
? How do you want to connect your wallet? Ledger
You already have an existing Ctx file with the following parameters -
Public Key: ●●●●●●●●●●●●●●●●
Network: flare
Eth Address: 0x●●●●●●●●
? Do you wish to continue with this? yes
? What do you want to do? Check on-chain balance
Using network: flare
Balances on the network "flare"
C-chain 0x●●●●●●●●: 100000.0 FLR
P-chain P-flare●●●●●●●●: 50000.0 FLR
```

Your currently available funds on the C-chain and P-chain are shown in the last lines.

Funds currently staked are locked and are not reflected in the P-chain balance.
They will become automatically available when the staking period expires.

### 2. Move Funds to P-Chain

If your funds are already on the P-Chain, skip this step.

Move the funds by executing `flare-stake-tool interactive` again and selecting the **Move assets from C-chain to P-chain** option.
You are asked the amount of `$FLR` you want to transfer:

```text
? What do you want to do? Move assets from C-chain to P-chain
? Enter amount (in FLR): 50000
```

!!! warning "Transaction Fees"

    When transferring from the C-chain to the P-chain, transaction fees are wholly paid from the C-chain.
    Make sure you leave enough funds on the C-chain after the transfer, or it will fail.

Transfers between chains are made of two operations: an **export** from the C-chain followed by an **import** to the P-chain.
Therefore, you are asked to confirm TWO transactions on your hardware wallet.

```text hl_lines="1 9"
Please approve export transaction
Using network: flare
Fetching account from ledger...
Creating export transaction...
Using fee of 0.00028075 FLR
Please review and sign the transaction on your ledger device...
Sending transaction to the node...
Transaction with id ●●●●●●●● sent to the node
Please approve import transaction
Using network: flare
Fetching account from ledger...
Creating export transaction...
Please review and sign the transaction on your ledger device...
Sending transaction to the node...
Transaction with id ●●●●●●●● sent to the node
Finished execution
```

You can [check your balances](#1-check-your-balances) again to verify that the transfer was successful.

If you encounter any problem, see the [Troubleshooting](#troubleshooting) section.

### 3. Stake

After you have funds on the P-chain, execute `flare-stake-tool interactive` again and select the appropriate option:
If you are going to delegate to your own node (self-bonding), select **Add a validator node**.
Otherwise, if you are going to stake to another node (delegation), select **Delegate to a validator node**.
Press the down key a few times for this last option to show.
{ #address-binding }

!!! tip "First-time Address Registration"

    The first time you use the **Add a validator node** or **Delegate to a validator node** options you are asked to sign an additional transaction.

    This step is required so that staking rewards accrued on the P-chain can be claimed on the C-chain and participate in the wider ecosystem.

    This procedure only needs to be done once per P-chain address and it progresses like this:

    ```text hl_lines="4"
    Checking Address Registration...
    No address found for key 0x●●●●●●●●
    Note: You need to register your wallet address before you can delegate your funds
    Please complete this registration transaction to proceed
    Submitting txn to the chain
    ```

    ??? information "Cryptographical Background"

        Both your P-chain and C-chain addresses are derived from the same public key, but the process is not symmetrical:
        public keys cannot be derived from addresses.

        Therefore, smart contracts have no way of knowing the P-chain address that corresponds to a given C-chain address, unless they are both provided by their owner.

        This step performs exactly this operation, allowing a C-chain address to claim rewards that were accrued by its P-chain counterpart.

    ??? information "Manual Address Registration"

        Should automatic registration through the Flare Stake CLI tool fail, you can still register your addresses manually using the Block Explorer:

        1. Retrieve the public key that generated the accounts you want to use.
            From a terminal, run `flare-stake-tool info addresses` and copy the long hexadecimal string starting with `0x` in the last line.

            ```text hl_lines="5"
            Using network: flare
            Addresses on the network "flare"
            P-chain address: P-flare●●●●●●●●
            C-chain address hex: 0x●●●●●●●●
            secp256k1 public key: 0x●●●●●●●●●●●●●●●●
            ```

        2. You need to interact with the `AddressBinder` smart contract, so you must retrieve its address from the `FlareContractRegistry` as explained in the [retrieving Contract Addresses page](../../dev/getting-started/contract-addresses.md).
        3. Enter the address of the `AddressBinder` contract in the [Block Explorer](../block-explorers/index.md), and go to the **Write Contract** tab.
        4. Click on **Connect Wallet**.
            You do not need to use the same account as the one you are binding.
        5. Locate the `registerPublicKey` method and paste the public key from step 1 into the `_publicKey` field.
        6. Click on **Write** and confirm the transaction from your wallet.

        If the transaction is successful, your account's P and C-chain addresses are now bound.

You then need to provide the following information:

* **Amount to stake**: With the restrictions [stated above](#minimum-values).
    Amount must be provided in FLR units.
* **Validator's NodeID**: As explained in the [Before you start section](#before-you-start).
* **Start time**: As explained in the [Before you start section](#before-you-start).
* **End time**: As explained in the [Before you start section](#before-you-start).

If you selected **Add a validator node**, you have one more question to answer:

* **Delegation fee**: This is the percentage of all rewards that the node owner keeps.
    The rest is split proportionally between the self-bond and all delegators that contributed stake.

    10 means 10%, so the maximum value is 100.

```text hl_lines="1"
? What do you want to do? Add a validator node
? Enter amount (in FLR): 50000
? Enter Node NodeId (E.g. NodeID-FQKTLuZHEsjCxPeFTFgsojsucmdyNDsz1): NodeID-●●●●●●●●
? Enter start time(E.g. 1693185095): ●●●●●●●●
? Enter end time(E.g. 1693185095): ●●●●●●●●
? Enter delegation fee(E.g. 10): 10
```

You are then asked to confirm the staking transaction on your hardware wallet.

```text hl_lines="4"
Using network: flare
Fetching account from ledger...
Creating export transaction...
Please review and sign the transaction on your ledger device...
Sending transaction to the node...
Transaction with id ●●●●●●●● sent to the node
Finished execution
```

Your stake is now locked and will start accruing rewards after the configured start time arrives.
When the end time arrives, the funds will be automatically unlocked.

If you encounter any problem, see the [Troubleshooting](#troubleshooting) section.

### 4. Check Stake

You can double-check that the operation has been properly registered by looking at the current list of validators:

```bash
flare-stake-tool info validators > validators.txt
```

This creates a file called `validators.txt`.
Open it and search for the line containing the **P-chain address** of your account.
If you don't know it, use `flare-stake-tool info addresses`.

If your account has stake on any node, you will find a section similar to:

```json hl_lines="11"
{
  "txID": "28Yf5yQ3xt9yaMvfZ1RP5jkCkT4y2pfD86UheZUHFVng2tFcWd",
  "startTime": "1688569201",
  "endTime": "1696345201",
  "stakeAmount": "16750000000000000",
  "nodeID": "NodeID-C6i8mruq11VdxGQ7tiUBgrRqoLBot86df",
  "rewardOwner": {
    "locktime": "0",
    "threshold": "1",
    "addresses": [
      "P-flare19c8zfml39x6efnw5j90nl85dmwdqhluwhrxz9g"
    ]
  },
},
```

Check that the `stakeAmount` (in wei), `nodeID`, `startTime`, and `endTime` match the values you configured.

If you have multiple active stakes, your address can show multiple times.

### 5. Move funds back to C-Chain

Finally, you also have the option to move your P-chain funds back to the C-chain where they can participate in the wider ecosystem.

You can only transfer P-chain funds that are not currently locked in any stake.

Execute `flare-stake-tool interactive` and select the **Move assets from P-chain to C-chain** option.
You are asked the amount of `$FLR` you want to transfer:

```text
? What do you want to do? Move assets from P-chain to C-chain
? Enter amount (in FLR): 50000
```

!!! warning "Transaction Fees"

    When transferring from the P to the C-chain, transaction fees are paid from BOTH chains.
    Make sure you leave enough funds on both chains after the transfer, or it will fail.

Again, the transfer between the two chains require you to confirm TWO transactions on your hardware wallet.

```text hl_lines="1 8"
Please approve export transaction
Using network: flare
Fetching account from ledger...
Creating export transaction...
Please review and sign the transaction on your ledger device...
Sending transaction to the node...
Transaction with id ●●●●●●●● sent to the node
Please approve import transaction
Using network: flare
Fetching account from ledger...
Creating export transaction...
Using fee of 0.00028075 FLR
Please review and sign the transaction on your ledger device...
Sending transaction to the node...
Transaction with id ●●●●●●●● sent to the node
Finished execution
```

You can [check your balances](#1-check-your-balances) again to verify that the transfer was successful.

If you encounter any problem, see the [Troubleshooting](#troubleshooting) section.

## Reward Claiming Guide

At the end of every [reward epoch](../../tech/ftso.md#reward-epoch), participants are rewarded according to how well their chosen validator performed in that period, but these rewards are not claimable yet.

Every 4 reward epochs, rewards are accumulated in a dedicated smart contract and can then be claimed from the Flare Stake CLI tool:

Execute `flare-stake-tool interactive` and select the **Claim Rewards** option.
Press the down key a few times for this option to show.

You are shown the amount of pending rewards (in wei) and are asked how much you want to claim (in FLR):

```text hl_lines="1 4 5 6"
? What do you want to do? Claim Rewards
Checking your Rewards status...
You have unclaimed rewards worth 1000000000000000000
? Enter amount to claim (in FLR): 1
```

Next, select **Receive with another wallet** and enter the C-chain address where you want the rewards to be sent.
This can be the same address from where you are staking.

```text hl_lines="1 2"
? Where do you want to receive your rewards? Receive with another wallet
? Please enter the C-address where you want to receive your rewards: 0x●●●●●●●●
```

You are then asked to confirm the staking transaction on your hardware wallet.

```text hl_lines="1"
Please sign the transaction on your ledger
Submitting txn to the chain
Rewards successfully claimed
Finished execution
```

??? information "Manual Reward Claiming"

    Rewards can also be claimed directly from the `ValidatorRewardManager` contract that accumulates them:

    1. You need to interact with the `ValidatorRewardManager` smart contract, so you must retrieve its address from the `FlareContractRegistry` as explained in the [retrieving Contract Addresses page](../../dev/getting-started/contract-addresses.md).
    2. Enter the address of the `ValidatorRewardManager` contract in the [Block Explorer](../block-explorers/index.md), and go to the **Write Contract** tab.
    3. Click on **Connect Wallet**.
        You need to connect the account for which you are claiming.
    4. Locate the `claim` method and enter the following information:

        * **_rewardOwner**: C-chain address that accrued the rewards.
        * **_recipient**: Address where the rewards must be sent.
        * **_rewardAmount**: Amount to claim.
            Find the pending amount using the `getStateOfRewards` method in the **Read Contract** tab.
        * **_wrap**: Whether the rewards should be also wrapped, as a convenience.

    5. Click on **Write** and confirm the transaction from your wallet.

    If the transaction is successful, the reward is transferred to the specified recipient.

## Troubleshooting

??? example "Cannot connect to Ledger device, No Device, Cannot retrieve addresses, or similar"

    Make sure:

    * The device is connected, the Avalanche app is opened, and it shows the "Avalanche Ready" message.

    * No other application like Ledger Live or MetaMask is connected to the device.

    * The device is not in stand-by mode.

    * You are not running on Windows from a Linux terminal (WSL).
        Use a native Windows console instead.

??? example "Insufficient funds"

    Make sure enough funds will remain after a transaction to pay for the transaction fees.

    If too much time has elapsed between the transaction's creation and its confirmation on the Ledger, the calculated fee might be incorrect.
    Try the operation again.

    The network might be congested and the calculated fees might not be high enough.
    Try the operation again after a while.

??? example "Import transaction failed and the funds have vanished"

    Transfer operations require [an export and an import transaction](#2-move-funds-to-p-chain).
    If the export succeeds, but then the import fails, it looks like the funds have disappeared from both chains, but they are still retrievable.

    Repeat the failed import operation manually:

    * If you are moving funds from the C-chain to the P-chain:

        ```bash
        flare-stake-tool transaction importCP --ledger --blind
        ```

    * If you are moving funds from the P-chain to the C-chain:

        ```bash
        flare-stake-tool transaction importPC --ledger --blind
        ```

??? example "Unsupported digital routines"

    If you get the following error message:

    ```text
    E: Error: error:0308010C:digital envelope routines::unsupported
    ```

    Make sure you are using the correct Node.js version, as advised in the [Prerequisites section](#prerequisites).

    You can find out the version of Node.js you are running with the following command:

    ```bash
    node --version
    ```
