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

Your token balance is updated and displayed in the Flare Portal.

## Using the Block Explorer

!!! example "This section is for advanced users."

1. Open a [block explorer](./block-explorer.md).
2. From the block explorer, follow the [Retrieval from Blockchain procedure](../dev/reference/contracts.md#retrieval-from-blockchain) to find and open the `WNat` contract.
3. Click **Connect Wallet**, and complete the steps to connect your wallet, ensuring you are on the network on which you will wrap tokens.
4. Click the **Write Contract** tab, and use the following methods to wrap and unwrap tokens:

    * `deposit`: Wraps the amount of native tokens you specify in the field.
    * `withdraw`: Unwraps the amount of native tokens you specify in the field.

  Your token balance is updated and displayed in your wallet.
