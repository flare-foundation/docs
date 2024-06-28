# Getting Random Numbers

This tutorial shows how to obtain random numbers from the [Flare Systems Protocol (FSP)](../../../tech/flare-systems-protocol.md), the infrastructure that powers most current Flare protocols.
The source of the randomness is the submissions from all [FTSO data providers](../../../tech/ftso.md#procedure-overview) and is therefore not centralized.

Random numbers are generated every 90 seconds and can be read directly from a smart contract.

This is useful in several development contexts where secure, fair random numbers are required, such as in games and certain blockchain protocol functionalities such as [selecting a random vote power block](../../../tech/ftso.md#vote-power).

!!! info "Security and Fairness"

    A generated random number is tagged as secure if all data providers correctly followed the FTSO protocol and at least one of them is not malicious.

    If a number is tagged as secure, then the protocol guarantees its fairness, meaning that it has no bias and all outcomes are equally probable.

This tutorial shows:

* How to obtain a random number.
* How to use the Flare periphery packages to simplify working with the Flare API.

## Code

Choose your preferred programming language and ensure you have a working [development environment](../../getting-started/setup/index.md).

For easy navigation, numbered comments in the source code (e.g. `// 1.`) link to the tutorial sections below.

{% import "runner.md" as runner with context %}

=== "Solidity"

    {{ runner.sol("ftso/", "GetRandomNumber") | indent(4) }}

=== "JavaScript"

    {{ runner.js("ftso/", "GetRandomNumber", runFromBrowser='false') | indent(4) }}

<script>
--8<-- "./docs/samples/ftso/GetRandomNumber.js::34"
</script>

<div class="tutorial" markdown>

## Tutorial

### 1. Import Dependencies

The tutorial uses the following dependencies:

* The [Flare Periphery Package](https://www.npmjs.com/package/@flarenetwork/flare-periphery-contracts) for Solidity and the [Flare Periphery Artifacts Package](https://www.npmjs.com/package/@flarenetwork/flare-periphery-contract-artifacts) for JavaScript, which provide the API for all Flare smart contracts.

* If you use JavaScript, the [ethers](https://www.npmjs.com/package/ethers) package is also needed to work with smart contracts.

{{ runner.multisnippet("ftso/GetRandomNumber", 3, 5, 8, 11) }}

The Periphery Packages simplify working with the Flare smart contracts significantly.

!!! warning
    If you remove this dependency, you must manually provide the signatures for all the methods you want to use.

### 2. Access the Contract Registry

The [`FlareContractRegistry`](FlareContractRegistry.md) contains the current addresses for all Flare smart contracts, and it is [the only recommended way](../../getting-started/contract-addresses.md) to retrieve them.

=== "Solidity"

    The `FlareContractsRegistryLibrary` contract from the Flare Periphery Package accesses the Flare Contract Registry for you, as shown next.

=== "JavaScript"

    The address of the Flare Contract Registry is the same on all of [Flare's networks](../../../tech/flare.md#flare-networks), and it is the only Flare address that needs to be hard-coded into any program.

    ```javascript title="GetRandomNumber.js" linenums="3"
    --8<-- "./docs/samples/ftso/GetRandomNumber.js:3:4"
    ```

    ```javascript title="GetRandomNumber.js" linenums="13"
    --8<-- "./docs/samples/ftso/GetRandomNumber.js:13:17"
    ```

### 3. Retrieve the Relay Contract

Use the [`getContractAddressByName()`](FlareContractRegistry.md#fn_getcontractaddressbyname_82760fca) method of the [`FlareContractRegistry`](FlareContractRegistry.md) smart contract to retrieve the address of the `Relay` smart contract.

{{ runner.multisnippet("ftso/GetRandomNumber", 9, 11, 20, 27) }}

### 4. Get the Random Number

Get the latest generated random number by calling the `getRandomNumber()` method of the `Relay` contract.

{{ runner.multisnippet("ftso/GetRandomNumber", 12, 15, 30, 33) }}

In addition to the `randomNumber`, two other variables are retrieved:

* `isSecure` is a boolean flag that indicates whether the random number was generated securely, according to the description given in the introduction.

    The random number is based on all the data providers' submissions and is therefore decentralized, improving transparency and fairness.
    However, this decentralization makes the protocol slightly open to attempts at manipulation.
    If such manipulation attempts are detected, the `isSecure` flag is set to `false`, and dapps can decide whether they should discard the generated number.

* `timestamp` is the [UNIX timestamp](https://en.wikipedia.org/wiki/Unix_time) indicating the time at the end of the voting epoch during which data was collected from data providers to generate this particular number.

    The timestamp can be useful, for example, to ensure that certain actions have been performed before the random number was generated.
    For example, in a roulette game, to ensure all bets were placed before the number was generated.
    Each voting epoch is a fixed 90-second window.

## Conclusion

This tutorial has shown:

* How to use the Flare Periphery Package, both from [Solidity](https://www.npmjs.com/package/@flarenetwork/flare-periphery-contracts) and from [JavaScript](https://www.npmjs.com/package/@flarenetwork/flare-periphery-contract-artifacts), to work with the Flare API.
* How to get the latest random number via the `Relay` contract.
