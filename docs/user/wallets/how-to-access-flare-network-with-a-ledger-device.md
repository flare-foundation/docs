# Ledger Nano X and Nano S

Hardware wallets are considered among the more secure options to manage crypto assets and store private keys.
Your crypto assets can remain safe, even if your computer or phone is compromised, as long as you keep your recovery phrase safe and review all transaction details before confirming transactions.

## Getting Started

To use your Ledger device with Flare or Songbird, first make sure that you have:

1. Initialized your Ledger device with a recovery phrase.
2. Protected your Ledger device with a PIN code.
3. Ledger Live is installed, open and ready to use.
4. Installed the latest Ledger device firmware.
5. Installed the latest version of the Ledger Ethereum app.
6. Installed the latest version of [Google Chrome](https://www.google.com/chrome/).
7. Installed the [MetaMask browser extension](https://metamask.io/download.html) **version 10.5.0 or later**.

## Install the Ethereum App

After meeting the requirements, you can install the Ethereum app by following these steps:

1. Open the Manager in Ledger Live.
2. Connect and unlock your Ledger device.
3. Allow the manager on your Ledger device by pressing both buttons.
4. Find `Ethereum (ETH)` in the app catalog.
5. Click the `Install` button of the app.
6. Your Ledger device will display `Processing…`.
7. The app installation is complete.

## Use Ledger Device with MetaMask

You can access Songbird by using your Ledger device with the MetaMask browser extension.

1. Open the MetaMask browser extension and login.
2. Click on Custom RPC in the networks dropdown

    === "Songbird"

        | Field              | Value                                          |
        | ------------------ | ---------------------------------------------- |
        | Network Name       | **Songbird**                                   |
        | New RPC URL        | <https://songbird-api.flare.network/ext/C/rpc> |
        | Chain ID           | **19**                                         |
        | Currency Symbol    | **SGB**                                        |
        | Block Explorer URL | <https://songbird-explorer.flare.network>      |

    === "Flare"

        | Field              | Value                                       |
        | ------------------ | ------------------------------------------- |
        | Network Name       | **Flare**                                   |
        | New RPC URL        | <https://flare-api.flare.network/ext/C/rpc> |
        | Chain ID           | **14**                                      |
        | Currency Symbol    | **FLR**                                     |
        | Block Explorer URL | <https://flare-explorer.flare.network>      |

    Finally, click ``Save``.

3. Select Songbird or Flare in the network dropdown.
4. Connect your Ledger device using USB.
5. Open the Ethereum app on your Ledger device.
6. If Ledger Live is still running, you must now quit the app on your computer.
7. In MetaMask's Advanced Settings ensure that the `Preferred Ledger Connection Type` is set to `WebHID` in the drop-down menu (it should be the case by default).
8. Click your account image and `Connect Hardware Wallet`.
9. A pop up box will appear listing paired Human Interface Devices (HID). Highlight your Ledger S or Ledger X and click `Connect`.
10. Select your Account and click `Unlock`.

You will see your `$SGB` or `$FLR` balance on the overview.
To receive tokens, copy your account address and share it with the sender.
To send tokens, click `Send` and enter the recipient address, enter the desired amount and click `Next`.
When prompted, allow MetaMask to open Ledger Live and open the device bridge.
Follow the on screen instructions to confirm or reject the transaction on your Ledger device.

!!! warning
    Always review all transaction details on your Ledger device before confirming any transaction!

## Wrap and Delegate

Once connected to the Songbird or Flare networks, enter the address of the website or dapp you wish to use to wrap and delegate in the MetaMask browser.
A few of the data providers have developed dapps integrated with their websites that allow users to wrap, delegate and claim rewards.
Delegating using this method is not exclusive to one specific provider, as these dapps allow you to choose from a number of different providers.

Many data providers have developed dapps for wrapping and delegation.
Take a look at [flaremetrics.io](https://flaremetrics.io/) and pick the one you prefer.

Other providers have their own websites and are developing similar dapps.
See the full list of active signal providers on [flaremetrics.io/ftso](https://flaremetrics.io/ftso).
