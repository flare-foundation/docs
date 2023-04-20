# Wrapping Flare Tokens

This information explains how to wrap and unwrap native tokens on various Flare networks using the [Flare Portal](https://portal.flare.network) or the block explorer.
Wrapped tokens are required to [delegate your vote power](../tech/ftso.md#delegation) to FTSO data providers and to [vote on decisions](../tech/governance.md) that affect how Flare networks operate.

When you complete the following steps for wrapping, your native tokens, such as `$FLR` and `$SGB`, are wrapped into `$WFLR` and `$WSGB`, respectively, so that you can participate in FTSO delegation and governance.
When you need to convert your wrapped tokens into native tokens again, unwrap the wrapped tokens using similar steps, as described below.

## Using the Flare Portal

1. Open the [Flare Portal](https://portal.flare.network).
    The home page is displayed.

    <figure markdown>
    ![Flare Portal Home](delegation-portal-connect.png){ loading=lazy .allow-zoom width=500px }
    <figcaption>Flare Portal home.</figcaption>
    </figure>

2. Click **Connect to Wallet** and log into your wallet.
    The interface to your **Main Account** opens.
3. Ensure you are connected to the network you want.
    In the following image, the wallet is connected to the Flare network.

    <figure markdown>
    ![Flare Portal Main Account](delegation-portal-main.png){ loading=lazy .allow-zoom width=500px }
    <figcaption>**Main Account** on the Flare network.</figcaption>
    </figure>

4. Choose one of the following options:

    * **Wrap**: Locate your balance of native tokens, and click **Wrap**.

        !!! warning "Never wrap all your tokens"
            Wrapping and unwrapping tokens are transactions with fees to be paid in native tokens.
            Always leave some unwrapped tokens to pay for transaction fees.

        Specify the amount to wrap, and click **Wrap** again.

    * **Unwrap**: Locate your balance of wrapped tokens, and click **Unwrap**.
        Specify the amount to unwrap, and click **Unwrap** again.

5. Follow the steps to complete the transaction in your wallet.

Your wrapped token balance is updated and displayed in the Flare Portal and your wallet.

If your wrapped token balance is not displayed in your wallet, you must manually [add the wrapped token](#adding-wrapped-tokens-to-wallets) so that your wallet recognizes it.

## Using the Block Explorer

!!! example "This section is for advanced users."

1. Open a [block explorer](./block-explorers/index.md).
2. From the block explorer, follow the [Retrieval from Blockchain procedure](../dev/getting-started/contract-addresses.md#retrieval-from-blockchain) to find and open the `WNat` contract.
3. Click **Connect Wallet**, and complete the steps to connect your wallet, ensuring you are on the network on which you will wrap tokens.
4. Click the **Write Contract** tab, and use the following methods to wrap and unwrap tokens:

    * `deposit`: Wraps the amount of native tokens you specify in the field.
    * `withdraw`: Unwraps the amount of native tokens you specify in the field.

  Your token balance is updated and displayed in your wallet.
  If your wrapped token balance is not displayed in your wallet, you must manually [add the wrapped token](#adding-wrapped-tokens-to-wallets) so that your wallet recognizes it.

## Adding Wrapped Tokens to Wallets

Your wrapped tokens are stored on the blockchain in a special [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) smart contract called `WNat`, for Wrapped Native tokens.
Some wallets, like the [Bifrost Wallet](./wallets/bifrost-wallet.md), are aware of this contract and are therefore preconfigured to display `$WFLR` and `$WSGB` balances.
Some other wallets, though, require you to configure them so that they can display wrapped-token balances.

If your wallet doesn't display your wrapped-token balance, you need to configure it, either automatically or manually as described in the following procedures.

### Automatically

This is typically the fastest procedure, but might not work with all wallets.

1. Open the [Flare Portal](https://portal.flare.network). The home page is displayed.

    <figure markdown>
    ![Flare Portal Home](delegation-portal-connect.png){ loading=lazy .allow-zoom width=500px }
    <figcaption>Flare Portal home.</figcaption>
    </figure>

2. Click **Connect to Wallet** and log into your wallet. The interface to your **Main Account** opens.
3. Ensure you are connected to the network you want. In the following image, the wallet is connected to the Flare network.

    <figure markdown>
    ![Flare Portal Main Account](delegation-portal-main.png){ loading=lazy .allow-zoom width=500px }
    <figcaption>**Main Account** on the Flare network.</figcaption>
    </figure>

4. On the **Main Account** tab, locate the **Account** heading and the **Help** icon, identified by a question mark.

    <figure markdown>
    ![Flare Portal Account Help](wrapping-portal-help.png){ loading=lazy .allow-zoom width=500px }
    <figcaption>Flare Portal Account Help.</figcaption>
    </figure>

5. Click the **Help** icon and click **How do I add Wrapped Flare token to my wallet?**.
   A **Click here** link for adding `$WFLR` to your wallet is displayed.

    <figure markdown>
    ![Flare Portal Wrapping Help](wrapping-portal-faq-add-wrapped.png){ loading=lazy .allow-zoom width=500px }
    <figcaption>Flare Portal Wrapping Help.</figcaption>
    </figure>

6. Click **Click here**.
   Your wallet opens. Wallets typically ask you to accept the token. The exact instructions depend on your wallet.

7. Follow the prompts in your wallet to add the wrapped token.

Your wrapped token balance is displayed in your wallet.

### Manually

!!! example "This section is for advanced users."

If the automatic method did not work for you, most wallets can still be configured to recognize ERC-20 tokens through an **Import tokens** or **Add custom asset** menu, for example.

The exact instructions depend on your wallet, but they generally just require you to locate the aforementioned menu and provide the address of the `WNat` contract.
The wallet can usually then retrieve the token name, symbol, and number of decimals directly from the contract.

See the [Contract Addresses](../dev/getting-started/contract-addresses.md) page to find the address of the `WNat` contract.
