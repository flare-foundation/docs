# Becoming an Attestation Provider

This guide is a walk through to become an [attestation provider](#attestation-provider).
There are two situations in which it makes sense to do so:

* Running unincentivized local attestation providers to act as a safeguard against malicious forks,
* Running incentivized attestation providers to reap rewards, contributing to and helping improve the decentralization of the network while providing attestations for the [state connector](#state-connector).

!!! note "Rewards"

    Currently, the process of rewarding public attestation providers is still being discussed.

## Prerequisites

Before proceeding with the [installation](#installation), it is essential to follow every prerequisite.

### System Requirements

The following specifications were observed to be able to run nodes for all supported blockchains on a single machine.
Ideally, a dedicated node should be run for each connected blockchain in production for better performance and uptime.

* **OS**: Ubuntu 20.04
* **CPU Cores**: 16
* **RAM**: 96GB
* **Disk space**: 3TB with an option or plan in place to expand capacity. SSD is recommended because some chains like xrpl can fall out of sync on regular disks.

As of Q2 2022, this is roughly what you can expect from each node regarding disk usage:

| Volume              | Size  |
|---------------------|-------|
| algorand-data       | 1TB   |
| algorand-indexer-db | 1TB   |
| bitcoin-data        | 500GB |
| dogecoin-data       | 60GB  |
| litecoin-data       | 90GB  |
| ripple-data         | 230GB |

We are looking into ways to run a non-full history algorand node.

### Dependencies

* [`git`](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [`docker`](https://docs.docker.com/get-docker/)
* [`docker-compose`](https://docs.docker.com/compose/install/)
* [`openssl`](https://www.openssl.org/source/)
* [`python3`](https://www.python.org/downloads/)

### Node Setup

The first step is to set up nodes for each supported network, that the attestation provider suite can then use to make attestations.

The supported chains at the moment are the following:

* [Bitcoin](https://github.com/bitcoin/bitcoin)
* [Litecoin](https://github.com/litecoin-project/litecoin)
* [Dogecoin](https://github.com/dogecoin/dogecoin)
* [Rippled](https://github.com/ripple/rippled)
* [Algorand](https://github.com/algorand/go-algorand)

!!! warning "Setting the nodes up is a very long process"

    Since the attestation provider suite requires having access to all supported networks, it is required to have an up-to-date node setup for each network.
    Certain networks take very long times to get synchronized with, such as algorand which requires indexing the whole history of the blockchain locally.
    In our testing it took a few hours to sync up with litecoin, dogecoin and xrpl, more than a day for bitcoin and weeks for algorand.

#### Chain Configuration

For this step, it is required to create a password that is at least 64 characters long.
It is referred to later as `<your-password>`.

##### Ubuntu

The provided `install.sh` script was written for Ubuntu 20.04, so if you are on another platform follow the [alternate set of instructions](#other-platforms) or adapt the script to your platform.

```
git clone https://github.com/flare-foundation/connected-chains-docker /opt/connected-chains
cd /opt/connected-chains
./install.sh <your-password>
```

##### Other Platforms

For each supported blockchain in the `./config` directory at the root of the repository, except for `ripple`, run the included script like so:

* `(cd ./config/bitcoin && ./rpcauth.py admin <your-password>)`
* `(cd ./config/litecoin && ./rpcauth.py admin <your-password>)`
* `(cd ./config/dogecoin && ./rpcuser.py admin <your-password>)`
* `(cd ./config/algorand && bash gen_auth_token.sh <your-password>)`

Running those commands should output what credentials were set up for the nodes.

#### Node Synchronization

Now, the configuration is ready and nodes can be launched.
As soon as they start, they will begin the synchronization process, where they go over the whole history of the blockchain until they reach its live state.

FIXME: How to launch the nodes using docker-compose

## Installation

> Node about CLI automatizing everything but only for Ubuntu 20.04 users
> https://github.com/flare-foundation/attestation-client/blob/main/docs/installation/general-installation.md

## Monitoring

### Frontend (Rename)

### Terminal UI

## Summary (Rename)

> What has been done in this guide
> What was gained by following the guide
