# Personal Delegation Accounts

Personal Delegation Accounts (PDAs) temporarily store rewards, such as FTSO delegation rewards, that users do not want to claim to their main accounts as explained in [the Concept page](../tech/personal-delegation-account.md).

This page explains how to manage PDA functionality in applications.

## Required contracts

Working with the PDAs requires interacting with these contracts:

* [`ClaimSetupManager`](https://gitlab.com/flarenetwork/flare-smart-contracts/-/blob/master/contracts/userInterfaces/IClaimSetupManager.sol) (CSM).
* [`FTSORewardManager`](https://gitlab.com/flarenetwork/flare-smart-contracts/-/blob/master/contracts/userInterfaces/IFtsoRewardManager.sol) (FTSO).

To find the addresses of these contracts read the [Contract Addresses](../dev/reference/contracts.md) page.

## Enabling a PDA

`CSM.enableDelegationAccount()` returns the address of the PDA associated with the caller's address, creating the PDA in the process if it didn't exist.
A single PDA can be associated with each address and it cannot be destroyed once created, only disabled (see below).

There exist no private keys to the PDA account so it cannot sign any transactions.
All interaction with the PDA happens through the CSM contract, and is usually triggered by the user's main account.

Note that this means that a PDA cannot have its own PDA, since no calls to the CSM can be made from the PDA account.

Once a PDA is created, certain functions like `FTSO.autoClaim()` automatically send claimed rewards to the PDA account instead of the main account.
See [Delegation and Rewards](#delegation-and-rewards) below.

## Disabling a PDA

To disable the use of a PDA, call `CSM.disableDelegationAccount()`.
Any `$WFLR` tokens that are on the PDA address are transferred back to the user's main account.

When users disable their PDA, `FTSO.autoClaim()` claims only the rewards for their main account and to their main account.

`CSM.disableDelegationAccount()` disables the PDA contract but does not destroy it: its address is still returned by `CSM.getDelegationAccountData()`, but the `enabled` boolean will be `false`.

## Checking PDA State

To check if a user's PDA is enabled, call `CSM.getDelegationAccountData()`.
It returns both the PDA address and its state:

| Condition                  | Address       | State   |
| -------------------------- | ------------- | ------- |
| PDA is enabled             | PDA address   | `true`  |
| PDA is disabled            | PDA address   | `false` |
| PDA has never been created | `0x000...000` | `false` |

!!! warning "Never rely solely on the returned address being non-zero to check if an account has a PDA."

## Delegation and Rewards

A PDA is a regular account for which there are no private keys and which must be managed through the CSM contract instead.

Conveniently, the method signatures to delegate on the CSM are the same as on the `WNat` contract where delegation is usually performed, for instance `CSM.batchDelegate()`.
FTSO reward claiming, though, is still performed through the `FTSORewardManager`, for example using `claimReward(address recipient, ...)` where `recipient` allows sending to any address, including a PDA.
For information on how to delegate and claim FTSO rewards, see [Delegation](../tech/ftso.md#delegation) and [Rewards](../tech/ftso.md#rewards).

In addition to the methods used for regular accounts, `FTSO.autoClaim()` automatically claims for both the main account and the PDA, to the PDA or the main account depending on whether the PDA is enabled or not.
If users disable their PDA, `autoClaim()` claims rewards for only their main account and to only their main account.

!!! note

    The `autoClaim()` method is unrelated to [Automatic Claiming](../tech/automatic-claiming.md) performed by executors.

## Governance Voting

Flare network users have a right to [vote on proposals](../tech/governance.md) that can change the behavior of the network or add new features.
The number of votes an address has is equal to the amount of wrapped Flare tokens (`$WFLR`) that the address holds.

PDA addresses cannot vote directly, but their owners can [transfer](../tech/governance.md#vote-transfer) all their votes to another address (e.g., the owner's address) by calling `CSM.delegateGovernance(address recipient)`.
The recipient of the votes can then vote with its own votes as well as with the votes received from other addresses.

## Transferring Funds

Because a PDA is a regular account, anyone can send funds to it.
However, FLR tokens transferred to a PDA are automatically converted to `$WFLR`, making them convenient for delegation.

Only the owner of the main account and its PDA can transfer funds from the PDA and only to its main account.
To transfer tokens, the owner calls `CSM.withdraw()` and states the amount to withdraw.

Since it has no private keys, any token other than `$FLR` or `$WFLR` transferred to the PDA cannot be moved out by conventional means.
Instead, `CSM.transferExternalToken()` must be used to transfer them to another account.
This is useful, for example, to recover airdropped tokens accidentally sent to the PDA.

!!! note

    `CSM.transferExternalToken()` only works on ERC-20 tokens or token contracts that support the `transfer` function.

## Wallet or Dapp Integration

To support personal delegation accounts, a wallet or dapp at a minimum should show its status, including:

* Checking the user's PDA address and whether it is enabled.
* Showing the amount of `$WFLR` on the user's PDA.

Additional integration could support the following actions:

* Enabling and disabling the PDA.
* Allowing the delegation of funds from a PDA to FTSO price providers.
* Delegating votes for governance voting.
* Claiming rewards to the PDA.
* Withdrawing funds from users' PDAs to their main accounts.
* Withdrawing custom ERC-20 tokens to the users' main accounts.

See the [Flare Portal](https://portal.flare.network) for an example of such integration.
