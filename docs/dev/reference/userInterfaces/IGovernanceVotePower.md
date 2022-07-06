# IGovernanceVotePower

## delegate

```solidity
function delegate(address _to) external
```

Delegate all governance vote power of `msg.sender` to `_to`.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _to | address | The address of the recipient |

## undelegate

```solidity
function undelegate() external
```

Undelegate all governance vote power of `msg.sender``.

## votePowerOfAt

```solidity
function votePowerOfAt(address _who, uint256 _blockNumber) external view returns (uint256)
```

Get the governance vote power of `_who` at block `_blockNumber`

| Name | Type | Description |
| ---- | ---- | ----------- |
| _who | address | The address to get voting power. |
| _blockNumber | uint256 | The block number at which to fetch. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | _votePower    Governance vote power of `_who` at `_blockNumber`. |

## getVotes

```solidity
function getVotes(address account) external view returns (uint256)
```

Get the vote power of `account` at the current block.

| Name | Type | Description |
| ---- | ---- | ----------- |
| account | address | The address to get voting power. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | Vote power of `account` at the current block number. |

## getDelegateOfAt

```solidity
function getDelegateOfAt(address _who, uint256 _blockNumber) external view returns (address)
```

Get the delegate's address of `_who` at block `_blockNumber`

| Name | Type | Description |
| ---- | ---- | ----------- |
| _who | address | The address to get delegate's address. |
| _blockNumber | uint256 | The block number at which to fetch. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | Delegate's address of `_who` at `_blockNumber`. |

## getDelegateOfAtNow

```solidity
function getDelegateOfAtNow(address _who) external view returns (address)
```

Get the delegate's address of `_who` at the current block.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _who | address | The address to get delegate's address. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | Delegate's address of `_who` at the current block number. |

