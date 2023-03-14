# Enkrypt Wallet

[Enkrypt](https://www.enkrypt.com/?mtm_campaign=Flare%20Wiki%20-%20Getting%20started%20with%20Enkrypt) is a **multichain**, **open-source** and **noncustodial** wallet that tracks no data.
It interacts with Polkadot, Ethereum, Bitcoin and more, all directly in the browser.

## Getting Started

1. Install [Enkrypt](https://www.enkrypt.com/?mtm_campaign=Flare%20Wiki%20-%20Getting%20started%20with%20Enkrypt).
2. Create a new wallet or import an existing wallet to Enkrypt.
3. Securely back up your recovery phrase offline.
4. Protect your Enkrypt wallet with a password.

## Adding Flare Tokens

After you set up your wallet, connect to Flare's networks, which will add each network's native token and wrapped token to your listed assets:

1. [Add Flare or Songbird as a custom network](https://help.myetherwallet.com/en/articles/6434713-enkrypt-connecting-to-networks-and-dapps) using these parameters:

    === "Flare"

         1. From the main menu, click **Manage networks**. The **Manage networks** window is displayed.
         2. Click the sliders icon beside the **Search networks** field.
         3. Click **Custom network**.
            The **Custom network** window is displayed.
         4. Specify the following values:

            | Network Setting         | Value                                       |
            | ----------------------- | ------------------------------------------- |
            | **Network Name**        | Flare                                       |
            | **New RPC URL**         | <https://flare-api.flare.network/ext/C/rpc> |
            | **Chain ID**            | 14                                          |
            | **Currency Symbol**     | FLR                                         |
            | **Block Explorer URL**  | <https://flare-explorer.flare.network>      |

         5. Click **Add network**.
         6. Locate Flare Mainnet at the bottom of the list, and toggle the switch to enable your wallet to display your balance of `$FLR`.
         7. Follow [these instructions for manually adding tokens](../wrapping-tokens.md#manually) to retrieve the `WNat` contract address, and copy it.

            !!! Important
                The WNat contract address is different on each network. Ensure you copy the `WNat` contract address on the Flare network.

         8. With Flare Mainnet selected on the main menu in your Enkrypt wallet, click **Add custom token**.
            The **Add a token** window is displayed.
         9.  In the **Contract address** field, paste the `WNat` contract address that you copied in step 6.
         10. Click **Add token**.
             The wrapped token `$WFLR` is added to your list of Flare assets.

    === "Songbird"

         1. From the main menu, click **Manage networks**.
             The **Manage networks** window is displayed.
         2. Click the sliders icon beside the **Search networks** field.
         3. Click **Custom network**. The **Custom network** window is displayed.
         4. Specify the following values:

            | Network Setting        | Value                                          |
            | ---------------------- | ---------------------------------------------- |
            | **Network Name**       | Songbird                                       |
            | **New RPC URL**        | <https://songbird-api.flare.network/ext/C/rpc> |
            | **Chain ID**           | 19                                             |
            | **Currency Symbol**    | SGB                                            |
            | **Block Explorer URL** | <https://songbird-explorer.flare.network>      |

         5. Click **Add network**.
         6. Locate Songbird Canary-Network at the bottom of the list, and toggle the switch to enable your wallet to display your balance of `$SGB`.
         7. Follow [these instructions for manually adding tokens](../wrapping-tokens.md#manually) to retrieve the `WNat` contract address, and copy it.

            !!! Important
                The WNat contract address is different on each network. Ensure you copy the `WNat` contract address on the Songbird network.

         8. With Songbird Canary-Network selected on the main menu in your Enkrypt wallet, click **Add custom token**.
             The **Add a token** window is displayed.
         9. In the **Contract address** field, paste the `WNat` contract address that you copied in step 6.
         10. Click **Add token**.
             The wrapped token `$WSGB` is added to your list of Songbird assets.

## Wrap and Delegate

Once connected to the Flare or Songbird network, enter the address of the website or dapp you wish to use to wrap and delegate in any web3 browser.
A few of the [FTSO](glossary.md#ftso) data providers have developed dapps integrated with their websites that allow users to wrap, delegate and claim `$FLR` and `$SGB` rewards.
Delegating using this method is not exclusive to one specific provider, as these dapps allow you to choose from a number of different providers.
Take a look at [flaremetrics.io](https://flaremetrics.io/ftso) and pick the one you prefer.
