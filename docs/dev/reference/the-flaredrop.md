# The Flaredrop

[The Flaredrop](../../tech/the-flaredrop.md), previously called the _Delegation Incentive Pool_ in the [FIP.01](https://flare.network/fip01/), is a distribution method for the 24.25B remaining `$FLR` tokens after the [original airdrop](../../tech/flare-launch-process.md#definitions).

This page explains how to manage Flaredrop functionality in applications.

## Required Contracts

Working with the Flaredrop requires interacting with these contracts:

* [`DistributionToDelegators`](https://gitlab.com/flarenetwork/flare-smart-contracts/-/blob/master/contracts/tokenPools/implementation/DistributionToDelegators.sol) (Dist).
    Manages all claims.
* [`ClaimSetupManager`](https://gitlab.com/flarenetwork/flare-smart-contracts/-/blob/master/contracts/claiming/implementation/ClaimSetupManager.sol) (CSM).
    Needed to configure autoclaiming.

To find their addresses, read the [Contract Addresses](../getting-started/contract-addresses.md) page.

## Operations

### Basic Claiming

The `Dist.claim` method allows claiming the Flaredrop one account at a time.

```solidity
function claim(
    address _rewardOwner,
    address _recipient,
    uint256 _month,
    bool _wrap
) external returns(
    uint256 _rewardAmount
);
```

It transfers the Flaredrop rewards accrued by account `_rewardOwner` during the specified `_month` to the specified `_recipient`.

`_wrap` controls whether the reward is transferred in native `$FLR` tokens or wrapped in `$WFLR` tokens.

You can use `Dist.getCurrentMonth()` to find out the current month (starting at 0), or `Dist.getClaimableMonths()` to get the interval of months which are currently available for claiming.
Use `Dist.getClaimableAmount()` or `Dist.getClaimableAmountOf()` to find out if a given address has pending rewards on any given month.

`Dist.claim()` returns the amount of claimed rewards.

Two modes of operation are supported: Self-claiming and claiming on behalf of another account.

* **Self-Claiming**:

    When `msg.sender` matches `_rewardOwner`, the caller is claiming its own rewards.
    In this case `_recipient` can be any address.

* **Claiming on behalf of another account**:

    When `msg.sender` does not match `_rewardOwner`, the caller must be a [claim executor](../../tech/automatic-claiming.md), claiming on behalf of `_rewardOwner`.

    If `_msg.sender` is not in the authorized list of executors for `_rewardOwner`, the call will revert.
    Authorized executors must be set beforehand by `_rewardOwner` using `CSM.setClaimExecutors()`.

    The `_recipient` must either be `_rewardOwner`, its [PDA](../../tech/personal-delegation-account.md), or any of the authorized recipients previously set by `_rewardOwner` using `CSM.setAllowedClaimRecipients()`.
    The call will revert otherwise.

### Batched Claiming

The `Dist.autoClaim()` method allows claiming the Flaredrop for an arbitrary amount of accounts in a single call, with convenient default values.

```solidity
function autoClaim(
    address[] calldata _rewardOwners,
    uint256 _month
) external;
```

It claims the rewards accrued by all the accounts in the `_rewardOwners` array during the specified `_month`.

If an account does not have an enabled [PDA](../../tech/personal-delegation-account.md), the rewards are sent to the same account.

However, if an account does have an enabled PDA, the rewards are sent to the PDA account.
Any rewards accrued by the PDA account are also claimed and sent to the PDA.

Rewards claimed with this method are always wrapped.

If the executor is a [registered executor](../../tech/automatic-claiming.md#registered-claiming-process) with a nonzero fee, the fee is automatically deducted from each claimed reward and sent to the executor account (unwrapped).
If rewards are claimed for both an address and its PDA, the fee is deducted only once.

The call reverts if:

* `msg.sender` is not in the authorized list of executors for any of the `_rewardOwners`.
* The total claimed rewards for any of the `_rewardOwners` is not high enough to cover the executor's fee.
