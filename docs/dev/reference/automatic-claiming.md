# Automatic Claiming

Users who do not want to claim rewards themselves can enlist [executors](../../tech/automatic-claiming.md) to claim on their behalf.
Executors can then initiate the claiming process, and rewards are sent directly to the user's account.

!!! info
    This feature is only available on the Flare network.

## Introduction

Building an executor requires two parts:

* An _executor bot_ that periodically claims on behalf of the users.
* An app that allows users to select the executor, such as the [Flare Portal](https://portal.flare.network), which is free to use.

This page contains the following information:

* The [Required Contracts](#required-contracts) section briefly lists the smart contracts related to executor operation.
* The [User Operations](#user-operations) section shows how to perform the operations required in a user-facing application, such as setting an executor.
* The [Executor Operations](#executor-operations) section shows how to perform the operations required by an executor bot, such as registering as an executor.
* The [User and Executor Reports](#user-and-executor-reports) section shows how to access information useful for performing user and executor functions.

## Required Contracts

Setting up automatic claiming requires interacting with these contracts:

* [`ClaimSetupManager`](https://gitlab.com/flarenetwork/flare-smart-contracts/-/blob/master/contracts/userInterfaces/IClaimSetupManager.sol) (CSM).
* [`FTSORewardManager`](https://gitlab.com/flarenetwork/flare-smart-contracts/-/blob/master/contracts/userInterfaces/IFtsoRewardManager.sol) (FTSO).

To find the addresses of these contracts, see the [Contract Addresses](../getting-started/contract-addresses.md) page.

## User Operations

This section shows how to perform operations required to enable autoclaiming.
The main step is to set the executor that will perform the claiming for the user who has accrued rewards.
Then other operations are explained, such as changing the executor and disabling automatic claiming.

### Setting Claim Executors

There are two ways to set up automatic claiming: [Manual and Registered](../../tech/automatic-claiming.md#how-automatic-claiming-works).

#### Manual Claiming

With **Manual Claiming**, rewards are claimed on-chain, but any agreement between users and executors happens off-chain.
Fees are not paid automatically.

To set one or more executors to claim rewards for a user:

1. Set a specific executor by calling `CSM.setClaimExecutors()` and providing the executor's address.

    This method must be called from the user's account, since they are the only ones that can authorize claiming on their behalf.

    This function removes all previously set executors and replaces them with the new set.

#### Registered Claiming

With **Registered Claiming**, a purpose-built `ClaimSetupManager` contract handles the on-chain agreement between users and executors, greatly simplifying the process.

To set one or more registered executors to claim rewards for a user:

1. Get a list of executors and their fees by calling `CSM.getRegisteredExecutors()`.

    To find the fee of a specific executor, call `CSM.getExecutorCurrentFeeValue()`.
    This fee is deducted from the user’s reward after each claim and sent to the executor.

    You can show this information to the user and let them select which executor to use.

2. Set the selected executors by calling `CSM.setClaimExecutors()` as shown for [Manual Claiming](#manual-claiming).

    However, when setting registered executors, the call must include a value equal to the executor’s fee (in FLR), which is sent to the executor as an enrollment fee.
    If more than one executor is set, the value must equal the sum of all the executor's fees.

### Changing Registered Executors

To change registered executors, call `CSM.setClaimExecutors()` with the new list of executors.
This new list overwrites the current list.

### Disabling Automatic Claiming

To disable automatic claiming, remove all executors by sending an empty array of executors with `CSM.setClaimExecutors()`.

## Executor Operations

This section shows how to perform operations required in an executor-facing application, for example, becoming an executor.
While the main step for manual executors is only claiming rewards, the main steps for registered executors are registering, setting a fee, and claiming rewards.
Other operations like changing the fee, unregistering as an executor, and learning which addresses to claim for are also explained.

### Becoming an Executor

There are two ways to become an executor: [Manual and Registered](../../tech/automatic-claiming.md#how-automatic-claiming-works).

#### Manual Executor

Setting an executor manually means doing so off-chain.
Therefore, there is no operation required for executors, besides communicating to the users the address of the executor they need to use.

#### Registered Executor

The `ClaimSetupManager` contract contains a list of self-registered executors that users can use to discover executors and their service fees, avoiding the need for off-chain operations as in manual claiming.

To automatically receive fees for claiming, an executor address must register, set the fee for claiming rewards, and pay the registration fee.

Register an executor by calling `CSM.registerExecutor(uint256 feeValue)`, where `feeValue` is the fee in wei that the executor requires to perform this service.
The fee value must be at least `CSM.minFeeValueWei`, currently 0.1 FLR, and no greater than `CSM.maxFeeValueWei`, currently 100 FLR.
This transaction must include a registration fee equal to `CSM.registerExecutorFeeValueWei`, currently 1000 FLR, which is burned.

### Claiming Rewards

#### How to Claim

Executors can now only claim [FTSO delegation rewards](../../tech/ftso.md#delegation) on behalf of users.
As other rewards become available, they will also be claimable by executors without any user intervention.

Manual and registered executors use the same function, the only difference being that unregistered executors do not receive a fee automatically.

To claim FTSO rewards for all of a user's unclaimed epochs, call `FTSO.autoClaim(address[] rewardOwners, uint256 rewardEpoch)`.

* This method can be used to claim for multiple users, since `rewardOwners` is an array.
* The `rewardEpoch` is the most current one that the executor wants to claim for, typically the one before the current epoch.

    If a user has more unclaimed epochs from the past, the function claims for all of them.

The claimed amount gets the executor fee subtracted and is automatically wrapped, so it is sent to the user as `$WFLR`.

#### What to Expect in Fees

The executor gets paid a fee for each user for which he claims the FTSO delegation reward.
However, he only gets paid one fee per user regardless of whether he claims for one or more epochs.
The fee is paid in native `$FLR` tokens.

If the claimed reward for a user is lower than the executor fee, the transaction is reverted.
To see which users have enough rewards to complete and which would revert, call `FTSO.autoClaim` with a specific user address.

### Changing the Fee

Registered executors can change the fee they charge for the successful execution of claims.
To change the fee, call `CSM.updateExecutorFeeValue()`.
The new fee value will be in effect after `CSM.feeValueUpdateOffset` reward epochs have elapsed (currently 3 epochs), where the first epoch is the one that is currently active.
This function returns the reward epoch number when the setting will become effective.

### Unregistering an Executor

Registered executors can unregister by calling `CSM.unregisterExecutor()` and they will be removed from the list of executors.
To help the users adjust to the change, executors will retain the current fee and continue claiming for the next 3 reward epochs (`feeValueUpdateOffset`).
An executor's best practice is to notify users when unregistering.

### Updating the User List

Executors should keep a list of users to claim for, there is no mechanism to retrieve this list from the chain.
There are two ways to keep this list updated:

* Listen to the `CSM.ClaimExecutorsChanged` event which is emitted every time a user sets its executors.
  This method is suitable for registered executors which might be selected at any time.
* If the executor is only interested in a closed list of users, e.g., the ones that enlisted on an application, it can call `CSM.isClaimExecutor(address user, address executor)` for each user to verify the executor's address is properly configured.

## User and Executor Reports

This section shows how to access information that can help you perform both user and executor functions.

### Executor Fees

Get the current fee for each executor on the Registered Executors list by calling `CSM.getExecutorCurrentFeeValue(address executor)`.
For upcoming fee changes, call `CSM.getExecutorScheduledFeeValueChanges(address executor)`.

### Executors by User

A user can set more than one executor.
To see a list of current executors for a user, call `CSM.claimExecutors(address user)`, which returns an array of executor addresses.
It is a best practice for users to check this report periodically (at least every 90 days) to make sure their selected executors have not unregistered without notice.

### Executor Status

To check if an executor is registered, call `CSM.getExecutorInfo(address executor)`.
It returns whether an executor is registered and its fee.
