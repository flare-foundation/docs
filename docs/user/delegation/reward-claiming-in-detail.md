# Reward claiming in detail

## FTSO Rewards

During the FTSO price voting process, rewards are being distributed to price (data) providers based on their WNAT (WSGB) vote power. Depending on the vote power share and price provider fee percentage, a part of this reward belongs to users who have delegated their WSGB vote power to the price providers. The rewards can be claimed via the contract `FtsoRewardManager` that implements `IFtsoRewardManager` interface as described in this document.

### Reward claiming

The reward claiming process depends on vote power delegation mode. The default delegation mode is delegation by percentage. Delegation by amount is intended for advanced users. The delegation mode of a user can be checked by calling `delegationModeOf` on the WNAT contract that implements  the`IVPToken` interface.

#### Delegation by percentage

The user that has delegated vote power by percentage can claim rewards by calling the function `claimReward` with the following signature.

``` solidity
function claimReward(
    address payable _recipient,
    uint256[] memory _rewardEpochs
) external returns (
    uint256 _rewardAmount
)
```

Parameters:

* `_recipient`: The address to which the reward is transferred (can be different from the calling address).
* `_rewardEpochs`: The list of reward epoch IDs for which the reward is being claimed.
* `_rewardAmount`: The amount of claimed rewards that is transferred to `_recipient`. The amount is the sum of all rewards that the caller (`msg.sender`) is entitled to in the specified `_rewardEpochs` (i.e., it includes the unclaimed rewards for all price providers the user has delegated to).

Note that this function throws an exception if it is called by a user (`msg.sender`) that is delegating by amount.

To specify an appropriate input array `_rewardEpochs`, the function `getEpochsWithUnclaimedRewards` can be used. It iterates over the past reward epochs that still enable reward claiming and gathers the IDs of those, for which the reward allocated to `_beneficiary` has not yet been (fully) claimed.

``` solidity
function getEpochsWithUnclaimedRewards(
    address _beneficiary
) external view override returns (
    uint256[] memory _epochIds
)
```

To obtain more detailed information on reward status, its origin and amount, a user can use the functions `getStateOfRewards` or `getStateOfRewardsFromDataProviders` described later in the document.

A user that is delegating by percentage can also use the function `claimRewardFromDataProviders` (described in the following section) to claim the rewards only for specific price providers (e.g., if the user wishes to have rewards from different price providers transferred to different recipient addresses). However, the gas consumption for calling `claimRewardFromDataProviders` is larger.

#### Delegation by amount

A user delegating vote power by amount can claim rewards by calling the function `claimRewardFromDataProviders` with the following signature.

``` solidity
function claimRewardFromDataProviders(
    address payable _recipient,
    uint256[] memory _rewardEpochs,
    address[] memory _dataProviders
) external returns (
    uint256 _rewardAmount
)
```

Parameters:

* `_recipient`: The address to which the reward is transferred (can be different from the calling address).
* `_rewardEpochs`: The list of reward epoch IDs for which the reward is being claimed.
* `_dataProviders`: The list of addresses corresponding to price providers.
* `_rewardAmount`: The amount of claimed rewards that is transferred to `_recipient`. The amount is the sum of all rewards that the caller (`msg.sender`) is entitled to in the specified `_rewardEpochs` (i.e., it includes the unclaimed rewards for all price providers specified in `_dataProviders`).

The main difference in comparison to `claimReward` is that `claimRewardFromDataProviders` requires a user to specify the array `_dataProviders` containing the addresses of price providers that the user has delegated the vote power to.

To prepare the input array `_rewardEpochs`, a user that is delegating by amount can not use the function `getEpochsWithUnclaimedRewards` (a request fails with exception). Instead, the function `getEpochsWithClaimableRewards` can be called to get the information on the reward epochs for which the reward is still claimable, and `getStateOfRewardsFromDataProvider` to obtain details about the state of rewards in a specific (claimable) reward epoch. Below is a code snippet describing this procedure. The functions and their parameters are in more detail explained in the subsequent sections.

``` solidity
(startEpochId, endEpochId) = getEpochsWithUnclaimedRewards();
for (uint256 epochId = startEpochId; epochId <= endEpochId; epochId++) {
    (...) = getStateOfRewardsFromDataProviders(..., epochId, ...);
}
```

#### Events

For every call of `claimReward` or `claimRewardFromDataProviders` one or more events of the following type are issued. A specific event is associated with a single pair of price provider and reward epoch.

``` solidity
event RewardClaimed(
    address indexed dataProvider,
    address indexed whoClaimed,
    address indexed sentTo,
    uint256 rewardEpoch,
    uint256 amount
)
```

Parameters:

* `dataProvider`: The address to which the reward was allocated.
* `whoClaimed`: The address from which the reward claim was initiated.
* `sentTo`: The address to which the `amount` was sent.
* `rewardEpoch`: The ID of the reward epoch the claimed reward corresponds to.
* `amount`: The value of the claimed reward.

