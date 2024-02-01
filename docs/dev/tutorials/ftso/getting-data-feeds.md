---
og_image: assets/thumbnails/tutorial-ftso-1.png
og_description: This tutorial shows the simplest way to use the FTSO system to retrieve a specific data feed, like the price of Bitcoin.
---

# Getting FTSO Data Feeds

This tutorial shows the simplest way to use the [FTSO system](../../../tech/ftso.md) to retrieve a specific data feed, like the price of Bitcoin.

The tutorial shows:

* How to use the Flare periphery packages to simplify working with the Flare API.
* How to retrieve the latest price for a given asset from the FTSO system.

## Code

Choose your preferred programming language and ensure you have a working [development environment](../../getting-started/setup/index.md).

For easy navigation, numbered comments in the source code link to the tutorial sections below.

{% import "runner.md" as runner %}

=== "Solidity"

    {{ runner.sol("ftso/", "GettingDataFeeds") | indent(4) }}

=== "JavaScript"

    {{ runner.js("ftso/", "GettingDataFeeds", false, [{"name":"Symbol", "value":"BTC"}]) | indent(4) }}

<script>
--8<-- "samples/ftso/GettingDataFeeds.js::34"
</script>

<div class="tutorial" markdown>

## Tutorial

### 1. Import Dependencies

The tutorial uses the following dependencies:

* The [Flare Periphery Package](https://www.npmjs.com/package/@flarenetwork/flare-periphery-contracts) for Solidity and the [Flare Periphery Artifacts Package](https://www.npmjs.com/package/@flarenetwork/flare-periphery-contract-artifacts) for JavaScript, which provide the API for all Flare smart contracts.

* If you use JavaScript, the [ethers](https://www.npmjs.com/package/ethers) package is also needed to work with smart contracts.

{{ runner.multisnippet("ftso/GettingDataFeeds", 6, 7, 8, 9) }}

The Periphery Packages simplify working with the Flare smart contracts significantly.
If you remove this dependency, you must manually provide the signatures for all the methods you want to use.

### 2. Access the Contract Registry

The [`FlareContractRegistry`](FlareContractRegistry.md) contains the current addresses for all Flare smart contracts, and it is [the only recommended way](../../getting-started/contract-addresses.md) to retrieve them.

Its address is the same on all of [Flare's networks](../../../tech/flare.md#flare-networks), and it is the only Flare address that needs to be hard-coded into any program.

{{ runner.multisnippet("ftso/GettingDataFeeds", 20, 21, 15, 18) }}

### 3. Retrieve the FTSO Registry

Prices for all assets tracked by the FTSO system are recovered through the [`FtsoRegistry`](FtsoRegistry.md) contract.

Use the [`getContractAddressByName()`](FlareContractRegistry.md#fn_getcontractaddressbyname_82760fca) method from the [`FlareContractRegistry`](FlareContractRegistry.md) to retrieve the address of the [`FtsoRegistry`](FtsoRegistry.md).

{{ runner.multisnippet("ftso/GettingDataFeeds", 24, 25, 21, 26) }}

This address can be retrieved in the initialization phase of your program and used afterward.
There is no need to fetch it every time it must be used.

### 4. Get Latest Price

Finally, the asset's price is fetched from the [`FtsoRegistry`](FtsoRegistry.md) using [`getCurrentPriceWithDecimals`](FtsoRegistry.md#fn_getcurrentpricewithdecimals_a69afdc6).

{{ runner.multisnippet("ftso/GettingDataFeeds", 28, 29, 29, 33) }}

* The only parameter of this method is the symbol for the asset being queried, like `"FLR"` or `"BTC"`.
    You can use [`getSupportedSymbols()`](FtsoRegistry.md#fn_getsupportedsymbols_ce1c0e4d) to retrieve the list of all supported symbols.

    !!! warning
        On Coston and Coston2, the symbol names are prefixed with "test", such as `"testBTC"`.
        When you use the [`getSupportedSymbols()`](FtsoRegistry.md#fn_getsupportedsymbols_ce1c0e4d) function to retrieve the list of supported symbols, the symbol names will already contain the prefix.

* Given that Solidity does not support numbers with decimals, this method returns the requested price as an integer and the number of decimal places by which the comma must be shifted.

    For example, if it returns **1234** for the price and **2** for the decimals, the actual price of the asset in USD is **12.34**.

* It also returns the time when the price was calculated by the FTSO system as a [UNIX timestamp](https://en.wikipedia.org/wiki/Unix_time).
    You can use an online tool like [EpochConverter](https://www.epochconverter.com/) to turn the timestamp into a human-readable form,
    or use `Date` as in the JavaScript example.

??? note "JavaScript note on overloaded methods"

    The call to the `getCurrentPriceWithDecimals` method is a bit cumbersome in JavaScript:

    ```js linenums="37"
    --8<-- "samples/ftso/GettingDataFeeds.js:29:30"
    ```

    The call needs to be like this because this method is overloaded.
    `getCurrentPriceWithDecimals` has two versions: one accepting a string for the symbol and another one accepting an integer for the asset's index in the FTSO system.
    Therefore, the call needs to disambiguate both versions.

    The vast majority of methods are not overloaded and allow a more natural call format.
    For example:

    ```js
    await ftsoRegistry.getSupportedSymbols();
    ```

</div>

## Conclusion

This tutorial served as the Hello World program for the [FTSO system](../../../tech/ftso.md).
It has shown:

* How to use the Flare Periphery Package, both from [Solidity](https://www.npmjs.com/package/@flarenetwork/flare-periphery-contracts) and from [JavaScript](https://www.npmjs.com/package/@flarenetwork/flare-periphery-contract-artifacts).
* How to retrieve the latest price for a given asset from the FTSO system.
