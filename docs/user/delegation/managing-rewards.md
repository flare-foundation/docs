# Managing Rewards Using the Flare Portal

[Rewards](../../tech/ftso/index.md#rewards) are accrued from your delegations to FTSO data providers whose submitted data is close to the calculated median value in a price epoch.

Use this information to claim FTSO delegation rewards by using the Flare Portal. Alternatively, if you have used block explorers for other networks and are competent interacting with smart contracts without a user interface, you can use the block explorer, which provides more options but can be more complex. Using it is intended for advanced users.

1. Open the [Flare Portal](https://portal.flare.network). The home page is displayed.

    <figure markdown>
    ![Flare Portal Home](delegation-portal-connect.png){ loading=lazy .allow-zoom width=500px }
    <figcaption>Flare Portal home.</figcaption>
    </figure>

2. Click **Connect to Wallet** and log into your wallet. The interface to your **Main Account** opens.

--8<--
    ./include/wallet-warning.md
--8<--

3. Ensure you are connected to the network you want. In the following image, the wallet is connected to the Flare network.

    <figure markdown>
    ![Flare Portal Main Account](delegation-portal-main.png){ loading=lazy .allow-zoom width=500px }
    <figcaption>**Main Account** on the Flare network.</figcaption>
    </figure>

4. On the **Main Account** tab, locate the **Claim your delegation rewards** section to determine whether you have claimable rewards and whether those rewards can currently be claimed:

    * If you have rewards to claim and the reward manager contains enough tokens, the **Claim** button is enabled and shows the amount of rewards you can claim. Go to Step 5.
    * If you have rewards to claim, but the reward manager currently does not contain enough tokens, the **Claim** button shows the amount of rewards you can claim but is disabled.

        For security reasons, a **limited amount of tokens** is stored at a given time in the reward manager contract.
        Sometimes, all delegators claim their rewards in a short period of time immediately after the reward epoch ends, and the token storage is depleted.
        The storage is replenished periodically.
        If you are currently unable to claim your rewards because the storage is empty, **try again the next day**.

    * If you don't have claimable rewards, the **Claim** button shows **0** and is disabled.

    The following image shows an account with claimable rewards:

    <figure markdown>
    ![Account with claimable rewards](delegation-portal-main.png){ loading=lazy .allow-zoom width=500px }
    <figcaption>An account with claimable rewards.</figcaption>
    </figure>

5. Click the **Claim** button. The **Claim your delegation rewards** window is displayed.

    <figure markdown>
    ![Claim your delegation rewards](rewards-portal-claim.png){ loading=lazy .allow-zoom width=500px }
    <figcaption>Claim your delegation rewards.</figcaption>
    </figure>

6. **Optional**: If you have enabled your [personal delegation account](../../tech/personal-delegation-account.md), the option to send your rewards to the PDA is preselected by default.
    To send your rewards to the address that you connected to the Portal instead, deselect the option.
7. Click **Claim All Rewards** to claim all available rewards for the listed epochs.

8. Follow the steps to confirm the transaction in your wallet.

Your rewards are claimed, and your updated balance of native tokens is displayed.
