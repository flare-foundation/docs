# IWNat

<div class="api-node-type" markdown>

## Functions

<div class="api-node" markdown>
### deposit

```solidity
function deposit(
) external payable;
```

Deposit native token and mint WNAT ERC20.

</div>
<div class="api-node" markdown>
### withdraw

```solidity
function withdraw(
    uint256 _amount
) external;
```

Withdraw native token and burn WNAT ERC20.

*Parameters*

| Name | Type | Description |
| ---- | ---- | ----------- |
| _amount | uint256 | The amount to withdraw. |

</div>
<div class="api-node" markdown>
### depositTo

```solidity
function depositTo(
    address _recipient
) external payable;
```

Deposit native token from msg.sender and mint WNAT ERC20.

*Parameters*

| Name | Type | Description |
| ---- | ---- | ----------- |
| _recipient | address | An address to receive minted WNAT. |

</div>
<div class="api-node" markdown>
### withdrawFrom

```solidity
function withdrawFrom(
    address _owner,
    uint256 _amount
) external;
```

Withdraw WNAT from an owner and send NAT to msg.sender given an allowance.

*Parameters*

| Name | Type | Description |
| ---- | ---- | ----------- |
| _owner | address | An address spending the native tokens. |
| _amount | uint256 | The amount to spend. Requirements: - `_owner` must have a balance of at least `_amount`. - the caller must have allowance for `_owners`'s tokens of at least `_amount`. |

</div>
</div>

