---
title: Using FlareStake
---

# Using FlareStake to Stake

[FlareStake](https://staking.flare.network) is a graphical user interface (GUI) that enables you to easily stake your funds to validators and earn rewards.

Staking works by locking funds for a period of time to support a specific [network validator](../../tech/validators.md).
When validator owners stake to their own nodes they _self-bond_, whereas all other participants are said to _delegate_ their stake to that validator.
Note that delegating your stake to a validator is different from [FTSO delegation](../../tech/ftso/index.md/#delegation).

!!! note

    Proof of stake is being implemented on Flare in phases.
    Ensure that you have read the [Validators page](../../tech/validators.md#deployment-phases) to learn about them.

Participants choose how much to stake and for how long their stake will be locked.
The minimum values are:
{ #minimum-values }

|                  | Self-bond | Delegation |
| ---------------- | --------: | ---------: |
| Minimum amount   | 1M `$FLR` | 50K `$FLR` |
| Minimum duration |   60 days |    14 days |

At the end of every [reward epoch](../../tech/ftso/index.md#reward-epoch), participants are rewarded according to how well their chosen validator performed in that period.

!!! info "Staking limits"

    When you choose your validator and amount to stake, consider the [delegation factor and the staking cap](./index.md#limits).

    You can stake to any number of validators, but [rewards](./staking-flarestake.md#reward-claiming-guide), [FlareDrops](../../tech/the-flaredrop.md), and [governance vote power](../../tech/governance.md#the-vote-count-block) only apply for up to 3 different validators.

The [deployment phases summary](../../tech/validators.md#summary) shows other rewards that staked funds can still earn while they are locked.

Given that the Flare network uses two [independent underlying chains](../../tech/flare.md#flare-chains), there is one extra step that must be considered.
Funds must be transferred from the C-chain, where smart contracts run, to the P-chain, where staking happens.
After the staking period expires and funds are unlocked, they can be transferred back to the C-chain.

This guide explains how to stake Flare assets by using [FlareStake, the GUI tool for staking](https://staking.flare.network).
Another tool exists which uses the command line exclusively.
See the [Using the CLI to Stake](./staking-cli.md) guide to learn about it.

## Prerequisites

* A [Ledger hardware wallet set up to manage Flare assets](../wallets/how-to-access-flare-network-with-a-ledger-device.md).
* Knowledge of the available validators to which you want to delegate your funds.
    Obtain a list of current validators from any of the tools listed in [the Staking page](./index.md).

## Accessing Your Wallet

1. Open [FlareStake](https://staking.flare.network).
2. Click **Access Wallet**.
3. Click **Ledger**.

    Make sure your Ledger device is plugged in, it is unlocked with your PIN, and the Avalanche app is running.

    ??? info "Installing the Avalanche application"

        1. Connect the device to your computer and unlock it using your PIN code.
        2. Open the [Ledger Live](https://www.ledger.com/ledger-live) application.
            Go to the **My Ledger** tab and make sure the device is using the latest firmware.
        3. In the **App catalog** tab, search for "Avalanche" and click on the **Install** button.

            Version should be at least v0.6.5.

            Note that this app requires all available space on a **Ledger Nano S** device (138 KB).
            You might need to remove other apps first to free up space.
        4. Exit the Ledger Live application and make sure the device is not connected to any other application like MetaMask.

4. Click the top dropdown menu to select whether the account containing the funds you want to stake was created using Ledger Live or some other wallet like MetaMask.

    <figure markdown>
    ![Address selection dialog](flarestake-select-address.png){ loading=lazy .allow-zoom }
    <figcaption>Address selection dialog.</figcaption>
    </figure>

    ??? info "Derivation Paths"
        A single hardware wallet can generate an unlimited number of addresses by using a _derivation path_.
        By using the same derivation path, multiple wallets like MetaMask or Bifrost can retrieve the same addresses from a hardware wallet.

        You need to tell FlareStake the derivation path that was used to obtain the address containing the funds you want to stake.
        Fortunately, there are only two common paths:

        * **Ledger Live**: If you created your account from the [Ledger Live tool](https://www.ledger.com/ledger-live).
        * **BIPS-44**: If you used almost any other wallet.

5. Click the bottom dropdown menu, and select the address you want to use from the list.

    The first time it takes a few seconds to obtain the list of addresses from the device.

6. Click **Access Wallet**.
   The FlareStake dashboard is displayed.

You can now continue to the [Staking Guide](#staking-guide) or the [Reward Claiming Guide](#reward-claiming-guide).

## Staking Guide

### 1. Binding Your Addresses

To receive your staking rewards, you must bind your P-chain address to your C-chain address.

This procedure only needs to be done once per P-chain address.
See the [command-line version of this guide](./staking-cli.md#address-binding) for more information.

1. On the FlareStake dashboard, click ![Staking menu](flarestake-menu-staking.png){.inline-image} **Staking**.

2. In the **Bind Your Addresses** section, click **Register**.

    <figure markdown>
    ![Address binding menu](flarestake-bind-addresses.png){ loading=lazy .allow-zoom }
    <figcaption>Address binding menu.</figcaption>
    </figure>

    The **Bind Your Addresses** window is displayed.

3. Click **Bind Address**.

4. Confirm the action on your Ledger.

Your P-chain address and your C-chain address are now bound to each other.

### 2. Move Funds to the P-Chain

To stake, your P-chain address must contain at least 50.000 native `$FLR` tokens.
If your P-chain address is already properly funded, skip this step.

Keep in mind that wrapped `$WFLR` tokens must be [unwrapped](../wrapping-tokens.md) before they can be transferred to the P-chain.

1. On the FlareStake dashboard, click ![Cross chain menu](flarestake-menu-cross-chain.png){.inline-image} **Cross Chain**.
2. Ensure the **Source Chain** field says C-chain and the **Destination Chain** field says P-chain.
3. In the **Amount** field, specify the amount of `$FLR` to send to your P-chain address.
4. Click **Confirm**.
5. Click **Transfer**.
6. Confirm the action on your Ledger.

    Transfers between chains are made of two operations: an **export** from the C-chain followed by an **import** to the P-chain.
    Therefore, you are asked to confirm TWO transactions on your hardware wallet.

    !!! warning "Transaction Caveats"

        * When transferring from the C-chain to the P-chain, transaction fees are wholly paid from the C-chain.
        Make sure you leave enough funds on the C-chain after the transfer, or it will fail.
        * Sometimes, when you transfer funds between the chains, your funds seem to disappear.
        Rest assured that your funds are not lost.
        You just need to repeat the import operation.
        If your funds are not visible on FlareStake, complete these steps:

            1. On the FlareStake dashboard, click **Advanced**.
            2. In the **Chain Import** section, click the appropriate **Import** button, depending on the chain from which you imported.
            For example, if you're moving funds from the C-chain to the P-chain, click **Import P (From C)**.

The amount of funds you specified in step 3 is now at your P-chain address.

### 3. Stake Your Funds

To stake funds, delegate them to an existing validator.

1. On the FlareStake dashboard, click ![Staking menu](flarestake-menu-staking.png){.inline-image} **Staking**.
2. In the **Add a Delegation** section, click **Add Delegation**.

    <figure markdown>
    ![Add a delegation menu](flarestake-add-delegation.png){ loading=lazy .allow-zoom }
    <figcaption>Add a delegation menu.</figcaption>
    </figure>

    The **Delegate** window is displayed.

3. In the **Node ID** column, locate the ID for the validator to which you want to delegate your staking funds.

4. To select the validator, click **Select**.
   Information about the validator is displayed.

5. In the **Staking End Date** field, specify the date and time when you want to stop staking your funds.
   If you specify a date and time that occurs after the validator's self-bond has ended, your transaction on the P-chain will revert.

6. In the **Staking Amount** field, specify the amount of `$FLR` you want to delegate to stake.

7. Click **Confirm**.
   The staking information you specified is displayed.

8. Review the staking information.
   If it is correct, click **Submit** to begin your delegation.
   Otherwise, click **Cancel**.

9. Confirm the action on your Ledger.

Your stake is now locked and will start accruing rewards immediately.
When the selected end time arrives, the funds will be automatically unlocked.

## Reward Claiming Guide

At the end of every [reward epoch](../../tech/ftso/index.md#reward-epoch), participants are rewarded according to how well their chosen validator performed in that period, but these rewards are not claimable yet.

Every 4 reward epochs, rewards are accumulated in a dedicated smart contract and can then be claimed from the FlareStake tool:

1. On the FlareStake dashboard, click ![Staking menu](flarestake-menu-staking.png){.inline-image} **Staking**.

2. In the **Manage Rewards** section, click **Manage Rewards**.

    <figure markdown>
    ![Manage rewards menu](flarestake-manage-rewards.png){ loading=lazy .allow-zoom }
    <figcaption>Manage rewards menu.</figcaption>
    </figure>

    Information about your rewards is displayed.

3. In the **Rewards to claim** field, specify all or part of your unclaimed rewards.
4. **Optional**: To send your rewards to a different wallet, click **Another Wallet**, and specify the address in the **C-Chain Address** field.
5. Click **Claim Rewards**.
6. Confirm the action on your Ledger.

Your rewards are claimed and added to your available balance.
