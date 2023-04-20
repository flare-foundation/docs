# Automatic Claiming

To save time, maximize compound interest, and avoid unnecessary exposure of a cold wallet, you can set an [executor](../tech/automatic-claiming.md) to claim rewards for you.
Executors then use automatic claiming to send rewards directly to your account.

## Introduction

To set an executor you only need to enter its address in the [Flare Portal](https://portal.flare.network/).

However, the Flare Portal does not help you find executor addresses, so you must find them in different ways, depending on whether they are manual or registered:

* [Manual executors](../tech/automatic-claiming.md#manual-claiming-process) are ones that you locate yourself.
    Whether they charge a fee or not and how you pay it is between you and the executor.
* [Registered executors](../tech/automatic-claiming.md#registered-claiming-process) are listed in a smart contract and can be retrieved, for instance, using the [block explorer](./block-explorers/index.md) or third-party applications.
    These executors charge a fee when you set them up and every time they claim for you.

!!! note "Overview of autoclaiming functionality"

    For an overview of what is available for the entire autoclaiming feature, see [Automatic Claiming](../tech/automatic-claiming.md) in the Concepts section.

## Prerequisite

To enable an executor, obtain its address off-chain or, for registered executors, on-chain.

The list of registered executors has not been added yet to the Flare Portal, but a manual method is given below using the [block explorer](./block-explorers/index.md) (recommended for advanced users).

??? example "Find a registered executor (using the Block Explorer)"

    To find an executor you will need to use the `ClaimSetupManager` contract.
    See the [Contract Addresses](../dev/getting-started/contract-addresses.md) page to learn how to find the address of this contract.

    1. In the [Block Explorer](https://flare-explorer.flare.network/), paste the address of the `ClaimSetupManager` contract and scroll down to select the **Read Contract** tab.
    2. To get the available executors' addresses, scroll down to `getRegisteredExecutors` and enter a range of how many addresses to check, for example, `0` in the **_start** field and `10` in the **_end** field.
    3. Click **Query**. The Block Explorer returns the addresses and the total number available, so you can know if you've gotten them all.
    4. To get the executor's fee, copy one address at a time and enter it in the executor field for `getExecutorCurrentFeeValue`.
    5. Click **Query**.
    In the future, there will be more criteria to help with making this decision.
    6. Choose an executor and copy its address.

## Enabling Automatic Claiming

Now that you have your desired executor's address, you can set it as the executor for your account.

1. Open the [Flare Portal](https://portal.flare.network/).
2. Click **Connect to Wallet** and log into your wallet.
   The interface to your **Main Account** opens.
    <figure markdown>
    ![Flare Portal Main Account](executor-portal-main.png){ loading=lazy .allow-zoom }
    <figcaption>Flare Portal Main Account interface.</figcaption>
    </figure>
3. In the **Executor** section, click **Add** or **Change**.
4. Paste the executor's address.
    A message confirms the executor's fee, whether it is a registered executor, and whether rewards go to your Main Account or your [Personal Delegation Account (PDA)](../tech/personal-delegation-account.md).
    <figure markdown>
    ![Set an executor](executor-portal-preset.png){ loading=lazy .allow-zoom width=400px }
    <figcaption>Set an executor.</figcaption>
    </figure>
5. To set this executor, click **Confirm**.
   Your wallet opens with the details of the transaction.
6. Review the transaction and confirm it.

If you confirm the executor, the Flare Portal displays the executor address you have selected, whether it is registered, and its fee.
Note also that the **Add** button now reads **Change**, enabling you to remove or change the executor any time you choose.
<figure markdown>
![The executor is confirmed](executor-portal-confirmed.png){ loading=lazy .allow-zoom }
<figcaption>The executor is confirmed.</figcaption>
</figure>

!!! note "Reward must be high enough to pay the executor's fee"

    If the reward amount is too low to accommodate the fee, automatic claims won't occur, so you may see small amounts of unclaimed rewards even if you have autoclaiming set up.

## Disabling Automatic Claiming

To disable automatic claiming and stop paying the executor fees, go through the above process again and clear the Executor address field in Step 4.
This is, confirm an empty address.

Once you confirm the transaction in your wallet, automatic claiming will be disabled.

## Checking for Accrued Rewards

To check if you have accrued rewards, go to the [Flare Portal](https://portal.flare.network/):

1. Click **Connect to Wallet** and log into your wallet.
2. Select your **Main Account** or **Delegation Account**, if you have enabled a PDA.
3. At the bottom of the screen, see the **Claim _x_ FLR** button, where _x_ is the number of `$FLR` rewards you can claim.

!!! note

    If the configured executor is doing its job correctly, you should never see any pending rewards.
