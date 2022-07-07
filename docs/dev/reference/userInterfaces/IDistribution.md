# IDistribution

<div class="api-node-type" markdown>

## Events

<div class="api-node" markdown>
### EntitlementStart

```solidity
event EntitlementStart(
    uint256 entitlementStartTs
)
```

</div>
<div class="api-node" markdown>
### AccountClaimed

```solidity
event AccountClaimed(
    address theAccount
)
```

</div>
<div class="api-node" markdown>
### AccountOptOut

```solidity
event AccountOptOut(
    address theAccount
)
```

</div>
<div class="api-node" markdown>
### OptOutWeiWithdrawn

```solidity
event OptOutWeiWithdrawn(
)
```

</div>
<div class="api-node" markdown>
### AccountsAdded

```solidity
event AccountsAdded(
    address[] accountsArray
)
```

</div>
</div>
<div class="api-node-type" markdown>

## Functions

<div class="api-node" markdown>
### claim

```solidity
function claim(
    address payable _recipient
) external returns (
    uint256 _amountWei);
```

</div>
<div class="api-node" markdown>
### optOutOfAirdrop

```solidity
function optOutOfAirdrop(
) external;
```

</div>
<div class="api-node" markdown>
### getClaimableAmount

```solidity
function getClaimableAmount(
) external view returns (
    uint256 _amountWei);
```

</div>
<div class="api-node" markdown>
### getClaimableAmountOf

```solidity
function getClaimableAmountOf(
    address account
) external view returns (
    uint256 _amountWei);
```

</div>
<div class="api-node" markdown>
### secondsTillNextClaim

```solidity
function secondsTillNextClaim(
) external view returns (
    uint256 timetill);
```

</div>
</div>

