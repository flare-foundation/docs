# IFtso

<div class="api-node-type" markdown>

## Enums

<div class="api-node" markdown>
### PriceFinalizationType

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
</div>
</div>
<div class="api-node-type" markdown>

## Events

<div class="api-node" markdown>
### PriceRevealed

```solidity
event PriceRevealed(
    address voter,
    uint256 epochId,
    uint256 price,
    uint256 timestamp,
    uint256 votePowerNat,
    uint256 votePowerAsset
)
```

</div>
<div class="api-node" markdown>
### PriceFinalized

```solidity
event PriceFinalized(
    uint256 epochId,
    uint256 price,
    bool rewardedFtso,
    uint256 lowRewardPrice,
    uint256 highRewardPrice,
    enum IFtso.PriceFinalizationType finalizationType,
    uint256 timestamp
)
```

</div>
<div class="api-node" markdown>
### PriceEpochInitializedOnFtso

```solidity
event PriceEpochInitializedOnFtso(
    uint256 epochId,
    uint256 endTime,
    uint256 timestamp
)
```

</div>
<div class="api-node" markdown>
### LowTurnout

```solidity
event LowTurnout(
    uint256 epochId,
    uint256 natTurnout,
    uint256 lowNatTurnoutThresholdBIPS,
    uint256 timestamp
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

Returns if FTSO is active

</div>
<div class="api-node" markdown>
### symbol

```solidity
function symbol(
) external view returns (
    string);
```

Returns the FTSO symbol

</div>
<div class="api-node" markdown>
### getCurrentEpochId

```solidity
function getCurrentEpochId(
) external view returns (
    uint256);
```

Returns current epoch id

</div>
<div class="api-node" markdown>
### getEpochId

```solidity
function getEpochId(
    uint256 _timestamp
) external view returns (
    uint256);
```

Returns id of the epoch which was opened for price submission at the specified timestamp

*Parameters*

| Name | Type | Description |
| ---- | ---- | ----------- |
| _timestamp | uint256 | Timestamp as seconds from unix epoch |

</div>
<div class="api-node" markdown>
### getRandom

```solidity
function getRandom(
    uint256 _epochId
) external view returns (
    uint256);
```

Returns random number of the specified epoch

*Parameters*

| Name | Type | Description |
| ---- | ---- | ----------- |
| _epochId | uint256 | Id of the epoch |

</div>
<div class="api-node" markdown>
### getEpochPrice

```solidity
function getEpochPrice(
    uint256 _epochId
) external view returns (
    uint256);
```

Returns asset price consented in specific epoch

*Parameters*

| Name | Type | Description |
| ---- | ---- | ----------- |
| _epochId | uint256 | Id of the epoch |

*Returns*

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | Price in USD multiplied by ASSET_PRICE_USD_DECIMALS |
</div>
<div class="api-node" markdown>
### getPriceEpochData

```solidity
function getPriceEpochData(
) external view returns (
    uint256 _epochId,
    uint256 _epochSubmitEndTime,
    uint256 _epochRevealEndTime,
    uint256 _votePowerBlock,
    bool _fallbackMode);
```

Returns current epoch data

_half-closed intervals - end time not included_

*Returns*

| Name | Type | Description |
| ---- | ---- | ----------- |
| _epochId | uint256 | Current epoch id |
| _epochSubmitEndTime | uint256 | End time of the current epoch price submission as seconds from unix epoch |
| _epochRevealEndTime | uint256 | End time of the current epoch price reveal as seconds from unix epoch |
| _votePowerBlock | uint256 | Vote power block for the current epoch |
| _fallbackMode | bool | Current epoch in fallback mode - only votes from trusted addresses will be used |
</div>
<div class="api-node" markdown>
### getPriceEpochConfiguration

```solidity
function getPriceEpochConfiguration(
) external view returns (
    uint256 _firstEpochStartTs,
    uint256 _submitPeriodSeconds,
    uint256 _revealPeriodSeconds);
```

Returns current epoch data

*Returns*

| Name | Type | Description |
| ---- | ---- | ----------- |
| _firstEpochStartTs | uint256 | First epoch start timestamp |
| _submitPeriodSeconds | uint256 | Submit period in seconds |
| _revealPeriodSeconds | uint256 | Reveal period in seconds |
</div>
<div class="api-node" markdown>
### getEpochPriceForVoter

```solidity
function getEpochPriceForVoter(
    uint256 _epochId,
    address _voter
) external view returns (
    uint256);
```

Returns asset price submitted by voter in specific epoch

*Parameters*

| Name | Type | Description |
| ---- | ---- | ----------- |
| _epochId | uint256 | Id of the epoch |
| _voter | address | Address of the voter |

*Returns*

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | Price in USD multiplied by ASSET_PRICE_USD_DECIMALS |
</div>
<div class="api-node" markdown>
### getCurrentPrice

```solidity
function getCurrentPrice(
) external view returns (
    uint256 _price,
    uint256 _timestamp);
```

Returns current asset price

*Returns*

| Name | Type | Description |
| ---- | ---- | ----------- |
| _price | uint256 | Price in USD multiplied by ASSET_PRICE_USD_DECIMALS |
| _timestamp | uint256 | Time when price was updated for the last time |
</div>
<div class="api-node" markdown>
### getCurrentPriceDetails

```solidity
function getCurrentPriceDetails(
) external view returns (
    uint256 _price,
    uint256 _priceTimestamp,
    enum IFtso.PriceFinalizationType _priceFinalizationType,
    uint256 _lastPriceEpochFinalizationTimestamp,
    enum IFtso.PriceFinalizationType _lastPriceEpochFinalizationType);
```

Returns current asset price details

*Returns*

| Name | Type | Description |
| ---- | ---- | ----------- |
| _price | uint256 | Price in USD multiplied by ASSET_PRICE_USD_DECIMALS |
| _priceTimestamp | uint256 | Time when price was updated for the last time |
| _priceFinalizationType | enum IFtso.PriceFinalizationType | Finalization type when price was updated for the last time |
| _lastPriceEpochFinalizationTimestamp | uint256 | Time when last price epoch was finalized |
| _lastPriceEpochFinalizationType | enum IFtso.PriceFinalizationType | Finalization type of last finalized price epoch |
</div>
<div class="api-node" markdown>
### getCurrentRandom

```solidity
function getCurrentRandom(
) external view returns (
    uint256);
```

Returns current random number

</div>
</div>

