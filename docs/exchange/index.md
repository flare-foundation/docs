<!-- ---
section_icon: exchange-icon.svg
section_icon_type: stroked-svg
--- -->

# Exchange Guides

This section contains information and bits of advice for Exchanges willing to support the Flare blockchain.

The first thing you should know is that:

!!! tip "Flare is used just like Ethereum!"

    Even though the node code is different, Flare offers the same API as Ethereum so you can integrate with it in the same way.

    * [Deploy a Flare Observer node](../infra/observation/deploying.md) to access the network.
    * [Use the appropriate Chain ID](../dev/reference/network-config.md).
    * Use standard Ethereum libraries like [web3.js](https://web3js.readthedocs.io/) if you want.

## Quick Information about Flare

|                                         |                                                                                     |
| --------------------------------------- | ----------------------------------------------------------------------------------- |
| **Website address**                     | [flare.network](https://flare.network)                                              |
| **Brand assets**                        | [Google Drive][brand-assets]                                                        |
| **[Rosetta][rosetta-api] API endpoint** | `https://flare-rosetta-api.flare.network/`                                          |
| **Node source code**                    | [github.com/flare-foundation/flare][github]                                         |
| **Node installation documentation**     | [docs.flare.network/infra/observation/deploying](../infra/observation/deploying.md) |
| **Node requirements**                   | 8 CPU, 16 GB RAM, 2 TB disk space                                                   |
| **Maximum block rate**                  | 1 block/second.                                                                     |
| **Token names**                         | `FLARE`, `SONGBIRD`                                                                 |
| **Tickers**                             | `FLR`, `SGB`                                                                        |
| **Tokens precision**                    | 18 decimal places                                                                   |
| **Supported wallets**                   | [docs.flare.network/user/wallets](../user/wallets/index.md)                         |

[brand-assets]: https://drive.google.com/drive/folders/1mPrtIBb2k88E4f1fguEm3eAXLW74xOry?usp=sharing
[github]: https://github.com/flare-foundation/flare
[rosetta-api]: <https://www.rosetta-api.org/>

Network configuration information, including:

* [Flare Networks Configuration Values](../dev/reference/network-config.md#flare-networks)
* [RPC Nodes for Connected Chains](../dev/reference/network-config.md#connected-networks)

!!! note

    The `$FLR` and `$SGB` tokens are **not** [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) tokens: they are the **native currency** of **Flare** (the [Main network](glossary.md#main_network)) and **Songbird** (The [Canary network](glossary.md#canary_network)) respectively. As such, these tokens are handled the same way `$ETH` is handled on the Ethereum blockchain.

Select one of the topics below:

* [Architecture of an Exchange](./architecture.md)
* [Delegating on the User's Behalf](./delegation.md)
* [Troubleshooting Guide](./troubleshooting.md)
