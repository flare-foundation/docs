# IFtsoRewardManager

## RewardClaimed

```solidity
event RewardClaimed(address dataProvider, address whoClaimed, address sentTo, uint256 rewardEpoch, uint256 amount)
```

## UnearnedRewardsAccrued

```solidity
event UnearnedRewardsAccrued(uint256 epochId, uint256 reward)
```

## RewardsDistributed

```solidity
event RewardsDistributed(address ftso, uint256 epochId, address[] addresses, uint256[] rewards)
```

## RewardClaimsEnabled

```solidity
event RewardClaimsEnabled(uint256 rewardEpochId)
```

## FeePercentageChanged

```solidity
event FeePercentageChanged(address dataProvider, uint256 value, uint256 validFromEpoch)
```

## RewardClaimsExpired

```solidity
event RewardClaimsExpired(uint256 rewardEpochId)
```

## claimReward

```solidity
function claimReward(address payable _recipient, uint256[] _rewardEpochs) external returns (uint256 _rewardAmount)
```

Allows a percentage delegator to claim rewards.
This function is intended to be used to claim rewards in case of delegation by percentage.

_Reverts if `msg.sender` is delegating by amount_

| Name | Type | Description |
| ---- | ---- | ----------- |
| _recipient | address payable | address to transfer funds to |
| _rewardEpochs | uint256[] | array of reward epoch numbers to claim for |

| Name | Type | Description |
| ---- | ---- | ----------- |
| _rewardAmount | uint256 | amount of total claimed rewards |

## claimAndWrapReward

```solidity
function claimAndWrapReward(address payable _recipient, uint256[] _rewardEpochs) external returns (uint256 _rewardAmount)
```

Allows a percentage delegator to claim and wrap rewards.
This function is intended to be used to claim and wrap rewards in case of delegation by percentage.

_Reverts if `msg.sender` is delegating by amount_

| Name | Type | Description |
| ---- | ---- | ----------- |
| _recipient | address payable | address to transfer funds to |
| _rewardEpochs | uint256[] | array of reward epoch numbers to claim for |

| Name | Type | Description |
| ---- | ---- | ----------- |
| _rewardAmount | uint256 | amount of total claimed rewards |

## claimAndWrapRewardToOwner

```solidity
function claimAndWrapRewardToOwner(address payable _rewardOwner, uint256[] _rewardEpochs) external returns (uint256 _rewardAmount)
```

Allows a percentage delegator to claim and wrap rewards.
This function is intended to be used to claim and wrap rewards in case of delegation by percentage.
The caller does not have to be the owner, but must be allowed by owner by calling `addClaimExecutor`.
  It is actually safe for this to be called by anybody (nothing can be stolen), but by limiting who can
  call, we allow the owner to control the timing of the calls.

_Reverts if `msg.sender` is delegating by amount_

| Name | Type | Description |
| ---- | ---- | ----------- |
| _rewardOwner | address payable | address of the reward owner; also, funds will be tranfered there |
| _rewardEpochs | uint256[] | array of reward epoch numbers to claim for |

| Name | Type | Description |
| ---- | ---- | ----------- |
| _rewardAmount | uint256 | amount of total claimed rewards |

## claimRewardFromDataProviders

```solidity
function claimRewardFromDataProviders(address payable _recipient, uint256[] _rewardEpochs, address[] _dataProviders) external returns (uint256 _rewardAmount)
```

Allows the sender to claim rewards from specified data providers.
This function is intended to be used to claim rewards in case of delegation by amount.

_Function can be used by a percentage delegator but is more gas consuming than `claimReward`._

| Name | Type | Description |
| ---- | ---- | ----------- |
| _recipient | address payable | address to transfer funds to |
| _rewardEpochs | uint256[] | array of reward epoch numbers to claim for |
| _dataProviders | address[] | array of addresses representing data providers to claim the reward from |

| Name | Type | Description |
| ---- | ---- | ----------- |
| _rewardAmount | uint256 | amount of total claimed rewards |

## claimAndWrapRewardFromDataProviders

```solidity
function claimAndWrapRewardFromDataProviders(address payable _recipient, uint256[] _rewardEpochs, address[] _dataProviders) external returns (uint256 _rewardAmount)
```

Allows the sender to claim and wrap rewards from specified data providers.
This function is intended to be used to claim and wrap rewards in case of delegation by amount.

_Function can be used by a percentage delegator but is more gas consuming than `claimReward`._

| Name | Type | Description |
| ---- | ---- | ----------- |
| _recipient | address payable | address to transfer funds to |
| _rewardEpochs | uint256[] | array of reward epoch numbers to claim for |
| _dataProviders | address[] | array of addresses representing data providers to claim the reward from |

