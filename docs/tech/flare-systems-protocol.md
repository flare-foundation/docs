# Flare Systems Protocol

The Flare Systems Protocol (FSP) is the core protocol that provides basic functionality to support current and future Flare protocols.

By taking care of tasks common to the rest of Flare protocols, the FSP greatly simplifies them and the dapps that interact with them.

Interaction with the FSP depends on your role:

* As a Flare user, common activities such as governance voting, delegating, and staking do not require direct access to the FSP.
* As an infrastructure provider, access is required because you participate in decentralized data acquisition and validation for all Flare protocols. An update to infrastructure provider procedures is in progress.
* As a developer, writing dapps requires access to the FSP, which simplifies development by using a similar approach for all Flare protocols. A more detailed introduction for developers is in progress.

The FSP manages the results of infrastructure providers' votes and rewards in a way that brings scalability to Flare protocols.
With the FSP, only a representation of the data validation results (called a [Merkle Root](glossary.md#merkle_root) hash) is stored on-chain, so it is more lightweight and scalable than, for example, storing all prices for the FTSO.
Because only the hashes are stored on-chain, applications retrieve the actual data directly from infrastructure providers and then verify it using the on-chain hash.

## Flare System Protocol Components

The FSP coordinates several components, including smart contracts, indexers for easier access to the [C- and P-chain](./flare.md#flare-chains) states, the Flare Systems Client running on all infrastructure providers, and the data protocols that they support.

<figure markdown>
  ![Flare Systems Protocol Architecture](flare-systems-protocol-architecture.png){ loading=lazy .allow-zoom }
  <figcaption>Flare Systems Protocol architecture.</figcaption>
</figure>

## Data Protocols

These protocols receive data from other blockchains and internet APIs:

* The [Flare Time-Series Oracle (FTSO)](./ftso/index.md).
* The [Data Connector](./state-connector.md) (formerly the State Connector).

The FSP has also been designed to accommodate future data protocols, such as Fast FTSO and Stake mirroring.

## Flare Systems Client

Each infrastructure provider runs an instance of the Flare Systems Client, which aggregates their votes for all Flare protocols and submits them to the Flare network in a single transaction.
The option to relay them to other EVM chains is being developed.

The Flare systems client provides these functions:

* Signing: Signs transactions on behalf of data protocols before submitting them to the blockchain.
* Scheduling: Schedules all transactions from off-chain services.
* Validation: Submits infrastructure providers' votes each voting round.
* Finalization: Sends finalization transactions on behalf of infrastructure providers when enough signatures (votes) have been collected and therefore the voting round ends.
* Rewarding: Aggregates reward calculation results for the final rewards result for each reward epoch (currently under development).
