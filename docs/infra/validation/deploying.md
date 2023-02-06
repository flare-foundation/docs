# Deploying a Validator Node

## Introduction

As explained in the [Validator Nodes](../../tech/validators.md) page, these servers fulfill a critical role in securing the network:

* They check that all received [transactions](glossary.md#transaction) are valid.
* They run a [consensus](glossary.md#consensus) algorithm so that all validators in the network agree on the transactions to add to the blockchain.
* Finally, they add the agreed-upon transactions to their copy of the [ledger](glossary.md#ledger).

This guide explains how to deploy your own validator node so you can participate in the consensus and collect the rewards that the network provides to those who help secure it.

!!! warning "Only validators with preregistered keys can be deployed at the moment"

    Some users might have received **preregistered validator keys**, this is, the keys required to launch a node which **has already been registered as a validator**.
    This is the only way to deploy a validator node at this time.

    The procedure for self-registration of validators is being finished and will be available soon to the whole community.
    When that happens this page will be updated.

!!! info "The following instructions apply to the Flare network only."

## Prerequisites

Validators run the same software as regular **observer nodes**, therefore, this guide assumes you have already read the [Deploying an Observer Node](../observation/deploying.md) guide.

The requirements to deploy a validator node are the same as for observer nodes, except on the CPU and RAM front which are heavier due to the extra work required:

|                 | Hardware    |                      | Software                                             |
| --------------: | :---------- | -------------------: | ---------------------------------------------------- |
|   **CPU cores** | 16          | **Operating System** | Ubuntu (18.04 or 20.04) or macOS (>= 10.15 Catalina) |
|         **RAM** | 64 GB       |     **Dependencies** | [Go](https://golang.org/doc/install) (>= 1.18.5)     |
|  **Disk space** | 1 TB SSD    |                      | [gcc](https://gcc.gnu.org/)                          |
| **Disk growth** | 2.5 TB/year |                      | [g++](https://gcc.gnu.org/)                          |
|                 |             |                      | [jq](https://stedolan.github.io/jq/)                 |
|                 |             |                      | [npm](https://docs.npmjs.com) (>= 8.11)              |

## Guide

### 1. Configure the Node

A validator node is deployed like an observer node, but there are some things to consider first.

Validators do more work than plain observer nodes so please consider the recommended **hardware specifications** above.

Validator **security** impacts the whole network.
Please consider the following items carefully:

* Have the machine **firewalled**.
  Only the ports required for validator operation should be open (i.e., only the staking port, which defaults to 9651).

    If you use a virtual server, use only its web interface for management and close the SSH port.

    If the SSH port must be open, it should ideally be restricted to a private IP (i.e. only accessible through VPN) or only temporarily open to the operator's office/home static IP or a bastion SSH VM that can be turned off between use.

* The node should **only act as validator**, and not accept RPC API calls too.

    You should deploy a separate observer node for that task, which can point to your validator for peering and bootstrapping.

* The validator should only enable the minimum set of [EVM](glossary.md#evm) APIs by adding this line to a [configuration file](../observation/deploying.md#additional-configuration):

    ```json
    "eth-apis": [
        "web3"
    ]
    ```

    ??? tip "Sample configuration file for validator nodes"

        ```json
        {
        "snowman-api-enabled": false,
        "coreth-admin-api-enabled": false,
        "coreth-admin-api-dir": "",
        "eth-apis": [
            "web3"
        ],
        "continuous-profiler-dir": "",
        "continuous-profiler-frequency": 900000000000,
        "continuous-profiler-max-files": 5,
        "rpc-gas-cap": 50000000,
        "rpc-tx-fee-cap": 100,
        "preimages-enabled": false,
        "pruning-enabled": false,
        "snapshot-async": true,
        "snapshot-verification-enabled": false,
        "metrics-enabled": true,
        "metrics-expensive-enabled": false,
        "local-txs-enabled": false,
        "api-max-duration": 30000000000,
        "ws-cpu-refill-rate": 0,
        "ws-cpu-max-stored": 0,
        "api-max-blocks-per-request": 30,
        "allow-unfinalized-queries": false,
        "allow-unprotected-txs": false,
        "keystore-directory": "",
        "keystore-external-signer": "",
        "keystore-insecure-unlock-allowed": false,
        "remote-tx-gossip-only-enabled": false,
        "tx-regossip-frequency": 60000000000,
        "tx-regossip-max-size": 15,
        "log-level": "info",
        "offline-pruning-enabled": false,
        "offline-pruning-bloom-filter-size": 512,
        "offline-pruning-data-directory": ""
        }
        ```

!!! info "Preregistered validator keys"

    Some users might have received **preregistered validator keys**, this is, the keys required to deploy a node which has already been registered as a validator.

    If that is your case, you need to add these parameters to the launch command line:

    ```bash
    --staking-tls-cert-file=<NODE_CRT_PATH> --staking-tls-key-file=<NODE_KEY_PATH>
    ```

### 2. Run the Node

After taking the above considerations into account, you can now start up your node by following the [Deploying an Observer Node](../observation/deploying.md) guide.