| Name | Type | Description |
| ---- | ---- | ----------- |
| _rewardAmount | uint256 | amount of total claimed rewards |

## claimAndWrapRewardFromDataProvidersToOwner

```solidity
function claimAndWrapRewardFromDataProvidersToOwner(address payable _rewardOwner, uint256[] _rewardEpochs, address[] _dataProviders) external returns (uint256 _rewardAmount)
```

Allows the sender to claim and wrap rewards from specified data providers.
This function is intended to be used to claim and wrap rewards in case of delegation by amount.
The caller does not have to be the owner, but must be allowed by owner by calling `addClaimExecutor`.
  It is actually safe for this to be called by anybody (nothing can be stolen), but by limiting who can
  call, we allow the owner to control the timing of the calls.

_Function can be used by a percentage delegator but is more gas consuming than `claimReward`._

| Name | Type | Description |
| ---- | ---- | ----------- |
| _rewardOwner | address payable | address of the reward owner; also, funds will be tranfered there |
| _rewardEpochs | uint256[] | array of reward epoch numbers to claim for |
| _dataProviders | address[] | array of addresses representing data providers to claim the reward from |

| Name | Type | Description |
| ---- | ---- | ----------- |
| _rewardAmount | uint256 | amount of total claimed rewards |

## addClaimExecutor

```solidity
function addClaimExecutor(address _executor) external
```

Called by reward owner to allow `_executor` to call `claimAndWrapRewardToOwner` or 
`claimAndWrapRewardFromDataProvidersToOwner`.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _executor | address | the account that will be able to call the `claim to owner` methods |

## removeClaimExecutor

```solidity
function removeClaimExecutor(address _executor) external
```

Called by reward owner to revoke the allowance of `_executor` to call `claimAndWrapRewardToOwner` or 
`claimAndWrapRewardFromDataProvidersToOwner`.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _executor | address | the account that won't be able to call the `claim to owner` methods any more |

## setDataProviderFeePercentage

```solidity
function setDataProviderFeePercentage(uint256 _feePercentageBIPS) external returns (uint256 _validFromEpoch)
```

Allows data provider to set (or update last) fee percentage.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _feePercentageBIPS | uint256 | number representing fee percentage in BIPS |

| Name | Type | Description |
| ---- | ---- | ----------- |
| _validFromEpoch | uint256 | reward epoch number when the setting becomes effective. |

## active

```solidity
function active() external view returns (bool)
```

Allows reward claiming

## getDataProviderCurrentFeePercentage

```solidity
function getDataProviderCurrentFeePercentage(address _dataProvider) external view returns (uint256 _feePercentageBIPS)
```

Returns the current fee percentage of `_dataProvider`

| Name | Type | Description |
| ---- | ---- | ----------- |
| _dataProvider | address | address representing data provider |

## getDataProviderFeePercentage

```solidity
function getDataProviderFeePercentage(address _dataProvider, uint256 _rewardEpoch) external view returns (uint256 _feePercentageBIPS)
```

Returns the fee percentage of `_dataProvider` at `_rewardEpoch`

| Name | Type | Description |
| ---- | ---- | ----------- |
| _dataProvider | address | address representing data provider |
| _rewardEpoch | uint256 | reward epoch number |

## getDataProviderScheduledFeePercentageChanges

```solidity
function getDataProviderScheduledFeePercentageChanges(address _dataProvider) external view returns (uint256[] _feePercentageBIPS, uint256[] _validFromEpoch, bool[] _fixed)
```

Returns the scheduled fee percentage changes of `_dataProvider`

| Name | Type | Description |
| ---- | ---- | ----------- |
| _dataProvider | address | address representing data provider |

| Name | Type | Description |
| ---- | ---- | ----------- |
| _feePercentageBIPS | uint256[] | positional array of fee percentages in BIPS |
| _validFromEpoch | uint256[] | positional array of block numbers the fee setings are effective from |
| _fixed | bool[] | positional array of boolean values indicating if settings are subjected to change |

## getEpochReward

```solidity
function getEpochReward(uint256 _rewardEpoch) external view returns (uint256 _totalReward, uint256 _claimedReward)
```

Returns information on epoch reward

| Name | Type | Description |
| ---- | ---- | ----------- |
| _rewardEpoch | uint256 | reward epoch number |

| Name | Type | Description |
| ---- | ---- | ----------- |
| _totalReward | uint256 | number representing the total epoch reward |
| _claimedReward | uint256 | number representing the amount of total epoch reward that has been claimed |

## getStateOfRewards

```solidity
function getStateOfRewards(address _beneficiary, uint256 _rewardEpoch) external view returns (address[] _dataProviders, uint256[] _rewardAmounts, bool[] _claimed, bool _claimable)
```

