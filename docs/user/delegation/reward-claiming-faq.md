# Reward Claiming FAQ

## Am I eligible for rewards?

If you have delegated vote power in the snapshot block of a reward epoch, and this reward epoch was finalized, you should be eligible to claim some rewards.

## What contributes to the amount of reward one can claim?

This depends on a few factors:

* How much vote power was delegated and to which data providers.
* What was the performance of those data providers.
* How much fee do those data providers take.
* Was the total vote power of this data provider above the vote power cap.

## How do I see how much reward I can claim?

This depends on the wallet you are using. See [wallets](../../user/wallets/index.md) section to find more information and see the FAQ below for Metamask users.

## How do I claim my rewards?

See [wallets](../../user/wallets/index.md) section to find more information and see the FAQ below for Metamask users.

## When do I need to claim my rewards?

Rewards not claimed within 90 days will be re-allocated to the reward pool on Songbird and burnt on Flare.

## After claiming my rewards, how can I delegate the newly claimed tokens?

After you have successfully claimed your rewards, you receive native tokens (`$FLR` or `$SGB`).
If you are delegating by percentage, once you wrap this to `$WFLR` or `$WSGB` your delegation will automatically be updated with the new balance, thus you do NOT need to change the delegation settings.

## How do I know if I have any rewards to claim?

As general guidance, if you wrapped your tokens, delegated your voting power and there was a vote power block and full reward epoch you should have rewards to claim, those should appear as your claimable rewards as seen in the relevant wallet you used for the delegation.

!!! info
    Rewards can be claimed within 90 days so please remember to claim those within a reasonable time, or they will be lost.
    Also, remember to re-delegate to gain compound rewards.

## Where can I check the amount of rewards I have accrued in the current reward epoch?

You can check the current amount of rewards (and unclaimed rewards) using the `FtsoRewardManager` method (`getStateOfRewards`) or using your wallet.
See [wallets](../../user/wallets/index.md) section to find details for specific wallets.

## How long do I have to wait to claim my rewards?

Rewards can be claimed after the end of each reward epoch (7 days on Songbird, 3.5 days on Flare).
You need to wait for the full reward epoch in which you have delegated your vote power to be able to claim.

## Do I need to claim as fast as a reward epoch ends to maximize my earnings from delegations?

No. Claimed rewards cannot participate in the reward epoch they were claimed in.
They can participate in the next reward epoch as long as they are wrapped roughly before the last half (on Flare) or the last quarter (on Songbird) of the current reward epoch (in terms of produced blocks).

## What is the Reward rate?

Reward rate is a metric of yield of data providers describing how many tokens were being earned by a data provider during a reward epoch for each delegated 100 tokens.
It is calculated as `total_reward / vote_power * (100 - fee)`, where fee is given in percentages.

## What is a vote power cap and how does it influence my yields?

To facilitate decentralization of the network the share of vote power considered for rewarding is capped to 2.5% of all `$WSGB` or `$WFLR` in circulation.
If a data provider gets more vote power through delegations, only a part of vote power (up to vote power cap) will compete for rewards while earned rewards will be distributed to all delegators, making the yield (reward rate) of the data provider lower.