#### Reward claim expiry

The reward can be claimed from the time the reward was allocated until the reward expiry epoch. The oldest and the newest reward epoch that allow reward claiming can be obtained by calling `getEpochsWithClaimableRewards` (these correspond to the return values `_startEpochId` and `_endEpochId`, respectively).

``` solidity
function getEpochsWithClaimableRewards() external view returns  (
    uint256 _startEpochId,
    uint256 _endEpochId
)
```

The reward expiry epoch is also communicated through `RewardClaimsExpired` event.

``` solidity
event RewardClaimsExpired(
    uint256 rewardEpochId
)
```

The information for which epochs the rewards have been already claimed can be obtained by checking the state of rewards described in the following section.

### Reward amount in depth

#### Overview

Suppose a total reward amount `REWARD` is allocated to a price provider `P` for a reward epoch `E`. This reward is divided among `P` and users who delegated to `P` depending on the WSGB vote power share and `P`'s fee percentage.

Let `PVP` be the total WSGB vote power associated with `P`. This is the sum of `P`'s own undelegated WSGB vote power and the WSGB vote powers that have been delegated to `P`. The vote power snapshot is used, which corresponds to a specific block before the start of `E` (vote power block).

Suppose `SHARE` is the vote power share:

* for `P` this is the ratio between `P`'s own undelegated WNat vote power and `PVP`,
* for delegator this is the ratio between the WNat vote power that the delegator has delegated to `P` and `PVP`.

Suppose `FP` denotes `P`'s fee percentage for `E`.

Then `P` is entitled to the reward equal to `(SHARE * (1 - FP) * REWARD) + (FP * REWARD)`, and a delegator is entitled to the amount equal to `SHARE * (1 - FP) * REWARD`.

#### State of rewards

The reward amounts for a specific address can be checked by calling either `getStateOfRewards` or `getStateOfRewardsFromDataProviders`. The difference between these two functions is that in the first the array of price providers (to which the reward is initially allocated) is obtained based on delegation history, while in the second the array has to be specified as an input parameter. Note that `getStateOfRewards` can only be used for addresses that are declared to be delegating by percentage.

``` solidity
function getStateOfRewards(
    address _beneficiary,
    uint256 _rewardEpoch
) external view returns (
    address[] memory _dataProviders,
    uint256[] memory _rewardAmounts,
    bool[] memory _claimed,
    bool _claimable
)
```

``` solidity
function getStateOfRewardsFromDataProviders(
    address _beneficiary,
    uint256 _rewardEpoch,
    address[] memory _dataProviders
) external view returns (
    uint256[] memory _rewardAmounts,
    bool[] memory _claimed,
    bool _claimable
)
```

Parameters:

* `_beneficiary`: The address for which the state is being checked.
* `_rewardEpoch`: The id of the reward epoch for which the state is being checked.
* `_dataProviders`: The positional array of addresses representing the price providers the rewards have been allocated to.
* `_rewardAmounts`: The positional array of values representing the reward amounts the `_beneficiary` is entitled to.
* `_claimed`: The positional array of boolean values indicating if the reward amount has already been claimed.
* `_claimable`: The boolean value indicating if the reward amounts are claimable (i.e., are available and have not expired).

Note that the amounts reported by these two methods are informational and can slightly differ from the actual amounts obtained via `claimReward` and `claimRewardFromDataProviders` due to rounding.

### Reward fee

#### Current fee percentage

Price provider fee is determined by fee percentage. Current setting can be obtained by `getDataProviderCurrentFeePercentage`.

``` solidity
function getDataProviderCurrentFeePercentage(
    address _dataProvider
) external view returns (
    uint256 _feePercentageBIPS
)
```

The value `_feePercentageBIPS` is given in basis points (BIPS), which is a percentage value multiplied by 100 (e.g., 10% fee is 1000).

#### Scheduled fee percentage changes

The fee percentage is subject to changes. The changes made by price providers are time locked, meaning they are scheduled for some future time. Scheduled changes can be checked by calling `getDataProviderScheduledFeePercentageChanges`, which returns the fee percentages in future.

``` solidity
function getDataProviderScheduledFeePercentageChanges(
    address _dataProvider
) external view returns (
    uint256[] memory _feePercentageBIPS,
    uint256[] memory _validFromEpoch,
    bool[] memory _fixed
)
```

Parameters:

* `_dataProvder`: The address representing a price provider.
* `_feePercentageBIPS`: The positional array of scheduled fee percentages in BIPS.
* `validFromEpoch`: The positional array of future reward epoch ids from which the value `_feePercentageBIPS` will be effective.
* `_fixed`: The positional array of boolean values indicating if the setting is fixed.

If the scheduled fee percentage is not fixed, this means that it can still be updated by price provider over the course of the current reward epoch. After the current reward epoch passes, the setting becomes fixed.