Returns the state of rewards for `_beneficiary` at `_rewardEpoch`

_Reverts when queried with `_beneficary` delegating by amount_

| Name | Type | Description |
| ---- | ---- | ----------- |
| _beneficiary | address | address of reward beneficiary |
| _rewardEpoch | uint256 | reward epoch number |

| Name | Type | Description |
| ---- | ---- | ----------- |
| _dataProviders | address[] | positional array of addresses representing data providers |
| _rewardAmounts | uint256[] | positional array of reward amounts |
| _claimed | bool[] | positional array of boolean values indicating if reward is claimed |
| _claimable | bool | boolean value indicating if rewards are claimable |

## getStateOfRewardsFromDataProviders

```solidity
function getStateOfRewardsFromDataProviders(address _beneficiary, uint256 _rewardEpoch, address[] _dataProviders) external view returns (uint256[] _rewardAmounts, bool[] _claimed, bool _claimable)
```

Returns the state of rewards for `_beneficiary` at `_rewardEpoch` from `_dataProviders`

| Name | Type | Description |
| ---- | ---- | ----------- |
| _beneficiary | address | address of reward beneficiary |
| _rewardEpoch | uint256 | reward epoch number |
| _dataProviders | address[] | positional array of addresses representing data providers |

| Name | Type | Description |
| ---- | ---- | ----------- |
| _rewardAmounts | uint256[] | positional array of reward amounts |
| _claimed | bool[] | positional array of boolean values indicating if reward is claimed |
| _claimable | bool | boolean value indicating if rewards are claimable |

## getEpochsWithClaimableRewards

```solidity
function getEpochsWithClaimableRewards() external view returns (uint256 _startEpochId, uint256 _endEpochId)
```

Returns the start and the end of the reward epoch range for which the reward is claimable

| Name | Type | Description |
| ---- | ---- | ----------- |

## getEpochsWithUnclaimedRewards

```solidity
function getEpochsWithUnclaimedRewards(address _beneficiary) external view returns (uint256[] _epochIds)
```

Returns the array of claimable epoch ids for which the reward has not yet been claimed

_Reverts when queried with `_beneficary` delegating by amount_

| Name | Type | Description |
| ---- | ---- | ----------- |
| _beneficiary | address | address of reward beneficiary |

| Name | Type | Description |
| ---- | ---- | ----------- |
| _epochIds | uint256[] | array of epoch ids |

## getClaimedReward

```solidity
function getClaimedReward(uint256 _rewardEpoch, address _dataProvider, address _claimer) external view returns (bool _claimed, uint256 _amount)
```

Returns the information on claimed reward of `_dataProvider` for `_rewardEpoch` by `_claimer`

| Name | Type | Description |
| ---- | ---- | ----------- |
| _rewardEpoch | uint256 | reward epoch number |
| _dataProvider | address | address representing the data provider |
| _claimer | address | address representing the claimer |

| Name | Type | Description |
| ---- | ---- | ----------- |
| _claimed | bool | boolean indicating if reward has been claimed |
| _amount | uint256 | number representing the claimed amount |

## getRewardEpochToExpireNext

```solidity
function getRewardEpochToExpireNext() external view returns (uint256)
```

Return reward epoch that will expire, when new reward epoch will start

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | Reward epoch id that will expire next |

## getRewardEpochVotePowerBlock

```solidity
function getRewardEpochVotePowerBlock(uint256 _rewardEpoch) external view returns (uint256)
```

Return reward epoch vote power block

| Name | Type | Description |
| ---- | ---- | ----------- |
| _rewardEpoch | uint256 | reward epoch number |

## getCurrentRewardEpoch

```solidity
function getCurrentRewardEpoch() external view returns (uint256)
```

Return current reward epoch number

## getInitialRewardEpoch

```solidity
function getInitialRewardEpoch() external view returns (uint256)
```

Return initial reward epoch number

## getDataProviderPerformanceInfo

```solidity
function getDataProviderPerformanceInfo(uint256 _rewardEpoch, address _dataProvider) external view returns (uint256 _rewardAmount, uint256 _votePowerIgnoringRevocation)
```

Returns the information on rewards and initial vote power of `_dataProvider` for `_rewardEpoch`

| Name | Type | Description |
| ---- | ---- | ----------- |
| _rewardEpoch | uint256 | reward epoch number |
| _dataProvider | address | address representing the data provider |

| Name | Type | Description |
| ---- | ---- | ----------- |
| _rewardAmount | uint256 | number representing the amount of rewards |
| _votePowerIgnoringRevocation | uint256 | number representing the vote power ignoring revocations |
