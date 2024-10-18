---
search:
  boost: 2
---

# What Is Flare?

!!! image inline end ""
    ![Flare logo](logo-FLR.png){ .allow-zoom }

Flare is the blockchain for data.
It is a [layer 1](glossary.md#layer1), [EVM](glossary.md#evm) [smart contract](glossary.md#smart_contract) platform designed to expand the utility of blockchain.

Flare's aim is to provide data as a public good, meaning that data is not controlled by a centralized entity and is available to all.
The infrastructure providers, which perform doubly as [validators](../tech/validators.md) and data providers, enable two native [oracles](glossary.md#oracle), the [FTSO](./ftso/index.md) and the [Flare Data Connector](./data-connector.md).
This [native](glossary.md#native) processing provides developers on Flare with efficient access to large amounts of data and [data proofs](glossary.md#data_proof) at minimal cost, with which to build software on the platform.

By giving developers [trustless](glossary.md#trustless) access to the broadest range of data needed by the software they build, Flare can advance the development of more blockchain use cases where data is important, such as in [DeFi](glossary.md#defi), gaming, [NFT](glossary.md#nft), music, social networks, Real World Assets [(RWAs)](glossary.md#rwa), Machine Learning (ML), and Artificial Intelligence (AI).

## Flare Protocols

Flare has the following native data acquisition protocols at these stages of development:

* The **[Flare Time-Series Oracle (FTSO)](./ftso/index.md)** provides continuous estimations of changing data, such as [price pairs](glossary.md#price_pair).
* The **[Flare Data Connector](./data-connector.md)** allows querying of verifiable, non-changing data from other chains and the internet.
* The **[FAssets](./fassets/index.md)** system is being developed by Flare Labs. It allows tokens on blockchains that do not support smart contracts to be used trustlessly with smart contracts on the Flare blockchain.

## Developing on Flare

For information about developing on Flare, see the [Flare Developer Hub](https://dev.flare.network/).

## Flare Networks

Flare has 4 networks with different purposes:

* **Flare** is the [main network](glossary.md#main_network), where `$FLR` is the native currency.
* **Songbird** is the [canary network](glossary.md#canary_network), where `$SGB` is the native currency. Created with users in mind, it is meant for testing features under "real fire" conditions, before deploying them on the main network.
* **Coston** is Songbird's public [test network](glossary.md#coston), created with developers in mind.
* **Coston2** is Flare's public [test network](glossary.md#coston), created with developers in mind.

<figure markdown>
![The Flare networks](flare-network-types.png){ loading=lazy .allow-zoom width=500px }
<figcaption>General feature adoption flow.</figcaption>
</figure>

## Flare Chains

Flare uses two chains and is developing a built-in interoperability mechanism between them.

* **C-Chain:** The contract chain that is used for smart contracts. It is where the Ethereum Virtual Machine operates, and is the chain where the vast bulk of the community currently interact.
* **P-Chain:** The platform chain that accommodates [staking](../tech/validators.md) and provides rewards to its validators.
