# Using FlareStake to Stake

FlareStake is a GUI that enables you to delegate your funds to validators for staking.

!!! note

    Proof of stake is being implemented in phases.
    Ensure that you have read the [Validators page](../../../tech/validators.md#deployment-phases) to learn about them.

Staking works by locking funds for a period of time to support a specific [network validator](../../../tech/validators.md).
When validator owners stake to their own nodes they _self-bond_, whereas all other participants are said to _delegate_ their stake to that validator.

Participants choose how much to stake and for how long their stake will be locked.
The minimum values are:
{ #minimum-values }

|                  | Self-bond | Delegation |
| ---------------- | --------: | ---------: |
| Minimum amount   | 1M `$FLR` | 50K `$FLR` |
| Minimum duration |   60 days |    14 days |

At the end of every [reward epoch](../../../tech/ftso.md#reward-epoch), participants are rewarded according to how well their chosen validator performed in that period.
The [deployment phases summary](../../../tech/validators.md#summary) shows other rewards that staked funds can still earn while they are locked.

Given that the Flare network uses two [independent underlying chains](../../../tech/flare.md#flare-chains), there is one extra step that must be considered.
Funds must be transferred from the C-chain, where smart contracts run, to the P-chain, where staking happens.
After the staking period expires and funds are unlocked, they can be transferred back to the C-chain.

This guide explains how to stake Flare assets by using [FlareStake, the GUI tool for staking](staking.flare.network).

## Prerequisites

* A [Ledger set up to manage Flare assets](../../wallets/how-to-access-flare-network-with-a-ledger-device.md)
* Knowledge of the [available validators](https://flaremetrics.io/validators) to which you want to delegate your funds.

## Accessing Your Wallet

1. Open [FlareStake](staking.flare.network).
2. Click **Access Wallet**.
3. Click **Ledger**.
4. Click the dropdown menu to select an address, and click the address you want to use.
5. Click **Access Wallet** again.
   The FlareStake dashboard is displayed.

## Transferring Funds to Your C-Chain Address

To stake, your C-chain address must contain funds.
If your C-chain address is already funded, skip this step and [bind your addresses](#binding-your-addresses).

1. On the FlareStake dashboard, click **Staking**.
2. In the **Transfer Your FLR** section, click **Transfer**.
   The **Cross Chain** window is displayed.
3. Ensure the **Source Chain** field says P-chain and the **Destination Chain** field says C-chain.
4. In the **Amount** field, specify the amount of `$FLR` to send to your C-chain address.
5. Click **Confirm**.
6. Click **Transer**.
7. Confirm the action on your Ledger.

The amount of funds you specified in step 4 is now at your C-chain address.

## Binding Your Addresses

To receive your staking rewards, you must bind your P-chain address to your C-chain address.

1. On the FlareStake dashboard, click **Staking**.
2. In the **Bind Your Addresses** section, click **Register**.
   The **Bind Your Addresses** window is displayed.
3. Click **Bind Address**.
4. Confirm the action on your Ledger.

Your P-chain address and your C-chain address are now bound to each other.

## Delegating Your Funds to Be Staked

To stake funds, you must first delegate them to a validator on which they will be staked.

1. On the FlareStake dashboard, click **Staking**.
2. In the **Add a Delegation** section, click **Add Delegation**.
   The **Delegate** window is displayed.
3. In the **Node ID** column, locate the ID for the validator to which you want to delegate your staking funds.
4. To select the validator, click **Select**.
   Information about the validator is displayed.
5. In the **Staking End Date** field, specify the date and time when you want to stop staking your funds.
6. In the **Staking Amount** field, specify the amount of `$FLR` you want to delegate to stake.
7. In the **Staking Duration** section, click **Confirm**.
   The staking information you specified is displayed.
8. Review the staking information.
   If it is correct, click **Submit** to begin your delegation.
   Otherwise, click **Cancel**.

Your funds are staked on the validator you specified.

## Managing Your Rewards

At the end of every [reward epoch](../../../tech/ftso.md#reward-epoch), participants are rewarded according to how well their chosen validator performed in that period.

Rewards are accumulated at your C-chain address.

1. On the FlareStake dashboard, click **Staking**.
2. In the **Manage Rewards** section, click **Manage Rewards**.
   Information about your rewards is displayed.
3. In the **Rewards to claim** field, specify all or part of your unclaimed rewards.
4. **Optional**: To send your rewards to a different wallet, click **Another Wallet**, and specify the address in the **C-Chain Address** field.
5. Click **Claim Rewards**.
6. Confirm the action on your Ledger.

Your rewards are claimed and added to your available balance.
