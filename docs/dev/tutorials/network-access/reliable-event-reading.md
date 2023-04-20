# Reliable Event Reading

Subscription to events, for example using listeners, has proved to be unreliable, especially when high traffic exists on the network.

To reliably read events it is recommended to use the [`getPastEvents`](https://web3js.readthedocs.io/en/v1.5.2/web3-eth-contract.html#getpastevents) function on web3 contracts.

This function has parameters `fromBlock` and `toBlock` so the caller has to keep track of which blocks have already been requested.

The number of blocks the user can request in a single RPC call depends on the configuration of the RPC node being used.
In particular, if the node is run with the environment variable `WEB3_API` set to `debug` (a so-called "full node"), usually 100 blocks of events can be read in one call.
On the other hand, if `WEB3_API` is set to `enabled` (a "light node") only 1 block of events can be read.
