---
search:
  boost: 2
---

# Flare Data Connector

## Introduction

The **Flare Data Connector (FDC)** is a smart contract running on the Flare network that allows anyone to query **non-changing, verifiable information** (such as blockchain or geographic data) from **outside the Flare network**.
Data that changes, such as the latest BTC to USD conversion rate, and non-verifiable data, such as data behind a paywall, are not available through the Data Connector.

The Data Connector accesses data in a **decentralized manner** (no single party is in control of the process) and **securely** (it takes a lot of effort to disrupt the process).
This is accomplished by using a set of **independent attestation providers** which fetch the required information from the world and deliver it to the Flare network.
The Data Connector smart contract then checks if there is **enough consensus** among the received answers and **publishes the results** if so.

As an added security measure, individual validators can also define **local attestation providers** which, when in disagreement with the rest, cause the validator to **branch** into an idle, safe state while the situation is resolved.

<figure markdown>
  ![The Data Connector](SC-intro.png){ loading=lazy .allow-zoom width=500px }
  <figcaption>The Data Connector.</figcaption>
</figure>

The Data Connector can, for instance, **check whether a deposit has been made on another blockchain**, opening the door to more advanced mechanisms like FAssets or bridges.

This page gives technical details about the whole procedure, the different security and scalability measures that have been taken into account in its design and the kind of queries that can be performed.

## Procedure Overview

This is how user queries are processed. The following sections contain more details.

<figure markdown>
  ![Data Connector procedure.](SC-architecture.png){ loading=lazy .allow-zoom }
  <figcaption>Data Connector procedure overview.</figcaption>
</figure>

### 1. Request

Anybody, be it a smart contract running on Flare or an application, can **request the attestation of a specific event** from the Data Connector.

Requests are **yes/no questions** regarding things that happened outside the Flare network, for example, "Has transaction 0xABC been confirmed on the Bitcoin network enough times?".
The answers, though, might contain any kind of additional data attached, like the content of transaction 0xABC, for example.

