# IDistributionToDelegators

## EntitlementStart

```solidity
event EntitlementStart(uint256 entitlementStartTs)
```

## AccountClaimed

```solidity
event AccountClaimed(address whoClaimed, address sentTo, uint256 month, uint256 amountWei)
```

## AccountOptOut

```solidity
event AccountOptOut(address theAccount, bool confirmed)
```

## optOutOfAirdrop

```solidity
function optOutOfAirdrop() external
```

## claim

```solidity
function claim(address payable _recipient, uint256 _month) external returns (uint256 _amountWei)
```

## claimToPersonalDelegationAccount

```solidity
function claimToPersonalDelegationAccount(uint256 _month) external returns (uint256 _amountWei)
```

## getClaimableAmount

```solidity
function getClaimableAmount(uint256 _month) external view returns (uint256 _amountWei)
```

## getClaimableAmountOf

```solidity
function getClaimableAmountOf(address account, uint256 _month) external view returns (uint256 _amountWei)
```

## getClaimedAmount

```solidity
function getClaimedAmount(uint256 _month) external view returns (uint256 _amountWei)
```

## getClaimedAmountOf

```solidity
function getClaimedAmountOf(address _account, uint256 _month) external view returns (uint256 _amountWei)
```

## getCurrentMonth

```solidity
function getCurrentMonth() external view returns (uint256 _currentMonth)
```

## getMonthToExpireNext

```solidity
function getMonthToExpireNext() external view returns (uint256 _monthToExpireNext)
```

## secondsTillNextClaim

```solidity
function secondsTillNextClaim() external view returns (uint256 _timetill)
```

