# IFtsoManager

## FtsoAdded

```solidity
event FtsoAdded(contract IIFtso ftso, bool add)
```

## FallbackMode

```solidity
event FallbackMode(bool fallbackMode)
```

## FtsoFallbackMode

```solidity
event FtsoFallbackMode(contract IIFtso ftso, bool fallbackMode)
```

## RewardEpochFinalized

```solidity
event RewardEpochFinalized(uint256 votepowerBlock, uint256 startBlock)
```

## PriceEpochFinalized

```solidity
event PriceEpochFinalized(address chosenFtso, uint256 rewardEpochId)
```

## InitializingCurrentEpochStateForRevealFailed

```solidity
event InitializingCurrentEpochStateForRevealFailed(contract IIFtso ftso, uint256 epochId)
```

## FinalizingPriceEpochFailed

```solidity
event FinalizingPriceEpochFailed(contract IIFtso ftso, uint256 epochId, enum IFtso.PriceFinalizationType failingType)
```

## DistributingRewardsFailed

```solidity
event DistributingRewardsFailed(address ftso, uint256 epochId)
```

## AccruingUnearnedRewardsFailed

```solidity
event AccruingUnearnedRewardsFailed(uint256 epochId)
```

## active

```solidity
function active() external view returns (bool)
```

## getCurrentRewardEpoch

```solidity
function getCurrentRewardEpoch() external view returns (uint256)
```

## getRewardEpochVotePowerBlock

```solidity
function getRewardEpochVotePowerBlock(uint256 _rewardEpoch) external view returns (uint256)
```

## getRewardEpochToExpireNext

```solidity
function getRewardEpochToExpireNext() external view returns (uint256)
```

## getCurrentPriceEpochData

```solidity
function getCurrentPriceEpochData() external view returns (uint256 _priceEpochId, uint256 _priceEpochStartTimestamp, uint256 _priceEpochEndTimestamp, uint256 _priceEpochRevealEndTimestamp, uint256 _currentTimestamp)
```

## getFtsos

```solidity
function getFtsos() external view returns (contract IIFtso[] _ftsos)
```

## getPriceEpochConfiguration

```solidity
function getPriceEpochConfiguration() external view returns (uint256 _firstPriceEpochStartTs, uint256 _priceEpochDurationSeconds, uint256 _revealEpochDurationSeconds)
```

## getRewardEpochConfiguration

```solidity
function getRewardEpochConfiguration() external view returns (uint256 _firstRewardEpochStartTs, uint256 _rewardEpochDurationSeconds)
```

## getFallbackMode

```solidity
function getFallbackMode() external view returns (bool _fallbackMode, contract IIFtso[] _ftsos, bool[] _ftsoInFallbackMode)
```

