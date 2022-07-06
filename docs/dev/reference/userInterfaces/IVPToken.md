# IVPToken

## delegate

```solidity
function delegate(address _to, uint256 _bips) external
```

Delegate by percentage `_bips` of voting power to `_to` from `msg.sender`.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _to | address | The address of the recipient |
| _bips | uint256 | The percentage of voting power to be delegated expressed in basis points (1/100 of one percent).   Not cummulative - every call resets the delegation value (and value of 0 undelegates `to`). |

## delegateExplicit

```solidity
function delegateExplicit(address _to, uint256 _amount) external
```

Explicitly delegate `_amount` of voting power to `_to` from `msg.sender`.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _to | address | The address of the recipient |
| _amount | uint256 | An explicit vote power amount to be delegated.   Not cummulative - every call resets the delegation value (and value of 0 undelegates `to`). |

## revokeDelegationAt

```solidity
function revokeDelegationAt(address _who, uint256 _blockNumber) external
```

Revoke all delegation from sender to `_who` at given block. 
   Only affects the reads via `votePowerOfAtCached()` in the block `_blockNumber`.
   Block `_blockNumber` must be in the past. 
   This method should be used only to prevent rogue delegate voting in the current voting block.
   To stop delegating use delegate/delegateExplicit with value of 0 or undelegateAll/undelegateAllExplicit.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _who | address | Address of the delegatee |
| _blockNumber | uint256 | The block number at which to revoke delegation. |

## undelegateAll

```solidity
function undelegateAll() external
```

Undelegate all voting power for delegates of `msg.sender`
   Can only be used with percentage delegation.
   Does not reset delegation mode back to NOTSET.

## undelegateAllExplicit

```solidity
function undelegateAllExplicit(address[] _delegateAddresses) external returns (uint256)
```

Undelegate all explicit vote power by amount delegates for `msg.sender`.
   Can only be used with explicit delegation.
   Does not reset delegation mode back to NOTSET.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _delegateAddresses | address[] | Explicit delegation does not store delegatees' addresses,    so the caller must supply them. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The amount still delegated (in case the list of delegates was incomplete). |

## name

```solidity
function name() external view returns (string)
```

_Should be compatible with ERC20 method_

## symbol

```solidity
function symbol() external view returns (string)
```

_Should be compatible with ERC20 method_

## decimals

```solidity
function decimals() external view returns (uint8)
```

_Should be compatible with ERC20 method_

## totalSupplyAt

```solidity
function totalSupplyAt(uint256 _blockNumber) external view returns (uint256)
```

Total amount of tokens at a specific `_blockNumber`.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _blockNumber | uint256 | The block number when the totalSupply is queried |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The total amount of tokens at `_blockNumber` |

## balanceOfAt

```solidity
function balanceOfAt(address _owner, uint256 _blockNumber) external view returns (uint256)
```

_Queries the token balance of `_owner` at a specific `_blockNumber`._

| Name | Type | Description |
| ---- | ---- | ----------- |
| _owner | address | The address from which the balance will be retrieved. |
| _blockNumber | uint256 | The block number when the balance is queried. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The balance at `_blockNumber`. |

## totalVotePower

```solidity
function totalVotePower() external view returns (uint256)
```

