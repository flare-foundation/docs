# IDistributionToDelegators

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
    address whoClaimed,
    address sentTo,
    uint256 month,
    uint256 amountWei
)
```

</div>
<div class="api-node" markdown>
### AccountOptOut

```solidity
event AccountOptOut(
    address theAccount,
    bool confirmed
)
```

</div>
</div>
<div class="api-node-type" markdown>

## Functions

<div class="api-node" markdown>
### optOutOfAirdrop

```solidity
function optOutOfAirdrop(
) external;
```

</div>
<div class="api-node" markdown>
### claim

```solidity
function claim(
    address payable _recipient,
    uint256 _month
) external returns (
    uint256 _amountWei);
```

</div>
<div class="api-node" markdown>
### claimToPersonalDelegationAccount

```solidity
function claimToPersonalDelegationAccount(
    uint256 _month
) external returns (
    uint256 _amountWei);
```

</div>
<div class="api-node" markdown>
### getClaimableAmount

```solidity
function getClaimableAmount(
    uint256 _month
) external view returns (
    uint256 _amountWei);
```

</div>
<div class="api-node" markdown>
### getClaimableAmountOf

```solidity
function getClaimableAmountOf(
    address account,
    uint256 _month
) external view returns (
    uint256 _amountWei);
```

</div>
<div class="api-node" markdown>
### getClaimedAmount

```solidity
function getClaimedAmount(
    uint256 _month
) external view returns (
    uint256 _amountWei);
```

</div>
<div class="api-node" markdown>
### getClaimedAmountOf

```solidity
function getClaimedAmountOf(
    address _account,
    uint256 _month
) external view returns (
    uint256 _amountWei);
```

</div>
<div class="api-node" markdown>
### getCurrentMonth

```solidity
function getCurrentMonth(
) external view returns (
    uint256 _currentMonth);
```

</div>
<div class="api-node" markdown>
### getMonthToExpireNext

```solidity
function getMonthToExpireNext(
) external view returns (
    uint256 _monthToExpireNext);
```

</div>
<div class="api-node" markdown>
### secondsTillNextClaim

```solidity
function secondsTillNextClaim(
) external view returns (
    uint256 _timetill);
```

</div>
</div>

