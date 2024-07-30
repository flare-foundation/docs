---
search:
  boost: 2
---

# FTSO Fast Updates

FTSO Fast Updates is one of the two [FTSO sub-protocols](./index.md).
In every block, data providers are randomly selected from an open set to provide small, cumulative updates to each data feed's value.

This operation differs from the other FTSO sub-protocol, [FTSO Scaling](./ftso-scaling.md), in which all data providers contribute to the data feed's value but updates only every 90 seconds.

!!! note

    FTSO Fast Updates is part of the second iteration of the FTSO protocol.
    For information about previous implementations, please visit [the archive](../archive/ftso-v1.md).

## Process

The FTSO Fast Updates protocol is integrated with the [Flare Systems Protocol](../flare-systems-protocol.md) but does not make use of all its features.
In particular, data providers do not vote on the correctness of data feed values, so the protocol does not require voting rounds as the FTSO Scaling protocol does.
Voting epochs are only used for rewarding.

Conversely, data providers submit their values in each block, directly to a smart contract, as described next.

### Sortition Process

Using a [verifiable random function](https://en.wikipedia.org/wiki/Verifiable_random_function), data providers independently decide whether they should submit a new update in each block.

<figure markdown>
  ![FTSO Fast Updates workflow](ftso-fu-workflow.png){ loading=lazy .allow-zoom }
  <figcaption>FTSO Fast Updates workflow.</figcaption>
</figure>

The chance of being selected is proportional to a data provider's weight, which is the sum of its own stake and the [delegations](./ftso-scaling.md#delegation) made to it.
Since selection is random, some blocks might receive more or less than one update, but on average, each block receives only one.

Furthermore, to allow for more processing time, data providers are allowed to submit their updates up to 10 blocks later than the block in which they were selected.
This allowance for more processing time might introduce some inaccuracy in the instantaneous values of the data feeds, which are then corrected by subsequent updates.

Since there is no consensus on the submitted updates, a malicious data provider can try to steer the feeds away from the actual values.
However, the magnitude of each update is limited, and such Byzantine submissions are corrected by subsequent updates from well-behaved data providers.

### Update Packing

The amount of space available on a block is limited.
Therefore, in order to support a large number of data feeds, the size of each feed's updates must be necessarily small.

FTSO Fast Updates uses 2 bits for each update, resulting in 3 possible values (plus an unused one):

* `+`: The current value of the data feed is increased by a small amount "delta" (δ).
* `-`: The current value of the data feed is decreased by a small amount "delta" (δ).
* `0`: The current value of the data feed remains unaffected.

After extensive tests, the value of delta has been set to 0.0122% of each feed's current value, or ${1}/{2^{13}}$ %.

Using this scheme, the updates for 1000 data feeds only require 250 bytes.
After adding the rest of the required signaling this amounts to less than 0.6% of Flare's gas limit per block.

The following figure shows how the two FTSO sub-protocols compare when following a data feed:

<figure markdown>
  ![FTSO Fast Updates value tracking comparison](ftso-fu-values.png){ loading=lazy .allow-zoom }
  <figcaption>FTSO Fast Updates value tracking comparison.</figcaption>
</figure>

FTSO Scaling (in blue) follows exactly the actual value (in green), but only updates every voting epoch (90s).
On the other hand, FTSO Fast Updates (in pink) is able to follow closer to the actual value thanks to the much higher update rate.

However, since values can only be changed by a fixed amount (delta) every block, FTSO Fast Updates cannot follow quick changes of the tracked value, as shown at the right of the above plot.
The next section shows a solution to this issue.

The plot also includes the data provider that submitted each update, showing that they are random and proportional to their weights.
In this case, provider A's weight is double that of providers B and C, so its updates appear twice as frequently.

### Volatility Incentives

During times of high volatility, which result in rapid price fluctuations, the limited range of the updates cannot follow the tracked value, as shown above.
To deal with this issue, FTSO Fast Updates defines the volatility incentives, which can be provided by any user of the system.

These incentives allow more data providers to submit their updates, resulting in more updates per block.
In turn, this causes the data feed to react more quickly and be able to better adapt to fluctuations:

<figure markdown>
  ![FTSO Fast Updates incentivization](ftso-fu-values-incentivized.png){ loading=lazy .allow-zoom }
  <figcaption>FTSO Fast Updates incentivization.</figcaption>
</figure>

Additionally, incentivized updates use an increased value for delta, not shown in the above diagram.

Volatility incentives are shared among all data providers that submitted updates, proportionally to the amount of submissions they made during the reward epoch.

### Rewarding

Data providers that participated in a 90-second voting epoch are only rewarded if the value of the FTSO Fast Updates at the end of the voting epoch is close enough to the value of the FTSO Scaling, currently meaning within 0.5% of its value.

This mechanism indirectly ensures that the Fast Updates data feeds do not deviate from the tracked values.
