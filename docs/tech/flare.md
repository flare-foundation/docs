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
The infrastructure providers, which perform doubly as [validators](../tech/validators.md) and [data providers](../infra/data/operating.md), enable two native [oracles](glossary.md#oracle), the [FTSO](./ftso.md) and the [State Connector](./state-connector.md).
This [native](glossary.md#native) processing provides developers on Flare with efficient access to large amounts of data and [data proofs](glossary.md#data_proof) at minimal cost, with which to build software on the platform.

By giving developers [trustless](glossary.md#trustless) access to the broadest range of data needed by the software they build, Flare can advance the development of more blockchain use cases where data is important, such as in [DeFi](glossary.md#defi), gaming, [NFT](glossary.md#nft), music, social networks, Real World Assets [(RWAs)](glossary.md#rwa), Machine Learning (ML), and Artificial Intelligence (AI).

## Flare Protocols

Flare has the following native data acquisition protocols at these stages of development:

* The **[Flare Time-Series Oracle (FTSO)](./ftso.md)** provides continuous estimations of changing data, such as [price pairs](glossary.md#price_pair).
* The **[State Connector](./state-connector.md)** allows querying of verifiable, non-changing data from other chains and the internet.
* The **[FAssets](./fassets/index.md)** system is being developed by Flare Labs. It allows tokens on blockchains that do not support smart contracts to be used trustlessly with smart contracts on the Flare blockchain.
* Flare **LayerCake** is being developed by Flare Labs to provide a [decentralized](glossary.md#decentralized), trustless bridging system between smart contract networks. For an overview of trustless bridges, see [LayerCake](https://flare.network/layercake/).

## Developing on Flare

Flare developers can work in a familiar Ethereum-like environment.
It offers the same [API](../apis/index.md) and uses the Ethereum Virtual Machine ([EVM](glossary.md#evm)), so Ethereum's Solidity smart contracts can be used directly.
Like Ethereum, Flare supports other assets, such as NFTs.
See [Getting Started](../dev/getting-started/index.md).

The Flare native currency, `$FLR`, works the same as `$ETH` on the Ethereum blockchain.
For those contracts that can only work with [ERC-20](glossary.md#erc20) tokens, `$FLR` can be easily [wrapped](../user/wrapping-tokens.md) as `$WFLR`, which is an ERC-20 representation of `$FLR`.
Flare's [FTSO delegation](./ftso.md#delegation) and Flare [governance](./governance.md) are examples of such apps.

Common blockchain tools like [wallets](../user/wallets/index.md), a [token management portal](https://portal.flare.network/), and [block explorers](../user/block-explorers/index.md) are available on Flare.

Flare is actively seeking developers eager to discover what new utility can be brought to the blockchain industry when acquiring data is possible in a decentralized way.
To start, since Flare is EVM-compatible, you can migrate Ethereum smart-contract dapps to Flare.
Then consider, for example, creating DeFi, gaming, NFT, music, or social network dapps.
See [Start Building](https://flare.network/start-building/), for more information.

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

For technical details about each network see [Network Configuration](../dev/reference/network-config.md).

## Flare Chains

Flare uses two chains and is developing a built-in interoperability mechanism between them.

* **C-Chain:** The contract chain that is used for smart contracts. It is where the Ethereum Virtual Machine operates, and is the chain where the vast bulk of the community currently interact.
* **P-Chain:** The platform chain that accommodates [staking](../tech/validators.md) and provides rewards to its validators.

## Security

The Flare source code has been audited and is secure and safe.
[View the audit reports](../security/index.md) on Flare clients and smart contracts.
