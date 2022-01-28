# ⛏ Multi-Chain Merge Mining

Flare leverages a 'merge-mining' approach for its block production where miners of existing blockchains have the opportunity to produce blocks on Flare in parallel to their mining responsibility on their host chain, earning mining rewards on Flare for doing so.

{% embed url="https://twitter.com/Santiag78758327/status/1365119557627691011?s=20" %}

The key design decisions of this mechanism are:

* The set of underlying chains used for merge-mining is based on the chains leveraged in the [F-asset protocol](https://flare.xyz/creating-and-redeeming-fxrp/).
* The relative validation power of each underlying chain on Flare is shared uniformly among all the used underlying chains.
* Miners gain more _sampling probability_ in leader-election, i.e. more likelihood to produce a block on Flare, based on their relative mining power output on their underlying chain.

Below is an example Flare consensus sampling probability distribution:

```java
{
  "validators": [
    {
      "nodeID": "NodeID-GQ4292fG2RMRWa7RtphPJTYHeMR5YAQPM",
      "origin": "chain-0",
      "weighting": 25
    },
    {
      "nodeID": "NodeID-GMHrauiUPGikdbT4Z65dEBFpfQWKovLy5",
      "origin": "chain-1",
      "weighting": 20
    },
    {
      "nodeID": "NodeID-DhdvGK268cNmDPzvh1Vw7rzSmT1tptSUB",
      "origin": "chain-3",
      "weighting": 19
    },
    {
      "nodeID": "NodeID-hBfmpWJ87GSPHUtxthGd2fHsVdaGmkgq",
      "origin": "chain-2",
      "weighting": 14
    },
    {
      "nodeID": "NodeID-LtahNtUH9tb4VCZZipLNqkBCxzjpFTdHs",
      "origin": "chain-1",
      "weighting": 11
    },
    {
      "nodeID": "NodeID-34KwvqefLeXYPrzcNjc4yMPRpMfE89ppw",
      "origin": "chain-2",
      "weighting": 8
    },
    {
      "nodeID": "NodeID-G9CJC4te7FyH1XyMugsRqVYYZBuTreFvd",
      "origin": "chain-3",
      "weighting": 2
    },
    {
      "nodeID": "NodeID-HhAo3hwTn73UB1LxU131gXrs7HMnMxmdE",
      "origin": "chain-0",
      "weighting": 1
    }
  ]
}

```

The probability of any particular validator $$V$$ in the above list being sampled during consensus is then:

$$
\frac{\texttt{weighting}_V}{\sum{\texttt{weighting}}}
$$

Flare mining rewards are only distributed when a block is produced, so uptime is a requirement for being rewarded.
