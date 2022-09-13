# State Connector

## Introduction

The **State Connector** is a smart contract running on the Flare network that allows anyone to **query information from outside the Flare network**.
It does so in a **decentralized manner** (no single party is in control of the process) and **securely** (it takes a lot of effort to disrupt the process).

This is accomplished by using a set of **independent attestation providers** which fetch the required information from the world and deliver it to the Flare network.
The State Connector smart contract then checks if there is **enough consensus** among the received answers and **publishes the results** if so.

As an added security measure, individual validators can also define **local attestation providers** which, when in disagreement with the rest, cause the validator to **branch** into an idle, safe state while the situation is resolved.

<figure markdown>
  ![The State Connector](SC-intro.png){ loading=lazy .allow-zoom width=500px }
  <figcaption>The State Connector.</figcaption>
</figure>

The State Connector can, for instance, **check whether a deposit has been made on another blockchain**, opening the door to more advanced mechanisms like the FAsset or the LayerCake bridges.

This page gives technical details about the whole procedure, the different security and scalability measures that have been taken into account in its design and the kind of queries that can be performed.

## Procedure Overview

This is how user queries are processed. The following sections contain more details.

<figure markdown>
  ![State Connector procedure.](SC-architecture.png){ loading=lazy .allow-zoom }
  <figcaption>State Connector procedure overview.</figcaption>
</figure>

### 1. Request

Anybody, be it a smart contract running on Flare or an application, can **request the attestation of a specific event** from the State Connector.

Requests are **yes/no questions** regarding things that happened outside the Flare network, for example, "Has transaction 0xABC been confirmed on the Bitcoin network enough times?".
The answers, though, might contain any kind of additional data attached, like the content of transaction 0xABC, for example.

