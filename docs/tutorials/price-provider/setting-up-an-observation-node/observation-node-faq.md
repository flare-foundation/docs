# Observation Node FAQ

### Do I need to re-whitelist my peering node IP?

No, you do not need to re-whitelist the IP address.

### I want to have greater redundancy and would like to whitelist multiple nodes, can I do that?

You can whitelist multiple IPs per single provider.

### Can an unhealthy node cause my TXs to revert?

Yes, at times, not enough connected peers can cause your transactions to revert. Make sure your node state is healthy and that it has enough connected peers.

### What is the required number of connected peers?

If the number of peers falls below 19, a good chance that some of the peers have disconnected from your node, try to restart it.
