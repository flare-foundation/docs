# Claiming the Flaredrop

Claiming the Flaredrop is available every 30 days and is based on the average balance from the last 23 days of each 30-day month.
Therefore, it is advised that each address claim its funds during the first 7 days of each 30-day round.

See [The Flaredrop concept page](../tech/the-flaredrop.md) for further explanation.

<figure markdown>
![Flaredrop Distribution Dates](flaredrop-distribution-dates.png){ loading=lazy .allow-zoom  width=500px }
<figcaption>Flaredrop distribution dates.</figcaption>
</figure>

There are several ways to claim.
You can claim:

* Using the [Flare Portal](https://portal.flare.network/).
* Through an [executor](../tech/automatic-claiming.md), which you can configure using the Portal, or
* [Directly against a smart contract](../dev/the-flaredrop.md) (for advanced users).

!!! warning "Two steps to ensure receiving all your `$FLR` !"

    You must:

    1. **Wrap `$FLR` to receive it.**
    Rewards are proportional to the `$WFLR` balance, not `$FLR`, so always wrap as much `$FLR` as you can!
    Wrapping has no downside: Wrapped tokens continue to be available for [delegation](../tech/ftso.md#delegation) and [governance voting](../tech/governance.md), for example, and they can be unwrapped at any time.
    See [Wrapping Flare Tokens](../user/wrapping-tokens.md).
    2. **Claim before the distribution expires.**
    After the distribution becomes claimable, it expires in two bank months and a week (67 days).

## Claiming from the Flare Portal

Claim manually from the Flare Portal.
From there, you can see how many `$FLR` tokens you have to claim and you can claim them.

1. Go to the [Flare Portal](https://portal.flare.network/).
2. Click **Connect to Wallet** and log into your wallet.
3. Your **Main Account** is open by default.
   If you enabled a [PDA](../tech/personal-delegation-account.md) and want to claim for it instead, click **Delegation Account**.
4. Under **Claim your FlareDrop distribution**, any `$FLR` you have to claim displays on the button.
    <figure markdown>
    ![Claim Your FlareDrop Distribution](flaredrop-claim-distribution.png){ loading=lazy .allow-zoom  width=500px }
    <figcaption>Claim Your FlareDrop Distribution.</figcaption>
    </figure>
5. Click the **Claim** button to claim your `$FLR`.
    A confirmation dialog opens.
    <figure markdown>
    ![FlareDrop claiming confirmation](flaredrop-claim-confirmation.png){ loading=lazy .allow-zoom }
    <figcaption>FlareDrop claiming confirmation.</figcaption>
    </figure>
    As a convenience, you have the choice to wrap your tokens after claiming them.
    In this way they are ready for the next Flaredrop or to be [delegated to the FTSO system](../tech/ftso.md#delegation), for example.
6. Click on the **Claim All Distribution** button and confirm the transaction on your wallet.

## Nominating Executors

Alternatively, you can assign an [executor](../tech/automatic-claiming.md) to claim the Flaredrop for you.
This is useful for cold wallets but also for any users wishing to reduce their operational burden.
See [Automatic Claiming](./automatic-claiming.md) to learn how.
