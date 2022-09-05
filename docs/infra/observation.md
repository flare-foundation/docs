# Deploying an Observation Node

!!! note

    Flare nodes cannot be deployed yet. The following instructions are for Songbird and Coston only.

## Observation Nodes

Flare network is based on the Federated Byzantine Agreement (FBA) consensus algorithm, which is enforced by validator nodes.
In first stages of the Songbird and Flare life cycle, the set of core validators for producing blocks is run by Flare, but anyone can add an external node to observe the network and submit transactions.

Observation nodes connect directly to the core validators and offer you fast access to the network.
This is faster than using publicly provided nodes which usually enforce rate limiting.

## Why do I need an observation node?

Running an observation node is not mandatory.
A price provider can utilize public interfaces, i.e. public RPC nodes.
However, running your own observation nodes provides a safer, faster and more robust connection for submitting transactions and for reading events or other network data.
Your own node for submitting transactions enables sending those a few seconds later compared to public nodes.
These few precious seconds can be used by FTSO data providers for getting more price data before submitting transactions, for example.

## Setting up the node

Set up a local instance of a peering node to have a more stable connection.
To set up a node follow the instructions provided on the [Flare node repository](https://github.com/flare-foundation/flare#readme).
Make sure to have enough disk space to allow for database resizes.

## Whitelisting

To set up the observation node, you need to whitelist your peering IP.
Submit a whitelisting request [here](https://forms.gle/zHisUgitnSEHCGBb6).
You will be notified about the whitelisting process via your submitted email.
You can also check the status of whitelisting by running the command:

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

=== "Coston"

    ``` bash
    curl -m 10 -sX POST \
    --data '{ "jsonrpc":"2.0", "id":1, "method":"info.getNodeIP" }' \
    -H 'content-type:application/json;' \
    https://coston.flare.network/ext/info
    ```

Which will return a JSON containing node IP-s if your IP is whitelisted, or 403 otherwise.

## Running the node

After cloning and compiling the node, adjust the necessary configurations in `songbird.sh` so that the database location points to the external disk. Run `./cmd/songbird.sh` to start bootstrapping. The first bootstrap needs quite a long time to complete and a large amount of disk space (depends on the network size, it can be up to `2TB`). Be sure to have sufficient hardware to run the node efficiently, the current minimum specifications are: 8 CPU cores, 16 GB of RAM and at least 2 TB disk space.

After the bootstrap completes the query `curl http://127.0.0.1:9650/ext/health | jq` should return healthy and you can start using the node.

If you need to restart the node, use the flag `--existing` to reuse the existing downloaded database. This will enable much faster resync on restart.

## FAQ

### Do I need to re-whitelist my peering node IP?

No, you do not need to re-whitelist the IP address.

### I want to have greater redundancy and would like to whitelist multiple nodes, can I do that?

You can whitelist multiple IPs per single provider.

### Can an unhealthy node cause my TXs to revert?

Yes, at times, not enough connected peers can cause your transactions to revert. Make sure your node state is healthy and that it has enough connected peers.

### What is the required number of connected peers?

If the number of peers falls below 19, there is a good chance that some peers have disconnected from your node, try to restart it.

## Troubleshooting

### The node does not sync after a long time and dies abruptly, what to do?

Make sure, that the database location has sufficient disk space (database size might change a lot during bootstrapping).

### I'm getting strange errors on submission and revert messages are cryptic

This might be a symptom of node connection error. Try to restart node and make sure you have enough disk space.

### I am getting a strange error `failed to send GetAcceptedFrontier(MtF8bVH241hetCQJgsKEdKyJBs8vhp1BC, 11111111111111111111111111111111LpoYY, NUMBER)` when bootstrapping the node, what should I do?

It seems, that your node got disconnected during the bootstrapping. Restart the node, but to speed up the process, use `--existing` flag to reuse the data and don’t do the bootstrap from zero.

### I have synced the node but it does not become healthy. What can I do?

It often happens that a new node gets synced but stays unhealthy for no apparent reason. A restart with `--existing` flag usually helps.
