# What is Flare?

!!! image inline end ""
    ![Flare logo](logo-FLR.png){ loading=lazy .allow-zoom }

Flare is a layer-1 blockchain network aimed at working with decentralized data.

Flare is used just like Ethereum: even though the code is different, Flare offers the same API, supports the same smart contracts and the [EVM](glossary.md#evm) just like Ethereum.
As an example, Flare also supports [NFTs](glossary.md#nft).

Common blockchain tools like [wallets](../user/wallets/index.md) and [block explorers](../user/block-explorers/index.md) are fully available on Flare.

The native currency of the Flare network is the `$FLR` token, which is not an [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) token.
`$FLR` is handled the same way `$ETH` is handled on the Ethereum blockchain.

## The Flare Protocols

A number of protocols are actively being developed on the Flare network that provide on-chain decentralized data:

* The [Flare Time-Series Oracle (FTSO)](./ftso.md) provides continuous estimations for different types of data.
* The [State Connector](./state-connector.md) allows querying non-changing, verifiable information from outside the Flare network.

## The Flare Networks

Flare has 4 networks with different purposes:

* **Flare** is the [main network](glossary.md#main_network).
* **Songbird** is the [canary network](glossary.md#canary_network), used for testing features under "real fire" conditions, before deploying them on the main network.
* **Coston** is Songbird's public [test network](glossary.md#coston).
* **Coston2** is Flare's public [test network](glossary.md#coston).

<figure markdown>
![The Flare networks](flare-network-types.png){ loading=lazy .allow-zoom width=500px }
<figcaption>General feature adoption flow.</figcaption>
</figure>
