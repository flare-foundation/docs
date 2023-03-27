# SafePal S1 Wallet

SafePal S1 is a **noncustodial hardware wallet** that is considered one of the most secure ways to manage your crypto assets.

## Getting Started

Purchase a SafePal S1 hardware device from the [official SafePal website](https://shop.safepal.io) in the products section and download their mobile app from either the [Apple App Store](https://apps.apple.com/us/app/safepal-wallet/id1548297139) or [Google Play Store](https://play.google.com/store/apps/details?id=io.safepal.wallet).

Use of a SafePal S1 hardware wallet requires syncing the device with the mobile app.
A step by step unboxing guide to initialize a new device/wallet, or import an existing one from a recovery phrase, can be found here: [https://safepalsupport.zendesk.com/hc/en-us/articles/360046051752-How-to-Set-Up-a-S1-Hardware-Wallet](https://safepalsupport.zendesk.com/hc/en-us/articles/360046051752-How-to-Set-Up-a-S1-Hardware-Wallet).

## Adding Flare Tokens

After you set up your wallet, add the native tokens `$FLR` and `$SGB` and the wrapped token `$WFLR` to your listed assets.

!!! Important
    SafePal currently does not support the addition of wrapped Songbird (`$WSGB`) to wallets.

1. Ensure the SafePal S1 is updated with the latest firmware, **version V1.0.32** or later.
2. Login to your SafePal mobile app and have your S1 device turned on and unlocked.
3. Scroll to the bottom of your listed assets in the mobile app, and click **Manage Coins**.
4. Click the **Enter token or token contract address** field.
   The **Search** window is displayed.
5. Complete the following steps to add Flare and Songbird tokens to your wallet:

    === "Flare"

         1. Scroll through the list of networks, and select **Flare**.
         2. In the **Enter token or token contract address** field, search for `Flare`.
         3. Click the plus sign (+) displayed beside **FLR (Flare)**.
            FLR (Flare) added to your list of assets, and the homepage is displayed.
         4. Scroll to the bottom of your listed assets in the mobile app, and click **Manage Coins**.
         5. Select **Flare**  from the list of networks again, and search for `Wrapped Flare`.
         6. Click the plus sign (+) displayed beside **WFLR (Flare)**.
            WFLR (Flare) is added to your list of assets on the homepage.

    === "Songbird"

         1. In the **Enter token or token contract address** field, search for `Songbird`.
            A list of Songbird tokens on various blockchains is displayed.

            !!! Important
                Ignore all Songbird tokens categorized as BEP-20 and ERC-20.
         2. Click the plus sign (+) for this **SGB (Songbird)** token with the logo:

            ![SGB Songbird token](../../assets/safepal-songbird-logo.png)

            SGB (Songbird) is added to your list of assets on the homepage.

## Wrap and Delegate

When you delegate your vote power to FTSO data providers, you not only support the Flare ecosystem but also earn monetary rewards.

You can use the SafePal mobile app to wrap and delegate your tokens:

1. Open the SafePal mobile app and navigate to the built-in web browser by clicking the four squares at the bottom middle of the screen.
2. Enter the address of the website or dapp you wish to use to wrap and delegate in the search bar at the top of the screen.

    !!! info

         These dapps are usually created by FTSO [data providers](glossary.md#data_provider), but some of them allow you to choose a different data provider to delegate to.
         Take a look at [flaremetrics.io](https://flaremetrics.io/) and pick the one you prefer.

3. After copying and pasting the address, click the drop-down menu to the right of the search tab.
4. Scroll down, select the **Flare** or **Songbird** networks, and click **Go**.
5. A pop-up will appear notifying that you are being redirected to a third-party dapp. Press **Confirm**.

Other data providers host similar websites or dapps for wrapping and delegation.
See the full list of signal providers on Songbird at [https://flaremetrics.io/ftso](https://flaremetrics.io/ftso).

Alternatively, wrap and delegate your `$FLR` or `$SGB` tokens using the [Flare Portal](https://portal.flare.network/). First, [wrap your tokens](../wrapping-tokens.md), and then [delegate them](../delegation/managing-delegations.md#delegating-your-vote-power).
