# FAQ

## Do I need to re-whitelist my peering node IP?

No, you do not need to re-whitelist the IP address.

## I want to have greater redundancy and would like to whitelist multiple nodes, can I do that?

Yes, you can whitelist multiple IPs per single provider.

## Can an unhealthy node cause my transactions to revert?

Yes, at times, not enough connected peers can cause your transactions to revert.
Make sure your node state is healthy and that it has enough connected peers.

## How do I check the number of connected peers?

```bash
curl http://127.0.0.1:9650/ext/health | jq
```

And look for the line containing `connectedPeers`.

If you want to automate the process you can use:

```bash
curl -s http://127.0.0.1:9650/ext/health | \
    jq -r ".checks.network.message.connectedPeers"
```

## What is the required number of connected peers?

If the number of peers falls below 16, chances are your node will not work correctly.

While the network is being decentralized, any number below 20 is indication of a problem.

In any case, try restarting the node.

## The node does not sync after a long time and dies abruptly, what should I do?

Make sure, that the database location has sufficient disk space (database size might change a lot during bootstrapping).

## I am getting strange errors on submission and revert messages are cryptic

This might be a symptom of a node connection error.
Try to restart the node and make sure you have enough disk space.

## I am getting a strange error related to `GetAcceptedFrontier` during bootstrapping

```text
failed to send GetAcceptedFrontier(MtF8bVH241hetCQJgsKEdKyJBs8vhp1BC, 11111111111111111111111111111111LpoYY, NUMBER)
```

It looks like your node got disconnected during bootstrapping.
Try restarting the node.

## I have synced the node but it does not become healthy. What can I do?

It often happens that a new node gets synced but stays unhealthy for no apparent reason.
A restart usually helps.
