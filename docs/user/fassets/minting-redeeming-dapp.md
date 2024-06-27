# Using the FAssets Demo Dapp to Mint and Redeem FAssets

Users of the [FAssets](../../tech//fassets/index.md) system can use the FAssets Demo Dapp with their [Bifrost wallet](https://bifrostwallet.com/?utm_source=flare_network&utm_medium=blog&utm_campaign=fasset_open_beta) to mint and redeem FAssets, which allow tokens on blockchains that do not support smart contracts to be used trustlessly with smart contracts on the Flare blockchain.

In this guide you will deposit some test XRP tokens into an XRP account and use the FAssets system to mint them into FTestXRP FAsset tokens on the Coston network.
You will receive these tokens in a Coston account.

!!! info "Open Beta"

    The FAssets system is currently in the [Open Beta](../../tech/fassets/open-beta.md) period.
    During this phase, user-friendly tools are still being developed.

    --8<-- "./include/fassets/issue-collector.html"

    Alternatively, you can contact [support@flarelabs.org](mailto:support@flarelabs.org).

## Prerequisites

* A computer and a mobile device.
* The latest version of [Bifrost Wallet](https://bifrostwallet.com/?utm_source=flare_network&utm_medium=blog&utm_campaign=fasset_open_beta) installed on your mobile device and a wallet address created.
Be sure to store your seed phrase somewhere very safe.
For more information about securing your Flare experience, read this [summary](https://flare.network/a-quick-guide-to-secure-your-flare-experience/).

## 1. Activate Developer Mode in Your Bifrost Wallet

To access test networks in Bifrost Wallet, you need to activate **Developer Mode**.

1. Open your wallet, and click the cog icon displayed in the bottom-right corner of the screen to open the **Settings** menu.
2. Click **Advanced**, then click the **Developer Mode** switch.

    <figure markdown>
    ![Developer Mode](dapp-settings.png){ loading=lazy .allow-zoom }
    <figcaption>Developer Mode.</figcaption>
    </figure>

3. Click **Enable** to activate **Developer Mode**.

## 2. Get Your Addresses for Testnet Tokens

To mint FAssets on the Coston network, you will need testnet tokens.
Before you can use faucets to get the tokens, you must get from Bifrost the addresses of the accounts on the XRP and Coston networks that you will use later in this guide.

1. Return to the **Settings** menu, click the upward arrow button, and then click **Receive**.

    <figure markdown>
    ![Receive Token](dapp-receive.png){ loading=lazy .allow-zoom }
    <figcaption>Choose to Receive a Token.</figcaption>
    </figure>

2. In the **Search coin** field, type  `XRP`, and select **XRP** in the results list.

    <figure markdown>
    ![Receive XRP](dapp-receive-result.png){ loading=lazy .allow-zoom }
    <figcaption>Choose to Receive XRP.</figcaption>
    </figure>

    Your XRPL testnet address is displayed as a QR code and a string of letters and numbers.

3. Tap the string of letters and numbers below the QR code to copy your XRPL address, and paste it in a text file so that you can use it in later steps.

    <figure markdown>
    ![XRPL Address](dapp-receive-address.png){ loading=lazy .allow-zoom }
    <figcaption>Copy Your XRPL Address.</figcaption>
    </figure>

4. Return to the **Receive** menu, type `CFLR` in the search field, and then select **Coston Flare** in the results list.

    <figure markdown>
    ![Receive CFLR](dapp-receive-result-cflr.png){ loading=lazy .allow-zoom }
    <figcaption>Choose to Receive CFLR.</figcaption>
    </figure>

    Your CFLR testnet address is displayed as a QR code and a string of letters and numbers.

5. Tap the string of letters and numbers below the QR code to copy your CFLR address, and paste it in a text file so that you can use it in later steps.

    <figure markdown>
    ![CFLR Address](dapp-receive-address-cflr.png){ loading=lazy .allow-zoom }
    <figcaption>Copy Your CFLR Address.</figcaption>
    </figure>

## 3. Get Testnet Tokens

You will need the addresses you copied in the previous step to get the testnet tokens.
Testnet tokens are free and have no monetary value.

1. On your computer, open the [FAssets Demo Dapp](https://coston-fasset-mint-demo.flare.rocks/connect).
2. On the home page, click **Get Your textXRP here**.
   The **XRPL Testnet Faucet** page is displayed.
3. Copy the XRPL address that you saved in Step 3 above, and paste it in the **XRPL address** field on the faucet page.
The XRP address is the address that does not start with `0x`.
4. In the **XRP (Testnet)** field, select 1000 XRP.
5. Select the checkbox.
6. Click **Send me XRP**.
   TestXRP tokens are sent to your Bifrost Wallet.

    <figure markdown>
    ![XRPL Faucet](dapp-faucet-xrp.png){ loading=lazy .allow-zoom }
    <figcaption>XRP Testnet Faucet page.</figcaption>
    </figure>

7. Return to the FAssets Demo Dapp home page, and click **Get Your CFLR here**.
   The **Official Flare Faucet** page is displayed.

    <figure markdown>
    ![Flare Faucet](dapp-faucet-cflr.png){ loading=lazy .allow-zoom }
    <figcaption>Official Flare Faucet page.</figcaption>
    </figure>

8. Copy the CFLR address that you saved in Step 3 above, and paste it in the **Flare address** field on the faucet page.
The Coston address is the address that starts with `0x`.
9. Click **Request CFLR**.
   100 CFLR are sent to your Bifrost Wallet.

10. In your Bifrost Wallet, review your updated balances of testXRP and CFLR.

    <figure markdown>
    ![Token Balances](dapp-tokens-balances.png){ loading=lazy .allow-zoom }
    <figcaption>Testnet Token Balances.</figcaption>
    </figure>

## 4. Connect Your Bifrost Wallet to the FAssets Demo Dapp

1. On your computer, open the FAssets Demo Dapp, click the **Connect Bifrost Wallet** button near the middle fo the page, and click **Wallet Connect**.
   A QR code is displayed.
2. In Bifrost Wallet on your mobile device, click the blue arrow in the navigation bar, and select **Connect**.

    <figure markdown>
    ![Connect Bifrost](dapp-bifrost-connect.png){ loading=lazy .allow-zoom }
    <figcaption>Connect Bifrost.</figcaption>
    </figure>

    Your camera application is activated.

3. In your camera application, align the QR code displayed in Step 1 until the application detects it.
   Bifrost Wallet prompts you to connect.

    <figure markdown>
    ![Confirm Connection](dapp-bifrost-confirm.png){ loading=lazy .allow-zoom }
    <figcaption>Confirm Connection.</figcaption>
    </figure>

4. Click **Connect**.
   The dapp is connected to your Bifrost Wallet.
   A confirmation dialog is displayed, and the FAssets Demo Dapp shows the balances of the two accounts.

## 5. Mint FTestXRP

1. In the FAssets Demo Dapp, locate the **FAssets** section on the page, and click **Mint** beside **FTestXRP**.

    <figure markdown>
    ![Mint FTestXRP](dapp-ftestxrp-mint.png){ loading=lazy .allow-zoom }
    <figcaption>Mint FTestXRP.</figcaption>
    </figure>

2. In the [Lots](../../tech/fassets/minting.md#lots) field, specify how many lots of FTestXRP you want to mint.
   To help the FAssets system, split the total into multiple transactions made over several days.

    <figure markdown>
    ![Lots](dapp-ftestxrp-lots.png){ loading=lazy .allow-zoom }
    <figcaption>Lots.</figcaption>
    </figure>

3. Click **Next**.
   The minting process begins.
   In Bifrost Wallet, a confirmation prompt for the collateral reservation is displayed, which shows the number of lots you specified and the minting fee.

    <figure markdown>
    ![Confirmation](dapp-ftestxrp-reserve.png){ loading=lazy .allow-zoom }
    <figcaption>Confirm the Collateral Reservation.</figcaption>
    </figure>

4. Click **Confirm** and input either your PIN or your biometrics, depending on the way you set up your wallet.
   The collateral is reserved, the CFLR is sent to the `FAssets` contract, and another confirmation prompt is displayed ([Step 2 of this process](https://docs.flare.network/tech/fassets/minting/#minting-process)).

    <figure markdown>
    ![Confirmation](dapp-ftestxrp-confirm.png){ loading=lazy .allow-zoom }
    <figcaption>Approve the Transaction.</figcaption>
    </figure>

5. Click **Confirm** and input either your PIN or your biometrics, depending on the way you set up your wallet.
   The transaction is approved.
   The [Data Connector](../../tech/state-connector.md) trustlessly proves that you, via the FAssets Demo Dapp, sent the right amount of testXRP to the correct address with the correct reference.
   This process for the Data Connector to come to consensus and provide the FAssets system with a proof that this has occurred takes approximately 5 minutes.
   Progress through the four stages of processing the mint is displayed.

    <figure markdown>
    ![Mint Progress](dapp-ftestxrp-progress.png){ loading=lazy .allow-zoom }
    <figcaption>Example of a Mint Progress Window.</figcaption>
    </figure>

    After the proof is received, the FTestXRP is minted, and the balance is displayed in your Bifrost Wallet.

    <figure markdown>
    ![Mint Progress](dapp-ftestxrp-balance.png){ loading=lazy .allow-zoom }
    <figcaption>Example of a Mint Progress Window.</figcaption>
    </figure>

## 5. Redeem FTestXRP

You can follow a similar process to redeem your FTestXRP and receive your original testXRP back in your wallet.
During this open beta phase, if you run out of testXRP or Coston Flare, you can always head back to the faucets to get more.
Each address can obtain a maximum of 1000 testXRP and 100 CFLR per day.

FTestXRP is a regular [ERC-20](../../tech/glossary.md#erc20) token on the Coston network, so you can send it or receive it using standard tools, and the receiver can use the redeeming process described here to get the testXRP back.

!!! warning

    Remember to keep a small amount of CFLR for gas.
