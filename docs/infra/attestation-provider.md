# Becoming an Attestation Provider

This guide is a walk through to become an [attestation provider](#attestation-provider).
There are two situations in which it makes sense to do so:

* Running unincentivized local attestation providers to act as a safeguard against malicious forks,
* Running incentivized attestation providers to reap rewards, contributing to and helping improve the decentralization of the network while providing attestations for the [state connector](#state-connector).

!!! note "Rewards"

    Currently, the exact rewarding mechanism to use is being discussed.

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

!!! note "High storage usage"

    In the interest of decentralization, and to allow the maximum number of users to become Attestation Providers, alternate mechanisms are being researched to reduce such high requirements, like using non-full history Algorand nodes.

### Dependencies

* [`git`](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [`docker`](https://docs.docker.com/get-docker/)
* [`docker-compose`](https://docs.docker.com/compose/install/)
* [`openssl`](https://www.openssl.org/source/)
* [`python3`](https://www.python.org/downloads/)

### Node Setup

The first step is to set up a node for each supported network, which the attestation provider suite can then use to make attestations.

The supported chains at the moment are the following:

* [Bitcoin](https://github.com/bitcoin/bitcoin)
* [Litecoin](https://github.com/litecoin-project/litecoin)
* [Dogecoin](https://github.com/dogecoin/dogecoin)
* [Rippled](https://github.com/ripple/rippled)
* [Algorand](https://github.com/algorand/go-algorand)

!!! warning "Setting the nodes up is a very long process"

    Since the attestation provider suite requires having access to all supported networks, it is required to have an up-to-date node setup for each network.
    Certain networks take very long times to get synchronized with, such as Algorand which requires indexing the whole history of the blockchain locally.
    In our testing it took a few hours to sync up with Litecoin, Dogecoin and XRPL, more than a day for Bitcoin and weeks for Algorand.

#### Chain Configuration

Before the nodes can be launched, they have to be configured with credentials to access their respective networks.
For this step, it is required to create a password that is at least 64 characters long.
It is referred to later as `<your-password>`.

For each supported blockchain in the `./config` directory at the root of the repository, except for `ripple`, run the included script like so:

* `(cd ./config/bitcoin && ./rpcauth.py admin <your-password>)`
* `(cd ./config/litecoin && ./rpcauth.py admin <your-password>)`
* `(cd ./config/dogecoin && ./rpcuser.py admin <your-password>)`
* `(cd ./config/algorand && bash gen_auth_token.sh <your-password>)`

Running those commands should output what credentials were set up for the nodes.
Those credentials should be saved for later use, and they can be changed by manually editing the configuration files.

#### Node Synchronization

Now, the configuration is ready and nodes can be launched.
As soon as they start, they will begin the synchronization process, where they go over the whole history of the blockchain until they reach its live state.

Run the following command and replace `<chain_name>` with the name of the blockchain the node should connect to.

```bash
cd /opt/connected-chains
docker-compose up -d <chain_name>
```

Now, make sure that the node is up and the synchronization process is in progress by running the following command.

```bash
docker-compose logs --tail=1000 <chain_name>
```
 
!!! note "Modifying the Node Configuration"

    If needed, the node configuration can be updated.
    Nodes are configured using the file in `/opt/connected-chains/<node>/<config-file-name>.conf`.
    Those files are volume-mounted to each container, and once those files are updated, restarting the container updates the configuration used by the node.

##### Security Considerations

Node ports bind to `127.0.0.1` by default, in order to avoid exposing them to the public internet.
Changing the `BIND_IP` variable in the `.env` file allows binding the nodes to other interfaces.

If attestation clients are run on a different machine, consider locking down RPC port access to the specific IP of that machine using firewall rules.
If clients are also run on a different network, consider running TLS, either natively on each node that supports it or by keeping nodes behind a reverse proxy that is configured with TLS.

##### Mounted Storage

If needed, additional storage can be mounted and used by the nodes by changing Docker's configured `data-root` attribute in `/etc/docker/daemon.json` and running `systemctl restart docker` for the change to be effective.

Alternatively, it is possible to switch to [bind volume mounts](https://docs.docker.com/storage/bind-mounts/) or to use the [NFS driver](https://docs.docker.com/storage/volumes/#create-a-service-which-creates-an-nfs-volume) in the compose file as well.

##### Common Issues

* Container does not start due to missing binaries
  * This probably means that the build failed due to an out-of-memory error, since that does not stop the image from building successfully
* Build fails due to an out-of-memory error
  * Increase the memory given to the Docker daemon if you use Docker Desktop.
    Increase the swap and lower the parallel jobs flag in the Docker image.
* `git clone` hangs
  * Increase the following setting: `git config --global http.postBuffer <max-bytes>`

## Attestation Suite Installation

### System Requirements

Minimal hardware requirements for running the attestation suite are:

* **CPU**: 4 cores @ 2.2GHz
* **DISK**: 500 GB SSD disk
* **MEMORY**: 16 GB

### Attestation Client

Once the nodes are synced up, it is recommended to install the Attestation Suite on a different machine.

The first step is to clone the attestation client repository.

```bash
cd ~
mkdir -p attestation-suite
cd attestation-suite

git clone https://github.com/flare-foundation/attestation-client.git
cd attestation-client
```

#### Dependencies

* [`node 14.15.4`](https://nodejs.org/download/release/v14.15.4/)
* [`npm`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* [`yarn`](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)
* [`mysql`](https://www.mysql.com/downloads/)

#### Initialization

Now, the configuration files must be initialized.
This is done by simply creating a directory in which to store the configuration, and copying the placeholder configuration files from `./configs/.install` to `../attestation-suite-config`.

```bash
mkdir -p ../attestation-suite-config
cp -a ./configs/.install/. ../attestation-suite-config
```

### Configuration

In the `attestation-suite-config` directory, edit the following `chain.credentials.json` file to configure the credentials to be used by the attestation client to access the previously set up nodes.
Those credentials should be those that were generated during the [chain configuration step](#chain-configuration).
The URLs to specify for each blockchain are the addresses at which the node APIs are reachable.

// FIXME: What to do with database.json?

* `database.json`

// FIXME: Where should network credentials come from?

* `network.credential.json`

#### Setup Services

The last step in the installation process is to configure services in `systemctl` for each attestation client, backend, and indexer.

##### Ubuntu

On Ubuntu, this step is automatized and all that is required is to call the `./scripts/install.sh` script.

##### Other Platforms

```bash
mkdir -p ~/.config/systemd/user
cp ./scripts/templates/*.service ~/.config/systemd/user
```

```bash
systemctl --user daemon-reload

systemctl --user enable indexer-xrp.service
systemctl --user enable indexer-btc.service
systemctl --user enable indexer-ltc.service
systemctl --user enable indexer-algo.service
systemctl --user enable indexer-doge.service

# songbird
systemctl --user enable songbird-attester-client.service
systemctl --user enable songbird-backend.service

# coston
systemctl --user enable coston-attester-client.service
systemctl --user enable coston-backend.service

systemctl --user enable attester-alerts
```

```bash
./scripts/compile.sh
```

```bash
yarn ts-node lib/install/install.ts ../attestation-suite-config/
```

```bash
./scripts/initialize-mysql.sh
```

```bash
./scripts/deploy-all.sh
```

### Attestation Suite Installation

> Recommended to do that on a different machine.
> Node about CLI automatizing everything but only for Ubuntu 20.04 users
> https://github.com/flare-foundation/attestation-client/blob/main/docs/installation/general-installation.md

## Monitoring

### Frontend (Rename)

### Terminal UI

## Summary (Rename)

> What has been done in this guide
> What was gained by following the guide
