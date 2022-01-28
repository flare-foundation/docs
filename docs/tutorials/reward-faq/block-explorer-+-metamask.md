---
description: FAQ for users of the block explorer and metamask combination
---

# Block explorer + metamask FAQ

### Where is the reward data found?

All reward data can be find the FTSO Reward Manager here [ https://songbird-explorer.flare.network/address/0xc5738334b972745067fFa666040fdeADc66Cb925/read-contract](https://songbird-explorer.flare.network/address/0xc5738334b972745067fFa666040fdeADc66Cb925/read-contract). All claiming can be done here [https://songbird-explorer.flare.network/address/0xc5738334b972745067fFa666040fdeADc66Cb925/write-contract.](https://songbird-explorer.flare.network/address/0xc5738334b972745067fFa666040fdeADc66Cb925/write-contract.)

### For which reward epochs can I claim rewards?

In FTSO reward manager here[ ](https://songbird-explorer.flare.network/address/0xc5738334b972745067fFa666040fdeADc66Cb925/read-contract)see API no. 11 `getEpochsWithUnclaimedRewards(beneficiary_address)`

### What is the claim API?

Api for claiming can be found in the FTSO Reward Manager, see API no 3: `claimReward (_recipient address, _rewardEpochs uint256[])`. The address should be your address and reward epochs should include the list of epochs you want to claim rewards for. You may claim rewards for multiple epochs at one go.

### Where can I check the amount of rewards I have accrued in a reward epoch?

You can check the current amount of rewards (and unclaimed rewards) in the `FtsoRewardManager` API no. 14 `getStateOfRewards(beneficiery address, rewardEpoch)`
