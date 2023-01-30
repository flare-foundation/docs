# Validator Nodes

Validator nodes are **online servers** running a blockchain's client software. They all keep a copy of the [ledger](glossary.md#ledger) and are constantly talking to each other to make sure the copies are **consistent** as new data is added.

<figure markdown>
  ![Validator node network](validator-network.png){ loading=lazy .allow-zoom width=500px }
  <figcaption>A network of validator nodes, each one with an identical copy of the ledger.</figcaption>
</figure>

The fact that the ledger is not under control of a single entity but **distributed among a network of independent validators** is what makes blockchains:

- Require less trust than traditional options.
- Censorship resistant.
- [Byzantine fault tolerant](glossary.md#byzantine_fault_tolerance).

Validators agree on the state of the ledger using a [consensus algorithm](glossary.md#consensus) that varies for each blockchain. While the implementation of the groundbreaking [FCP protocol](glossary.md#fcp) is being completed, Flare is currently using a variant of [Avalanche](glossary.md#avalanche)'s **Snowman++** algorithm.

In Avalanche's Snowman++, each round a validator is **randomly selected** to act as the **leader** and propose new blocks to be added to the ledger, which are then validated by the rest of nodes. To provide [Sybil resistance](glossary.md#sybil_resistance), the probability of a node's being elected the leader is **proportional to the node's stake**, so this is effectively a [Proof-of-Stake](glossary.md#proof_of_stake) consensus. The **shortcomings** of Proof-of-stake are well known and include risk of centralization and the [rich-get-richer effect](https://en.wikipedia.org/wiki/Matthew_effect), for example.

To compensate for this, Flare's version of Snowman++ reduces the importance of a node's stake and introduces a **meritocratic factor**: All Flare validators are also [FTSO Data Providers](glossary.md#data_provider), so their performance in this role has an impact on their chance to become round leaders.

More precisely, the probability $P$ of being the leader depends both on a node's stake ($VotePower$) and on its performance as a Data Provider (evaluated through its $RewardRate$) like this:

\[
P = \log (VotePower) * RewardRate
\]

And then normalized so the probabilities for all nodes add up to $1.0$.

As it can be seen:

- The logarithm (which might be replaced by a square root or similar compressing function) reduces the importance of large stakes.
- Multiplying by the $RewardRate$ benefits the nodes that consistently provide good FTSO data.

Both the $VotePower$ and the $RewardRate$ are evaluated once a week based on the previous week's results.

The plots below show the equalizing effect of this formula on actual data taken from [flaremetrics.io](https://flaremetrics.io/) in 2022 (some provider names might have changed):

<figure markdown>
  ![Validator vote power](validator-vote-power.png){ loading=lazy .allow-zoom .side-by-side }![Validator log vote power](validator-log-vote-power.png){ loading=lazy .allow-zoom .side-by-side }
  <figcaption>Left: Probabilities based solely on stake.<br/>Right: Probablities based on diminished stake and FTSO performance.</figcaption>
</figure>

As it is readily apparent, the distribution to the right is far more egalitarian, while still rewarding high stakes and FTSO performance.