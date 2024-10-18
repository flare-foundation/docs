---
search:
  boost: 2
---

# Validator Nodes

## Blockchain Validation

Validator nodes are **online servers** running a blockchain's client software.
They all keep their own copy of the [ledger](glossary.md#ledger) and are constantly talking to other nodes to make sure the copies are **consistent with each other** as new data is added.

<figure markdown>
  ![Validator node network](validator-network.png){ loading=lazy .allow-zoom width=500px }
  <figcaption>A network of validator nodes, each one with an identical copy of the ledger.</figcaption>
</figure>

The fact that the ledger is not under control of a single entity but **distributed among a network of independent validators** is what makes blockchains:

* Require less trust than traditional options (said to be [_trustless_](glossary.md#trustless)).
* Censorship resistant.
* [Byzantine fault-tolerant](glossary.md#byzantine_fault_tolerance).

Validators agree on the state of the ledger using a [consensus algorithm](glossary.md#consensus) that varies for each blockchain.
For example, Flare uses the **Snowman++** consensus protocol from [Avalanche](glossary.md#avalanche).

!!! info "Snowman++"
    During each round, a validator is **randomly selected** to act as the **leader** and propose new blocks to be added to the ledger, which are then validated by the rest of nodes.
    To provide [Sybil resistance](glossary.md#sybil_resistance), the probability that a node is elected the leader is **proportional to the node's stake**, effectively enacting a [proof-of-stake](glossary.md#proof_of_stake) consensus.

With its vision to be the blockchain for data, Flare adds the [FTSO Data provider](./ftso/index.md) and [Attestation Provider](./data-connector.md) roles to validators, creating a single _infrastructure entity_.

When fully operational, these decentralized infrastructure entities are responsible for:

* Securing the network through proof-of-stake consensus.
* Providing continuous data to the FTSO system.
* Answering the Data Connector's queries for attestations.

In this way, the stake required to operate these entities secures all three functions.

Infrastructure entities are rewarded for each one of these roles, a process that involves staking on the [P-chain](https://docs.avax.network/learn/avalanche/avalanche-platform#p-chain) and rewards that are calculated on smart contracts running on the [C-chain](https://docs.avax.network/learn/avalanche/avalanche-platform#c-chain).

## Deployment Phases

Deployment will occur in different phases for a number of reasons:

* Infrastructure entities will be onboarded progressively, to ensure the uninterrupted working of the network.
* Current FTSO data providers need to build a minimum stake to act as validators.
* Current validators need to upgrade their capabilities to act as data providers.

Each phase will increasingly relinquish control, so more network validation will happen independently of the Flare Foundation.

### Initial State

Upon network launch on July 14th 2022, a set of 20 validators had their node IDs hard-coded into the client software, so no other validators could participate.
The Flare Foundation managed these nodes and gradually reassigned 16 of them to 4 external entities to achieve greater decentralization.
These entities, known as professional validators, are infrastructure providers with experience managing blockchain nodes.

During this period FTSO data providers operated completely independently of validators.
The Data Connector protocol was still being developed, so no attestation providers were available.

### Phase 1

On July 2023 a network fork enabled Avalanche's proof-of-stake mechanism.
From this moment, validation was open to everybody.
At the same time, all the stake from the original validators expired.

The Flare Foundation loaned all the stake for the initial validators, so the distribution of validation power remained the same while proof-of-stake was being tested.

Later, after some FTSO data providers went through a [KYC](glossary.md#kyc) process, the Flare Foundation loaned enough funds to them to deploy validation nodes and act as validators.

Because staking happens on the [P-chain](https://docs.avax.network/learn/avalanche/avalanche-platform#p-chain), staked tokens cannot access the rewards managed by smart contracts running on the [C-chain](https://docs.avax.network/learn/avalanche/avalanche-platform#c-chain).
To solve this problem, a communication mechanism between the two chains is being developed.

All staking rewards are manually calculated off-chain, and then distributed on-chain.
The calculations will initially be private while they are fine-tuned, and the script will be made public in phase 2 so that anybody can verify them.

### Phase 2

Once FTSO data providers have gathered enough stake to ensure the network's continued working, all stake loaned by the Flare Foundation to the validators in the [initial state](#initial-state) will be withdrawn.
Professional validators are expected to cease operating at this point, unless they provide their own stake.

The Flare Foundation might delegate stake to FTSO data providers that went through the KYC process, to help kick-start the system.
This is known as stake boosting and will run only for a limited amount of time.

Staked funds can earn [FlareDrops](./the-flaredrop.md) and participate in [governance](./governance.md), but not earn [FTSO rewards](./ftso/index.md#rewards).

Staking rewards will:

* Take into account validator uptime, which can be publicly monitored.
* Take into account staked amount.
* Require that the validator is also an FTSO data provider that is being constantly rewarded for providing good enough prices.
* Be manually calculated off-chain using a public script, and then distributed on-chain.

### Phase 3

After secure communication between the P- and C-chains is available, staking rewards will be managed entirely on-chain.
The goal is that funds staked on the P-chain will have the same rights as wrapped `$FLR` on the C-chain, opening the possibility to earn [FTSO rewards](./ftso/index.md#rewards), [FlareDrops](./the-flaredrop.md) and participate in [governance](./governance.md).

### Summary

<div class="boolean-table" markdown>
|                                                   | Launch | Phase 1 | Phase 2 | Phase 3 |
| ------------------------------------------------- | :----: | :-----: | :-----: | :-----: |
| Validation open to everybody                      |   ✘    |    ✔    |    ✔    |    ✔    |
| Validators must provide own stake                 |   ✘    |    ✘    |    ✔    |    ✔    |
| Validators must be data providers to earn rewards |   ✘    |    ✘    |    ✔    |    ✔    |
| Locked stake can earn staking rewards             |   ✘    |    ✘    |    ✔    |    ✔    |
| Staking rewards are handled on-chain              |   ✘    |    ✘    |    ✘    |    ✔    |
| Same rights for staked and wrapped tokens         |   ✘    |    ✘    |    ✘    |    ✔    |
</div>

## Related Infrastructure Guides

* [Deploying a Validator Node](https://dev.flare.network/run-node/validator-node)

<script type="module">
    const btables = document.getElementsByClassName('boolean-table');
    if (btables) {
      for (var i=0; i<btables.length; i++) {
        const bcells = btables[i].getElementsByTagName('td');
        for (var j=0; j<bcells.length; j++) {
          if (bcells[j].innerHTML == '✘')
            bcells[j].className = 'boolean-false';
          if (bcells[j].innerHTML == '✔')
            bcells[j].className = 'boolean-true';
        }
      }
    }
</script>
