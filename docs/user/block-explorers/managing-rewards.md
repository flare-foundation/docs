# Managing Rewards Using the Block Explorer

!!! example "This page is for advanced users."

Rewards are accrued from your delegations to FTSO data providers whose submitted data is close to the calculated median value in a price epoch.

Use the following information to [check your reward balance](#checking-your-reward-balance) and [claim your rewards](#claiming-your-rewards) with the block explorer, which provides many options but is more complex.
Alternatively, if you prefer a simple interface, use the [Flare Portal](https://portal.flare.network/).

## Checking Your Reward Balance

1. Open a [block explorer](./index.md) for the appropriate network.
   [The block explorer dashboard](./user-interface.md) is displayed.
2. Follow the [Retrieval from Blockchain procedure](../../dev/getting-started/contract-addresses.md#retrieval-from-blockchain) to find and open the `FtsoRewardManager` contract.
   The **Contract Address Details** page is displayed.
3. Click the **Read Contract** tab, and then click **Connect Wallet**, as shown in the following image:

    <figure markdown>
    ![Read Contract Tab and Connect Your Wallet](block-explorer-read-wallet.png){ loading=lazy .allow-zoom}
    <figcaption>Read Contract Tab and Connect Your Wallet.</figcaption>
    </figure>

4. Complete the steps to connect your wallet.
5. Locate the `getStateOfRewards` method, and specify values for the following parameters:

    * **_beneficiary(address)**: The address to check for rewards.
    * **_rewardEpoch(uint256)**: The epoch in which you want to check the address for rewards. To check rewards for the epoch currently in progress, [get the current reward epoch](./finding-reward-epoch.md).

6. Click **Query** to run the `getStateOfRewards` method.
   The following information is returned:

    * **_dataProviders**: List of providers to which the address delegated vote power during this epoch.
    * **_rewardAmounts**: List of reward amounts from each delegation.
    * **_claimed**: List of boolean values indicating whether each of the amounts has already been claimed.
    * **_claimable**: Boolean value indicating whether rewards for the address are claimable. [Rewards are claimable](../../tech/ftso.md#reward-claiming-procedure) if they are not expired and the epoch has ended. The value of `_claimable` is independent of the value of `_claimed.`

## Claiming Your Rewards

1. Open a [block explorer](./index.md) for the appropriate network.
   [The block explorer dashboard](./user-interface.md) is displayed.
2. Follow the [Retrieval from Blockchain procedure](../../dev/getting-started/contract-addresses.md#retrieval-from-blockchain) to find and open the `FtsoRewardManager` contract.
   The **Contract Address Details** page is displayed.
3. Click the **Read Contract** tab, and then click **Connect Wallet**, as shown in the following image:

    <figure markdown>
    ![Read Contract Tab and Connect Your Wallet](block-explorer-read-wallet.png){ loading=lazy .allow-zoom}
    <figcaption>Read Contract Tab and Connect Your Wallet.</figcaption>
    </figure>

4. Complete the steps to connect your wallet.
   In the next steps, you will check this wallet for accrued rewards.
   You can disconnect this wallet and connect a different wallet as frequently as necessary.
5. Run the `getEpochsWithUnclaimedRewards(beneficiary_address)` method by clicking **Query**.
   A list of previous epochs with pending rewards to be claimed is returned.
6. On the **Write Contract** tab, locate the `claimReward` method, and specify values for the following parameters:

    * **_recipient(address)**: The address to which you want claimed rewards to be sent.
    It can be the address you used to connect your wallet to the block explorer or a different address.
    * **_rewardEpochs(uint256[])**: One or more epoch numbers retrieved in Step 5.
    Specify multiple epoch numbers in a comma-separated list enclosed by square brackets, such as `[59,60]`.

7. Click **Write** to run the `claimReward` method. One of the following results occurs:

    * The `claimReward` method prompts you to confirm the transaction.
      Go to Step 8.
    * The `claimReward` method fails. For security reasons, the `FtsoRewardManager` contract       contains a **limited amount of tokens** and is replenished periodically.
    Sometimes, all delegators claim their rewards in a short period of time immediately after the reward epoch ends, and the contract becomes empty.
    If you are unable to claim your rewards because the contract is empty, **try again the next day**.

8. Follow the steps to confirm the transaction in your wallet.
   Your rewards are claimed, and your updated balance of native tokens is displayed.
