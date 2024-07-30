---
search:
  boost: 2
---

# Automatic Claiming

Automatic claiming enables users to appoint an executor to claim rewards on their behalf.

## Introduction

The Flare network **rewards** users that contribute to it, for example, by [delegating to an FTSO data provider](./ftso/index.md#delegation).

**[Delegation rewards](./ftso/index.md#rewards)** accrue every 3.5 days when users have delegated wrapped Flare tokens (WFLR) to FTSO data providers.
These rewards must be claimed periodically by users, since rewards expire after a few months.

For users, claiming rewards can be inconvenient and can risk losing rewards and compound interest if overlooked.
If users are claiming rewards from a cold wallet, they can expose the wallet more often than necessary.

Instead, users can enlist the services of **executors** to claim for them, putting the responsibility of remembering to claim on the executor.
Automatic claiming through an executor saves user time and inconvenience, optimizes the opportunity for compound interest, and avoids unnecessary exposure of users' cold wallets.

Automatic claiming is secure because the executor cannot claim to any address but the ones the user provides.
It is [trustless](glossary.md#trustless) (does not require trust) because it is managed by a smart contract, not the executor.

For executors, automatic claiming is an opportunity to earn a fee for performing claiming as a service to users.

## How Automatic Claiming Works

Without an executor, users need to claim twice a week if they want to benefit from the rewards as soon as possible.

<figure markdown>
  ![Claiming Process without Executor](executor-process-without.png){ loading=lazy .allow-zoom width=500px }
  <figcaption>The claiming process without an executor.</figcaption>
</figure>

With an executor, a third party can claim for users, for an optional fee.

<figure markdown>
  ![Claiming Process with Executor](executor-process-with.png){ loading=lazy .allow-zoom width=500px }
  <figcaption>The claiming process with an executor.</figcaption>
</figure>

There are two ways to claim with an executor: manual and registered.
They both provide "automatic claiming" for the user in the sense that claiming rewards requires no intervention from the user once the executor takes over.
However, when the executor does not register, several parts of the process are not automated, such as finding each other and paying the fee.
The "manual" version is less automated.
The registered version is highly automated.

### Manual Claiming Process

If an executor account is not registered, claiming is said to be **Manual**.

With Manual claiming users only need to provide the executor's address, which authorizes the executor to claim on the user's behalf.
How the user discovers the executor's address and whether they will pay a service fee can only be settled off-chain.

!!! example
    For example, executors could create a dapp where users pay a fee (in fiat or spot) and sign the transaction that sets the executor's address.

Only reward claiming remains automated, whereby rewards are sent directly to the user's address.
Executors do not receive a fee automatically.

Here is how the process works when executor claiming is manual:

1. Users who have accrued rewards and want an executor to claim on their behalf can identify an executor known to them off-chain.
2. These users then make an off-chain agreement with the executor and they exchange addresses.
3. Agreeing to a fee is optional and off-chain.
   If they do agree to a fee, they pay manually.
4. Executors claim rewards for one or more users.
   Their fees are not automatically deducted from the claimed rewards.
5. Executors notify users off-chain if they discontinue providing this service.

### Registered Claiming Process

On the other hand, the process can be simplified if the executor address is **Registered**.
Registration allows accounts to list themselves on-chain as registered executors and post their service fees.
Registration simplifies both the user task of finding a suitable executor and the executor's task, since its fee is automatically transferred when user rewards are claimed.
The users pay a fee to set an executor to claim their rewards and their rewards are claimed automatically, i.e., without their intervention.
With a registered executor, all agreements happen on-chain.

Here is how the registered claiming process works, with applications performing these actions on behalf of executors and users:

1. Executors who want to make themselves publicly available to users register as executors, paying a registration fee.
The fee to register as an executor is [burned](glossary.md#burn).
2. Registered executors post their fee for claiming rewards.
3. Users who have accrued rewards and want an executor to claim on their behalf can choose from the list of registered executors.
4. These users pay a setup fee to enable a registered executor to claim their rewards.
   The fee to enable a registered executor is sent to the executor.
5. Executors claim rewards for one or more users, and their fees are automatically deducted from the claimed rewards.
6. Executors notify users off-chain if they discontinue providing this service.

Throughout the process:

* Users and executors can see reports on which addresses executors are claiming for and which executors are registered.
* Registered executors can change fees or unregister, and users can change the registered executors claiming on their behalf or disable automatic claiming.

## Other Use Cases

### Cold Wallets

Many users claim from a cold wallet because they can reap the most rewards where they store the greatest share of their holdings.
When they claim from a cold wallet, they are exposing it online.
Setting an executor can protect the cold wallet, as the executor would claim the rewards and pass them on to the user's account automatically without putting the cold wallet online.

### Your Own Executor

If a user has multiple addresses, it may be convenient to designate one of their own addresses as an executor, and claim for all of them from it.
Additionally, this avoids the fee that a public executor will typically charge.

!!! warning

    By using the automatic claiming feature, neither Flare Foundation nor any of the contracts published on the Flare network guarantee that the selected executor will actually claim any or all of the user’s rewards.
    This agreement is solely between the user and the selected executor.
    The Flare network offers only the possibility of setting up an automatic execution service and is not liable for any damages if this service is not performed.
    For more information, see [FLARE TERMS OF SERVICE & PRIVACY POLICY](https://flare.network/privacy-policy/).

## Related User Guides

* [Automatic claiming](../user/automatic-claiming.md)
