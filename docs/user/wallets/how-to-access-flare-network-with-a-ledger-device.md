# Ledger Nano X and Nano S

Hardware wallets are considered among the more secure options to manage crypto assets and store private keys.
Your crypto assets can remain safe, even if your computer or phone is compromised, as long as you keep your recovery phrase safe and review all transaction details before confirming transactions.

!!! note "Flare support instructions awaiting confirmation"

## Getting Started

To use your Ledger device with Songbird (`$SGB`), first make sure that you have:

1. Initialized your Ledger device with a recovery phrase.
2. Protected your Ledger device with a PIN code.
3. Ledger Live is installed, open and ready to use.
4. Installed the latest Ledger device firmware.
5. Installed the latest version of the Ledger Ethereum app.
6. Installed the latest version of [Google Chrome](https://www.google.com/chrome/){target=_blank}.
7. Installed the [MetaMask browser extension](https://metamask.io/download.html){target=_blank} **version 10.5.0 or later**.

## Install the Songbird App

After meeting the requirements, you can install the Songbird app by following these steps:

1. Open the Manager in Ledger Live.
2. Connect and unlock your Ledger device.
3. Allow the manager on your Ledger device by pressing both buttons.
4. Find Songbird in the app catalog.
5. Click the `Install` button of the app.
6. Your Ledger device will display `Processing…`.
7. The app installation is complete.

!!! info
    Both Ethereum and Songbird Ledger apps can be used to sign transactions for the Songbird network.

## Use Ledger Device with MetaMask

You can access Songbird by using your Ledger device with the MetaMask browser extension.

1. Open the MetaMask browser extension and login.
2. Click on Custom RPC in the networks dropdown

    a) Enter network name: `Songbird`.

    b) Enter RPC URL: `https://songbird.towolabs.com/rpc`.

    c) Enter chain ID: `19`.

    d) Enter symbol: `SGB`.

    e) Enter block explorer URL: `https://songbird-explorer.flare.network`.

    f) Click Save.

3. Select Songbird in the network dropdown.
4. Connect your Ledger device using USB.
5. Open the Songbird app on your Ledger device.
6. If Ledger Live is still running, you must now quit the app on your computer.
7. In MetaMask's Advanced Settings ensure that the `Preferred Ledger Connection Type` is set to `WebHID` in the drop-down menu (it should be the case by default).
8. Click your account image and `Connect Hardware Wallet`.
9. A pop up box will appear listing paired Human Interface Devices (HID). Highlight your Ledger S or Ledger X and click `Connect`.
10. Select your Account and click `Unlock`.

!!! info

    Please note that Towo Labs RPC node available at `https://songbird.towolabs.com/rpc` is only for individuals and **not for commercial use**.

    Companies and developers may contact Towo Labs to arrange dedicated access.

You will see your `$SGB` balance on the overview.
To receive `$SGB`, copy your account address and share it with the sender.
To send `$SGB`, click `Send` and enter the recipient address, enter the desired amount and click `Next`.
If prompted, allow MetaMask to open Ledger Live and open the device bridge.
Follow the on screen instructions to confirm or reject the transaction on your Ledger device.

!!! warning
    Always review all transaction details on your Ledger device before confirming any transaction!

## Wrap and Delegate

Once connected to the Songbird network, enter the address of the website or dapp you wish to use to wrap and delegate in the MetaMask browser.
A few of the data providers have developed dapps integrated with their websites that allow users to wrap, delegate and claim `$SGB` rewards.
Delegating using this method is not exclusive to one specific provider, as these dapps allow you to choose from a number of different providers.

Examples of data providers that have developed dapps for wrapping and delegation are FTSO AU and Aureus Ox.
Their dapps are available at [app.ftso.au](https://app.ftso.au/wrap){target=_blank} and [aureusox.com/dashboard](https://aureusox.com/dashboard){target=_blank}.

Other providers have their own websites and are developing similar dapps.
See the full list of active signal providers on [flaremetrics.io/ftso](https://flaremetrics.io/ftso){target=_blank}.
