# Reward claiming overview

Each user delegating its vote power to an active price provider can earn rewards.
The rewards are accumulated through the course of reward epochs, 7-days long on Songbird and 3.5-days long on Flare.
Once each reward epoch finalizes, the user can claim the rewards that were earned during this reward epoch.

The rewards are accumulated in the `FtsoRewardManager` contract and expire after 90 days.
The claim operation costs some gas, paid in `$FLR` or `$SGB`, and can be done for one reward epoch or a list of a few epochs at once.

The reward system distributes a large part of the yearly inflation to participants of the FTSO system.
This could be seen as the mining process for the Flare chains.
During the first years of Flare's and Songbird's existence, most of the yearly inflation will be distributed to participants of the FTSO system.
The distribution works such that the yearly inflation is divided into daily portions. That daily portion is split between all price epochs happening that day.

The FTSO system includes price feeds for USD prices of a few assets, Ex: BTC/USD, XRP/USD etc.
Per price epoch one FTSO price feed is chosen to be rewarded.
The reward is split between the addresses which submitted the most accurate prices.

Reward flow:

* Per price epoch all price feeds to an FTSO are being used to calculate a weighted median.
* The weighted median is the chosen price of this FTSO (time series).
* Next, a percentage of the addresses on each side of the weighted median are chosen to be rewarded.
* Each address is rewarded according to its weight (vote power).
* The reward data is sent to the `FtsoRewardManager` smart contract.
* Once the reward epoch is finalized, this reward can be claimed from the `FtsoRewardManager`.

Each price provider receives rewards according to its vote power.
Those rewards can be claimed by the price provider and anyone who delegated its vote power to this price provider during this reward epoch.
