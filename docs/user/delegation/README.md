# Delegation overview

Any user holding Flare tokens, whether `$FLR` on Flare or `$SGB` on Songbird, can delegate its vote power to price providers in the [Flare FTSO system](glossary.md#ftso).

Price providers submit price signals to the Flare Time Series Oracle system (FTSO).
Inflation is distributed to anyone participating in the FTSO, which includes price providers and any user delegating its vote power to the price providers.
By participating, any token holder can earn a part of the distributed inflation.
Each user can delegate its vote power without a locking scheme.
This means users can earn rewards for their tokens without locking them, so they can still be used for other purposes.

To delegate vote power tokens need to be wrapped into Wrapped Flare (`$WFLR`) or Wrapped Songbird (`$WSGB`).
Once this is done, the user will have the vote power that is equivalent to its wrapped token balance.
Then the user can delegate this vote power to one or two price providers.
As long as this delegation is active the user will earn rewards which are aligned with its vote power and the performance of the chosen price provider/s.
Those rewards accumulate in the reward manager and will become claimable for each reward epoch that is finalized.
