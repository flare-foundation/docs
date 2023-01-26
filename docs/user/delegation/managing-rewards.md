# Managing Rewards

Use this information to manage [rewards](../../tech/ftso.md#rewards) by using the Flare Portal or the block explorer. Rewards are accrued from your delegations to FTSO data providers whose submitted data is close to the calculated median value in a price epoch.

## Using the Flare Portal

This information explains how to manage your rewards using the [Flare Portal](https://portal.flare.network).

### Claiming Rewards

1. Open the [Flare Portal](https://portal.flare.network). The home page is displayed.

    <figure markdown>
    ![Flare Portal Home](delegation-portal-connect.png){ loading=lazy .allow-zoom width=500px }
    <figcaption>Flare Portal home.</figcaption>
    </figure>

2. Click **Connect to Wallet** and log into your wallet. The interface to your **Main Account** opens.
3. Ensure you are connected to the network you want. In the following image, the wallet is connected to the Flare network.

    <figure markdown>
    ![Flare Portal Main Account](delegation-portal-main.png){ loading=lazy .allow-zoom width=500px }
    <figcaption>**Main Account** on the Flare network.</figcaption>
    </figure>

4. On the **Main Account** tab, locate the **Claim your delegation rewards** section to determine whether you have claimable rewards and whether those rewards can currently be claimed:

    * If you have rewards to claim and the reward manager contains the tokens, the **Claim** button is enabled and shows the amount of rewards you can claim. Go to Step 3.
    * If you have rewards to claim, but the reward manager currently does not contain tokens, the **Claim** button shows the amount of rewards you can claim but is disabled.

        For security reasons, a **limited amount of tokens** is stored at a given time. Sometimes, all delegators claim their rewards in a short period of time immediately after the reward epoch ends, and the token storage is depleted. The storage is replenished periodically. If you are currently unable to claim your rewards because the storage is empty, **try again the next day**.

    * If you don't have claimable rewards, the **Claim** button is disabled.

    The following image shows an account with claimable rewards:

    <figure markdown>
    ![Account with claimable rewards](delegation-portal-main.png){ loading=lazy .allow-zoom width=500px }
    <figcaption>An account with claimable rewards.</figcaption>
    </figure>

5. Click the **Claim** button. The **Claim your delegation rewards** window is displayed.

    <figure markdown>
    ![Claim your delegation rewards](rewards-portal-claim.png){ loading=lazy .allow-zoom width=500px }
    <figcaption>Claim your delegation rewards.</figcaption>
    </figure>

6. **Optional**: By default, the option to send your rewards to your [personal delegation account](../../tech/personal-delegation-account.md) is preselected. To send your rewards to the address that you connected to the Portal, deselect the option.
7. Click **Claim All Rewards** to claim all available rewards for the listed epochs.
8. Follow the steps to confirm the transaction in your wallet. Your rewards are claimed, and your updated balance of native tokens is displayed.

## Using the Block Explorer

!!! example "This section is for advanced users."

This information explains how to manage your rewards using the [block explorer](../block-explorer.md).

### Claiming Rewards

1. Open a [block explorer](../block-explorer.md).
2. From the block explorer, follow the [Retrieval from Blockchain procedure](../../dev/reference/contracts.md#retrieval-from-blockchain) to find and open the `FtsoRewardManager` contract.
3. Click **Connect Wallet**, and complete the steps to connect your wallet.
4. On the **Read Contract** tab, run the `getEpochsWithUnclaimedRewards(beneficiary_address)` method by clicking **Query**. A list of previous epochs with pending rewards to be claimed is returned.
5. On the **Write Contract** tab, locate the `claimReward` method, and specify values for the following parameters:

    * **_recipient(address)**: The address to which you want claimed rewards to be sent.
    * **_rewardEpochs(uint256[])**: One or more epochs from which you want to claim rewards. Specify the epoch numbers in a comma-separated list enclosed by square brackets, such as `[59,60]`.

6. Click **Write** to run the `claimReward` method. One of the following results occurs:

    * The `claimReward` method prompts you to confirm the transaction. Go to Step 7.
    * The `claimReward` method fails. For security reasons, the `FtsoRewardManager` contract contains a **limited amount of tokens** and is replenished periodically. Sometimes, all delegators claim their rewards in a short period of time immediately after the reward epoch ends, and the contract becomes empty. If you are unable to claim your rewards because the contract is empty, **try again the next day**.

7. Follow the steps to confirm the transaction in your wallet. Your rewards are claimed, and your updated balance of native tokens is displayed.

### Viewing Your Reward Balance

1. Open a [block explorer](../block-explorer.md).
2. From the block explorer, follow the [Retrieval from Blockchain procedure](../../dev/reference/contracts.md#retrieval-from-blockchain) to find and open the `FtsoRewardManager` contract.
3. Click **Connect Wallet**, and complete the steps to connect your wallet.
4. On the **Read Contract** tab, locate the `getStateofRewards` method, and specify values for the following parameters:

    * **_beneficiary(address)**: The address to check for rewards.
    * **_rewardEpoch(uint256)**: The epoch in which you want to check the address for rewards.

5. Click **Query** to run the `getStateofRewards` method. The amount of rewards due from each data provider and whether they have already been claimed is returned.