Requests must adhere to one of the [**available request types**](#attestation-types), which have been designed to be **strictly decidable**, i.e., the answers are objective and cannot be argued.
Otherwise, queries like "What is the weather like in Paris?" would have a hard time reaching consensus among the different attestation providers.
Section [Adding New Attestation Types](#adding-new-attestation-types) below contains more details.

### 2. Request forwarding

The Data Connector simply **forwards the request** to all connected attestation providers through an [EVM](glossary.md#evm) event.
Therefore, the request is **not** stored on the blockchain and **its gas cost is very low** for the requester.

### 3. Data retrieval

Attestation providers **fetch the requested data** by means that depend on the type of attestation, for example, retrieving data from another blockchain or public API.

Keep in mind that attestation providers are **not controlled by Flare** in any way.
Anybody can listen to the request events and provide answers using any combination of hardware, software, and code they see fit.

### 4. Attestation

To prevent attestation providers from peeking at each other's answers, these are submitted in a "Commit and Reveal" fashion called [the CCCR protocol](#overlapped-cccr-protocol) and detailed below.

??? example "Submitting an attestation (For attestation provider developers)"

    Attestation providers use the `submitAttestation` method (#3) of the [Data Connector contract](https://gitlab.com/flarenetwork/flare-smart-contracts/-/blob/master/contracts/genesis/implementation/StateConnector.sol#L92):

    ```solidity
    function submitAttestation(
        uint256 _bufferNumber,
        bytes32 _commitHash,
        bytes32 _merkleRoot,
        bytes32 _randomNumber
    ) external returns (
        bool _isInitialBufferSlot
    );
    ```

    Keep reading to understand the meaning of the parameters.
    More information in the [Attestation Client repository](https://github.com/flare-foundation/attestation-client/blob/main/docs/attestation-protocol/state-connector-contract.md#providing-attestations).

### 5. Consensus

If **at least 50%** of the attestation providers submitted the same answer, it is made public.
Otherwise, **no consensus is achieved**: requests remain **unanswered** and must be issued again.

**The answers are stored in the Data Connector smart contract for a week**, where anybody can read them, including the original requester.

## Attestation Protocols

For simplicity, the above description omitted **two very important mechanisms**, reviewed here.

The main one is **Attestation packing**, which decouples the number of requests from the number of answers, effectively providing unbounded scalability.
It requires requests to be first **collected** and then **answered all at once**, so a protocol called **CCCR** is used.

### Overlapped CCCR Protocol

Requests and answers are submitted sequentially in **attestation rounds**.
Each attestation round has 4 consecutive phases, called Collect, Choose, Commit and Reveal.

Phases happen in 90-second windows, and the Choose and Commit phases share the same window, so a whole attestation round takes 4.5 minutes.

<figure markdown>
  ![Collect-Choose-Commit-Reveal protocol](SC-CCCR.png){ loading=lazy .allow-zoom }
  <figcaption>The Collect-Choose-Commit-Reveal (CCCR) protocol.</figcaption>
</figure>

* **Collect phase**: Users send their requests to the Data Connector contract which forwards them to every attestation provider.
* **Choose phase**: Attestation Providers vote on which requests they will be able to answer in the current round.
* **Commit phase**: Attestation providers send **obfuscated** answers to the Data Connector, so they cannot cheat by peeking at each other's submissions.
* **Reveal phase**: Attestation providers send the **deobfuscation key** so their previous answers are revealed.
  When all data is available, answers are made public if there is enough consensus.

The CCCR protocol is akin to making submissions in a closed envelope which is not opened until all submissions are received.

Results are available at the end of the Reveal phase, so the answer to a particular request can take anywhere **from 3 to 4.5 minutes**, depending on the time in which the request was made inside the Collect phase.

Furthermore, the phases of the CCCR protocol are actually **overlapped**, so while requests are being **collected** for round $(n+2)$, answers are being simultaneously **committed** for the previous round $(n+1)$, and **revealed** for the round prior to that $(n)$.

<figure markdown>
  ![Overlapped CCCR protocol](SC-CCCR-overlapped.png){ loading=lazy .allow-zoom }
  <figcaption>The CCCR protocol with overlapped phases.</figcaption>
</figure>

This means that new requests can be made without waiting for the previous ones to be completed.

### Attestation Packing

Each round, attestation providers build a [Merkle tree](https://en.wikipedia.org/wiki/Merkle_tree) with the hashes of **all valid answers** to the requests that were agreed upon during [the "Choose" phase](https://github.com/flare-foundation/attestation-client/blob/main/docs/attestation-protocol/bit-voting.md).
The obtained **Merkle root** is then called the **Attestation Proof**, since it is proof of the presence of each individual answer.
Finally, the attestation proof is submitted to the Data Connector for consensus evaluation.

<figure markdown>
  ![Attestation Proof packing using a Merkle tree](SC-attestation-provider.png){ loading=lazy .allow-zoom }
  <figcaption>Attestation Proof packing using a Merkle tree.</figcaption>
</figure>

This allows **any number of requests to be answered with a single hash**, greatly improving **scalability**.
Furthermore, the gas cost for attestation providers is **constant** each round, no matter how many requests they are answering.

A request is only **valid** (and therefore added to the proof) if it is well-formed and it **matches reality**.
Different providers might have different views on what reality is, and this is why the Data Connector runs a consensus algorithm on the received answers.

Additionally, the allowed request types are **carefully designed to minimize the probability of contention**.
For example, requiring some time for **transactions to settle** before inquiring about them, and forcing requests to include the hash of a later block that confirms the transaction.

Attestation providers keep the actual retrieved data for a week, in case it contains additional information beyond the yes/no result.
Users can request this data directly from the providers through the [Proof API](https://github.com/flare-foundation/attestation-client/blob/main/docs/end-users/apis.md#proof-api-on-attestation-provider-server).

!!! note
    Please note that this data is **safe to use** even though it is obtained directly from the provider, because **its hash is consistent with the Attestation Proof** agreed upon by the Data Connector's consensus.

    See the "Proof unpacking" box below to learn how to verify the data.

Additional points worth noting:

* If two attestation providers observe a different validity for _any_ of the requests in the round, they will submit a completely different Attestation Proof.

* Attestation providers **must answer all agreed-upon queries** in the round **or abstain from participating in the round**, otherwise, their Merkle tree root will not match other providers and will probably be discarded by consensus.

* **Hashes are sorted** before being added to the tree, just to have a **consistent ordering** (albeit arbitrary).

* The exact way in which the root hash is calculated can be changed without impacting the Data Connector contract, which will continue to vote only on the hash value.

## Branching Protocol

Besides the consensus algorithm that runs on all received attestations, the Data Connector provides **one further security mechanism**:
the ability of any individual validator node to **fork and halt execution** if attestation providers specially trusted by it disagree with the majority.

### Attestation Provider Sets

To achieve this, two **sets** of attestation providers are defined:

* **Default attestation providers set**

    Anybody can submit attestations to the Data Connector, but the contract will only accept submissions from attestation providers in the [**default set**].
    **Every validator node** in the Flare network relies on this set.

* **Local attestation providers set**

    Additionally, each node operator can provide a list of **local** attestation providers to be accepted besides the ones from the default set.

    Local providers are the same kind of nodes as default providers, and they are treated exactly the same by the Data Connector.
    Furthermore, providers can belong to both sets.

<figure markdown>
  ![Default and Local attestation providers](SC-local-AP-1.png){ loading=lazy .allow-zoom width=500px }
  <figcaption>Default and Local attestation providers.</figcaption>
</figure>

!!! tip ""

    Then, for an attestation round to succeed these three conditions must be met:

    * **The default set must agree on a result** (50% consensus inside the set).

    * **The local set must agree on a result too** (50% consensus inside the set).

    * **Both results must match**.

    Otherwise, the round is **undecided** and no answer is made public.

This gives local attestation providers the capacity to **stop results from being approved** if they don't agree with their own observations.
Ideally, local providers are managed by the same entity controlling the validator node using them, so they can be **trusted implicitly**.

As a consequence of different validators using different attestation providers, sometimes Data Connector queries can get different results on some validators, which naturally leads to **chain forks**.

Typically, blockchains allow every branch in a fork to **coexist and grow independently**, until the discrepancy is detected and resolved.
At that point, any branches deemed invalid are removed and all the validators that were following them experience a **rollback**:
All transactions that happened after the fork are **reverted** and the Data of those validators is synchronized with the rest of the network.

When dealing with forks caused by the Data Connector, the Flare network implements an **extra security measure**:
Validators whose local attestation providers disagree with the default set **halt execution after the fork**, ensuring that they will not suffer any rollback once the fork is resolved.

In other words, these validators remain in a **safe state** in which the disputed query is **undecided** and therefore no action is taken based on it.

!!! example

    <figure markdown>
      ![Data Connector forks](SC-local-AP-2.png){ loading=lazy .allow-zoom }
      <figcaption>Data Connector forks.</figcaption>
    </figure>

    In the **example picture**, all validator nodes use the attestation providers from the default set (not shown), but validators on the rightmost column, **additionally, employ local providers**.
    One of them returns a different answer for one of the queries, which leads to a **fork of the chain** since that validator's state does not match the rest of the network (the divergent ledger, depicted in red).

The next section shows how forks are resolved and halted nodes restarted.

### Branch Resolution

<figure markdown>
  ![Branching](SC-branching.png){ loading=lazy .allow-zoom }
  <figcaption>The two states of the branching protocol.</figcaption>
</figure>

The picture above shows the state of the network after a fork.
The **default network state** is the one followed by validators which only use the **default set of attestation providers**.
The **alternate network state** is where validators go if they use **local attestation providers**, and they disagree with the default set.

In the alternate state **no queries are answered** and **no blocks are produced**, so it is a **safe state** for validators to wait for forks to be resolved.

This resolution must come from **operators** when they are alerted that a validator node has stopped.
To understand how to do this, note that attestations are designed to be **objectively decidable**, meaning that in the event of a fork **one branch matches reality and the other does not**.

There are therefore only two ways to resolve a fork:

1. **When local providers are wrong**:

    The operator of the separated validator needs to find out why the local attestation providers failed and either fix them or remove them from the local set of the validator.

    Once this is fixed, the node simply rewinds its state to where it split and quickly fast-forward to rejoin the default state.

    <figure markdown>
      ![Fork resolution when local providers are wrong](SC-branching-resolution-1.png){ loading=lazy .allow-zoom }
      <figcaption>Fork resolution when local providers are wrong.</figcaption>
    </figure>

    Note that **no transactions need to be rolled back**, on either branch.

    In the event of this kind of fork, dapps depending on information from a separated validator just have to wait longer to get their result.

2. **When the default set is wrong**:

    First off, this is a very **delicate situation** and it should be **rare**.

    The default set uses consensus among attestation providers which have been chosen due to their merits as [FTSO](glossary.md#ftso) data providers.
    The fact that more than 50% of them are reporting data inconsistent with reality can be considered **a 51% attack**.

    The operator of the separated validator, upon convincing themselves that their branch is the correct one (it matches reality) they need to bring the fork to the attention of the misbehaving attestation providers' operators.

    All validators in the default state then need to **roll back to the last correct state** (reverting transactions) and continue from there on the forked branch, which becomes the new default state.

    <figure markdown>
      ![Fork resolution when the default set is wrong](SC-branching-resolution-2.png){ loading=lazy .allow-zoom }
      <figcaption>Fork resolution when the default set is wrong.</figcaption>
    </figure>

    Note that stopped nodes can resume now, and they **never had to roll back any transaction**.

In summary, validators using at least one reliable local attestation provider do not have to worry about rollbacks, **even in the face of 51% attacks**.

## Attestation Types

Attestation providers currently support these attestation types:

* **AddressValidity**: Whether a given address is valid in the specified network.
* **Balance-decreasing transaction**: Whether a transaction that might have decreased a balance occurred.
    This type allows for several possibilities:

    * During a transaction, funds, including fees, were deducted from the balance at an address.
    As a result, the final balance at the address is less than the balance was before the transaction.
    * During a transaction, funds to pay for fees were deducted from the balance at an address at the same time as more funds arrived.
    As a result, the balance at the address experienced a decrease, but the final balance is more than the balance was before the transaction.

* **Confirmed block height**: Whether a block on a certain height exists and was confirmed.
* **EVMTransaction**: A relay of a transaction from an EVM chain.
* **Payment**: Whether a payment transaction occurred in which funds were sent from one address to another address.
* **Referenced payment nonexistence**: Whether an account did not receive funds from a different account by a specific deadline.
This type can serve as proof that a user's payment obligations to a DeFi protocol have been breached, considering the following cases:

    * The required transaction was not confirmed on time.
    * The required transaction was confirmed on time but failed because of an error made by the sender.

## Adding New Attestation Types

New real-world event-type integrations are introduced to the Data Connector via acceptance by the default attestation providers, without requiring any changes to the core voting or branching protocols described above.
This enables rapid deployment of new use-cases without any validator-level code changes.

See the [data-connector-attestation-types repository](https://github.com/flare-foundation/songbird-state-connector-protocol) for more information.
