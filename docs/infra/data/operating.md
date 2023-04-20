# Operating a Data Provider

## Introduction

!!! info inline end "Quick links"

    * [NPM Kickoff package](https://www.npmjs.com/package/@flarenetwork/ftso_price_provider_kick_off_package)
    * [Reference implementation](https://github.com/flare-foundation/FTSO-price-provider)

[Data providers](../../tech/glossary.md#data_provider) play an essential role in the decentralized oracle system by submitting data to on-chain contracts deployed on the Flare and Songbird networks.
Operating a data provider generates rewards in `$FLR`, `$SGB`, or both for you and the people who delegate tokens to you.
To maximize your rewards, your data provider needs to be constantly available and operating.
If your data provider is unavailable and doesn't send data during a specific epoch, you and your delegators won't earn rewards during that epoch.

If all the submission and reveal transactions are successful, the cost is approximately 3 - 4 `$FLR` or `$SGB` per day.

Data providers consist of the following code components, and you can write them in any language:

* **FTSO interface**: The code that submits data to the FTSO.
  This code is all the necessary logic to determine which data epoch you want to submit data in and to assess when and what to submit throughout all reward epochs.
* **Data algorithm**: The code that runs the algorithm that collects and processes data.
  The more efficient this code is the better advantage over competing data providers you will have.
  Consider [these tips for maximizing your advantage](#maximizing-your-data-algorithms-performance).

The rest of this guide explains how to deploy and operate a data provider.

## Prerequisites

While none of the listed prerequisites are required, you will be more successful if you have them before you try to deploy an FTSO data provider:

* Familiarity with smart contracts, signal processing, game theory, and prompt data submission on blockchains
* Experience with a coding language that has a web3 library, for example:

    | Language   | Web3 Library                                                               |
    | ---------- | -------------------------------------------------------------------------- |
    | Go         | [go-web3](https://github.com/chenzhijie/go-web3)                           |
    | Java       | [web3.j](https://docs.web3j.io/)                                           |
    | JavaScript | [ethers.js](https://docs.ethers.org/v5/), [web3.j](https://docs.web3j.io/) |
    | Node.js    | [ethers.js](https://docs.ethers.org/v5/), [web3.j](https://docs.web3j.io/) |
    | Python     | [web3.py](https://web3py.readthedocs.io/en/v5/)                            |
    | Rust       | [rust-web3](https://docs.rs/web3/latest/web3/)                             |

## Getting Started

To start building your data provider, use the [npm kick-off package](https://www.npmjs.com/package/@flarenetwork/ftso_price_provider_kick_off_package).
It showcases the main contracts related to whitelisting a data provider and submitting data, and it enables you to deploy FTSO mock contracts in a local setup and submit data to those contracts.

Providing data by using this package is like providing data on-chain.
The following aspects work identically in the package and on-chain:

* Smart-contract APIs
* Events

Timing aspects in the package work similarly but not identically to timing aspects on-chain.
The package does not run the weighted-median algorithm or do calculations to distribute rewards like the FTSO smart contract deployed on-chain does.

The [Flare Network price provider](https://github.com/flare-foundation/FTSO-price-provider) repository shows an example of a data-provider implementation.
This implementation shows the FTSO interface and a sample data algorithm.
To earn rewards, you must write your own data algorithm.

## Interacting with Smart Contracts

Data providers interact primarily with the `PriceSubmitter` contract and the different `FTSO` contracts.
The `PriceSubmitter` contract, with which you submit data, is deployed at the fixed address `0x1000000000000000000000000000000000000003`.
It has links to the following contracts:

* `FtsoRegistry`: Holds information about specific FTSOs, their symbols, indices, and addresses.
  To see supported tickers, query the `getSupportedSymbols` method.
  New tickers can be added by a governance vote.
* `FtsoManager`: Holds epoch and voting-related configuration data, oversees all FTSOs, and gives access to additional useful contracts, such as the `Inflation` and `Supply` contracts.
* `VoterWhitelister`: Accepts the names of data providers that list themselves to submit data.

Find more information, including the contract addresses, in the [Contract Addresses](../../dev/getting-started/contract-addresses.md) page.

## Generating Random Numbers

The data-providing process is structured as a commit-and-reveal scheme to prevent users from copying another user's submitted data.
The commit-and-reveal phases are restricted to only a few minutes in duration.
With each reveal the data provider also provides a random number.
The random number is used first as a salt in the commit-and-reveal scheme and later during the reward calculation process.

Strong random numbers are important for network security because they are the only true source of randomness on the network, and they make the commit-and-reveal scheme resilient to attacks. Random numbers below 2^128^ are considered weak and unsafe, and they are rejected when they are revealed.

To provide strong, cryptographically secure, random numbers with high entropy and sufficient range, consider implementing the following strategies:

* Use available random-number generators, such as the [`csprng library`](https://www.npmjs.com/package/csprng) for Node.js applications or the `web3.utils.toBN(web3.utils.randomHex(32))` function in the [`web3.utils` package](https://web3js.readthedocs.io/en/v1.2.11/web3-utils.html) for JavaScript.
* Submit 256-bit random numbers.

## Calculating Hash for the Commit-and-Reveal Scheme

The [FTSO price provider](https://gitlab.com/flarenetwork/flare-smart-contracts/-/blob/master/docs/specs/PriceProvider.md) shows the complete specification for the commit-and-reveal scheme.

The following code snippets show how to generate hashes in Typescript and Python using publicly available web3 libraries:

=== "Typescript"

     ```typescript
     import BN from "bn.js";
     import {
         BigNumber
     } from "ethers";
     import {
         ethers
     } from "hardhat";
     const MIN_RANDOM = web3.utils.toBN(2).pow(web3.utils.toBN(128));

     function submitHash(ftsoIndices: (number | BN | BigNumber)[],
         prices: (number | BN | BigNumber)[],
         random: number | BN | BigNumber,
         address: string): string {

         return ethers.utils.keccak256(web3.eth.abi.encodeParameters(
             ["uint256[]", "uint256[]", "uint256", "address"],
             [ftsoIndices, prices, random, address]));
     }
     const ftsoIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
     const randoms = [MIN_RANDOM, MIN_RANDOM.addn(5), MIN_RANDOM.addn(1059),
         MIN_RANDOM.addn(10682), MIN_RANDOM.addn(159726)
     ];
     const prices = [0, 1, 2, 3, 5, 10, 50, 100, 101, 10 ** 5 + 1, 10 ** 8];
     const addrs = [accounts[10], accounts[11], accounts[12], accounts[13]];

     console.log(`Prices: ${prices}`);
     for(let addr of addrs) {
         console.log(`Address: ${addr}`);
         for(let random of randoms) {
             console.log(`\tRandom: ${random}`)
             const hash = submitHash(ftsoIndices, prices, random, addr);
             console.log(`\t\t${hash}`);
         }
     }
     ```

===  "Python"

     ```python
     from typing import List
     from web3 import Web3
     import eth_abi

     minimal_random = 2 ** 128

     def submit_price_hash(
         ftsoIndices: List[int], prices: List[int], random: int, address: str
     ) -> str:
         assert len(ftsoIndices) == len(prices)
         assert list(sorted(ftsoIndices)) == ftsoIndices and len(
             set(ftsoIndices)
         ) == len(ftsoIndices), "Indices are non increasing"
         return Web3.keccak(
             eth_abi.encode_abi(
                 ["uint256[]", "uint256[]", "uint256", "address"],
                 [ftsoIndices, prices, random, address],
             )
         ).hex()


     def test_fun(
         prices: List[int],
         random: int,
         address="0xD7de703D9BBC4602242D0f3149E5fFCD30Eb3ADF",
     ) -> List[str]:
         return submit_price_hash(list(range(len(prices))), prices, random, address)


     addrs = [
         "0xD7de703D9BBC4602242D0f3149E5fFCD30Eb3ADF",
         "0xEa960515F8b4C237730F028cBAcF0a28E7F45dE0",
         "0x3d91185a02774C70287F6c74Dd26d13DFB58ff16",
     ]
     prices = [0, 1, 2, 3, 5, 10, 50, 100, 101, 10 ** 5 + 1, 10 ** 8]
     randoms = [
          min_random + r for r in
          [0, 1, 100, 101, 100000000000000000000]
     ]
     for addr in addrs:
         print(f"Address: {addr}")
         for rand in randoms:
             print(f"  Random: {rand}")
             print("    hash:", test_fun(prices, rand, addr))
         print()
     ```

!!! info
    To see sample code for calculating submit hashes using the `web3.py` library, see the [`hasher.py` gist](https://gist.github.com/jO-Osko/a9e8904cb3e8f9af5f154302117b4444).

## Retrieving Information About Rewarded Data

Listen for `PriceFinalized` events, which contain information about calculated median data and rewarding bounds.
Each FTSO emits these events.

## Managing Vote Power

* To check your [vote power](../../tech/ftso.md#vote-power) in a specific vote power block, use the  `votePowerOfAt` method in the `WNat` contract.

* To find the vote-power block of the current reward epoch, use the `getCurrentRewardEpoch` method in the `FtsoManager` contract.
  Then, use the `getRewardEpochVotePowerBlock` method in the same contract.

* Vote power [delegated](../../tech/ftso.md#delegation) to you belongs to only you; you cannot redelegate it.
  To retrieve information about delegations you receive, listen to `Delegate` events because this information is not contained in any on-chain structure.

## Retrieving Price Epoch Information

Use the `getPriceEpochConfiguration` method in the `FtsoManager` contract to retrieve:

* When the first price epoch started, as a UNIX timestamp.
* The duration of every price epoch, in seconds.
* The duration of every reveal phase, in seconds.

These numbers allow you to calculate the price epoch number from any timestamp.

The duration of price epochs is fixed and can only change through a governance decision.

## Submitting Data On-Chain

After you feel comfortable running the local npm package, you can start submitting your data on the real network.

To run on the real network, you need to:

* **Gain vote power**: You can [whitelist yourself](whitelisting.md) as a data provider only if you have enough vote power.
* **Optimize your timing**:
    * Align with the on-chain time data.
        Because the network is decentralized, the on-chain timestamp might skew up to 30 - 40 seconds from the real-world time.
        To avoid missing commit-and-reveal periods, synchronize local time with global time through the [Network Time Protocol (NTP)](https://en.wikipedia.org/wiki/Network_Time_Protocol).
    * The later you submit, the more time you have to gather data.
        However, if you submit too late, you might miss the epoch window.
        Find the balance that works best for you.
* **Claim rewards**: Ensure you regularly [claim your rewards](../../user/delegation/managing-rewards.md) and wrap them to earn more vote power. Each FTSO emits a `PriceFinalized` event that contains information about calculated median data and rewarding bounds.
* **Set the gas limit** of your commit-and-reveal transactions to around 2'500'000 gwei so that you provide enough gas.

## Maximizing Your Data Algorithm's Performance

Use the following tips:

* Run your own [observer node](../observation/deploying.md) and submit all your data through it.
  This will allow you to more efficiently and securely operate your data provider.
* Gather your data directly from each source instead of using APIs provided by data aggregators.
* Write your own code instead of relying entirely on third-party code.
* Keep an open mind, and try new strategies to find your advantage over other data providers and keep it.

If your submissions are reverted, ensure the node you submit them through is healthy and has enough peers, and review the above tips.
