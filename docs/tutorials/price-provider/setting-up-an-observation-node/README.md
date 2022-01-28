# Setting up an observation node

### Observation node

Flare network is based on the Federated Byzantine Agreement (FBA) consensus algorithm, which is enforced by validator nodes. In first stage of Songbird life cycle, the set of core validators for producing blocks is run by Flare. Anyone can add an external node to observe the network and submit transactions. The observation node connects directly to the core validators and offers you fast access to the network. This is faster than using publicly provided nodes which usually enforce rate limiting.

### Why do I need an observation node?

Running an observation node is not mandatory. A price provider can utilize public interfaces, AKA public RPC nodes. Alas, running your own observation nodes provides a safer, faster and more robust connection, for submitting transactions and for reading events or other network data. Your own node for submitting transactions (`submitHashes`) enables sending those a few seconds later compared to public nodes. These few precious seconds can be used for getting more price data data before submitting your transaction.

### **Setting up the node**

Set up a local instance of peering node to have a more stable connection. To set up a node follow the instructions provided on the [node-config](https://gitlab.com/flarenetwork/node-config) repo. Make sure to have enough disk space to allow for db resizes.

### Whitelisting

To set up the observation node, you need to whitelist your peering IP. Submit a whitelisting request [here](https://forms.gle/zHisUgitnSEHCGBb6). You will be notified about the whitelisting process via your submitted email. You can also check the status of whitelisting by running the command

```
curl -m 10 -sX POST --data '{ "jsonrpc":"2.0", "id":1, "method":"info.getNodeIP" }' -H 'content-type:application/json;' https://songbird.flare.network/ext/info
```

Which will return a json containing node IP-s if your IP is whitelisted.

### Running the node

After cloning and compiling the songbird node, adjust the necessary configurations in `songbird.sh` so that the database location points to the external disk. Run `./cmd/songbird.sh` to start bootstrapping. The first bootstrap needs quite a long time to complete and a large amount of disk space (depends on the network size, it can be up to `2TB`). Be sure to have sufficient hardware to run the node efficiently, the current minimum specifications are: 16 cpu cores 16GB of RAM and at least 1-2TB disk space.

After the bootstrap completes the query `curl http://127.0.0.1:9650/ext/health | jq .`  the query will return healthy and you can start using the node.

If you need to restart the node, use the flag `--existing` to reuse the existing downloaded database. This will enable much faster resync on restart.
