# Ledger Nano X and Nano S

Hardware wallets are considered among the more secure options to manage crypto assets and store private keys.
Your crypto assets can remain safe, even if your computer or phone is compromised, as long as you keep your recovery phrase safe and review all transaction details before confirming transactions.

This guide explains how to configure your Ledger device to use it through the MetaMask wallet.

## One-Time Setup

You only need to perform the steps in this section once.

### Installing MetaMask

Follow the [MetaMask guide](./how-to-access-flare-network-with-metamask.md) to install and configure the MetaMask wallet.
Make sure MetaMask can show `$FLR` and `$SGB` tokens, and their wrapped `$WFLR` and `$WSGB` versions.

### Installing Ledger

Follow the [Ledger](https://www.ledger.com/start) instructions to:

1. Install Ledger Live and open it.
2. Initialize your Ledger device with a recovery phrase.
3. Protect your Ledger device with a PIN code.
4. Install the latest Ledger device firmware.

### Installing the Ethereum App

Flare is [EVM](glossary.md#evm)-compatible, so it uses the Ethereum app on Ledger.
After meeting the requirements above, install the Ethereum app on the device with the following steps:

1. Open the **Manager** in Ledger Live.
2. Connect and unlock your Ledger device.
3. Enable the manager on your Ledger device by pressing both buttons.
4. Find **Ethereum (ETH)** in the app catalog.
5. Click the **Install** button of the app.

Your Ledger device displays _Processing…_.
The app installation is complete.

### Creating Accounts

After enabling access to Songbird and Flare in MetaMask, create one or more accounts.

In MetaMask:

1. Select **Flare** or **Songbird** in the network dropdown.
2. Connect your Ledger device using USB.
3. Open the Ethereum app on your Ledger device.
4. If Ledger Live is still running on your computer, you must quit the app.
5. Locate MetaMask's **Settings** and then **Advanced** settings.
6. Ensure that the **Preferred Ledger Connection Type** is set to **WebHID** in the drop-down menu (it should be the case by default).
7. Click your account image and **Connect Hardware Wallet**.
A pop up box opens listing paired Human Interface Devices (HID).
8. Highlight your **Ledger S** or **Ledger X** and click **Connect**.
A random set of addresses opens that are available for your use.
9. To create one or more accounts (for example, for different tokens or different purposes), select any account number or multiple account numbers and click **Unlock**.

You have created one or more Ledger accounts to which you can send `$FLR` or `$SGB` tokens.

Your `$FLR` and `$SGB` balance will be displayed on the MetaMask overview.
Once the accounts contain `$WFLR` or `$WSGB` their balances will be shown too if you followed the [Wrapping Flare Tokens](../wrapping-tokens.md) guide.

!!! note

    The [Ledger Live](https://www.ledger.com/ledger-live) desktop application, as of version 2.55, can show your `$FLR` and `$SGB` balances but NOT the wrapped `$WFLR` and `$WSGB` versions.

    The tokens are still in the account, but Ledger Live does not show them.

## Using Ledger with MetaMask

Now that you have the one-time setup complete, here are a few things you can do to get started using your new accounts.

* **Receive tokens**.
To receive tokens, copy your account address and share it with the sender.

* **Send tokens**.
To send tokens, click **Send** and enter the recipient address.
Then enter the desired amount and click **Next**.
MetaMask will ask you to confirm the transaction from the Ledger device.

* **Confirm transactions**.
To confirm or reject a transaction, follow the on-screen instructions on your Ledger device.

!!! warning
    Always review all transaction details on your Ledger device before confirming any transaction!

--8<-- "./include/wallet-warning.md"

To learn how to use Ledger, including signing transactions, go to [Ledger.com](https://www.ledger.com/).
