# The Flaredrop

The Flaredrop, previously called the _Delegation Incentive Pool_ in the [FIP.01](https://flare.network/fip01/), is a distribution method for the 24.25B remaining `$FLR` tokens after the [original airdrop](./flare-launch-process.md#definitions).
It will last for 36 months and is destined for any holder of wrapped `$FLR` (`$WFLR`) that participates in the network as per the FIP.01.

If you enabled your [PDA](./personal-delegation-account.md) and it contains `$WFLR`, it is also eligible to receive the Flaredrop distribution.
Make sure to check both your **Main Account** and your **Delegation Account** for Flaredrop to claim.

## How Is the Flaredrop Distributed?

The Flaredrop is distributed monthly over 36 30-day bank months to those that wrap their `$FLR` tokens.
Each of the first 35 monthly allocations constitute 2.37% of the total Flaredrop, and the last one 2.05%.

The total amount of `$WFLR` is calculated each month, and the monthly allocation is distributed among all `$WFLR` holders proportionally to the sampled average of their `$WFLR` balance.
Users then receive an amount equal to their month's sampled `$WFLR` holdings divided by the month's total `$WFLR`, multiplied by the monthly allocation.

!!! note "Calculating an address's sampled average balance"

    As each bank month passes, the Flaredrop receives a trigger to choose 3 random blocks in the previous 23 days.
    The Flaredrop smart contract then finds the average of the total `$WFLR` reported in those blocks and determines each address's percentage of the Flaredrop.
    <figure markdown>
    ![3 Week Average `$WFLR`](flaredrop-average-of-3-weeks.png){ loading=lazy .allow-zoom }
    <figcaption>3-week average of wrapped `$FLR`.</figcaption>
    </figure>

Upon claiming, the entitlement is sent directly to the account you claimed from.
It is sent as `$FLR` to your **Main Account** and as `$WFLR` to your **[Personal Delegation Account (PDA)](./personal-delegation-account.md)**.
Each distribution expires two bank months and a week (67 days) after it becomes claimable and expired tokens are burned.

To ensure having no effect on the amount of `$FLR` that each claiming address receives, Flare Foundation and team addresses opt out of the Flaredrop distribution.

!!! warning "Two steps to ensure receiving all your `$FLR` !"

    You must:

    1. **Wrap `$FLR` to receive it.**
    Rewards are proportional to the `$WFLR` balance, not `$FLR`, so always wrap as much `$FLR` as you can!
    Wrapping has no downside: Wrapped tokens continue to be available for [delegation](./ftso.md#delegation) and [governance voting](./governance.md), for example, and they can be unwrapped at any time.
    2. **Claim before the distribution expires.**
    After the distribution becomes claimable, it expires in two bank months and a week (67 days).

You can also enable [automatic claiming](./automatic-claiming.md) to make sure you don't miss any Flaredrop! Autoclaiming will claim for both your main account and your PDA if you enabled it.

## Related User Guides

* [Claiming the Flaredrop](../user/claiming-the-flaredrop.md)
* [Wrapping tokens](../user/wrapping-tokens.md)

## Related Developer Docs

* [The Flaredrop](../dev/the-flaredrop.md)