Requests must adhere to one of the **available request types**, which have been designed to be **strictly decidable**, i.e., the answers are objective and cannot be argued.
Otherwise, queries like "What is the weather like in Paris?" would have a hard time reaching consensus among the different attestation providers.
Section [Adding New Attestation Types](#adding-new-attestation-types) below contains more details.

??? example "Making a request (for App developers)"

    Make your requests using the `requestAttestations` method (#2) of the [StateConnector contract](https://songbird-explorer.flare.network/address/0x3A1b3220527aBA427d1e13e4b4c48c31460B4d91/write-contract){ target=_blank }:

    ```solidity
    function requestAttestations(
        bytes calldata data
    ) external;
    ```

    The `requestAttestations` method has a single parameter, `data`, which is a byte array with a content that depends on the desired **request type**.
    You can learn how to build this array in the [state-connector-attestation-types repository](https://github.com/flare-foundation/state-connector-attestation-types){ target=_blank }.

### 2. Request forwarding

The State Connector simply **forwards the request** to all connected attestation providers through an [EVM](glossary.md#evm) event.
Therefore, the request is **not** stored on the blockchain and **its gas cost is very low** for the requester.

### 3. Data retrieval

Attestation providers **fetch the requested data** by means that depend on the type of attestation.
E.g., retrieving data from another blockchain or public API.

Keep in mind that attestation providers are **not controlled by Flare** in any way.
Anybody can listen to the request events and provide answers using any combination of hardware, software and code they see fit.

### 4. Attestation

To prevent attestation providers from peeking at each other's answers, these are submitted in a "Commit and Reveal" fashion called [the RCR protocol](#overlapped-rcr-protocol) and detailed below.

??? example "Submitting an attestation (For attestation provider developers)"

    Attestation providers use the `submitAttestation` method (#3) of the [StateConnector contract](https://gitlab.com/flarenetwork/flare-smart-contracts/-/blob/master/contracts/genesis/implementation/StateConnector.sol#L92){ target=_blank }:

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
    More information in the [Attestation Client repository](https://github.com/flare-foundation/attestation-client/blob/main/docs/attestation-protocol/state-connector-contract.md#providing-attestations){ target=_blank }.

### 5. Consensus

If **at least 50%** of the attestation providers submitted the same answer, it is made public.
Otherwise, **no consensus is achieved**: requests remain **unanswered** and must be issued again.

**The answers are stored in the State Connector smart contract for a week**, where anybody can read them.

??? example "Retrieving your request's answer (for App developers)"

    To retrieve the stored answers just read the `merkleRoots` public array (#8) in the [StateConnector contract](https://songbird-explorer.flare.network/address/0x3A1b3220527aBA427d1e13e4b4c48c31460B4d91/read-contract){ target=_blank }.

    More information on how to retrieve a particular answer in the [State Connector contract source code](https://gitlab.com/flarenetwork/flare-smart-contracts/-/blob/master/contracts/genesis/implementation/StateConnector.sol#L59){ target=_blank }.

    As shown below, multiple answers are actually packed into a single Merkle root. The [Attestation Packing](#attestation-packing) section explains how to retrieve an individual answer.

## Attestation Protocols

For simplicity, the above description omitted **two very important mechanisms**, reviewed here.

The main one is **Attestation packing**, which decouples the number of requests from the number of answers, effectively providing unbounded scalability.
It requires requests to be first **collected** and then **answered all at once**, so a protocol called **RCR** is used.

### Overlapped RCR Protocol

Requests and answers are submitted sequentially in **attestation rounds**.
Each attestation round has 3 **90-second** consecutive phases, called Request, Commit and Reveal (A whole round therefore takes 4.5 minutes).

<figure markdown>
  ![Request-Commit-Reveal protocol](SC-RCR.png){ loading=lazy .allow-zoom }
  <figcaption>The Request-Commit-Reveal (RCR) protocol.</figcaption>
</figure>

- **Request phase**: Users send their requests to the State Connector contract which forwards them to every attestation provider.
- **Commit phase**: Attestation providers send **obfuscated** answers to the State Connector, so they cannot cheat by peeking at each other's submissions.
- **Reveal phase**: Attestation providers send the **deobfuscation key** so their previous answers are revealed.
  When all data is available, answers are made public if there is enough consensus.

The RCR protocol is akin to making submissions in a closed envelope which is not opened until all submissions are received.

Results are available at the end of the Reveal phase, so the answer to a particular request can take anywhere **from 3 to 4.5 minutes**, depending on the time in which the request was made inside the Request phase.

Furthermore, the phases of the RCR protocol are actually **overlapped**, so when requests are being **requested** for round $n+2$, answers are being simultaneously **committed** for the previous round $(n+1)$, and **revealed** for the round prior to that $(n)$.

<figure markdown>
  ![Overlapped RCR protocol](SC-RCR-overlapped.png){ loading=lazy .allow-zoom }
  <figcaption>The RCR protocol with overlapped phases.</figcaption>
</figure>

This means that new requests can be made without waiting for the previous ones to be completed.

### Attestation Packing

Each round, attestation providers build a [Merkle tree](https://en.wikipedia.org/wiki/Merkle_tree){ target=_blank } with the hashes of **all valid answers** for the round.
The obtained **Merkle root** is then called the **Attestation Proof**, since it is proof of the presence of each individual answer.
Finally, the attestation proof is submitted to the State Connector for consensus evaluation.

<figure markdown>
  ![Attestation Proof packing using a Merkle tree](SC-attestation-provider.png){ loading=lazy .allow-zoom }
  <figcaption>Attestation Proof packing using a Merkle tree.</figcaption>
</figure>

This allows **any number of requests to be answered with a single hash**, greatly improving **scalability**.
Furthermore, the gas cost for attestation providers is **constant** each round, no matter how many requests they are answering.

A request is only **valid** (and therefore added to the proof) if it is well-formed and it **matches reality**.
Different providers might have different views on what reality is, and this is why the State Connector runs a consensus algorithm on the received answers.

Additionally, the allowed request types are **carefully designed to minimize the probability of contention**.
For example, requiring some time for **transactions to settle** before inquiring about them, and forcing requests to include the hash of a later block that confirms the transaction.

Attestation providers keep the actual retrieved data for a week, in case it contains additional information beyond the yes/no result.
Users can request this data directly from the providers through the [Proof API](https://github.com/flare-foundation/attestation-client/blob/main/docs/verfication/proof-api.md){ target=_blank }.

!!! note
    Please note that this data is **safe to use** even though it is obtained directly from the provider, because **its hash is consistent with the Attestation Proof** agreed upon by the State Connector's consensus.

    See the "Proof unpacking" box below to learn how to verify the data.

Additional points worth noting:

- If two attestation providers observe a different validity for _any_ of the requests in the round, they will submit a completely different Attestation Proof.

- Attestation providers **must answer all queries** in the round **or abstain from participating in the round**, otherwise, their Merkle tree root will not match other providers and will probably be discarded by consensus.

- **Hashes are sorted** before being added to the tree, just to have a **consistent ordering** (albeit arbitrary).

- The Merkle tree can later be swapped by more efficient algorithms without impacting the State Connector contract, which will continue to vote only on the root hash.

??? example "Proof Unpacking (for App developers)"

    The procedure for apps to check whether the State Connector answered yes or no to their request is detailed in the [Attestation Client repository](https://github.com/flare-foundation/attestation-client/blob/main/docs/verfication/verification-workflow.md){ target=_blank }. What follows is an illustrative summary.

    The basic idea is that you must **retrieve all data** (both requests and answers) for the round from an attestation provider.
    You then **rebuild the Merkle tree** with this data and check that it matches the Attestation Proof provided by the State Connector.

    <figure markdown>
      ![Proof unpacking](SC-proof-unpacking.png){ loading=lazy .allow-zoom }
      <figcaption>Proof unpacking.</figcaption>
    </figure>

    1. In the attestation round after you made the request (3 attestation phases, so from 3 to 4.5 minutes) the **Attestation Proof** for the round should be available in the State Connector.
        Retrieve it using method `getAttestation` (#7) of the [StateConnector contract](https://songbird-explorer.flare.network/address/0x3A1b3220527aBA427d1e13e4b4c48c31460B4d91/read-contract){ target=_blank }.

    2. **Select any attestation provider** you want and use the [Proof API](https://github.com/flare-foundation/attestation-client/blob/main/docs/verfication/proof-api.md){ target=_blank } path `api/proof/votes-for-round/{roundId}` to **retrieve all data for the round**.

    3. **Rebuild the Merkle tree** for the retrieved data.
    There are tools to help you, like the [MerkleTree.ts](https://github.com/flare-foundation/attestation-client/blob/main/lib/utils/MerkleTree.ts){ target=_blank } library.

    4. **Check** that the tree's root matches the Attestation Proof from step 1.
    If it does not match, this provider did not submit the answer agreed by the majority.
    Choose another provider in step 2.

    5. Now that you know that the retrieved data has been agreed upon by the consensus, you can use it.
    **Look for your request inside the returned data**.
    If it is not present, your request was deemed **invalid** (e.g. the queried transaction was not present).

        Otherwise, your request is valid and you can find any extra information about it in the data array.

## Branching Protocol

Besides the consensus algorithm that runs on all received attestations, the State Connector provides **one further security mechanism**:
the ability of any individual validator node to **fork and halt execution** if attestation providers specially trusted by it disagree with the majority.

### Attestation Provider Sets

To achieve this, two **sets** of attestation providers are defined:

- **Default attestation providers set**

    Anybody can submit attestations to the State Connector, but the contract will only accept submissions from attestation providers in the **default set**.

    This list was managed by Flare at launch and later became completely decentralized (see the section [Becoming an Attestation Provider](#becoming-an-attestation-provider) for more information).

    **Every validator node** in the Flare network relies on this set.

- **Local attestation providers set**

    Additionally, each node operator can provide a list of **local** attestation providers to be accepted besides the ones from the default set.

    Local providers are the same kind of nodes as default providers, and they are treated exactly the same by the State Connector.
    Furthermore, providers can belong to both sets.

<figure markdown>
  ![Default and Local attestation providers](SC-local-AP-1.png){ loading=lazy .allow-zoom width=500px }
  <figcaption>Default and Local attestation providers.</figcaption>
</figure>

!!! important ""

    Then, for an attestation round to succeed these three conditions must be met:

    - **The default set must agree on a result** (50% consensus inside the set).

    - **The local set must agree on a result too** (50% consensus inside the set).

    - **Both results must match**.

    Otherwise, the round is **undecided** and no answer is made public.

This gives local attestation providers the capacity to **stop results from being approved** if they don't agree with their own observations.
Ideally, local providers are managed by the same entity controlling the validator node using them, so they can be **trusted implicitly**.

As a consequence of different validators using different attestation providers, sometimes State Connector queries can get different results on some validators, which naturally leads to **chain forks**.

Typically, blockchains allow every branch in a fork to **coexist and grow independently**, until the discrepancy is detected and resolved.
At that point, any branches deemed invalid are removed and all the validators that were following them experience a **rollback**:
All transactions that happened after the fork are **reverted** and the state of those validators is synchronized with the rest of the network.

When dealing with forks caused by the State Connector, the Flare network implements an **extra security measure**:
Validators whose local attestation providers disagree with the default set **halt execution after the fork**, ensuring that they will not suffer any rollback once the fork is resolved.

In other words, these validators remain in a **safe state** in which the disputed query is **undecided** and therefore no action is taken based on it.

!!! example

    <figure markdown>
      ![State Connector forks](SC-local-AP-2.png){ loading=lazy .allow-zoom }
      <figcaption>State Connector forks.</figcaption>
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

## Becoming an Attestation Provider

Anyone may operate an attestation provider without any capital requirement (see the [attestation-client repository](https://github.com/flare-foundation/attestation-client){ target=_blank } for deployment information), which can readily be used as a **local provider** on validators that trust it.

To be included in the [default set](#attestation-provider-sets), though, the same operator must run one of the **top-performing [FTSO](glossary.md#ftso) data providers** to prove its commitment to the network's well-being.
More details will be added soon.

## Adding New Attestation Types

New real-world event-type integrations are introduced to the State Connector via acceptance by the default attestation providers, without requiring any changes to the core voting or branching protocols described above.
This enables rapid deployment of new use-cases without any validator-level code changes.

See the [state-connector-attestation-types repository](https://github.com/flare-foundation/state-connector-attestation-types){ target=_blank } for more information.
