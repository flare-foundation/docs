# Reward claiming FAQ

## Am I eligible for rewards?

If you have delegated vote power in the snapshot block of a reward epoch, and this reward epoch was finalized, you should be eligible to claim some rewards.

## What contributes to the amount of reward one can claim?

This depends on a few factors:

* How much vote power was delegated and to which price providers.
* What was the performance of those price providers.
* How much fee do those price providers take.
* Was the total vote power of this price provider above the vote power cap.

## How do I see how much reward I can claim?

This depends on the wallet you are using. See [wallets](../wallets/index.md) section to find more information and see the FAQ below for metamask users.

## How do I claim my rewards?

See [wallets](../wallets/index.md) section to find more information and see the FAQ below for metamask users.

## When do I need to claim my rewards?

Rewards not claimed within 90 days will be re-allocated to the reward pool.

## After claiming my rewards, how can I delegate the newly claimed SGB?

After you have successfully claimed your rewards, you receive SGB tokens. Once you wrap this SGB to wSGB, your delegation will automatically be updated with the new wSGB balance, thus you do NOT need to change the delegation settings.

## How do I know if I have any rewards to claim?

As general guidance, if you wrapped your SGB, delegated your voting power and there was a vote power block and full reward epoch you should have rewards to claim, those should appear as your claimable rewards as seen in the relevant wallet you used for the delegation.

!!! info
    Rewards can be claimed within 90 days so please remember to claim those within a reasonable time so they won’t get lost, and obviously re-delegate to gain compound interest.

## Where can I check the amount of rewards I have accrued in the current reward epoch?

You can check the current amount of rewards (and unclaimed rewards) using the `FtsoRewardManager` contract (`getStateOfRewards`) or using your wallet. See [wallets](../wallets/index.md) section to find details for a specific wallet.

## I have claimed my rewards, how can I delegate the newly claimed SGB?

After you have successfully claimed your rewards, you will receive SGB. Once you wrap this SGB to WSGB, your delegation will automatically be updated to the new WSGB value and you do NOT need to change delegations. You are always delegating a selected percentage of your full WSGB holdings.

## How long do I have to wait to claim my rewards?

Rewards can be claimed after the end of each reward epoch (currently 7 days), so the rewards can be claimed every 7 days. Take care, that you need to wait for the full reward epoch in which you have delegated your vote power, to be able to claim.

## Do I need to claim as fast as a reward epoch ends to maximize my earnings from delegations?

No. Claimed rewards cannot participate in the reward epoch they were claimed in. They can participate in the next reward epoch as long as they are wrapped roughly before the last quarter of the current reward epoch (in terms of blocks produced).

## What is the Reward rate?

Reward rate is a metric of yield of data providers describing how many WSGB tokens were being earned by a data provider during a reward epoch for delegated 100 WSGB. It is calculated as `total_reward/vote_power*(100 - fee)`, where fee is given in percentages.

## What is a vote power cap and how does it influence my yields?

To facilitate decentralization of the network a share of vote power considered for rewarding is capped to 10% of all WSGB in circulation. If a data provider gets more vote power through delegations, only a part of vote power (up to vote power cap) will compete for rewards while earned rewards will be distributed to all delegators, making the yield (reward rate) of the data provider lower.
