# Personal Delegation Accounts

You can receive `$WFLR` rewards for making contributions to the Flare community, for example, by [delegating](../tech/ftso/index.md#delegation) your tokens to FTSO data providers.

A Personal Delegation Account (PDA) allows you to keep these rewards temporarily separate from your main account, so that you can track them, for example, as a personal record or for tax purposes.
In certain jurisdictions, delaying the realization of earnings for a specified time can lead to a reduced tax rate.
See [the Concept page](../tech/personal-delegation-account.md) for more detail.

Particularly, the balance of a PDA can still be redelegated to earn compounded interest and the governance votes it grants can be transferred to another address.

If a PDA is enabled and you configured an [executor](../tech/automatic-claiming.md), it automatically claims rewards for the main account and the PDA, and sends them to the PDA.

## Enabling a PDA

You can enable and disable your PDA at any time in the [Flare Portal](https://portal.flare.network/) without any ill-effect, except the cost of the transaction fee.

1. Open the [Flare Portal](https://portal.flare.network/).
2. Click **Connect to Wallet** and log into your wallet.
   The interface to your **Main Account** opens.
    <figure markdown>
    ![Main Account Opens](pda-main-account-opens.png){ loading=lazy .allow-zoom }
    <figcaption>Main Account opens.</figcaption>
    </figure>

--8<--
    ./include/wallet-warning.md
--8<--

3. To switch from the **Main Account** to your PDA, click **Delegation Account**.
4. Click **Enable**.
    <figure markdown>
    ![Enable a PDA](pda-user-delegation-account.png){ loading=lazy .allow-zoom }
    <figcaption>Enable a PDA.</figcaption>
    </figure>
5. A popup appears with a short description of what a PDA is.
    <figure markdown>
    ![Confirm enabling the PDA](pda-faqs-enable.png){ loading=lazy .allow-zoom width=400px }
    <figcaption>Confirm enabling the PDA.</figcaption>
    </figure>
6. Click **Enable**.
   Your wallet shows the details of the transaction.
7. Review the transaction and confirm it.

Once the PDA is enabled, the Flare Portal displays the PDA address and the initial `0.0` `$WFLR` balance.
Your PDA is now ready to receive rewards!
<figure markdown>
![PDA Enabled](pda-enabled.png){ loading=lazy .allow-zoom }
<figcaption>The PDA address is enabled.</figcaption>
</figure>

If a PDA is enabled and you configured an [executor](../tech/automatic-claiming.md), it automatically claims rewards for the main account and the PDA, and sends them to the PDA.

## Operations available in a PDA

Other operations available are:

| Operation     | Description            |
| ------------- | ---------------------- |
| **Disable**   | You can **Disable** the PDA at any time. Disabling sends all `$WFLR` back to the main account to your `$WFLR` balance. Automatic claims from executors will go to the main account as well. |
| **Withdraw**  | You can withdraw from your PDA at any time. Click **Withdraw**, enter the amount of `$WFLR` to withdraw, and click **Withdraw** again. The amount is sent to your main account to your `$WFLR` balance. |
| **Delegate**  | You can [delegate](../tech/personal-delegation-account.md) your rewards to FTSO data providers for compounded rewards. |
| **Transfer votes**  | A PDA cannot vote on governance proposals directly, but it can [transfer its votes](../tech/governance.md#vote-transfer) to another address, including its main account. Click **Transfer votes**, click **main account** or enter an address to transfer to, and click **Confirm**. |
| **Claim FLR** | The **Claim FLR** button shows how many rewards you have to claim. Use this button to claim rewards yourself, or configure an [executor](../tech/automatic-claiming.md) from the main account tab to do that for you. |
