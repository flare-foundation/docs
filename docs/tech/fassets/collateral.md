---
title: Collateral
mathjax: true
search:
  boost: 2
---

# FAssets Collateral

[FAssets](./index.md) collateral is locked in contracts that ensure the minted FAssets can always be redeemed for the underlying assets they represent or compensated by collateral.

Along with Flare's native token, `$FLR`, any governance-approved [ERC-20](glossary.md#erc20) token on the Flare blockchain can be used as collateral.

## Collateral Types

Two kinds of collateral secure FAssets: vault collateral and pool collateral.

<figure markdown>
  ![FAssets collateral types](fassets-collateral.png){ loading=lazy .allow-zoom }
  <figcaption>FAssets collateral types.</figcaption>
</figure>

Vault collateral is provided exclusively by agents and ensures they perform their duties.
Pool collateral is provided by agents and `$FLR` holders who choose to contribute to the pool.
It is a safeguard when a sudden drop in the price of the vault collateral makes it insufficient to back the underlying assets.

The two types of collateral are explained next.
Collateral pool tokens and minting fees are explained afterwards.

### Vault Collateral

Vault collateral consists of the types of collateral chosen by agents to store in [their vaults](./index.md#vault-and-collateral-pool).
Flare governance approves the valid types, which are generally [stablecoins](glossary.md#stablecoin), such as `$USDC`, `$USDT`, or other highly liquid tokens on the Flare network.

Agents choose one of the types defined by FAssets governance and use it as collateral in their vaults.
Agents cannot switch to a different type after a vault is created, but they can create any number of vaults, with different types.

Each collateral type defines an [ERC-20](glossary.md#erc20) token to use as collateral, a series of [collateral ratios](#the-collateral-ratio), and information to retrieve the asset's price from the FTSO system.
Governance reserves the right to add new types or deprecate existing types.
If governance deprecates a type, agents must switch to a supported type.

Each vault is associated with a single, unique address on the underlying chain called the agent's underlying address.
It receives underlying assets when they are minted into FAssets and sends underlying assets to the redeemer's address when they are redeemed.

When an agent creates a vault, the underlying address is checked for validity using the Flare Data Connector.
Otherwise, malicious agents could provide an address that systematically blocks payments and exploit the [minting process](./minting.md) to their advantage.

### Pool Collateral

When the price of the vault collateral changes in such a way that the vault collateral cannot fully back all the minted FAssets, a [liquidation](./liquidation.md) mechanism ensures enough FAssets are burned to restore balance.
The pool collateral provides an additional source of backing for situations when the price fluctuates too rapidly for liquidations to correct the imbalance.

Pool collateral is always native `$FLR` tokens (or `$SGB` tokens on the [Songbird network](../flare.md#flare-networks)) and can be used as an additional source of collateral for [liquidations](./liquidation.md) and [failed redemptions](./redemption.md#redemption-payment-failure).

Anyone can participate in the FAssets system by providing native tokens to this pool.
In return, providers receive **collateral pool tokens** (CPTs) as proof of the share of native tokens they provided to a specific pool from a specific agent.
CPTs are [ERC-20](glossary.md#erc20) tokens specific to both an agent and a pool.

Providers can redeem their CPTs for `$FLR`, or even transfer or trade them, after a governance-defined time period has elapsed since they entered the pool.
This **time lock** is necessary to reduce [sandwiching](glossary.md#sandwiching) attacks.
{ #time-lock }

Additionally, CPT holders are entitled to a share of any fee the agent earns from minting FAssets using this pool as explained in the next section.

??? info "Formulas: CPT Conversion"

    The amount of collateral pool tokens a provider $p$ receives upon entering a pool is calculated as:

    $$
    received\_CPT_p = { added\_collateral_p \over collateral\_in\_pool } \times currently\_issued\_CPT
    $$

    where:

    * $added\_collateral_p$ is the amount of `$FLR` tokens that provider $p$ is adding to the pool.
    * $collateral\_in\_pool$ is the amount of `$FLR` tokens in the pool before adding the new tokens.
    * $currently\_issued\_CPT$ is the circulating amount of collateral pool tokens.

    When a pool is first created, $received\_CPT_p = added\_collateral_p$.

    The amount of `$FLR` collateral a provider receives when they redeem their CPT is calculated using the opposite formula:

    $$
    received\_collateral_p = collateral\_in\_pool \times { redeemed\_CPT_p \over currently\_issued\_CPT }
    $$

    where:

    * $redeemed\_CPT_p$ is the amount of CPT the provider is returning to the pool.

<div class="steps-table" markdown>
??? example "Example: CPTs Conversion"

    |     |                                                                                          | `$FLR` in pool | Issued CPTs |
    | --- | ---------------------------------------------------------------------------------------- | -------------: | ----------: |
    | 1.  | An agent creates a new vault. The collateral pool is initially empty of `$FLR` and fees. |              0 |           0 |
    | 2.  | Alice deposits 100 `$FLR` and gets 100 CPTs in return.                                   |            100 |         100 |
    | 3.  | Bob deposits 200 `$FLR` and gets 200 CPTs in return.                                     |            300 |         300 |
    | 4.  | Alice redeems 50 CPTs and receives 50 `$FLR` in return.                                  |            250 |         250 |

    Note that in general 1 FLR does not always correspond to 1 CPT, because of mechanisms like the [top-up](#top-up), for example.
</div>

## FAsset-Minting Fees and Debt

As part of the minting process, users pay a [minting fee](./minting.md#minting-fee) on the underlying chain.
The agent's share of this fee remains on the underlying chain, whereas the pool's share triggers the minting of an equivalent amount of FAssets on the Flare network.

These FAssets coming from the minting fee are added to the collateral pool, where they are shared between collateral providers in proportion to the amount of CPTs that providers have.
At any time, providers can claim their due share of the fees in the pool.
When providers exit the collateral pool by redeeming their CPTs, any remaining unclaimed fee is automatically transferred to them.

Providers are naturally only entitled to the minting fees accrued after they entered the pool.
Therefore, providers entering a pool with preexisting fees are assigned a **fee debt**.
The amount of fees a provider can actually withdraw from the pool is calculated by first subtracting their debt from the total amount of fees in the pool.
In this way, the amount of fees that a provider can withdraw upon entering a pool is exactly zero.
{ #debt-lock }

A provider's fee debt:

<div class="table-with-dividers" markdown>
| Increases when the provider                 | Decreases when the provider                    |
| ------------------------------------------- | ---------------------------------------------- |
| Enters a pool which already has fees in it. | Exits the pool, partially or completely.       |
| Withdraws FAsset fees.                      | Deposits FAssets, paying off part of the debt. |
</div>

It is worth noting that:

* When a provider withdraws fees, their debt increases by the same amount.
* Since CPTs are ERC-20 tokens, a secondary market for them is expected to develop.
    If CPTs become more valuable than the FAsset fees they represent, returning the FAssets and paying off part of their fee debt might be more lucrative for providers.

??? info "Formulas: Fee Entitlement"

    The following formulas consider all the above information to calculate each provider's due share of FAsset minting fees.

    The amount of debt a provider $p$ is assigned upon entering a pool is calculated as:

    $$
    fee\_debt_p = { added\_collateral_p \over collateral\_in\_pool } \times fees\_in\_pool
    $$

    where:

    * $added\_collateral_p$ is the amount of `$FLR` tokens that provider $p$ is adding to the pool.
    * $collateral\_in\_pool$ is the amount of `$FLR` tokens in the pool before adding the new tokens.
    * $fees\_in\_pool$ is the amount of FAsset minting fees currently in the pool.

    The following formulas are based on the concept of **virtual fees**, which are the fees that a provider would be entitled to if they had no fee debt.

    The **total virtual fees** is the sum of all provider's virtual fees and can be expressed as:

    $$
    total\_virtual\_fees = fees\_in\_pool + total\_fee\_debt
    $$

    where:

    * $total\_fee\_debt$ is the sum of the fee debt held by all providers $= \sum_p fee\_debt_p$

    Then, the virtual fees due to a provider $p$, i.e., the amount of FAsset minting fees they would be entitled to if they had no debt, are:

    $$
    virtual\_fees_p = { CPT_p \over currently\_issued\_CPT } \times total\_virtual\_fees
    $$

    where:

    * $CPT_p$ is the amount of CPTs provider $p$ holds.
    * $currently\_issued\_CPT$ is the circulating amount of CPTs.

    Finally, the amount of fees from the pool that a provider $p$ is free to withdraw at any given time is:

    $$
    free\_fees_p = virtual\_fees_p - fee\_debt_p
    $$

    where:

    * $fee\_debt_p$ is the amount of fee debt that provider $p$ holds.

<div class="steps-table" markdown>
??? example "Example: Fee Entitlement"

    |     |                                                                          | `$FLR` in pool | Fees in pool | Total fee debt | Total virtual fees |
    | --- | ------------------------------------------------------------------------ | -------------: | -----------: | -------------: | -----------------: |
    | 1.  | An agent creates a new vault.                                            |              0 |            0 |              0 |                  0 |
    | 2.  | Alice deposits 100 `$FLR` and gets 100 CPTs in return.                   |        **100** |            0 |              0 |                  0 |
    | 3.  | 10 FAssets of fees are added to the pool due to a mint.                  |            100 |       **10** |              0 |             **10** |
    | 4.  | Bob deposits 100 `$FLR` and gets 100s CPT in return.                     |        **200** |           10 |         **10** |             **20** |
    | 5.  | 10 more FAssets of fees are added to the pool due to another mint.       |            200 |       **20** |             10 |             **30** |
    | 6.  | Alice withdraws 10 FAssets of fees.                                      |            200 |       **10** |         **20** |                 30 |
    | 7.  | Bob exits the pool by returning the 100 CPTs and withdrawing 100 `$FLR`. |        **100** |        **5** |         **10** |             **15** |

    After step **4**, Bob is not entitled to any of the fees in the pool:

    * Bob is assigned an initial fee debt of 10 FAssets, according to the $fee\_debt_p$ formula in the box above.
    * As a result, the total virtual fees are increased to 20 FAssets. 10 of them are in fees, and 10 of them are in debt.
    * Each user now holds half the total CPTs, therefore they are allowed to withdraw half the virtual fees, this is, 10 FAssets each.
    * Alice has no debt, so she can withdraw 10 FAssets, which is all the fees in the pool, because she was the only CPT holder when these fees were accrued.
    * Conversely, Bob has 10 FAssets of debt, so he can't withdraw any of the fees.

    After step **5**, the new fees are shared between both users, and the previous 10 FAssets still belong to Alice:

    * The 10 FAssets in new fees increase the total virtual fees to 30.
    * Both users are entitled to half of the total, which is 15 FAssets each.
    * Alice has no debt, so she can withdraw 15 FAssets: the initial 10 plus half of the 10 that were added to the pool afterwards.
    * Bob has 10 FAssets of debt, so he can only withdraw 5, this is, his entitlement (15) minus the debt (10).

    After step **6**:

    * The 10 FAssets that Alice has withdrawn have converted into debt for her.
    * However, this action does not change the total virtual fees because the sum of fees in the pool and total debt remains constant.
    * Therefore, both users are still entitled to 15 FAssets each.
    * However, now Alice has 10 FAssets of debt, so she can withdraw only 5 more.
    * Nothing has changed for Bob, who can still withdraw 5 FAssets.

    In step **7**:

    * Bob is returning 100 CPTs, which is 50% of the circulating CPTs, so he is entitled to half the total virtual fees, 15 FAssets.
    * Because he is exiting the pool, all his debt, which is 10 FAssets, must be cancelled.
    * He can withdraw the remaining 5 FAssets from the fees pool.
    * After Bob withdraws his 5 FAssets, the pool contains only 5 FAssets, which correspond to the amount that Alice can withdraw.
</div>

## Transferable and Locked CPTs

CPTs can always be **redeemed** by exiting the pool, but only the portion of them above the fee debt can be **transferred** to another account.
Therefore, CPTs held by providers are divided into two types:

* **Transferable**: Tokens whose [time lock](#time-lock) has expired and are also free of [fee debt](#debt-lock).
    These tokens are fungible, and they can be transferred or traded just like any other ERC-20 token.
* **Locked**: The CPTs serve only as proof of ownership of some of the collateral in the pool, and they cannot be transferred nor traded.

    Locked CPTs are one of the following types:

    * **Time-locked**: Tokens whose [time lock](#time-lock) has not expired must wait to become transferable or redeemable.
    * **Debt-locked**: Tokens corresponding to an amount of fees below the provider's fee debt cannot be transferred because they would need to carry the debt with them.
        However, they can be [redeemed](#redemption-of-cpts).

        As new fees arrive in the pool, some previously debt-locked tokens become transferable.

        These CPTs can also become transferable by **adding** FAssets to the pool, which settles, either partially or completely, the fee debt.

??? info "Formulas: Collateral Pool Token Transferability"

    The amount of CPTs that a given provider $p$ can transfer is calculated as:

    $$
    transferable\_CPT_p = { free\_fees_p \over virtual\_fees_p } \times CPT_p
    $$

    where:

    * $free\_fees_p$ is the amount of fees from the pool that a provider $p$ can withdraw, as defined in the previous formula box.
    * $virtual\_fees_p$ is the amount of FAsset minting fees that provider $p$ would be entitled to if they had no debt, as defined in the previous formula box.
    * $CPT_p$ is the amount of CPTs provider $p$ holds.

    Accordingly, the amount of CPT that is locked and cannot be transferred is calculated as:

    $$
    locked\_CPT_p = { fee\_debt_p \over virtual\_fees_p } \times CPT_p
    $$

    As new minting fees arrive in the pool, the $transferable\_CPT_p$ of all providers also increases.

    Conversely, when a provider withdraws fees from the pool, their debt increases in the same amount, and $total\_virtual\_fee$ remains the same.
    Therefore, only that provider's $transferable\_CPT_p$ is reduced, without affecting the rest of the providers.

<div class="steps-table" markdown>
??? example "Example: Collateral Pool Token Transferability"

    |     |                                                                    | Issued CPTs | Fees in pool | Total fee debt | Total virtual fees |
    | --- | ------------------------------------------------------------------ | ----------: | -----------: | -------------: | -----------------: |
    | 1.  | An agent creates a new vault.                                      |           0 |            0 |              0 |                  0 |
    | 2.  | Alice deposits 100 `$FLR` and receives 100 CPTs.                   |     **100** |            0 |              0 |                  0 |
    | 3.  | 10 FAssets of fees are added to the pool due to a mint.            |         100 |       **10** |              0 |             **10** |
    | 4.  | Alice withdraws 5 FAssets of fees.                                 |         100 |        **5** |          **5** |                 10 |
    | 5.  | 10 more FAssets of fees are added to the pool due to another mint. |         100 |       **15** |              5 |             **20** |
    | 6.  | Alice transfers 75 CPTs to Bob.                                    |         100 |           15 |              5 |                 20 |
    | 7.  | Alice exits the pool by returning her remaining 25 CPTs.           |      **75** |           15 |          **0** |             **15** |

    After step **2**, all of Alice's CPTs are transferable because she has no debt.

    After step **3**, all of Alice's CPTs continue to be transferable, and she is entitled to 100% of the fees in the pool.
    If she transferred or traded his CPTs, the recipient of those CPTs would be entitled to the fees.

    After step **4**, only half of Alice's CPTs are transferable (50 CPTs). The other half is debt-locked.

    After step **5**, only 25% of Alice's CPTs remain locked (25 CPTs), which correspond to her 5 FAssets of debt.

    After step **6**:

    * Alice has 25 CPTs, which entitle her to 5 FAssets of virtual fees.
      After subtracting her 5 FAssets of fees, her free fees are zero, which means she cannot withdraw any more fees.
    * Bob has 75 CPTs and no debt, so he is entitled to 15 FAssets of fees, which are all the fees in the pool.

    In step **7**:

    * Alice is returning 25 CPTs, which is 25% of the circulating CPTs, so she is entitled to 25% of the total virtual fees, which is 5 FAssets.
    * Because she is exiting the pool, all her debt, which is 5 FAssets, must be cancelled.
    * Her $free\_fees_p$ are 0, so she cannot take any of the remaining fees in the pool.
    * The 15 FAssets that remain in the fee pool now belong entirely to Bob, who holds 100% of all the issued CPTs, which is 75 CPTs.
</div>

## The Collateral Ratio

The collateral ratio (CR) is the ratio between the value of all the tokens used as collateral and the total value of the underlying assets held by an agent at any given time.
The agent's vault and the collateral pool each has its own unique collateral ratio, which is constantly changing as the value of the underlying assets and the collateral change.
These values are obtained using the [FTSO system](../ftso/index.md).

!!! example "Example: Vault and Pool CR"

    Assume an amount of FAssets currently valued at $1000 USD, backed by $1500 worth of `$USDC` in vault collateral and $2000 worth of `$FLR` in pool collateral.

    The resulting vault CR is then $\$1500 \over \$1000$ = 1.5.

    The resulting pool CR is $\$2000 \over \$1000$ = 2.

Several thresholds are defined for the collateral ratio, and they are used at different times during the FAsset operations.
Some are set by the system, and others are set by the agent:

<figure markdown>
  ![Collateral ratio thresholds](fassets-cr.png){ loading=lazy .allow-zoom }
  <figcaption>Collateral ratio thresholds.</figcaption>
</figure>

### System-wide Thresholds

The following thresholds are set by the FAssets system's governance and are the same for all agents:

* **Minimal CR**: The lowest collateral ratio the agent vault and the collateral pool must maintain so that enough collateral exists to insure the minted FAssets and to compensate for redemption payments that fail.
    The minimal CR can be different for each type of collateral.
    { #minimal-cr }

    If an agent's CR remains below the minimal CR for longer than a governance-set amount of time, [liquidations](./liquidation.md) can start.

* **Liquidation CR**: An agent's position is unhealthy when the agent's vault CR or pool CR fall below their minimal CR.
    However, as long as the CR remains above the Liquidation CR, the CR can briefly fall below the minimal CR.
    { #collateral-call-band-cr }

    During this time, the agent can either deposit more collateral or self-close some backed FAssets to improve the position.

    However, if the CR falls below the Liquidation CR, [liquidations](./liquidation.md) can start immediately.

    The value of each Liquidation CR is approximately 10% less than the minimal CR.

    !!! example
        Assume the **minimal CR** is 1.4 and the **Liquidation CR** is 1.3.

        If the agent's vault CR drops below 1.3, the agent's position can be liquidated immediately.
        If the agent's vault CR drops below 1.4 but not below 1.3, the agent has some time to amend the position before it can be liquidated.

        Adjusted for the collateral pool's minimal CR, the same example applies to the collateral pool.

* **Safety CR**: If one or both of the collateral types fall below Liquidation CR or below the minimum CR for a longer period of time, liquidation occurs.
    When the offending collateral reaches a healthy CR again, the liquidation stops.
    To prevent the agent from immediately reverting into liquidation after a small price change, the CR must reach the safety CR before it can start operating normally again and liquidation stops.
    { #safety-cr }

    Each of the collateral types, the agent's vault and the collateral pool, has its own unique safety CR.

### Agent Thresholds

The following thresholds are set by each agent according to their own preferences:

* **Minting CR**: For each mint done by an agent, the maximum amount allowed to be minted is calculated so that the CR for the agent's vault and the CR for the agent's collateral pool after the mint remain higher than the minting CR for each collateral type.
    To reduce the threat of liquidation, agents should set the minting CR well above the minimal CR to accommodate price fluctuations that might occur before the CR falls below the minimal CR after the mint and minting is no longer possible.
    { #minting-cr }

* **Exit CR**: After a user redeems CPTs, the pool CR must be more than the exit CR.
    If the pool CR is already below the exit CR, redemption cannot occur.
    The exit CR is for the collateral pool only.
    { #exit-cr }

* **Top-up CR**: To incentivize healthy collateral pools, if the pool CR falls below the top-up CR, anyone can add collateral to the pool and receive [CPTs](#pool-collateral) at a reduced price.
    [This top-up mechanism](#top-up) decreases the likelihood of liquidations because of a low amount of pool collateral.
    { #top-up-cr }

## Redemption of CPTs

When collateral providers exit the pool by redeeming their CPTs, the FAssets system burns them and returns the appropriate share of the collateral plus the share of [FAsset-minting fees minus any FAsset-fee debt](#fasset-minting-fees-and-debt).

Providers also have the option to exit the pool partially, by redeeming only some of their CPTs.
In this case, they can choose one of the following options to manage their due FAsset fees: withdraw the fees, reduce the fee debt, or both, keeping the current fee-to-debt-ratio.

However, providers can exit, either fully or partially, only when the [collateral ratio (CR)](#the-collateral-ratio) is high enough.
After they exit, the **CR** must be higher than the **exit CR** to prevent their exit from reducing the **CR** to a dangerous level.

Therefore, exits are impossible when the **CR** is below the **exit CR**.
In this case, if providers have enough FAssets, they can exit by **self-closing**, which burns enough of their FAssets, plus their fees, to release their collateral.

Providers are mainly compensated in underlying assets for the burned FAssets, depending on [the number of lots](./minting.md#lots) of FAssets that need to be redeemed:

* If more than 1 lot needs to be redeemed, the value of the burned FAssets is redeemed through the standard [redemption process](./redemption.md).
* If less than 1 lot needs to be redeemed, the agent buys the underlying funds from the user using vault collateral, at the price reported by the [FTSO system](../ftso/index.md) minus a percentage defined by the agent.
    This purchase by the agent occurs because fees on underlying chains can be expensive, which makes redemption of small quantities too expensive for the agent.

    Providers can always request this option instead of receiving underlying tokens.
    Also, if enough vault collateral is not available, pool collateral is used instead.

!!! warning
    In the case where the agent does not redeem in the underlying asset, the FAssets system pays the provider in collateral from the agent's vault because the pool collateral backing the redeemed FAssets is already withdrawn.

    When this type of redemption occurs, users might receive less collateral than they would have received if they had made a normal redemption.

## Agent's Stake in the Collateral Pool

Agents must have a stake in their collateral pools, which means they must hold the amount of CPTs proportional, by a system-defined constant, to the backed amount of FAssets.
The maximum amount of minting is limited by the amount of collateral pool tokens held by the agents.
The agents' tokens are locked, which means they cannot be redeemed or transferred, while agents back these FAssets.

When the agent's portion of the collateral pool is below the threshold, new mintings are not allowed.
However, this situation does not trigger a liquidation because only the total pool stake matters when collateral needs to be redeemed or a liquidation payment needs to be made.

If an agent's actions force a payment to be made from the collateral pool, the agent's CPTs, valued by the paid native tokens and recalculated by the collateral-pool-price formula, are burned.
These actions can cause the agent's CPTs to be burned:

* When a redemption payment fails, when enough vault collateral to compensate the redeemer is not available, or when the system is set to automatically pay for redemption failures from the collateral pool.
* Liquidation because the CR of the vault collateral is too low.
* Full liquidation because of an [agent infraction](./redemption.md#redemption-payment-failure) during a transfer on an underlying chain.

## Top-up

To reduce the likelihood of liquidations because the pool collateral is too low, the pool can be topped up at a reduced price when the **CR** is above the **top-up CR**.

A top-up mechanism for vault collateral is not available.
To prevent liquidation, agents can add vault collateral any time.
