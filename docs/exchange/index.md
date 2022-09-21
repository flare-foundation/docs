# Exchange Guides

This section contains information and bits of advice for Exchanges willing to support the Flare blockchain.

The first thing you should know is that:

!!! tip "Flare is used just like Ethereum!"

    Even though the node code is different, Flare offers the same API as Ethereum so you can integrate with it in the same way.

    * [Deploy a Flare Observation node](../infra/observation.md) to access the network.
    * [Use the appropriate Chain ID](../dev/reference/network-configs.md).
    * Use standard Ethereum libraries like [web3.js](https://web3js.readthedocs.io/){target=_blank} if you want.

## Quick Information About Flare

|                                     |                                                                               |
| ----------------------------------- | ----------------------------------------------------------------------------- |
| **Website address**                 | [flare.xyz](https://flare.xyz){target=_blank}                                 |
| **Brand assets**                    | [Google Drive][brand-assets]{target=_blank}                                   |
| **Node source code**                | [github.com/flare-foundation/flare][github]{target=_blank}                    |
| **Node installation documentation** | [docs.flare.xyz/infra/observation.md](../infra/observation.md){target=_blank} |
| **Node requirements**               | 8 CPU, 16 GB RAM, 2 TB disk space                                             |
| **Maximum block rate**              | 1 block/second.                                                               |
| **Token names**                     | `FLARE`, `SONGBIRD`                                                           |
| **Tickers**                         | `FLR`, `SGB`                                                                  |
| **Tokens precision**                | 18 decimal places                                                             |
| **Supported wallets**               | [docs.flare.xyz/user/wallets](../user/wallets/index.md)                       |

[brand-assets]: https://drive.google.com/drive/folders/1mPrtIBb2k88E4f1fguEm3eAXLW74xOry?usp=sharing
[github]: https://github.com/flare-foundation/flare

Technical information in the [Network Configuration section](../dev/reference/network-configs.md).

!!! note

    The `$FLR` and `$SGB` tokens are **not** [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/){target=_blank} tokens: they are the **native currency** of **Flare** (the [Main network](glossary.md#main_network)) and **Songbird** (The [Canary network](glossary.md#canary_network)) respectively. As such, these tokens are handled the same way `$ETH` is handled on the Ethereum blockchain.
