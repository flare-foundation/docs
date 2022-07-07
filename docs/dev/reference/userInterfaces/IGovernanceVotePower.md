# IGovernanceVotePower

<div class="api-node-type" markdown>

## Functions

<div class="api-node" markdown>
### delegate

```solidity
function delegate(
    address _to
) external;
```

Delegate all governance vote power of `msg.sender` to `_to`.

*Parameters*

| Name | Type | Description |
| ---- | ---- | ----------- |
| _to | address | The address of the recipient |

</div>
<div class="api-node" markdown>
### undelegate

```solidity
function undelegate(
) external;
```

Undelegate all governance vote power of `msg.sender``.

</div>
<div class="api-node" markdown>
### votePowerOfAt

```solidity
function votePowerOfAt(
    address _who,
    uint256 _blockNumber
) external view returns (
    uint256);
```

Get the governance vote power of `_who` at block `_blockNumber`

*Parameters*

| Name | Type | Description |
| ---- | ---- | ----------- |
| _who | address | The address to get voting power. |
| _blockNumber | uint256 | The block number at which to fetch. |

*Returns*

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | _votePower    Governance vote power of `_who` at `_blockNumber`. |
</div>
<div class="api-node" markdown>
### getVotes

```solidity
function getVotes(
    address account
) external view returns (
    uint256);
```

Get the vote power of `account` at the current block.

*Parameters*

| Name | Type | Description |
| ---- | ---- | ----------- |
| account | address | The address to get voting power. |

*Returns*

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | Vote power of `account` at the current block number. |
</div>
<div class="api-node" markdown>
### getDelegateOfAt

```solidity
function getDelegateOfAt(
    address _who,
    uint256 _blockNumber
) external view returns (
    address);
```

Get the delegate's address of `_who` at block `_blockNumber`

*Parameters*

| Name | Type | Description |
| ---- | ---- | ----------- |
| _who | address | The address to get delegate's address. |
| _blockNumber | uint256 | The block number at which to fetch. |

*Returns*

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | Delegate's address of `_who` at `_blockNumber`. |
</div>
<div class="api-node" markdown>
### getDelegateOfAtNow

```solidity
function getDelegateOfAtNow(
    address _who
) external view returns (
    address);
```

Get the delegate's address of `_who` at the current block.

*Parameters*

| Name | Type | Description |
| ---- | ---- | ----------- |
| _who | address | The address to get delegate's address. |

*Returns*

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | Delegate's address of `_who` at the current block number. |
</div>
</div>

