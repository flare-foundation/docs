# IPriceSubmitter

## HashSubmitted

```solidity
event HashSubmitted(address submitter, uint256 epochId, bytes32 hash, uint256 timestamp)
```

Event emitted when hash was submitted through PriceSubmitter.

| Name | Type | Description |
| ---- | ---- | ----------- |
| submitter | address | the address of the sender |
| epochId | uint256 | current price epoch id |
| hash | bytes32 | the submitted hash |
| timestamp | uint256 | current block timestamp |

## PricesRevealed

```solidity
event PricesRevealed(address voter, uint256 epochId, contract IFtsoGenesis[] ftsos, uint256[] prices, uint256 random, uint256 timestamp)
```

Event emitted when prices were revealed through PriceSubmitter.

| Name | Type | Description |
| ---- | ---- | ----------- |
| voter | address | the address of the sender |
| epochId | uint256 | id of the epoch in which the price hash was submitted |
| ftsos | contract IFtsoGenesis[] | array of ftsos that correspond to the indexes in the call |
| prices | uint256[] | the submitted prices |
| random | uint256 |  |
| timestamp | uint256 | current block timestamp |

## submitHash

```solidity
function submitHash(uint256 _epochId, bytes32 _hash) external
```

Submits hash for current epoch
Emits HashSubmitted event

| Name | Type | Description |
| ---- | ---- | ----------- |
| _epochId | uint256 | Target epoch id to which hash is submitted |
| _hash | bytes32 | Hash of ftso indices, prices, random number and voter address |

## revealPrices

```solidity
function revealPrices(uint256 _epochId, uint256[] _ftsoIndices, uint256[] _prices, uint256 _random) external
```

Reveals submitted prices during epoch reveal period
The hash of ftso indices, prices, random number and voter address must be equal to the submitted hash
Emits PricesRevealed event

| Name | Type | Description |
| ---- | ---- | ----------- |
| _epochId | uint256 | Id of the epoch in which the price hashes was submitted |
| _ftsoIndices | uint256[] | List of increasing ftso indices |
| _prices | uint256[] | List of submitted prices in USD |
| _random | uint256 | Submitted random number |

## voterWhitelistBitmap

```solidity
function voterWhitelistBitmap(address _voter) external view returns (uint256)
```

Returns bitmap of all ftso's for which `_voter` is allowed to submit prices/hashes.
If voter is allowed to vote for ftso at index (see *_FTSO_INDEX), the corrsponding
bit in the result will be 1.

## getVoterWhitelister

```solidity
function getVoterWhitelister() external view returns (address)
```

## getFtsoRegistry

```solidity
function getFtsoRegistry() external view returns (contract IFtsoRegistryGenesis)
```

## getFtsoManager

```solidity
function getFtsoManager() external view returns (contract IFtsoManagerGenesis)
```

## getCurrentRandom

```solidity
function getCurrentRandom() external view returns (uint256)
```

Returns current random number

## getRandom

```solidity
function getRandom(uint256 _epochId) external view returns (uint256)
```

Returns random number of the specified epoch

| Name | Type | Description |
| ---- | ---- | ----------- |
| _epochId | uint256 | Id of the epoch |

