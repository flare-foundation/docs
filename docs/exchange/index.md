# Exchange Guides

This section contains hints and bits of advice for Exchanges willing to support the Flare blockchain. Probably the first thing you should know is that:

!!! tip "Flare works just like Ethereum!"

    If your Exchange already supports Ethereum, you can support Flare by using the same code base. You just need to:

    * [Deploy a Flare Observation node](../infra/observation.md) to access the network.
    * [Use the appropriate Chain ID for Songbird](../dev/reference/songbird.md).
    * Use standard Ethereum libraries like [web3.js](https://web3js.readthedocs.io/){target=_blank} if you want.

## The Tokens

The `$FLR` and `$SGB` tokens are **not** [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/){target=_blank} tokens: they are the **native currency** of **Flare** (the [Main network](glossary.md#main_network)) and **Songbird** (The [Canary network](glossary.md#canary_network)) respectively. As such, these tokens are handled the same way `$ETH` is handled on the Ethereum blockchain.

Their properties are also the same as the `$ETH` token, e.g., they can be divided to 18 decimal places.

## Section Contents

* [Proposed architecture](./architecture.md) for Exchanges.
* [How to retrieve tokenomic data](./tokenomics.md).
* [How to perform delegation (staking)](./delegation.md) on behalf of your users.
* [Troubleshooting guide](./troubleshooting.md).
