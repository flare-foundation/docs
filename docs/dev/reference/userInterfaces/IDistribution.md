# IDistribution

## EntitlementStart

```solidity
event EntitlementStart(uint256 entitlementStartTs)
```

## AccountClaimed

```solidity
event AccountClaimed(address theAccount)
```

## AccountOptOut

```solidity
event AccountOptOut(address theAccount)
```

## OptOutWeiWithdrawn

```solidity
event OptOutWeiWithdrawn()
```

## AccountsAdded

```solidity
event AccountsAdded(address[] accountsArray)
```

## claim

```solidity
function claim(address payable _recipient) external returns (uint256 _amountWei)
```

## optOutOfAirdrop

```solidity
function optOutOfAirdrop() external
```

## getClaimableAmount

```solidity
function getClaimableAmount() external view returns (uint256 _amountWei)
```

## getClaimableAmountOf

```solidity
function getClaimableAmountOf(address account) external view returns (uint256 _amountWei)
```

## secondsTillNextClaim

```solidity
function secondsTillNextClaim() external view returns (uint256 timetill)
```

