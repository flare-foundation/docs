---
search:
  boost: 2
---

# Network Configuration

!!! warning "Only EVM versions up to London are currently supported"

    All Flare networks support only EVM versions up to London.

    Learn how to set the EVM version in your compiler in [the Solidity documentation](https://docs.soliditylang.org/en/latest/using-the-compiler.html#setting-the-evm-version-to-target).
    [Example of how to do this using Hardhat](https://github.com/flare-foundation/flare-hardhat-starter/blob/master/hardhat.config.ts#L32).

## Flare Networks

These are the values required to configure [the different Flare networks](../../tech/flare.md#flare-networks):

<div class="important-table" markdown>
=== "Flare"

    | ![logo-FLR.png](logo-FLR.png){width=64px}                | Flare                                          |
    | -------------------------------------------------------- | ---------------------------------------------- |
    | **Chain ID**                                             | [14][flrId]                                    |
    | **Asset Ticker**                                         | `FLR`                                          |
    | [**RPC endpoint**](glossary.md#rpc)                      | `https://flare-api.flare.network/ext/bc/C/rpc` |
    | [**Rosetta API**][rosetta-api]                           | `https://flare-rosetta-api.flare.network/`     |
    | [**Block Explorer**](glossary.md#block_explorer)         | <https://flare-explorer.flare.network>         |
    | [**Bootstraping nodes**](glossary.md#bootstrapping_node) | <ul><li>`https://flare.flare.network`</li><li>`https://flare-bootstrap-1.staking.production.figment.io`</li><li>`https://flare.senseinode.com`</li></ul> |

    ??? example "Sample query"

        You can check that you are accessing the RPC endpoint correctly with this sample query:

        ```bash
        curl -s -m 10 --request POST 'https://flare-api.flare.network/ext/bc/C/rpc' \
            -H 'Content-Type: application/json' \
            -d '{
                    "jsonrpc":"2.0",
                    "method":"eth_blockNumber",
                    "params":[],
                    "id":1
            }'
        ```

        It should return the current chain height in a message similar to:

        ```json
        {"jsonrpc":"2.0","id":1,"result":"0x103384"}
        ```

=== "Songbird"

    | ![logo-SGB.png](logo-SGB.png){width=64px}                | Songbird                                           |
    | -------------------------------------------------------- | -------------------------------------------------- |
    | **Chain ID**                                             | [19][sgbId]                                        |
    | **Asset Ticker**                                         | `SGB`                                              |
    | [**RPC endpoint**](glossary.md#rpc)                      | `https://songbird-api.flare.network/ext/bc/C/rpc`  |
    | [**Block Explorer**](glossary.md#block_explorer)         | <https://songbird-explorer.flare.network>          |
    | [**Bootstraping nodes**](glossary.md#bootstrapping_node) | `https://songbird.flare.network`                   |

    ??? example "Sample query"

        You can check that you are accessing the RPC endpoint correctly with this sample query:

        ```bash
        curl -s -m 10 --request POST 'https://songbird-api.flare.network/ext/bc/C/rpc' \
            -H 'Content-Type: application/json' \
            -d '{
                    "jsonrpc":"2.0",
                    "method":"eth_blockNumber",
                    "params":[],
                    "id":1
            }'
        ```

        It should return the current chain height in a message similar to:

        ```json
        {"jsonrpc":"2.0","id":1,"result":"0x103384"}
        ```

=== "Coston"

    | ![logo-CST.png](logo-CFLR.png){width=64px}               | Coston                                          |
    | -------------------------------------------------------- | ----------------------------------------------- |
    | **Chain ID**                                             | [16][cflrId]                                    |
    | **Asset Ticker**                                         | `CFLR`                                          |
    | [**RPC endpoint**](glossary.md#rpc)                      | `https://coston-api.flare.network/ext/bc/C/rpc` |
    | [**Block Explorer**](glossary.md#block_explorer)         | <https://coston-explorer.flare.network>         |
    | [**Bootstraping nodes**](glossary.md#bootstrapping_node) | `https://coston.flare.network`                  |
    | **Test Faucet**                                          | <https://faucet.flare.network>                  |

    ??? example "Sample query"

        You can check that you are accessing the RPC endpoint correctly with this sample query:

        ```bash
        curl -s -m 10 --request POST 'https://coston-api.flare.network/ext/bc/C/rpc' \
            -H 'Content-Type: application/json' \
            -d '{
                    "jsonrpc":"2.0",
                    "method":"eth_blockNumber",
                    "params":[],
                    "id":1
            }'
        ```

        It should return the current chain height in a message similar to:

        ```json
        {"jsonrpc":"2.0","id":1,"result":"0x103384"}
        ```

=== "Coston2"

    | ![logo-CST2.png](logo-C2FLR.png){width=64px}             | Coston2                                          |
    | -------------------------------------------------------- | ------------------------------------------------ |
    | **Chain ID**                                             | [114][c2flrId]                                   |
    | **Asset Ticker**                                         | `C2FLR`                                          |
    | [**RPC endpoint**](glossary.md#rpc)                      | `https://coston2-api.flare.network/ext/bc/C/rpc` |
    | [**Block Explorer**](glossary.md#block_explorer)         | <https://coston2-explorer.flare.network>         |
    | [**Bootstraping nodes**](glossary.md#bootstrapping_node) | `https://coston2.flare.network`                  |
    | **Test Faucet**                                          | <https://faucet.flare.network>                   |

    ??? example "Sample query"

        You can check that you are accessing the RPC endpoint correctly with this sample query:

        ```bash
        curl -s -m 10 --request POST 'https://coston2-api.flare.network/ext/bc/C/rpc' \
            -H 'Content-Type: application/json' \
            -d '{
                    "jsonrpc":"2.0",
                    "method":"eth_blockNumber",
                    "params":[],
                    "id":1
            }'
        ```

        It should return the current chain height in a message similar to:

        ```json
        {"jsonrpc":"2.0","id":1,"result":"0x103384"}
        ```
</div>

All public [RPC](glossary.md#rpc) endpoints are experimental and rate-limited to avoid spamming attacks.
For a production-grade option check out Flare's [API Portal](../../tech/api-portal.md) and the [Google Cloud Marketplace](https://console.cloud.google.com/marketplace/product/flare-public/api-portal-flare-network).

## Connected Networks

Along with the endpoints listed above to interact with its own networks, Flare offers public [RPC](glossary.md#rpc) nodes for a series of other blockchain networks, to bootstrap development of connected services like [attestation providers](glossary.md#attestation).

All public [RPC](glossary.md#rpc) endpoints are experimental and rate-limited to avoid spamming attacks.
For a production-grade option check out Flare's [API Portal](../../tech/api-portal.md) and the [Google Cloud Marketplace](https://console.cloud.google.com/marketplace/product/flare-public/api-portal-flare-network).

??? info "Algorand"

    * **RPC endpoint**: `https://algorand-api.flare.network`
    * **Sample query**:

        ```bash
        curl -s -m 10 \
        -H "X-Algo-API-Token: zl748k3wddvld8cvn64utnslbf7otorkijp84se0f58pmuu0shgm27gttpcjpmuq" \
        https://algorand-api.flare.network/v2/status | jq
        ```

??? info "Avalanche"

    * **RPC endpoint**: `https://avalanche-api.flare.network`
    * **Sample query**:

        ```bash
        curl -X POST \
        -H 'content-type:application/json' \
        --data '{
            "jsonrpc": "2.0",
            "id": 1,
            "method": "info.getNodeVersion"
        }' https://avalanche-api.flare.network/ext/info | jq
        ```

??? info "Bitcoin"

    * **RPC endpoint**: `https://bitcoin-api.flare.network`
    * **Sample query**:

    ```bash
    curl -s -X POST -m 10 -H "Content-type: application/json" \
    -d '{"jsonrpc": "1.0", "id":"hc", "method": "getblockchaininfo", "params":[]}' \
    -u public:d681co1pe2l3wcj9adrm2orlk0j5r5gr3wghgxt58tvge594co0k1ciljxq9glei \
    https://bitcoin-api.flare.network | jq
    ```

??? info "BNB-BSC"

    * **RPC endpoint**: `https://bnb-bsc-api.flare.network`
    * **Sample query**:

        ```bash
        curl -s -X POST -m 10 -H "Content-Type: application/json" \
        -d '{"jsonrpc": "2.0", "id":67, "method":"eth_blockNumber", "params":[]}' \
        https://bnb-bsc-api.flare.network | jq
        ```

??? info "Cosmos Hub"

    * **RPC endpoint**: `https://cosmos-rpc-api.flare.network`
    * **Sample query**:

        ```bash
        curl -s -X GET -m 10 -H "Content-type: application/json" \
        "https://cosmos-rpc-api.flare.network/block?height=19570438" | jq
        ```

    * **RPC endpoint**: `https://cosmos-rest-api.flare.network`
    * **Sample query**:

        ```bash
        curl -s -X GET -m 10 -H "Content-type: application/json" \
        https://cosmos-rest-api.flare.network/blocks/latest | jq
        ```

??? info "Dogecoin"

    * **RPC endpoint**: `https://dogecoin-api.flare.network`
    * **Sample query**:

        ```bash
        curl -s -X POST -m 10 -H "Content-type: application/json" \
        -d '{"jsonrpc": "1.0", "id":"hc", "method": "getblockchaininfo", "params":[]}' \
        -u public:6r1e5z3w9g6qruvkzkqvz8w67yqrq5js2cmyl2f1cncbp7gpp7tqixqskuub5v70 \
        https://dogecoin-api.flare.network | jq
        ```

??? info "Ethereum"

    Ethereum has two layers: the execution layer and consensus layer, which work in tandem.

    * The execution layer creates blocks with transactions and executes smart contracts.
    * The consensus layer, sometimes referred to as the beacon chain, governs consensus and was the extra layer required for the Ethereum 2.0 proof-of-stake (PoS) merge.

    These two layers have their own API, which can be called from the provided nodes. When querying the Ethereum network nodes, specifying only the root path `/` will target the execution layer API. Prefixing your path with `/eth` will target the consensus layer API.

    Official API specifications for each layer:

    * [Consensus Layer - API Spec](https://ethereum.github.io/beacon-APIs/#/)
    * [Execution Layer - API Spec](https://ethereum.github.io/execution-apis/api-documentation/)

    === "Mainnet"

        * **RPC endpoint**: `https://ethereum-api.flare.network`
        * **Sample query - consensus layer**:

            ```bash
            curl -s -X GET -m 10 -H "Content-type: application/json" \
            https://ethereum-api.flare.network/eth/v1/beacon/pool/attestations | jq
            ```
        * **Sample query - execution layer**:

            ```bash
            curl -s -X POST -m 10 -H "Content-Type: application/json" \
            -d '{"jsonrpc": "2.0", "id":67, "method":"eth_blockNumber", "params":[]}' \
            https://ethereum-api.flare.network | jq
            ```

    === "Goerli"

        * **RPC endpoint**: `https://goerli-api.flare.network`
        * **Sample query - consensus layer**:

            ```bash
            curl -s -X GET -m 10 -H "Content-type: application/json" \
            https://goerli-api.flare.network/eth/v1/beacon/pool/attestations | jq
            ```
        * **Sample query - execution layer**:

            ```bash
            curl -s -X POST -m 10 -H "Content-Type: application/json" \
            -d '{"jsonrpc": "2.0", "id":67, "method":"eth_blockNumber", "params":[]}' \
            https://goerli-api.flare.network | jq
            ```

    === "Sepolia"

        * **RPC endpoint**: `https://sepolia-api.flare.network`
        * **Sample query - consensus layer**:

            ```bash
            curl -s -X GET -m 10 -H "Content-type: application/json" \
            https://sepolia-api.flare.network/eth/v1/beacon/pool/attestations | jq
            ```
        * **Sample query - execution layer**:

            ```bash
            curl -s -X POST -m 10 -H "Content-Type: application/json" \
            -d '{"jsonrpc": "2.0", "id":67, "method":"eth_blockNumber", "params":[]}' \
            https://sepolia-api.flare.network | jq
            ```

??? info "Filecoin"

    * **RPC endpoint**: `https://filecoin-api.flare.network/rpc/v1`
    * **Sample query**:

        ```bash
        curl -X POST -H "Content-type: application/json" \
        -d '{"jsonrpc": "2.0", "id": "1", "method": "Filecoin.NodeStatus", "params": [true]}' \
        "https://filecoin-api.flare.network/rpc/v1" | jq
        ```

??? info "Litecoin"

    * **RPC endpoint**: `https://litecoin-api.flare.network`
    * **Sample query**:

        ```bash
        curl -s -X POST -m 10 -H "Content-type: application/json" \
        -d '{"jsonrpc": "1.0", "id":"hc", "method": "getblockchaininfo", "params":[]}' \
        -u public:ntvzi4i1yne499t7vcdjqhhp92m3jvm0bb6dkpr406gkndvuns9sg6th3jd393uc \
        https://litecoin-api.flare.network | jq
        ```

??? info "Polygon"

    * **RPC endpoint**: `https://polygon-api.flare.network`
    * **Sample query**:

        ```bash
        curl -X GET -H "Content-type: application/json" \
        https://polygon-api.flare.network/block?height=1000 | jq
        ```

??? info "Solana"

    * **RPC endpoint**: `https://solana-api.flare.network`
    * **Sample query**:

        ```bash
        curl -s -X POST -m 10 -H "Content-type: application/json" \
        -d '{"jsonrpc": "2.0", "id": 1, "method": "getVersion"}' \
        https://solana-api.flare.network | jq
        ```

??? info "XRPL"

    * **RPC endpoint**: `https://xrpl-api.flare.network`
    * **Sample query**:

        ```bash
        curl -s -X POST -m 10 -H "Content-type: application/json" \
        -d '{"method": "server_info", "params":[{"api_version": 1}]}' \
        https://xrpl-api.flare.network | jq
        ```

[flrId]: <https://github.com/ethereum-lists/chains/blob/master/_data/chains/eip155-14.json>
[sgbId]: <https://github.com/ethereum-lists/chains/blob/master/_data/chains/eip155-19.json>
[cflrId]: <https://github.com/ethereum-lists/chains/blob/master/_data/chains/eip155-16.json>
[c2flrId]: <https://github.com/ethereum-lists/chains/pull/1559/files>
[rosetta-api]: <https://www.rosetta-api.org/>
