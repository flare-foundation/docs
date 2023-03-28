# Trezor T

Hardware wallets are considered among the more secure options to manage crypto assets and store private keys.
Your crypto assets can remain safe, even if your computer or phone is compromised, as long as you keep your recovery phrase safe and review all transaction details before confirming transactions.

## Getting Started

To use your Trezor device with Flare (`$FLR`) or Songbird (`$SGB`), first make sure that you have:

1. Initialized your Trezor device with a recovery phrase.
2. Protected your Trezor device with a PIN code.
3. Trezor Suite is installed, open and ready to use.
4. Enabled Ethereum under the **Crypto** tab in Trezor Suite.
5. Installed the latest Trezor device firmware.
6. Installed the latest version of [Google Chrome](https://www.google.com/chrome/).
7. Installed the [MetaMask browser extension](https://metamask.io/download).

## Use Trezor T Device with MetaMask

You can access Flare and Songbird by using your Trezor T with the MetaMask browser extension.

1. Open the MetaMask browser extension in your browser.
2. Click **Custom RPC** in the network dropdown.

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

3. Click **Save**.
4. Select **Flare** or **Songbird** in the network dropdown.
5. Connect and unlock your Trezor device.
6. Click your account image and **Connect Hardware Wallet**.
7. Select Trezor and click **Continue**.
8. Follow the on screen instructions to export your public key.
9. Select your Account and click **Unlock**.

!!! info

    Please note that the provided Flare RPC node is only for individuals and **not for commercial use**.

    Companies and developers may contact Flare Networks to arrange dedicated access.

You will see your `$FLR` or `$SGB` balance on the overview.
To receive tokens, copy your account address and share it with the sender.
To send tokens, click **Send** and enter the recipient address, enter the desired amount and click **Next**.
Follow the on screen instructions to confirm or reject the transaction on your Trezor device.

!!! warning
    Always review all transaction details on your Trezor device before confirming any transaction!

## Wrap and Delegate

Once connected to a Flare network, enter the address of the website or dapp you wish to use to wrap and delegate in the MetaMask browser.
A few [FTSO](glossary.md#ftso) data providers have developed dApps integrated with their websites that allow users to wrap, delegate and claim SGB and Flare rewards.
Delegating using this method is not exclusive to one specific provider, as these dapps allow you to choose from a number of different providers.

Other providers have their own websites and are developing similar dapps.
See the full list of active data providers on [flaremetrics.io](https://flaremetrics.io).
