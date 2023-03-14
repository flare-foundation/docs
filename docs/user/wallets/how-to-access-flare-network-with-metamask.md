---
description: How to connect the MetaMask browser extension to the Songbird or Flare networks
---

# MetaMask

The MetaMask browser extension is a convenient way to access and interact with blockchains like Songbird or Flare.
To do so, you need to first add a custom network to MetaMask, as explained in this guide.
Make sure that you have securely backed up your recovery phrase before proceeding.

## Getting Started

To use MetaMask with Songbird or Flare, ensure you have:

1. Installed the latest version of [Google Chrome](https://www.google.com/chrome/).
2. Installed the [MetaMask browser extension](https://metamask.io/download.html).
3. Created a new wallet or imported an existing wallet to MetaMask.
4. Securely backed up your recovery phrase offline.
5. Protected your MetaMask with a password.

## Adding Flare Tokens

After you set up your wallet, add the native tokens `$FLR` and `$SGB` and the wrapped tokens `$WFLR` and `$WSGB` to your listed assets:

1. Open the MetaMask browser extension.
2. Unlock your MetaMask wallet with your password.
3. Click the networks drop-down menu, and click **Add network**. In a browser tab, the **Settings** menu opens to the **Networks** section.
4. Scroll to the bottom of the page, and click **Add a network manually**.
5. Complete the following steps to set up the Flare network and Songbird network:

    === "Flare"

        1. Specify the values from the following table to set up the Flare network, which will add the native `$FLR` token to your list of assets.

            | Field                  | Value                                       |
            | ---------------------- | ------------------------------------------- |
            | **Network Name**       | Flare                                       |
            | **New RPC URL**        | <https://flare-api.flare.network/ext/C/rpc> |
            | **Chain ID**           | 14                                          |
            | **Currency Symbol**    | FLR                                         |
            | **Block Explorer URL** | <https://flare-explorer.flare.network>      |

        2. Click **Save**.
        3. [Follow these instructions to automatically add `$WFLR`](../wrapping-tokens.md#automatically) to your listed assets.

    === "Songbird"

        1. Specify the values from the following table to set up the Songbird network, which will add the native `$SGB` token to your list of assets.

            | Field                  | Value                                          |
            | ---------------------- | ---------------------------------------------- |
            | **Network Name**       | Songbird                                       |
            | **New RPC URL**        | <https://songbird-api.flare.network/ext/C/rpc> |
            | **Chain ID**           | 19                                             |
            | **Currency Symbol**    | SGB                                            |
            | **Block Explorer URL** | <https://songbird-explorer.flare.network>      |

        2. Click **Save**.
        3. [Follow these instructions to automatically add `$WSGB`](../wrapping-tokens.md#automatically) to your listed assets.

!!! warning
    Always review all transaction details in MetaMask before confirming any transaction!

## Wrap and Delegate

Once connected to a Flare network, enter the address of the website or dapp you wish to use to wrap and delegate in MetaMask.
A few [FTSO](glossary.md#ftso) data providers have developed dapps integrated with their websites that allow users to wrap, delegate and claim SGB and Flare rewards.
Delegating using this method is not exclusive to one specific provider, as these dapps allow you to choose from a number of different providers.

Other providers have their own websites and are developing similar dapps.
See the full list of active data providers on [flaremetrics.io/ftso](https://flaremetrics.io/ftso).
