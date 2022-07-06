# IFtso

## PriceFinalizationType

```solidity
enum PriceFinalizationType {
  NOT_FINALIZED,
  WEIGHTED_MEDIAN,
  TRUSTED_ADDRESSES,
  PREVIOUS_PRICE_COPIED,
  TRUSTED_ADDRESSES_EXCEPTION,
  PREVIOUS_PRICE_COPIED_EXCEPTION
}
```

## PriceRevealed

```solidity
event PriceRevealed(address voter, uint256 epochId, uint256 price, uint256 timestamp, uint256 votePowerNat, uint256 votePowerAsset)
```

## PriceFinalized

```solidity
event PriceFinalized(uint256 epochId, uint256 price, bool rewardedFtso, uint256 lowRewardPrice, uint256 highRewardPrice, enum IFtso.PriceFinalizationType finalizationType, uint256 timestamp)
```

## PriceEpochInitializedOnFtso

```solidity
event PriceEpochInitializedOnFtso(uint256 epochId, uint256 endTime, uint256 timestamp)
```

## LowTurnout

```solidity
event LowTurnout(uint256 epochId, uint256 natTurnout, uint256 lowNatTurnoutThresholdBIPS, uint256 timestamp)
```

## active

```solidity
function active() external view returns (bool)
```

Returns if FTSO is active

## symbol

```solidity
function symbol() external view returns (string)
```

Returns the FTSO symbol

## getCurrentEpochId

```solidity
function getCurrentEpochId() external view returns (uint256)
```

Returns current epoch id

## getEpochId

```solidity
function getEpochId(uint256 _timestamp) external view returns (uint256)
```

Returns id of the epoch which was opened for price submission at the specified timestamp

| Name | Type | Description |
| ---- | ---- | ----------- |
| _timestamp | uint256 | Timestamp as seconds from unix epoch |

## getRandom

```solidity
function getRandom(uint256 _epochId) external view returns (uint256)
```

Returns random number of the specified epoch

| Name | Type | Description |
| ---- | ---- | ----------- |
| _epochId | uint256 | Id of the epoch |

## getEpochPrice

```solidity
function getEpochPrice(uint256 _epochId) external view returns (uint256)
```

Returns asset price consented in specific epoch

| Name | Type | Description |
| ---- | ---- | ----------- |
| _epochId | uint256 | Id of the epoch |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | Price in USD multiplied by ASSET_PRICE_USD_DECIMALS |

## getPriceEpochData

```solidity
function getPriceEpochData() external view returns (uint256 _epochId, uint256 _epochSubmitEndTime, uint256 _epochRevealEndTime, uint256 _votePowerBlock, bool _fallbackMode)
```

Returns current epoch data

_half-closed intervals - end time not included_

| Name | Type | Description |
| ---- | ---- | ----------- |
| _epochId | uint256 | Current epoch id |
| _epochSubmitEndTime | uint256 | End time of the current epoch price submission as seconds from unix epoch |
| _epochRevealEndTime | uint256 | End time of the current epoch price reveal as seconds from unix epoch |
| _votePowerBlock | uint256 | Vote power block for the current epoch |
| _fallbackMode | bool | Current epoch in fallback mode - only votes from trusted addresses will be used |

## getPriceEpochConfiguration

```solidity
function getPriceEpochConfiguration() external view returns (uint256 _firstEpochStartTs, uint256 _submitPeriodSeconds, uint256 _revealPeriodSeconds)
```

Returns current epoch data

| Name | Type | Description |
| ---- | ---- | ----------- |
| _firstEpochStartTs | uint256 | First epoch start timestamp |
| _submitPeriodSeconds | uint256 | Submit period in seconds |
| _revealPeriodSeconds | uint256 | Reveal period in seconds |

## getEpochPriceForVoter

```solidity
function getEpochPriceForVoter(uint256 _epochId, address _voter) external view returns (uint256)
```

Returns asset price submitted by voter in specific epoch

| Name | Type | Description |
| ---- | ---- | ----------- |
| _epochId | uint256 | Id of the epoch |
| _voter | address | Address of the voter |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | Price in USD multiplied by ASSET_PRICE_USD_DECIMALS |

## getCurrentPrice

```solidity
function getCurrentPrice() external view returns (uint256 _price, uint256 _timestamp)
```

Returns current asset price

| Name | Type | Description |
| ---- | ---- | ----------- |
| _price | uint256 | Price in USD multiplied by ASSET_PRICE_USD_DECIMALS |
| _timestamp | uint256 | Time when price was updated for the last time |

## getCurrentPriceDetails

```solidity
function getCurrentPriceDetails() external view returns (uint256 _price, uint256 _priceTimestamp, enum IFtso.PriceFinalizationType _priceFinalizationType, uint256 _lastPriceEpochFinalizationTimestamp, enum IFtso.PriceFinalizationType _lastPriceEpochFinalizationType)
```

Returns current asset price details

| Name | Type | Description |
| ---- | ---- | ----------- |
| _price | uint256 | Price in USD multiplied by ASSET_PRICE_USD_DECIMALS |
| _priceTimestamp | uint256 | Time when price was updated for the last time |
| _priceFinalizationType | enum IFtso.PriceFinalizationType | Finalization type when price was updated for the last time |
| _lastPriceEpochFinalizationTimestamp | uint256 | Time when last price epoch was finalized |
| _lastPriceEpochFinalizationType | enum IFtso.PriceFinalizationType | Finalization type of last finalized price epoch |

## getCurrentRandom

```solidity
function getCurrentRandom() external view returns (uint256)
```

Returns current random number

