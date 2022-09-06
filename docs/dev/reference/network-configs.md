# Network Configurations

This is the information required to run a validator node or to develop on the different Flare networks.

* **Flare** is the [main network](glossary.md#main_network), launched in July 2022.
* **Songbird** is the [canary network](glossary.md#canary_network), used for testing features under “real fire” conditions, before deploying them on the main network, and live since September 2021.
* **Coston** is Flare's public [test network](glossary.md#coston) launched in January 2021.

## Configuration Values

|                            |          Flare           |          Songbird           |           Coston           |
| -------------------------- | :----------------------: | :-------------------------: | :------------------------: |
| ChainID                    |       [14][flrId]        |         [19][sgbId]         |        [16][cflrId]        |
| Asset Ticker               |          `FLR`           |            `SGB`            |           `CFLR`           |
| RPC endpoint `BETA`{.beta} |   [flare-api][flrRpc]    |   [songbird-api][sgbRpc]    |   [coston-api][cflrRpc]    |
| Block Explorer             | [flare-explorer][flrExp] | [songbird-explorer][sgbExp] | [coston-explorer][cflrExp] |
| Test Faucet                |            -             |              -              |  [coston-faucet][cflrFau]  |

All [RPC](glossary.md#rpc) endpoints are rate-limited to avoid spamming attacks.

!!! Danger "Beta"

    Please note that the offered public RPC endpoints are in an experimental phase and might suffer unexpected downtime.

!!! Example "Sample query"

    ```bash
    curl -s -m 10 https://flare-api.flare.network/ext/health | jq
    ```

## Additional Notes

* Address **derivation** and **format validation** are the same as on Ethereum.
The recommended BIP paths are `m/44’/60’/x’/0/0` (hardened) and `m/44’/60’/0’/0/x`.
* JavaScript API Docs: [https://web3js.readthedocs.io/en/v1.3.4/](https://web3js.readthedocs.io/en/v1.3.4/)
* Running a Node: [https://github.com/flare-foundation/flare](https://github.com/flare-foundation/flare)

## RPC Nodes for Connected Chains

Along with the endpoints listed above to interact with its own networks, Flare offers public [RPC](glossary.md#rpc) nodes for a series of other blockchain networks, to bootstrap development of connected services like [attestation providers](glossary.md#attestation).

!!! Danger "Beta"

    Please note that the offered public RPC endpoints are in an experimental phase and might suffer unexpected downtime.

=== "Bitcoin"

    **RPC endpoint**: [https://bitcoin-api.flare.network](https://bitcoin-api.flare.network)

    !!! Example "Sample query"

        ```bash
        curl -s -X POST -m 10 -H "Content-type: application/json" \
        -d '{"jsonrpc": "1.0", "id":"hc", "method": "getblockchaininfo", "params":[]}' \
        -u public:d681co1pe2l3wcj9adrm2orlk0j5r5gr3wghgxt58tvge594co0k1ciljxq9glei \
        https://bitcoin-api.flare.network | jq
        ```

=== "Litecoin"

    **RPC endpoint**: [https://litecoin-api.flare.network](https://litecoin-api.flare.network)

    !!! Example "Sample query"

        ```bash
        curl -s -X POST -m 10 -H "Content-type: application/json" \
        -d '{"jsonrpc": "1.0", "id":"hc", "method": "getblockchaininfo", "params":[]}' \
        -u public:ntvzi4i1yne499t7vcdjqhhp92m3jvm0bb6dkpr406gkndvuns9sg6th3jd393uc \
        https://litecoin-api.flare.network | jq
        ```

=== "Dogecoin"

    **RPC endpoint**: [https://dogecoin-api.flare.network](https://dogecoin-api.flare.network)

    !!! Example "Sample query"

        ```bash
        curl -s -X POST -m 10 -H "Content-type: application/json" \
        -d '{"jsonrpc": "1.0", "id":"hc", "method": "getblockchaininfo", "params":[]}' \
        -u public:6r1e5z3w9g6qruvkzkqvz8w67yqrq5js2cmyl2f1cncbp7gpp7tqixqskuub5v70 \
        https://dogecoin-api.flare.network | jq
        ```

=== "XRPL"

    **RPC endpoint**: [https://xrpl-api.flare.network](https://xrpl-api.flare.network)

    !!! Example "Sample query"

        ```bash
        curl -s -X POST -m 10 -H "Content-type: application/json" \
        -d '{"method": "server_info", "params":[{"api_version": 1}]}' \
        https://xrpl-api.flare.network | jq
        ```

=== "Algorand"

    **RPC endpoint**: [https://algorand-api.flare.network](https://algorand-api.flare.network)

    !!! Example "Sample query"

        ```bash
        curl -s -m 10 \
        -H "X-Algo-API-Token: zl748k3wddvld8cvn64utnslbf7otorkijp84se0f58pmuu0shgm27gttpcjpmuq" \
        https://algorand-api.flare.network/v2/status | jq
        ```

[flrId]: <https://github.com/ethereum-lists/chains/blob/master/_data/chains/eip155-14.json>
[sgbId]: <https://github.com/ethereum-lists/chains/blob/master/_data/chains/eip155-19.json>
[cflrId]: <https://github.com/ethereum-lists/chains/blob/master/_data/chains/eip155-16.json>
[flrRpc]: <https://flare-api.flare.network/>
[sgbRpc]: <https://songbird-api.flare.network/>
[cflrRpc]: <https://coston-api.flare.network/>
[flrExp]: <https://flare-explorer.flare.network/>
[sgbExp]: <https://songbird-explorer.flare.network/>
[cflrExp]: <https://coston-explorer.flare.network/>
[cflrFau]: <https://faucet.towolabs.com>
