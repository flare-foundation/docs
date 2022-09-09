---
description: How to use your Brave wallet to access the Songbird and Flare networks
---

# Brave Wallet

Brave Browser now offers a non-custodial software wallet on both Windows and macOS for Ethereum Virtual Machine (EVM) integrated chains such as Songbird and Flare.

## Getting Started

To use Brave Wallet with Songbird or Flare, first make sure that you have:

1. Downloaded Brave Browser to your computer, version 1.42.88 or later.
2. Initialized a Brave wallet or restored an existing one.
3. Protected your Brave wallet with a password.
4. Backed up your crypto wallet with a 12-word recovery phrase.

Once your wallet is set up, you will need to connect to one of Flare's networks.
This involves adding a custom network via the following steps:

1. Open Brave Browser on your computer.
2. Navigate to settings and select ``Wallet`` from the list of options.
3. In the box on the right click ``Networks``, then ``Add``.
4. Input the following information in the appropriate fields:

    === "Songbird"

         | Field                     | Value                                          |
         | ------------------------- | ---------------------------------------------- |
         | The id of new chain       | **19**                                         |
         | Enter name of new chain   | **Songbird**                                   |
         | Chain's currency name     | **Songbird**                                   |
         | Chain's currency symbol   | **SGB**                                        |
         | Chain’s currency decimals | **18**                                         |
         | RPC URLs                  | <https://songbird-api.flare.network/ext/C/rpc> |
         | Icon URLs_                | _(leave blank)_                                |
         | Block Explorer URLs       | <https://songbird-explorer.flare.network>      |

    === "Flare"

         | Field                     | Value                                       |
         | ------------------------- | ------------------------------------------- |
         | The id of new chain       | **14**                                      |
         | Enter name of new chain   | **Flare**                                   |
         | Chain's currency name     | **Flare**                                   |
         | Chain's currency symbol   | **FLR**                                     |
         | Chain’s currency decimals | **18**                                      |
         | RPC URLs                  | <https://flare-api.flare.network/ext/C/rpc> |
         | Icon URLs_                | _(leave blank)_                             |
         | Block Explorer URLs       | <https://flare-explorer.flare.network>      |

    Finally, click ``Submit``.

To finish connecting:

1. Enter your password and login to your wallet.
2. On the left of the screen next to ``Balance`` click the drop-down menu and select Songbird or Flare.
3. Connection is now complete.

## Wrap and Delegate

Brave users can access existing decentralized applications (dApps) created by independent organizations to wrap and delegate their SGB and FLR tokens, via the following steps ([Read more about delegation](../delegation/README.md)):

1. Open Brave Browser and login to your wallet (make sure you are connected to Songbird or Flare).
2. Open a second search tab within Brave.
3. Enter the address of the website or dApp you wish to use to wrap and delegate in the search bar at the top of the screen.

    !!! info

         These dApps are usually created by [FTSO](glossary.md#ftso) signal providers, but some of them (like FTSO AU) allow you to choose a different signal provider to delegate to.

4. Follow the prompts to connect your Brave wallet and sign transactions when wrapping, delegating, or claiming rewards.

See the full list of signal providers on Songbird at [flaremetrics.io](https://flaremetrics.io/ftso){target=_blank}.
