# FTSO Price Provider

## Background

Providing prices to the FTSO system makes you a part of a decentralized oracle system. FTSO price providers submit prices to on chain contracts deployed on the Songbird network. The main contracts a price provider will interact with are the _price Submitter_ and the _FTSO_ contracts. All the relevant contracts for the FTSO system are available on the smart contract repo, see the [important-links.md](../../developing-on-top-of-flare/important-links.md) section. These contracts are deployed and verified on the [songbird explorer](https://songbird-explorer.flare.network).

## Perquisites

For operating a price provider. You will have to be familiar with:

* smart contracts and Solidity.
* interacting with smart contract using a web3 library.
* hardhat runtime environment.

## First steps

To facilitate an easier start, one can use the kick-off NPM package which is [referenced here](../../developing-on-top-of-flare/important-links.md). This package showcases the main contracts related to whitelisting a price provider and submitting prices. The package enables you to deploy FTSO mock contracts in a local setup, and submit prices to those contracts. Working with the package should help all setup stages for your price provider.

Working with this package package is mostly identical to providing on chain prices. Below aspects would be the same as working on chain:

* smart contract APIs (called functions)
* events.
* timing aspects are similar but not identical.

The package does not cover the actual price calculation (weighted median) and rewarding as they occur on the real network.

Please visit the [important-links.md](../../developing-on-top-of-flare/important-links.md) to find a link to a reference implementation of a price provider. You can find useful ideas in this code that will help you interact with the FTSO contracts and the Flare chain. Do note you will have to do some work on top of this implementation if you would like to win rewards.

### Providing Random numbers

The price providing process is structured as a commit/reveal scheme to prevent users from copying submission data. The commit and reveal phases have strict time windows of a few minutes. With each reveal the price provider is also providing a random number. The random number is used as a salt in the reveal-commit scheme and later used in the reward calculation process.

Price providers are encouraged to provide strong cryptographically secure random numbers with high entropy and sufficient range. Strong random numbers are important for network security since this is the only true source of randomness on the network. Random also makes the commit-reveal scheme resilient to attacks. Keep in mind that you submit 10 randoms every 3 minutes so random numbers with a maximal range less than `1_000_000_000` are not considered strong.

The future versions of FTSO-s will support a system to reject submissions with weak random numbers.

## Going live

Once you feel comfortable with the local NPM package you are ready to start submitting your prices on chain.

For running on the real network you will have to face some new challenges:

* **Gain vote power** - A price provider can only whitelist himself as a provider if they have enough vote power.
* **Observation node** - It is recommended that each price provider runs an observation node.
* **Timing issues** - you will face to challenges:
  * Align with the on chain time data - the on chain time stamp might skew up to 30-40 seconds from the real world time.
  * Figure out when to submit your price data. If you submit too late, the Tx might not get included, if submitting too early the price data might not be accurate enough.
* **Claim rewards.** Be sure to claim your reward regularly and wrap them so more vote power is gained.

## Notes

* On the real network `PriceSubmitter` is deployed at a fixed address `0x1000000000000000000000000000000000000003`.
