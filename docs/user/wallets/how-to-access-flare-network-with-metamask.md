---
description: How to connect the MetaMask browser extension to the Songbird or Flare networks
---

# MetaMask

The MetaMask browser extension is a convenient way to access and interact with blockchains like Songbird or Flare.
To do so, you need to first add a custom network to MetaMask, as explained in this guide.
Make sure that you have securely backed up your recovery phrase before proceeding.

## Getting Started

To use MetaMask with Songbird or Flare, first make sure that you have:

1. Installed the latest version of [Google Chrome](https://www.google.com/chrome/).
2. Installed the [MetaMask browser extension](https://metamask.io/download.html).
3. Created a new wallet or imported an existing wallet to MetaMask.
4. Securely backed up your recovery phrase offline.
5. Protected your MetaMask with a password.

Once your wallet is set up, you need to add a custom network to the MetaMask browser extension:

1. Open the MetaMask browser extension.
2. Unlock your MetaMask wallet with your password.
3. Click on Custom RPC in the network dropdown menu.

    === "Songbird"

        | Field                  | Value                                          |
        | ---------------------- | ---------------------------------------------- |
        | **Network Name**       | Songbird                                       |
        | **New RPC URL**        | <https://songbird-api.flare.network/ext/C/rpc> |
        | **Chain ID**           | 19                                             |
        | **Currency Symbol**    | SGB                                            |
        | **Block Explorer URL** | <https://songbird-explorer.flare.network>      |

    === "Flare"

        | Field                  | Value                                       |
        | ---------------------- | ------------------------------------------- |
        | **Network Name**       | Flare                                       |
        | **New RPC URL**        | <https://flare-api.flare.network/ext/C/rpc> |
        | **Chain ID**           | 14                                          |
        | **Currency Symbol**    | FLR                                         |
        | **Block Explorer URL** | <https://flare-explorer.flare.network>      |

4. Click **Save**.
5. Select **Songbird** or **Flare** in the network dropdown menu

You should now be able to see your Songbird or Flare balance on the overview.
To receive tokens, copy your account address and share it with the sender.
To send tokens, click **Send** and enter the recipient address.
Enter the desired amount and click **Next**.

!!! warning
    Always review all transaction details in MetaMask before confirming any transaction!

## Wrap and Delegate

Once connected to a Flare network, enter the address of the website or dApp you wish to use to wrap and delegate in MetaMask.
A few [FTSO](glossary.md#ftso) data providers have developed dApps integrated with their websites that allow users to wrap, delegate and claim SGB and Flare rewards.
Delegating using this method is not exclusive to one specific provider, as these dApps allow you to choose from a number of different providers.

Other providers have their own websites and are developing similar dapps.
See the full list of active data providers on [flaremetrics.io/ftso](https://flaremetrics.io/ftso).