Get the current total vote power.

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The current total vote power (sum of all accounts' vote powers). |

## totalVotePowerAt

```solidity
function totalVotePowerAt(uint256 _blockNumber) external view returns (uint256)
```

Get the total vote power at block `_blockNumber`

| Name | Type | Description |
| ---- | ---- | ----------- |
| _blockNumber | uint256 | The block number at which to fetch. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The total vote power at the block  (sum of all accounts' vote powers). |

## votePowerOf

```solidity
function votePowerOf(address _owner) external view returns (uint256)
```

Get the current vote power of `_owner`.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _owner | address | The address to get voting power. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | Current vote power of `_owner`. |

## votePowerOfAt

```solidity
function votePowerOfAt(address _owner, uint256 _blockNumber) external view returns (uint256)
```

Get the vote power of `_owner` at block `_blockNumber`

| Name | Type | Description |
| ---- | ---- | ----------- |
| _owner | address | The address to get voting power. |
| _blockNumber | uint256 | The block number at which to fetch. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | Vote power of `_owner` at `_blockNumber`. |

## votePowerOfAtIgnoringRevocation

```solidity
function votePowerOfAtIgnoringRevocation(address _owner, uint256 _blockNumber) external view returns (uint256)
```

Get the vote power of `_owner` at block `_blockNumber`, ignoring revocation information (and cache).

| Name | Type | Description |
| ---- | ---- | ----------- |
| _owner | address | The address to get voting power. |
| _blockNumber | uint256 | The block number at which to fetch. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | Vote power of `_owner` at `_blockNumber`. Result doesn't change if vote power is revoked. |

## delegationModeOf

```solidity
function delegationModeOf(address _who) external view returns (uint256)
```

Get the delegation mode for '_who'. This mode determines whether vote power is
 allocated by percentage or by explicit value. Once the delegation mode is set, 
 it never changes, even if all delegations are removed.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _who | address | The address to get delegation mode. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | delegation mode: 0 = NOTSET, 1 = PERCENTAGE, 2 = AMOUNT (i.e. explicit) |

## votePowerFromTo

```solidity
function votePowerFromTo(address _from, address _to) external view returns (uint256)
```

Get current delegated vote power `_from` delegator delegated `_to` delegatee.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _from | address | Address of delegator |
| _to | address | Address of delegatee |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The delegated vote power. |

## votePowerFromToAt

```solidity
function votePowerFromToAt(address _from, address _to, uint256 _blockNumber) external view returns (uint256)
```

Get delegated the vote power `_from` delegator delegated `_to` delegatee at `_blockNumber`.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _from | address | Address of delegator |
| _to | address | Address of delegatee |
| _blockNumber | uint256 | The block number at which to fetch. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The delegated vote power. |

## undelegatedVotePowerOf

```solidity
function undelegatedVotePowerOf(address _owner) external view returns (uint256)
```

Compute the current undelegated vote power of `_owner`

| Name | Type | Description |
| ---- | ---- | ----------- |
| _owner | address | The address to get undelegated voting power. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The unallocated vote power of `_owner` |

## undelegatedVotePowerOfAt

```solidity
function undelegatedVotePowerOfAt(address _owner, uint256 _blockNumber) external view returns (uint256)
```

Get the undelegated vote power of `_owner` at given block.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _owner | address | The address to get undelegated voting power. |
| _blockNumber | uint256 | The block number at which to fetch. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The undelegated vote power of `_owner` (= owner's own balance minus all delegations from owner) |

## delegatesOf

```solidity
function delegatesOf(address _who) external view returns (address[] _delegateAddresses, uint256[] _bips, uint256 _count, uint256 _delegationMode)
```

Get the vote power delegation `delegationAddresses` 
 and `_bips` of `_who`. Returned in two separate positional arrays.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _who | address | The address to get delegations. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| _delegateAddresses | address[] | Positional array of delegation addresses. |
| _bips | uint256[] | Positional array of delegation percents specified in basis points (1/100 or 1 percent) |
| _count | uint256 | The number of delegates. |
| _delegationMode | uint256 | The mode of the delegation (NOTSET=0, PERCENTAGE=1, AMOUNT=2). |

## delegatesOfAt

```solidity
function delegatesOfAt(address _who, uint256 _blockNumber) external view returns (address[] _delegateAddresses, uint256[] _bips, uint256 _count, uint256 _delegationMode)
```

Get the vote power delegation `delegationAddresses` 
 and `pcts` of `_who`. Returned in two separate positional arrays.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _who | address | The address to get delegations. |
| _blockNumber | uint256 | The block for which we want to know the delegations. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| _delegateAddresses | address[] | Positional array of delegation addresses. |
| _bips | uint256[] | Positional array of delegation percents specified in basis points (1/100 or 1 percent) |
| _count | uint256 | The number of delegates. |
| _delegationMode | uint256 | The mode of the delegation (NOTSET=0, PERCENTAGE=1, AMOUNT=2). |

## readVotePowerContract

```solidity
function readVotePowerContract() external view returns (contract IVPContractEvents)
```

Returns VPContract used for readonly operations (view methods).
The only non-view method that might be called on it is `revokeDelegationAt`.

`readVotePowerContract` is almost always equal to `writeVotePowerContract`
except during upgrade from one VPContract to a new version (which should happen
rarely or never and will be anounced before).

You shouldn't call any methods on VPContract directly, all are exposed
via VPToken (and state changing methods are forbidden from direct calls). 
This is the reason why this method returns `IVPContractEvents` - it should only be used
for listening to events (`Revoke` only).

## writeVotePowerContract

```solidity
function writeVotePowerContract() external view returns (contract IVPContractEvents)
```

Returns VPContract used for state changing operations (non-view methods).
The only non-view method that might be called on it is `revokeDelegationAt`.

`writeVotePowerContract` is almost always equal to `readVotePowerContract`
except during upgrade from one VPContract to a new version (which should happen
rarely or never and will be anounced before). In the case of upgrade,
`writeVotePowerContract` will be replaced first to establish delegations, and
after some perio (e.g. after a reward epoch ends) `readVotePowerContract` will be set equal to it.

You shouldn't call any methods on VPContract directly, all are exposed
via VPToken (and state changing methods are forbidden from direct calls). 
This is the reason why this method returns `IVPContractEvents` - it should only be used
for listening to events (`Delegate` and `Revoke` only).

## governanceVotePower

```solidity
function governanceVotePower() external view returns (contract IGovernanceVotePower)
```

When set, allows token owners to participate in governance voting
and delegate governance vote power.

