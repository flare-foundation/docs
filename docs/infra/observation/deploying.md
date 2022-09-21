# Deploying an Observation Node

## Introduction

Observation nodes enable anyone to observe the network and submit transactions.
Unlike [validator nodes](../../tech/validators.md), which provide state consensus and add blocks, observation nodes remain outside the network and have no effect on consensus or blocks.

Running an observation node is optional.
However, submitting transactions through your own node offers a number of benefits:

* Transactions are sent directly to the network instead of through a third party, removing a potential security risk.
* Public nodes are usually rate-limited (the amount of requests they accept per second is restricted).
* The time savings described above allow [FTSO data providers](glossary.md#data_provider) to submit their data a few seconds later, thus having more time to gather price data before submitting.

## Prerequisites

This guide contains different instructions depending on which Flare Network you want to deploy to, so [make sure you are aware of the available networks](../../dev/reference/network-configs.md).

=== "Flare"

    |                 | Hardware    |                      | Software                                                        |
    | --------------: | :---------- | -------------------: | --------------------------------------------------------------- |
    |   **CPU cores** | 8           | **Operating System** | Ubuntu (18.04 or 20.04) or macOS (>= 10.15 Catalina)            |
    |         **RAM** | 32          |     **Dependencies** | [Go](https://golang.org/doc/install){target=_blank} (>= 1.18.5) |
    |  **Disk space** | 1 TB SSD    |                      | [gcc](https://gcc.gnu.org/){target=_blank}                      |
    | **Disk growth** | 2.5 TB/year |                      | [g++](https://gcc.gnu.org/){target=_blank}                      |
    |                 |             |                      | [jq](https://stedolan.github.io/jq/){target=_blank}             |

=== "Songbird"

    |                 | Hardware    |                      | Software                                                        |
    | --------------: | :---------- | -------------------: | --------------------------------------------------------------- |
    |   **CPU cores** | 8           | **Operating System** | Ubuntu (18.04 or 20.04) or macOS (>= 10.15 Catalina)            |
    |         **RAM** | 32          |     **Dependencies** | [Go](https://golang.org/doc/install){target=_blank} (>= 1.16.8) |
    |  **Disk space** | 3.5 TB SSD  |                      | [gcc](https://gcc.gnu.org/){target=_blank}                      |
    | **Disk growth** | 2.5 TB/year |                      | [g++](https://gcc.gnu.org/){target=_blank}                      |
    |                 |             |                      | [jq](https://stedolan.github.io/jq/){target=_blank}             |

=== "Coston"

    |                 | Hardware    |                      | Software                                                        |
    | --------------: | :---------- | -------------------: | --------------------------------------------------------------- |
    |   **CPU cores** | 4           | **Operating System** | Ubuntu (18.04 or 20.04) or macOS (>= 10.15 Catalina)            |
    |         **RAM** | 16          |     **Dependencies** | [Go](https://golang.org/doc/install){target=_blank} (>= 1.16.8) |
    |  **Disk space** | 500 GB SSD  |                      | [gcc](https://gcc.gnu.org/){target=_blank}                      |
    | **Disk growth** | 250 GB/year |                      | [g++](https://gcc.gnu.org/){target=_blank}                      |
    |                 |             |                      | [jq](https://stedolan.github.io/jq/){target=_blank}             |

=== "Coston 2"

    |                 | Hardware    |                      | Software                                                        |
    | --------------: | :---------- | -------------------: | --------------------------------------------------------------- |
    |   **CPU cores** | 4           | **Operating System** | Ubuntu (18.04 or 20.04) or macOS (>= 10.15 Catalina)            |
    |         **RAM** | 16          |     **Dependencies** | [Go](https://golang.org/doc/install){target=_blank} (>= 1.18.5) |
    |  **Disk space** | 500 GB SSD  |                      | [gcc](https://gcc.gnu.org/){target=_blank}                      |
    | **Disk growth** | 250 GB/year |                      | [g++](https://gcc.gnu.org/){target=_blank}                      |
    |                 |             |                      | [jq](https://stedolan.github.io/jq/){target=_blank}             |

Plus a reliable IPv4 or IPv6 network connection, with an open public port.

Keep in mind that enabling [pruning](glossary.md#pruning) as [described below](#additional-configuration) can reduce the required disk space by as much as 60%.

## Installation

=== "Flare & Coston 2"

    Clone the [go-flare](https://github.com/flare-foundation/go-flare){target=_blank} repository and run the `build.sh` script:

    ```bash
    git clone git@github.com:flare-foundation/go-flare.git
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

    Clone the [go-songbird](https://github.com/flare-foundation/go-songbird){target=_blank} repository and run the `build.sh` script:

    ```bash
    git clone git@github.com:flare-foundation/go-songbird.git
    cd go-songbird
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

## Running the node

### Node whitelisting

While the Flare and Songbird networks are being tested, all nodes wanting to peer with them (including observation nodes) need to have their IP address **whitelisted**.

To do this, please **contact Tom T.** over Discord (`Tom T#7603`), Telegram (`@TampaBay7`) or email ([tom@flare.network](mailto:tom@flare.network){target=_blank}) and request to be whitelisted.

??? tip "Checking the status of your whitelisting request"

    You can also check the status of your request by running:

    === "Flare"

        ``` bash
        curl -m 10 -sX POST \
        --data '{ "jsonrpc":"2.0", "id":1, "method":"info.getNodeIP" }' \
        -H 'content-type:application/json;' \
        https://flare.flare.network/ext/info
        ```

    === "Songbird"

        ``` bash
        curl -m 10 -sX POST \
        --data '{ "jsonrpc":"2.0", "id":1, "method":"info.getNodeIP" }' \
        -H 'content-type:application/json;' \
        https://songbird.flare.network/ext/info
        ```

    If your IP address is whitelisted, this command returns a JSON response.
    Otherwise you will get a 403 error ("Forbidden").

Please note that whitelisting is **not needed** on the **Coston and Coston 2 networks**.

### Quick start

This is the minimum command to quickly get your node up and running.
To understand each parameter read the following section.

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

=== "Coston 2"

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

You will know your node is fully booted and accepting transactions when the output of this command:

```bash
curl http://127.0.0.1:9650/ext/health
```

Contains the field `"healthy":true` in the returned JSON object.

!!! note

    If the node gets stuck during bootstrap (it takes far longer than the estimates given above), try to add the parameter [`--bootstrap-retry-enabled=false`](https://docs.avax.network/nodes/maintain/avalanchego-config-flags#--bootstrap-retry-enabled-boolean){target=_blank}.

### Additional Configuration

These are some of the most relevant command line parameters you can use.
You can read about all of them in the [Avalanche documentation](https://docs.avax.network/nodes/maintain/avalanchego-config-flags){target=_blank}.

* [`--bootstrap-ips`](https://docs.avax.network/nodes/maintain/avalanchego-config-flags#--bootstrap-ips-string){target=_blank},
    [`--bootstrap-ids`](https://docs.avax.network/nodes/maintain/avalanchego-config-flags#--bootstrap-ids-string){target=_blank}:
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

    === "Coston 2"

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

    Remember that you need to whitelist your node's IP address your queries will always be answered with 403 error codes.

* [`--http-host`](https://docs.avax.network/nodes/maintain/avalanchego-config-flags#--http-host-string){target=_blank}:
    Use `--http-host=` (empty) to allow connections from other machines.
    Otherwise, only connections from `localhost` are accepted.

* [`--http-port`](https://docs.avax.network/nodes/maintain/avalanchego-config-flags#--http-port-int){target=_blank}:
    The port through which the node will listen to API requests.
    The default value is `9650`.

* [`--staking-port`](https://docs.avax.network/nodes/maintain/avalanchego-config-flags#--staking-port-int){target=_blank}:
    The port through which the network peers will connect to this node externally.
    Having this port accessible from the internet is required for correct node operation.
    The default value is `9651`.

* [`--db-dir`](https://docs.avax.network/nodes/maintain/avalanchego-config-flags#--db-dir-string-file-path){target=_blank}:
    Directory where the database is stored.
    Make sure to use a disk with enough space as recommended in the [Hardware prerequisites](#prerequisites) section.
    It defaults to `~/.avalanchego/db` on Flare and Coston 2, and to `~/.flare/db` on Songbird and Coston.

    You can use this option to store the database on an external drive, for example.

* [`--pruning-enabled`](https://docs.avax.network/nodes/maintain/chain-config-flags#pruning-enabled-boolean){target=_blank}:
    Enables [pruning](glossary.md#pruning) of old transactions, greatly reducing disk size requirements.
    It defaults to `true`.

    It you want to create a so-called **archival node**, i.e., one that keeps the whole history of the blockchain, set this parameter to `false`.

* [`--chain-config-dir`](https://docs.avax.network/nodes/maintain/avalanchego-config-flags#--chain-config-dir-string){target=_blank}:
    Optional JSON configuration file, in case you want to use lots of non-default values.

    ??? tip "Sample configuration file"

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
