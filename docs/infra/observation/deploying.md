# Deploying an Observer Node

Observer nodes enable anyone to observe the network and submit transactions.
Unlike [validator nodes](../../tech/validators.md), which provide state consensus and add blocks, observer nodes remain outside the network and have no effect on consensus or blocks.

Running an observer node is optional.
However, submitting transactions through your own node offers a number of benefits:

* Transactions are sent directly to the network instead of through a third party, removing a potential security risk.
* Public nodes are usually rate-limited (the amount of requests they accept per second is restricted).
  Your own node does not have such restriction.
* The time savings described above allow [FTSO data providers](glossary.md#data_provider) to submit their data a few seconds later, thus having more time to gather data before submitting.

This guide explains how to deploy your own observer node so you can reap the benefits.

## Prerequisites

This guide contains different instructions depending on which Flare network you want to deploy to, so [make sure you are aware of the available networks](../../tech/flare.md#the-flare-networks).

=== "Flare"

    |                 | Hardware    |                      | Software                                             |
    | --------------: | :---------- | -------------------: | ---------------------------------------------------- |
    |   **CPU cores** | 8           | **Operating System** | Ubuntu (18.04 or 20.04) or macOS (>= 10.15 Catalina) |
    |         **RAM** | 32 GB       |     **Dependencies** | [Go](https://golang.org/doc/install) (>= 1.18.5)     |
    |  **Disk space** | 1 TB SSD    |                      | [gcc](https://gcc.gnu.org/)                          |
    | **Disk growth** | 2.5 TB/year |                      | [g++](https://gcc.gnu.org/)                          |
    |                 |             |                      | [jq](https://stedolan.github.io/jq/)                 |

=== "Songbird"

    |                 | Hardware    |                      | Software                                             |
    | --------------: | :---------- | -------------------: | ---------------------------------------------------- |
    |   **CPU cores** | 8           | **Operating System** | Ubuntu (18.04 or 20.04) or macOS (>= 10.15 Catalina) |
    |         **RAM** | 32 GB       |     **Dependencies** | [Go](https://golang.org/doc/install) (>= 1.16.8)     |
    |  **Disk space** | 3.5 TB SSD  |                      | [gcc](https://gcc.gnu.org/)                          |
    | **Disk growth** | 2.5 TB/year |                      | [g++](https://gcc.gnu.org/)                          |
    |                 |             |                      | [jq](https://stedolan.github.io/jq/)                 |

=== "Coston"

    |                 | Hardware    |                      | Software                                             |
    | --------------: | :---------- | -------------------: | ---------------------------------------------------- |
    |   **CPU cores** | 4           | **Operating System** | Ubuntu (18.04 or 20.04) or macOS (>= 10.15 Catalina) |
    |         **RAM** | 16 GB       |     **Dependencies** | [Go](https://golang.org/doc/install) (>= 1.16.8)     |
    |  **Disk space** | 500 GB SSD  |                      | [gcc](https://gcc.gnu.org/)                          |
    | **Disk growth** | 250 GB/year |                      | [g++](https://gcc.gnu.org/)                          |
    |                 |             |                      | [jq](https://stedolan.github.io/jq/)                 |

=== "Coston2"

    |                 | Hardware    |                      | Software                                             |
    | --------------: | :---------- | -------------------: | ---------------------------------------------------- |
    |   **CPU cores** | 4           | **Operating System** | Ubuntu (18.04 or 20.04) or macOS (>= 10.15 Catalina) |
    |         **RAM** | 16 GB       |     **Dependencies** | [Go](https://golang.org/doc/install) (>= 1.18.5)     |
    |  **Disk space** | 500 GB SSD  |                      | [gcc](https://gcc.gnu.org/)                          |
    | **Disk growth** | 250 GB/year |                      | [g++](https://gcc.gnu.org/)                          |
    |                 |             |                      | [jq](https://stedolan.github.io/jq/)                 |

Plus a reliable IPv4 or IPv6 network connection, with an open public port.

Keep in mind that enabling [pruning](glossary.md#pruning) as [described below](#4-additional-configuration) can reduce the required disk space by as much as 60%.

## Guide

### 1. Installation

=== "Flare & Coston2"

    Clone the [go-flare](https://github.com/flare-foundation/go-flare) repository and run the `build.sh` script:

    ```bash
    git clone https://github.com/flare-foundation/go-flare.git
    cd go-flare/avalanchego
    ./scripts/build.sh
    ```

    The resulting executable will be `build/avalanchego`.

    !!! note

        You can verify the installation by running:

        ```bash
        go test $(go list ./... | grep -v /tests/) # avalanchego unit tests
        cd ../coreth
        go test ./... # coreth unit tests
        cd ../avalanchego
        ```

=== "Songbird & Coston"

    Clone the [go-songbird](https://github.com/flare-foundation/go-songbird) repository and run the `build.sh` script:

    ```bash
    git clone https://github.com/flare-foundation/go-songbird.git
    cd go-songbird/avalanchego
    ./scripts/build.sh
    ```

    The resulting executable will be `build/flare`.

    !!! note

        You can verify the installation by running:

        ```bash
        go test $(go list ./... | grep -v /tests/) # avalanchego unit tests
        cd coreth
        go test ./... # coreth unit tests
        cd ..
        ```

### 2. Songbird Node Whitelisting

While the **Songbird** network is being tested, all nodes wanting to peer with it, including observer nodes, need to have their IP address **whitelisted**.

To do this, please **contact Tom T.** over Discord (`Tom T#7603`), Telegram (`@TampaBay7`), or email ([tom@flare.network](mailto:tom@flare.network)), and request to be whitelisted.
To have greater redundancy, you can whitelist multiple nodes per single provider.

??? tip "Checking the status of your Songbird whitelisting request"

    ``` bash
    curl -m 10 -sX POST \
    --data '{ "jsonrpc":"2.0", "id":1, "method":"info.getNodeIP" }' \
    -H 'content-type:application/json;' \
    https://songbird.flare.network/ext/info
    ```

    If your IP address is whitelisted, this command returns a JSON response.
    Otherwise you will get a 403 error ("Forbidden").

Please note that whitelisting is **not needed** on the **Flare network** or any of the **Coston networks**.

### 3. Run the Node

This is the minimum command to quickly get your node up and running.
To understand each parameter read the following step before launching the node.

=== "Flare"

    ``` bash
    ./build/avalanchego --network-id=flare --http-host= \
      --bootstrap-ips="$(curl -m 10 -sX POST \
        --data '{ "jsonrpc":"2.0", "id":1, "method":"info.getNodeIP" }' \
        -H 'content-type:application/json;' https://flare.flare.network/ext/info \
        | jq -r ".result.ip")" \
      --bootstrap-ids="$(curl -m 10 -sX POST \
        --data '{ "jsonrpc":"2.0", "id":1, "method":"info.getNodeID" }' \
        -H 'content-type:application/json;' https://flare.flare.network/ext/info \
        | jq -r ".result.nodeID")"
    ```

=== "Songbird"

    ``` bash
    ./build/flare --network-id=songbird --http-host= \
      --bootstrap-ips="$(curl -m 10 -sX POST \
        --data '{ "jsonrpc":"2.0", "id":1, "method":"info.getNodeIP" }' \
        -H 'content-type:application/json;' https://songbird.flare.network/ext/info \
        | jq -r ".result.ip")" \
      --bootstrap-ids="$(curl -m 10 -sX POST \
        --data '{ "jsonrpc":"2.0", "id":1, "method":"info.getNodeID" }' \
        -H 'content-type:application/json;' https://songbird.flare.network/ext/info \
        | jq -r ".result.nodeID")"
    ```

=== "Coston"

    ``` bash
    ./build/flare --network-id=coston --http-host= \
      --bootstrap-ips="$(curl -m 10 -sX POST \
        --data '{ "jsonrpc":"2.0", "id":1, "method":"info.getNodeIP" }' \
        -H 'content-type:application/json;' https://coston.flare.network/ext/info \
        | jq -r ".result.ip")" \
      --bootstrap-ids="$(curl -m 10 -sX POST \
        --data '{ "jsonrpc":"2.0", "id":1, "method":"info.getNodeID" }' \
        -H 'content-type:application/json;' https://coston.flare.network/ext/info \
        | jq -r ".result.nodeID")"
    ```

=== "Coston2"

    ``` bash
    ./build/avalanchego --network-id=costwo --http-host= \
      --bootstrap-ips="$(curl -m 10 -sX POST \
        --data '{ "jsonrpc":"2.0", "id":1, "method":"info.getNodeIP" }' \
        -H 'content-type:application/json;' https://coston2.flare.network/ext/info \
        | jq -r ".result.ip")" \
      --bootstrap-ids="$(curl -m 10 -sX POST \
        --data '{ "jsonrpc":"2.0", "id":1, "method":"info.getNodeID" }' \
        -H 'content-type:application/json;' https://coston2.flare.network/ext/info \
        | jq -r ".result.nodeID")"
    ```

After a lot of log messages the node should start **synchronizing** with the network, which might take a long time (currently about 4 hours for Flare, over a week for Songbird, depending on network speed and machine specs).

You can **stop** the node at any time by pressing `Ctrl-C`.
Use the same command line as before to **restart** the node.
Synchronization will resume where it left if it is interrupted.

You will know your node is fully booted and accepting transactions when the output of this command:

```bash
curl http://127.0.0.1:9650/ext/health
```

Contains the field `"healthy":true` in the returned JSON object.

!!! note

    If the node gets stuck during bootstrap (it takes far longer than the estimates given above), try to add the parameter [`--bootstrap-retry-enabled=false`](https://docs.avax.network/nodes/maintain/avalanchego-config-flags#--bootstrap-retry-enabled-boolean).

### 4. Additional Configuration

These are some of the most relevant command line parameters you can use.
You can read about all of them in the [Avalanche documentation](https://docs.avax.network/nodes/maintain/avalanchego-config-flags).

* [`--bootstrap-ips`](https://docs.avax.network/nodes/maintain/avalanchego-config-flags#--bootstrap-ips-string),
    [`--bootstrap-ids`](https://docs.avax.network/nodes/maintain/avalanchego-config-flags#--bootstrap-ids-string):
    IP address and node ID of the peer used to connect to the rest of the network for bootstrapping.

    You can use Flare's public nodes for this, as shown in the quick start command given above:

    === "Flare"

        Peer's IP address:

        ``` bash
        curl -m 10 -sX POST \
        --data '{ "jsonrpc":"2.0", "id":1, "method":"info.getNodeIP" }' \
        -H 'content-type:application/json;' \
        https://flare.flare.network/ext/info | jq -r ".result.ip"
        ```

        Peer's node ID:

        ``` bash
        curl -m 10 -sX POST \
        --data '{ "jsonrpc":"2.0", "id":1, "method":"info.getNodeID" }' \
        -H 'content-type:application/json;' \
        https://flare.flare.network/ext/info | jq -r ".result.nodeID"
        ```

    === "Songbird"

        Peer's IP address:

        ``` bash
        curl -m 10 -sX POST \
        --data '{ "jsonrpc":"2.0", "id":1, "method":"info.getNodeIP" }' \
        -H 'content-type:application/json;' \
        https://songbird.flare.network/ext/info | jq -r ".result.ip"
        ```

        Peer's node ID:

        ``` bash
        curl -m 10 -sX POST \
        --data '{ "jsonrpc":"2.0", "id":1, "method":"info.getNodeID" }' \
        -H 'content-type:application/json;' \
        https://songbird.flare.network/ext/info | jq -r ".result.nodeID"
        ```

    === "Coston"

        Peer's IP address:

        ``` bash
        curl -m 10 -sX POST \
        --data '{ "jsonrpc":"2.0", "id":1, "method":"info.getNodeIP" }' \
        -H 'content-type:application/json;' \
        https://coston.flare.network/ext/info | jq -r ".result.ip"
        ```

        Peer's node ID:

        ``` bash
        curl -m 10 -sX POST \
        --data '{ "jsonrpc":"2.0", "id":1, "method":"info.getNodeID" }' \
        -H 'content-type:application/json;' \
        https://coston.flare.network/ext/info | jq -r ".result.nodeID"
        ```

    === "Coston2"

        Peer's IP address:

        ``` bash
        curl -m 10 -sX POST \
        --data '{ "jsonrpc":"2.0", "id":1, "method":"info.getNodeIP" }' \
        -H 'content-type:application/json;' \
        https://coston2.flare.network/ext/info | jq -r ".result.ip"
        ```

        Peer's node ID:

        ``` bash
        curl -m 10 -sX POST \
        --data '{ "jsonrpc":"2.0", "id":1, "method":"info.getNodeID" }' \
        -H 'content-type:application/json;' \
        https://coston2.flare.network/ext/info | jq -r ".result.nodeID"
        ```

    Remember that you need to whitelist your node's IP address or your queries will always be answered with 403 error codes.

* [`--http-host`](https://docs.avax.network/nodes/maintain/avalanchego-config-flags#--http-host-string):
    Use `--http-host=` (empty) to allow connections from other machines.
    Otherwise, only connections from `localhost` are accepted.

* [`--http-port`](https://docs.avax.network/nodes/maintain/avalanchego-config-flags#--http-port-int):
    The port through which the node will listen to API requests.
    The default value is `9650`.

* [`--staking-port`](https://docs.avax.network/nodes/maintain/avalanchego-config-flags#--staking-port-int):
    The port through which the network peers will connect to this node externally.
    Having this port accessible from the internet is required for correct node operation.
    The default value is `9651`.

* [`--db-dir`](https://docs.avax.network/nodes/maintain/avalanchego-config-flags#--db-dir-string-file-path):
    Directory where the database is stored.
    Make sure to use a disk with enough space as recommended in the [Hardware prerequisites](#prerequisites) section.
    It defaults to `~/.avalanchego/db` on Flare and Coston2, and to `~/.flare/db` on Songbird and Coston.
{ #database-location }

    For example, you can use this option to store the database on an external drive.

* [`--chain-config-dir`](https://docs.avax.network/nodes/maintain/avalanchego-config-flags#--chain-config-dir-string):
    Optional JSON configuration file, in case you want to use lots of non-default values.

    ??? tip "Sample configuration file for observer nodes"

        These are the most common configuration options.
        Put them in a file in the `{chain-config-dir}/C/config.json` folder.

        ```json
        {
            "snowman-api-enabled": false,
            "coreth-admin-api-enabled": false,
            "eth-apis": [
                "public-eth",
                "public-eth-filter",
                "net",
                "web3",
                "internal-public-eth",
                "internal-public-blockchain",
                "internal-public-transaction-pool"
            ],
            "rpc-gas-cap": 50000000,
            "rpc-tx-fee-cap": 100,
            "pruning-enabled": true,
            "local-txs-enabled": false,
            "api-max-duration": 0,
            "api-max-blocks-per-request": 0,
            "allow-unfinalized-queries": false,
            "allow-unprotected-txs": false,
            "remote-tx-gossip-only-enabled": false,
            "log-level": "info"
        }
        ```

**Archival nodes**: An archival node keeps the whole history of the blockchain, instead of [pruning](glossary.md#pruning) old transactions which is the default setting.
Use the [`pruning-enabled`](https://docs.avax.network/nodes/maintain/chain-config-flags#pruning-enabled-boolean) configuration setting to control whether your node performs pruning or not.
Archival nodes have significantly increased disk requirements.

### 5. Maintaining a Healthy Node

In some cases, your node might not work correctly or you might receive unusual messages that appear difficult to troubleshoot.
Use the following solutions to ensure your node stays healthy:

* Remember that when your node has less than 16 peers, your node will not work correctly.
  To retrieve the number of connected peers, run the following command and find the line that contains `connectedPeers`:

    ```bash
    curl http://127.0.0.1:9650/ext/health | jq
    ```

    To automate the process, use:

    ```bash
    curl -s http://127.0.0.1:9650/ext/health | \
        jq -r ".checks.network.message.connectedPeers"
    ```

* If your node does not sync after a long time and abruptly stops working, ensure the [database location](#database-location) has sufficient disk space, and remember the database size might change a lot during bootstrapping.
* If you receive unusual messages after you make submissions or when transactions are reverted, your node might not be connected correctly.
  First, ensure the database location has sufficient disk space, and then restart the node.
* If you receive this error related to `GetAcceptedFrontier` during bootstrapping, your node was disconnected during bootstrapping.
   Restart the node.

    ```text
    failed to send GetAcceptedFrontier(MtF8bVH241hetCQJgsKEdKyJBs8vhp1BC, 11111111111111111111111111111111LpoYY, NUMBER)
    ```

* If you sync your node, but it stays unhealthy for no discernible reason, restart the node.
