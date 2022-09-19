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
<div class="api-node" markdown>
### ClaimExecutorsChanged

```solidity
event ClaimExecutorsChanged(
    address rewardOwner,
    address[] executors
)
```

</div>
<div class="api-node" markdown>
### AllowedClaimRecipientsChanged

```solidity
event AllowedClaimRecipientsChanged(
    address rewardOwner,
    address[] recipients
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
    address _recipient,
    uint256 _month
) external returns (
    uint256 _amountWei);
```

</div>
<div class="api-node" markdown>
### claimAndWrap

```solidity
function claimAndWrap(
    address _recipient,
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
### claimByExecutor

```solidity
function claimByExecutor(
    address _rewardOwner,
    address _recipient,
    uint256 _month
) external returns (
    uint256 _amountWei);
```

</div>
<div class="api-node" markdown>
### claimAndWrapByExecutor

```solidity
function claimAndWrapByExecutor(
    address _rewardOwner,
    address _recipient,
    uint256 _month
) external returns (
    uint256 _amountWei);
```

</div>
<div class="api-node" markdown>
### claimToPersonalDelegationAccountByExecutor

```solidity
function claimToPersonalDelegationAccountByExecutor(
    address _rewardOwner,
    uint256 _month
) external returns (
    uint256 _amountWei);
```

</div>
<div class="api-node" markdown>
### setClaimExecutors

```solidity
function setClaimExecutors(
    address[] _executors
) external;
```

</div>
<div class="api-node" markdown>
### setAllowedClaimRecipients

```solidity
function setAllowedClaimRecipients(
    address[] _recipients
) external;
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
<div class="api-node" markdown>
### claimExecutors

```solidity
function claimExecutors(
    address _rewardOwner
) external view returns (
    address[]);
```

</div>
<div class="api-node" markdown>
### allowedClaimRecipients

```solidity
function allowedClaimRecipients(
    address _rewardOwner
) external view returns (
    address[]);
```

</div>
</div>

