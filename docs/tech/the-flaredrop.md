# The Flaredrop

The Flaredrop, previously called the _Delegation Incentive Pool_ in the [FIP.01](https://flare.network/fip01/), is a distribution method for the 24.25B remaining `$FLR` tokens after the [original airdrop](./flare-launch-process.md#definitions).
It is destined for any holder of wrapped `$FLR` (`$WFLR`) that participates in the network over 36 months as per the FIP.01.

## How Is the Flaredrop Distributed?

The Flaredrop is distributed monthly over 36 30-day bank months to those that wrap their `$FLR` tokens.
Each of the first 35 monthly allocations constitute 2.37% of the total Flaredrop, and the last one 2.05%.

The total amount of `$WFLR` is calculated each month, and the monthly allocation is distributed among all `$WFLR` holders proportionally to how much `$WFLR` they hold that month.
Users receive an amount equal to their month's `$WFLR` holdings divided by the month's total `$WFLR`, multiplied by the monthly allocation.

!!! note "Calculating an address's average monthly balance"

    As each bank month passes, the Flaredrop receives a trigger to choose 3 random blocks in the previous 23 days.
    The Flaredrop smart contract then finds the average of the total `$WFLR` reported in those blocks and determines each address's percentage of the Flaredrop.
    <figure markdown>
    ![3 Week Average `$WFLR`](flaredrop-average-of-3-weeks.png){ loading=lazy .allow-zoom }
    <figcaption>3-week average of wrapped `$FLR`.</figcaption>
    </figure>

The Flaredrop is distributed to all `$WFLR` holders proportionally to their average balance for that month.

Upon claiming, the `$FLR` entitlement is sent directly to the claiming address or to its [Personal Delegation Account (PDA)](./personal-delegation-account.md), if it is enabled.
When claiming to the PDA, tokens are automatically wrapped into `$WFLR`.

To ensure having no effect on the amount of `$FLR` that each claiming address receives, Flare Foundation and team addresses opt out of the Flaredrop distribution.

!!! warning "You must wrap `$FLR` to receive it"

    Remember that rewards are proportional to the `$WFLR` balance, not `$FLR`, so always wrap as much `$FLR` as you can!
    Wrapping has no downside: Wrapped tokens continue to be available for [delegation](./ftso.md#delegation) and [governance voting](./governance.md), for example, and they can be unwrapped at any time.

You can also enable [automatic claiming](./automatic-claiming.md) to make sure you don't miss any Flaredrop!
