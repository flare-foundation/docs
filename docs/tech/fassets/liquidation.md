---
title: Liquidation
mathjax: true
search:
  boost: 2
---

# FAssets Liquidation

Liquidation is the process of selling assets to bring the FAssets system back to health after an [agent](./index.md#agents) becomes undercollateralized.

The following types of liquidation can occur:

* **Unhealthy position liquidation**: Occurs when the [collateral ratio](./collateral.md#the-collateral-ratio) (CR) of either the agent's vault or collateral pool falls below its respective [minimal CR](./collateral.md#system-wide-thresholds).
  In this case, the agent's position is liquidated until the collateral ratio reaches the [safety CR](./collateral.md#system-wide-thresholds) or all of the backed FAssets are liquidated.
* **Full liquidation**: Occurs when the agent makes an [illegal payment](#illegal-payments) from the underlying chain address.
  In this case, all the FAssets backed by the agent are liquidated, and the liquidation cannot be stopped.

In both cases, [liquidators](./index.md#liquidators), who can be anyone who holds FAssets, are encouraged to sell their FAssets back to the system.
They will be paid with the agent's collateral plus a premium, as a penalty against the agent for unhealthy positions or misconduct.

## Liquidation Process

When liquidation starts, any liquidator can send FAssets and get paid with a combination of vault collateral and pool collateral at the current asset price multiplied by a premium factor greater than 1.
The maximum amount of FAssets that is accepted is the amount required to make the agent's position healthy again, rounded up to the next lot.

The premium is a system-defined percentage, and it can increase through the duration of the liquidation.
The premium is limited to the agent's combined collateral ratio, which is the sum of the current value of the vault collateral and pool collateral divided by the current value of the backed FAsset amount.
However, if this limit is reached, all the agent's backed FAssets are liquidated, and all the vault collateral and pool collateral are paid to the liquidators.
The liquidation-collateral payment is divided between the agent and the collateral pool.

A fixed ratio (≥ 1.0) of the payment is paid from the agent's collateral, and the remainder is paid from the pool collateral.
If not enough of one type of collateral exists, more is paid from the other type.

!!! info "Full Liquidations"

    Illegal payments trigger a full liquidation, which involves the following additional actions:

    * The liquidated agent's vault is locked so that it cannot be used to mint again.
        If the agent wants to continue to mint FAssets, he must create a new agent vault with a new underlying address.
    * Ongoing mintings against this agent's locked vault continue, but the minted FAssets are immediately added to the liquidation process.
    * Ongoing redemptions continue.
        New redemptions can start until all the agent's redemption tickets are liquidated.
        Unfortunately, if the agent's underlying backing is unhealthy, redeemers are more likely to be paid in native tokens from the collateral pool.

    This liquidation process includes the time-increasing premium, and it only stops when all the agent's collateral is liquidated.

## Stopping Liquidations

After liquidation of an unhealthy position starts, it can be stopped by depositing enough collateral or self-closing FAssets to reach the [safety CR](./collateral.md#system-wide-thresholds).
Also, if a change in the price pushes the CR above the safety CR, anyone can stop the liquidation by notifying the FAssets system.

To maintain a healthy account, agents should track positions and automatically top up or self-close FAssets when liquidation approaches.
Otherwise, the agent and the liquidators compete to try to stop the liquidation.
To stop a liquidation, the agent's vault must reach the [safety CR](./collateral.md#system-wide-thresholds), which is above the [minimal CR](./collateral.md#system-wide-thresholds) that triggered the liquidation.

[The top-up mechanism](./collateral.md#top-up) can prevent liquidations caused by a low CR in the collateral pool, but full liquidations cannot be stopped.
However, an agent can still self-close positions to avoid paying a premium to liquidators.

??? example "Example 1: Small Price Movement"

    Using `$BTC` as underlying and `$USDC` as collateral, an agent creates a vault to mint `$FBTC` FAssets.

    1. Initial conditions:

        * The agent is backing 1 `$FBTC`, currently valued at $20K, according to the [FTSO system](../ftso/index.md).
        * The minimal CR is **1.3** for the vault collateral and **2.5** for pool collateral.
        * [The agent must hold 20% of the pool's minimal CR](./collateral.md#agents-stake-in-the-collateral-pool).
            In this case, 20% of 2.5 times \$20K is **\$10K**.
        * The underlying backing factor is 50%, so the agent needs to hold only **0.5** `$BTC`.
        * The liquidation premium factor is 1.1, of which 1.0 is paid in vault collateral, and 0.1 is paid in pool collateral.

        At this point, the 1 `$FBTC` is backed by:

        * 0.5 `$BTC` underlying.
        * $26K worth of `$USDC` vault collateral.

            The vault CR is $\$26K \over \$20K$ = 1.3, equal to the vault's minimal CR.

        * $60K worth of `$FLR` in pool collateral, of which $10K belongs to the agent.

            The pool CR is $\$60K \over \$20K$ = 3, above the pool's minimal CR.

    2. Now the price of `$BTC` increases from $20K to $21K.
        As a result:

        * The vault CR is $\$26K \over \$21K$ ≈ 1.24, **below the vault's 1.3 minimal CR**.
        * The pool CR is $\$60K \over \$21K$ ≈ 2.86, still above the pool's 2.5 minimal CR.

        !!! warning "Liquidation Trigger"
            Because one of the CRs is below the minimal CR, liquidation can start after a system-defined wait period.

            If any of the CRs go below the [Liquidation CR](./collateral.md#system-wide-thresholds), liquidations can start immediately.

    3. A liquidator notices the CR levels and decides to liquidate $10K worth of FAssets by returning 0.48 `$FBTC` to the FAssets system.

        The liquidation premium factor is 1.1, so the liquidator receives $11K worth of assets:

        * $10K worth of `$USDC` from the agent's vault collateral.
        * $1K worth of `$FLR` from the agent's portion of the collateral pool.

            The corresponding $1K worth of CPTs are burned, so their price is unaffected.

        At this point, the agent is backing 0.52 `$FBTC` with:

        * 0.5 `$BTC` underlying.

            The ratio is $0.5 \over 0.52$ ≈ 0.96, well above the 50% underlying backing factor.

        * $16K worth of `$USDC` vault collateral.

            The vault CR is $\$16K \over \$11K$ ≈ 1.45, now above the vault's minimal CR.

        * $59K worth of `$FLR` in pool collateral, of which $9K belong to the agent.

            The pool CR is $\$59K \over \$11K$ ≈ 5.36, still well above the pool's minimal CR.

        !!! question "Liquidation Finished?"
            Both CRs are now above the minimal CR values, but liquidation does not stop until the CRs further increase up to the [safety CR](./collateral.md#system-wide-thresholds).

    In summary, as a result of the price increase and the liquidation, around 50% of the backed `$FBTC` was burned.
    The actual amount of FAssets that need to be burned, though, depends on the safety CR setting.

??? example "Example 2: Large Price Movement"

    The same setup and initial conditions as in Example 1 are used:
    Using `$BTC` as underlying and `$USDC` as collateral, an agent creates a vault to mint `$FBTC` FAssets.

    1. Initial conditions:

        * The agent is backing 1 `$FBTC`, currently valued at $20K, according to the [FTSO system](../ftso/index.md).
        * The minimal CR is **1.3** for the vault collateral and **2.5** for pool collateral.
        * [The agent must hold 20% of the pool's minimal CR](./collateral.md#agents-stake-in-the-collateral-pool).
            In this case, 20% of 2.5 times \$20K is **\$10K**.
        * The underlying backing factor is 50%, so the agent needs to hold only **0.5** `$BTC`.
        * The liquidation premium factor is 1.1, of which 1.0 is paid in vault collateral, and 0.1 is paid in pool collateral.

        At this point, the 1 `$FBTC` is backed by:

        * 0.5 `$BTC` underlying.
        * $26K worth of `$USDC` vault collateral.

            The vault CR is $\$26K \over \$20K$ = 1.3, equal to the vault's minimal CR.

        * $60K worth of `$FLR` in pool collateral, of which $10K belongs to the agent.

            The pool CR is $\$60K \over \$20K$ = 3, above the pool's minimal CR.

    2. Now the price of `$BTC` increases from $20K to $30K.
        As a result:

        * The vault CR is $\$26K \over \$30K$ ≈ 0.87, **way below the vault's 1.3 minimal CR**.
        * The pool CR is $\$60K \over \$30K$ = 2, **below the vault's 2.5 minimal CR**.

        To comply with the vault's 1.3 minimal CR, the agent needs 1.3 * $30K = $39K of `$USDC` vault collateral, which he does not have.

        !!! warning "Full Liquidation"

            At this point, all the agent's FAssets backed by this vault must be liquidated.

    3. A liquidator notices this situation and decides to liquidate 1 `$FBTC`, currently worth $30K.

        The liquidation premium factor is 1.1, so the liquidator receives $33K worth of assets:

        * $26K worth of `$USDC`, which is all of the collateral in the agent's vault.
        * $7K worth of `$FLR`.

        Note that the portion of payment in `$FLR` is higher than in Example 1 because enough `$USDC` in collateral did not exist.

        At this point, the agent is backing 0 `$FBTC`, and the remaining collateral is:

        * 0.5 `$BTC` underlying.
        * $0 worth of `$USDC` in vault collateral.
        * $53K worth of `$FLR` in pool collateral, of which $3K belongs to the agent.

            All this collateral can be freely withdrawn by its owners.
            Because this collateral is not backing any FAssets anymore, no part of it is [locked](./collateral.md#transferable-and-locked-cpt).

??? example "Example 3: Very Large Price Movement"

      A price increment such that the vault plus the pool collateral is not enough to back the minted FAssets results in a combined CR lower than 1.
      By design, liquidation payments will never exceed the combined CR times the liquidated amount, so, in this case, liquidation is not a profitable operation.

      Moreover, the collateral locked in the FAssets system might not be a strong enough deterrent for agents that want to dispose of the higher-valued underlying in [an illegal way](#illegal-payments).

## Liquidation Triggers

Some events related to liquidation are not detected automatically and must be triggered by entities external to the blockchain.
These entities are [liquidators](./index.md#liquidators) and [challengers](./index.md#challengers).

Anyone can be a liquidator or a challenger and earn rewards for contributing to the correct working of the FAssets system.

Some triggers put an agent in liquidation mode, and some others get agents out of liquidation mode.

### Liquidation-Enabling Triggers

* A valid liquidation request is submitted, triggering the liquidation automatically.
* A liquidator triggers a liquidation manually, but does not submit a liquidation request immediately, seeking a better premium, because the premium might increase as time passes.
* A liquidator detects that the CR is below the [CCB](./collateral.md#system-wide-thresholds) and sets the start time for an agent.
    This operation does not immediately trigger the liquidation.
    Instead, it starts a timer that enables the liquidation to be triggered after a system-defined time has elapsed.
* A [proof of illegal activity](#illegal-payments) is presented, which immediately triggers a full liquidation.

### Liquidation-Disabling Triggers

After an agent enters the liquidation state, it remains there until its CR exceeds the [safety CR](./collateral.md#system-wide-thresholds) again.

The following operations can increase an agent's CR and can, therefore, potentially get the agent out of the liquidation state:

* Redemptions.
* A liquidation improves the agent's position.
* The agent deposits more collateral.
* The agent self-closes a position.
* After the price has moved so that the agent's position is healthy again, the agent, or someone on the agent's behalf, manually sets the liquidation state to false.

Exiting the liquidation state as soon as possible is in the agent's best interest, even if the agent might re-enter it again soon.
Premiums paid to liquidators might depend on how long the agent has been in liquidation, for example.
Also, exiting the liquidation state resets the CCB timer.

## Tracking the Underlying Balance

Agents are required to keep a certain percentage of underlying asset for each backed FAsset.
This percentage, called the [backing factor](./index.md#agents), is stored at an address on the underlying chain controlled by the agent.

This requirement is enforced by balance-tracking in the FAsset contract.
To track balances, the system must receive reports for each payment sent and received at the agent's address:

* Incoming payments are part of the [minting process](./minting.md) and are updated as the process occurs.
* Outgoing payments are either part of the [redemption process](./redemption.md) or illegal payments, which are penalized.

[Challengers](./index.md#challengers) maintain the health of the FAssets system by monitoring the agent's underlying address to identify illegal operations that can make the agent's underlying backing too low.
Challengers that correctly report illegal operations receive rewards from the agent's vault collateral.

The following subsections contain details about all the topics that must be considered when monitoring an agent's underlying balance.

### Chain Fees

Fees for gas on the underlying chain can create issues for the FAssets system, so part of tracking an agent's underlying balance involves tracking the amount spent on fees on the underlying chain.

Expensive gas fees can cause an address to have fewer assets than it should have and trigger a liquidation.
Therefore, consider these actions:

* **Cap the gas usage on underlying chains**: On smart-contract chains, the Flare Data Connector defines a cap on the gas amount to enable any simple transaction to pass.
    If senders limit their gas amount to this cap and a transaction still fails due to insufficient gas, the failure is considered the receiver's fault, and the transaction is labeled as blocked.

    The gas cap is defined by the Flare Data Connector, not the FAssets system, because it is the Flare Data Connector that labels transactions as blocked.

* **Maintain the underlying balance**: Agents must ensure that the payment plus the transaction fee for a redemption never reduce their balance to an amount lower than the amount required to back the FAssets.
    Agents can ensure that redemptions do not reduce that balance in several ways:

    * They can honor redemptions from some other address.
        On UTXO chains, they can also honor redemptions from a combination of addresses.
    * They can top up the underlying address and then send proof of payment to update the tracked balance.
        After a redemption begins, the agent has a limited time to comply, so topping-up is time-sensitive.

### Underlying Withdrawals

Agents might legally withdraw part of the funds on their underlying address in several ways:

* **Minting fees**: A part of a minter's payment is the [mint fee](./minting.md#fees) in the underlying asset.
* **Failed redemptions**: When an address is backing assets and those assets were redeemed, but the agent [does not pay the redeemer](./redemption.md#redemption-payment-failure), the redeemer is paid with collateral, and the agent can withdraw the assets.
* **Liquidated assets**: If an agent's position was partially or fully liquidated, the agent can withdraw the assets.
* **Self-closed assets**: After an agent [self-closes](./minting.md#self-minting), the closed assets can be withdrawn.

The FAssets system must keep track of the agent's underlying funds, so when performing the above legal withdrawals, agents must still adhere to the following process:

1. Announce the withdrawal to the FAssets system and obtain a payment reference.
2. Perform the withdrawal, using the payment reference.
3. Use the [Flare Data Connector](../data-connector.md) to obtain a proof of payment.
4. Present the proof of payment to the FAssets system, which clears the announcement.

    If the agent does not present the proof of payment, anyone can present it after a while and receive a reward from the agent's vault.
    Enabling nonagents to present this proof helps the FAssets system keep track of underlying balances.

Only one withdrawal announcement can be active per agent at any time to prevent the agent from overwhelming the balance-tracking system with many simultaneous small withdrawals.

### Illegal Payments

Any challenger can report illegal payments from an underlying address and receive rewards in return.

An illegal payment always triggers a full liquidation, which cannot be stopped.
An agent can still escape paying the liquidation premium by self-closing before liquidators submit their liquidation requests, but the agent's vault remains unusable and must be closed.
To resume operations, the agent must open a new vault with a different underlying address.

The challenge system ensures that all minted FAssets are always backed by the assets on the agent's underlying address in the required percentage.
Malicious agents might try to remove those assets in different ways.
Therefore, challengers can report illegal activities by using these different _challenges_:

#### Illegal Payment Challenge

A payment from the agent's underlying address without a payment reference or with a payment reference that does not correspond to any open [redemption](./redemption.md) or [announced withdrawal](#underlying-withdrawals).

This challenge is performed in the following way:

1. The challenger obtains proof of the illegal payment using the Flare Data Connector.
2. The challenger presents the proof to the FAssets system, which triggers:

    * A vault collateral payment from the agent's vault to the challenger's address as a reward.
    * The agent's state for the address is set to [full liquidation](#liquidation-process).

#### Double Payment Challenge

An agent might try to abuse a redemption request to pay to the redeemer and use the same payment reference to pay an amount to the agent's own address.
An agent might even try to pay the redeemer multiple times when he is redeeming against himself.

This activity is easy to detect after the first payment is reported in [step 6 of the redemption process](./redemption.md#redemption-process), because then the request is deleted and the second payment becomes illegal.
However, a malicious agent might try to issue the second payment before reporting the completion of the first one.

The double payment challenge catches this attempt as soon as the payments are finalized, regardless of whether they have been reported to the FAssets system.

This challenge is performed in the following way:

1. The challenger detects two seemingly legal payments from the same agent's underlying address and with equal payment reference, and obtains proofs for both using the Flare Data Connector.
2. The challenger presents the two proofs to the FAssets system and triggers the reward payment and full liquidation.

#### Negative Balance Challenge

One or more legal payments can make the balance on the agent's underlying address too small or equivalently make the free underlying balance negative.
This situation can happen because gas fees might be unknown when redemptions are approved.

This situation would normally be detected after all payments are reported, but in this way it can be caught as soon as the payments are finalized on the underlying chain:

1. The challenger detects one or more legal payments from the same agent's underlying address and the total outgoing amount exceeds the sum of all redemption values plus the total free balance.
    The challenger obtains proofs for all of them using the State Connector.
2. The challenger presents all the proofs to the FAssets system, which checks that the transactions are from the agent's underlying address, that they have not been confirmed yet, and that their total really makes the free balance negative.
    Then, it triggers reward payment and full liquidation.

### Time Lock for Withdrawing Collateral

The agent's collateral backs minted FAssets but also pays challenge fees and possibly illegal payment penalties.
Because finalization on some underlying chains takes a long time, challenges can sometimes be proved to be valid only after an agent's position is already closed and enough collateral to pay them is not available.

For this reason, collateral withdrawals are locked for a certain amount of time before they become effective.
The amount of time varies depending on the underlying chain and the time frame required for achieving finality on that chain.

For agents, any collateral withdrawals must be announced, and then the amount is locked for some time before it can be withdrawn.
The locked collateral is also ineligible for minting.

Agents must announce the closing of their vaults.
They become unusable until the lock expires, and then they can be closed.
