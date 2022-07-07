# IFtsoManager

<div class="api-node-type" markdown>

## Events

<div class="api-node" markdown>
### FtsoAdded

```solidity
event FtsoAdded(
    contract IIFtso ftso,
    bool add
)
```

</div>
<div class="api-node" markdown>
### FallbackMode

```solidity
event FallbackMode(
    bool fallbackMode
)
```

</div>
<div class="api-node" markdown>
### FtsoFallbackMode

```solidity
event FtsoFallbackMode(
    contract IIFtso ftso,
    bool fallbackMode
)
```

</div>
<div class="api-node" markdown>
### RewardEpochFinalized

```solidity
event RewardEpochFinalized(
    uint256 votepowerBlock,
    uint256 startBlock
)
```

</div>
<div class="api-node" markdown>
### PriceEpochFinalized

```solidity
event PriceEpochFinalized(
    address chosenFtso,
    uint256 rewardEpochId
)
```

</div>
<div class="api-node" markdown>
### InitializingCurrentEpochStateForRevealFailed

```solidity
event InitializingCurrentEpochStateForRevealFailed(
    contract IIFtso ftso,
    uint256 epochId
)
```

</div>
<div class="api-node" markdown>
### FinalizingPriceEpochFailed

```solidity
event FinalizingPriceEpochFailed(
    contract IIFtso ftso,
    uint256 epochId,
    enum IFtso.PriceFinalizationType failingType
)
```

</div>
<div class="api-node" markdown>
### DistributingRewardsFailed

```solidity
event DistributingRewardsFailed(
    address ftso,
    uint256 epochId
)
```

</div>
<div class="api-node" markdown>
### AccruingUnearnedRewardsFailed

```solidity
event AccruingUnearnedRewardsFailed(
    uint256 epochId
)
```

</div>
</div>
<div class="api-node-type" markdown>

## Functions

<div class="api-node" markdown>
### active

```solidity
function active(
) external view returns (
    bool);
```

</div>
<div class="api-node" markdown>
### getCurrentRewardEpoch

```solidity
function getCurrentRewardEpoch(
) external view returns (
    uint256);
```

</div>
<div class="api-node" markdown>
### getRewardEpochVotePowerBlock

```solidity
function getRewardEpochVotePowerBlock(
    uint256 _rewardEpoch
) external view returns (
    uint256);
```

</div>
<div class="api-node" markdown>
### getRewardEpochToExpireNext

```solidity
function getRewardEpochToExpireNext(
) external view returns (
    uint256);
```

</div>
<div class="api-node" markdown>
### getCurrentPriceEpochData

```solidity
function getCurrentPriceEpochData(
) external view returns (
    uint256 _priceEpochId,
    uint256 _priceEpochStartTimestamp,
    uint256 _priceEpochEndTimestamp,
    uint256 _priceEpochRevealEndTimestamp,
    uint256 _currentTimestamp);
```

</div>
<div class="api-node" markdown>
### getFtsos

```solidity
function getFtsos(
) external view returns (
    contract IIFtso[] _ftsos);
```

</div>
<div class="api-node" markdown>
### getPriceEpochConfiguration

```solidity
function getPriceEpochConfiguration(
) external view returns (
    uint256 _firstPriceEpochStartTs,
    uint256 _priceEpochDurationSeconds,
    uint256 _revealEpochDurationSeconds);
```

</div>
<div class="api-node" markdown>
### getRewardEpochConfiguration

```solidity
function getRewardEpochConfiguration(
) external view returns (
    uint256 _firstRewardEpochStartTs,
    uint256 _rewardEpochDurationSeconds);
```

</div>
<div class="api-node" markdown>
### getFallbackMode

```solidity
function getFallbackMode(
) external view returns (
    bool _fallbackMode,
    contract IIFtso[] _ftsos,
    bool[] _ftsoInFallbackMode);
```

</div>
</div>

