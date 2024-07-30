---
search:
  boost: 2
---

# FTSO

The Flare Time Series Oracle (FTSO) is a protocol running on the Flare network that provides continuous estimations for different types of data.
It does so in a decentralized manner (no single party is in control of the process) and securely (it takes a lot of effort to disrupt the process).

To achieve a secure, decentralized system, a set of independent data providers retrieves data from external sources, like centralized and decentralized exchanges, and supplies it to the FTSO smart contracts.
This information is then filtered to produce an agreed-upon final estimate and published on-chain.

The following diagram shows how data feeds are submitted to and filtered by the FTSO system.

<figure markdown>
  ![FTSO summary](ftso-summary.png){ loading=lazy .allow-zoom }
  <figcaption>FTSO summary.</figcaption>
</figure>

Data providers that supply useful information, such as price pairs that are not removed as outliers, are rewarded from inflation.

The FTSO system comprises two sub-protocols, both making use of the [Flare Systems Protocol](../flare-systems-protocol.md), offering different tradeoffs between decentralization and speed:

* [FTSO Scaling](./ftso-scaling.md)

    Every published data feed is agreed upon by a majority of data providers, making the feeds highly reliable but necessarily slow to update.

* [FTSO Fast Updates](./ftso-fast-updates.md)

    Randomly-selected data providers submit small, incremental updates to the data feeds in every block, resulting in a much faster refresh rate at a slight cost in decentralization.

Applications are free to use either protocol, or both, depending on their needs.

!!! note

    This is the second iteration of the FTSO protocol.
    For information about previous implementations, please visit [the archive](../archive/ftso-v1.md).
