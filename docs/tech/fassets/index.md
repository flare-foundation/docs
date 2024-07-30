---
og_image: assets/thumbnails/fassets-concept.png
og_description: The FAssets system allows tokens on blockchains that do not support smart contracts to be used trustlessly with smart contracts on the Flare blockchain.
search:
  boost: 2
---

# FAssets

The FAssets system allows tokens on blockchains that do not support smart contracts to be used trustlessly with smart contracts on the Flare blockchain.

The following diagram summarizes the relationship between the FAssets system, its users, and the networks involved:

<figure markdown>
  ![FAssets system](fassets-system-overview.png){ loading=lazy .allow-zoom }
  <figcaption>FAssets overview.</figcaption>
</figure>

Anyone on the Flare blockchain can mint FAssets as wrapped versions of the original tokens from other blockchains, known as underlying networks.
The original tokens from these chains, such as `$BTC`, `$LTC`, `$DOGE`, and `$XRP`, are called underlying assets.
For example, the FAsset version of `$BTC` is `$FBTC`.
{ #fasset-type }

You can then use these FAssets in smart contracts and decentralized applications on Flare, and at any time you can redeem them for the underlying asset.

The system is enabled by these Flare protocols:

* [FTSO](../ftso/index.md), whose contracts provide decentralized price feeds for multiple tokens.
* [State Connector](../state-connector.md), which brings payment data from any connected chain into Flare.

FAssets are backed by collateral provided by entities in the following roles that maintain the infrastructure of the system and hold Flare's native assets.
All these entities are independent of the Flare Foundation.

## Roles in the FAssets System

The following roles participate in the FAssets system:

- [FAssets](#fassets)
  - [Roles in the FAssets System](#roles-in-the-fassets-system)
    - [Agents](#agents)
    - [Users](#users)
    - [Collateral Providers](#collateral-providers)
    - [Liquidators](#liquidators)
    - [Challengers](#challengers)

### Agents

The main purpose of agents is to keep the underlying assets while the minted FAssets are circulating.
Agents are off-chain programs, or bots, that:

* Manage the account that holds an underlying asset, like `$BTC`.
* Provide the main part of the [collateral](./collateral.md).
* Repay the underlying assets when users redeem them.

Each agent has an owner, a person who controls the following addresses associated with the agent.
These addresses enable owners to manage their agents and run FAsset operations.

* **Work address**: Used by programs permanently online to execute operations like paying for redemptions.
    Because the private key for this address resides on a server, it is vulnerable to theft.
    To keep it secure, owners should regularly change the private key and its corresponding work address.
    It is also known as a [hot wallet](glossary.md#hot_wallet).
* **Management address**: Used when the owner wants to change the work address.
    This address can never change and will typically be a [multisignature account](glossary.md#multisignature).
    It is also known as a [cold wallet](glossary.md#cold_wallet).

Before agents can participate in the FAssets system, they must be verified by governance.
To be verified by governance, owners submit the agent's management address and, during the initial stages, some sort of off-chain personal information for [KYC](glossary.md#kyc) purposes.
After the agent is verified, its management address is added to a list of allowed agents.

The **backing factor** is a system-wide setting that specifies how much of the kept assets must be locked, i.e., not freely used by agents.
This factor is currently 100%, meaning that agents should not transfer out of their account any underlying that is backing FAssets, unless they receive a [redemption request](./redemption.md).
Decreasing the underlying below the backing factor is an [illegal action](./liquidation.md#illegal-payments) and is reported by [challengers](#challengers).
{ #backing-factor }

### Users

Users interact with the FAssets system in the following ways:

* [**Minting**](./minting.md): Depositing underlying assets to an agent's address in exchange for the equivalent amount of FAssets minus a minting fee.
    The minting fee is split between the agent and the [collateral pool](./collateral.md#pool-collateral), which receives fees as FAssets.
    During this operation, users are called minters.

* [**Redeeming**](./redemption.md): Returning FAssets to the FAssets system in exchange for the equivalent amount of underlying assets, paid from an agent's address.
    If the agent fails to pay the underlying assets in time, the FAssets system pays the redeemer from the vault or the collateral pool plus a premium.
    To ensure redemption is always possible, even after fluctuating price changes, the total collateral is always higher than the value of the backed FAssets.
    During this operation, users are called redeemers.

No eligibility requirements apply.
Anyone can use the FAssets system to mint and redeem.
In the future, a mechanism might be implemented to allow agents to reject minting requests according to their respective countries' [KYC](glossary.md#kyc) laws.

### Collateral Providers

Anyone can participate in the FAssets system by providing native `$FLR` tokens to an agent's [collateral pool](./collateral.md#pool-collateral) and becoming a collateral provider.

For as long as these tokens remain locked in the pool, the collateral provider receives a share of every fee produced by FAssets minted using that pool.

### Liquidators

When an agent's collateral falls below the required minimum, it enters the [liquidation state](./liquidation.md).
In this state, liquidators send FAssets into the system in exchange for collateral from the agent's vault and collateral pool.
The collateral they receive has the same value as the FAssets they send plus a premium.
The FAssets sent by liquidators are burned, which reduces the amount of FAssets that the agent's collateral needs to back.

Once the agent's collateral is above a safety margin, the liquidation state ends.

No eligibility requirements apply.
Anyone can be a liquidator, contribute to the health of the FAssets system, and earn rewards in the process.

### Challengers

Challengers monitor an agent's underlying address to detect illegal transactions that reduce the amount of underlying assets below the [backing factor](#agents).
When challengers detect an illegal transaction, they provide the proof to the FAssets system in exchange for a reward from the agent's vault.

Then, the offending agent enters [full liquidation](./liquidation.md), and the agent's vault is permanently locked against new mintings.

No eligibility requirements apply.
Anyone can be a challenger, contribute to the health of the FAssets system, and earn rewards in the process.

## How the FAssets System Works

Select one of the following topics to continue learning about FAssets:

* [Collateral](./collateral.md)
* [The minting process](./minting.md)
* [The redemption process](./redemption.md)
* [Liquidation](./liquidation.md)
* [Operational Parameters](./parameters.md)
