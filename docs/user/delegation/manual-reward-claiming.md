# Manual Reward Claiming

This page explains how to claim your delegation rewards using a block explorer and Metamask. This is the continuation of the [Manual delegation](manual-delegation.md) page.

!!! caution

    This page is intended for advanced users who know how to interact with the blockchain through a block explorer.

## Where is the reward data found?

All reward data can be found in the FTSO Reward Manager.

## For which reward epochs can I claim rewards?

In the FTSO reward manager contract use the `getEpochsWithUnclaimedRewards(beneficiary_address)` method.

## What is the claim API?

API for claiming can be found in the FTSO Reward Manager, see method `claimReward (_recipient address, _rewardEpochs uint256[])`.
The address should be your address and reward epochs should include the list of epochs you want to claim rewards for.
You may claim rewards for multiple epochs at one go.

## Where can I check the amount of rewards I have accrued in a reward epoch?

You can check the current amount of rewards (and unclaimed rewards) in the `FtsoRewardManager` method `getStateOfRewards(beneficiery address, rewardEpoch)`.
