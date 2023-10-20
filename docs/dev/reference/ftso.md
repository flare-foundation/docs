# FTSO

The [Flare Time Series Oracle (FTSO)](../../tech/ftso.md) is a smart contract that utilizes the Flare network to **provide continuous estimations for various data types**. This process is completely **decentralized**, meaning that no single party has control over it, and is highly **secure**, making it very difficult to disrupt.

This page serves as a guide to understanding and using the FTSO in different applications.

## System Architecture

The FTSO system is composed of multiple smart contracts running on the Flare Network.

Using prices as an example, the following diagram shows the flow of data, queries, and rewards through the FTSO system:

<figure markdown>
  ![FTSO component smart contracts](ftso-system.png){ loading=lazy .allow-zoom }
  <figcaption>FTSO component smart contracts.</figcaption>
</figure>

The following list describes the most relevant contracts and their purposes:

* **FTSO**: Each data type is handled by its own FTSO contract, including calculation of the filtered feed.

    To retrieve information about a data type, access this contract.

    !!! note

        If an FTSO contract is **redeployed** (for example, to fix a bug), **its address will change** and apps using it will need to be updated.
        The FTSO Registry contract below tracks this change for you.

    You can retrieve the addresses of all FTSO contracts using the `getAllFtsos` method in the FTSO Registry.

* **FTSO Registry**: Aggregates the output of each individual FTSO contract and provides a convenient one-stop API to retrieve all data.

* **Price Submitter**: This contract is used by the FTSO data providers to submit their data. Although the contract is called `PriceSubmitter`, data is not limited to prices.

* **Reward Manager**: Use this contract to claim your [rewards](../../tech//ftso.md#rewards), whether you are a data provider or a [delegator](../../tech//ftso.md#delegation).

* **Wrapped Native (WNat)**: This contract is not exclusively related to the FTSO system, but it is required to wrap and unwrap native tokens into the `$WFLR` and `$WSGB` that delegation requires.

!!! note

    The [Contract Addresses](../getting-started/contract-addresses.md) page explains how to securely retrieve each contract's address.

## Manual Delegation and Claiming

The following graphic shows the delegation process. You can call methods in several different smart contracts to manually [delegate vote power](../../user/delegation/managing-delegations.md#using-the-block-explorer) and [claim rewards](../../user/delegation/managing-rewards.md#using-the-block-explorer).

<figure markdown>
  ![Delegation process summary](ftso-delegation.png){ loading=lazy .allow-zoom }
  <figcaption>FTSO delegation process summary.</figcaption>
</figure>

## Data-Submission Process

Data submission uses a **commit-and-reveal** scheme to prevent providers from viewing each other's submissions until a round is over.
To speed up the process, both phases are actually overlapped so:

* All Commit phases happen continuously in so-called **3-minute Price Epochs**.

* Reveal phases happen during the first half (**first 90 seconds**) of the following Commit phase.

* The published price information is therefore updated **every 3 minutes**.

Only a hash of the data is submitted during the Commit phase.
Next, in the Reveal phase the actual data is sent.
If its hash does not match the previous commitment, the data is discarded.

The submission API is slightly different for the Flare and Songbird networks:

=== "Flare"

    FTSO data providers submit data through the [PriceSubmitter contract](../getting-started/contract-addresses.md).

    - **Commit**: A single hash is needed for each submission.

        ```solidity
        function submitHash(
            uint256 _epochId,
            bytes32 _hash
        ) external;
        ```

    - **Reveal**: After all data is submitted, a single random number must be submitted.

        ```solidity
        function revealPrices(
            uint256 _epochId,
            uint256[] memory _ftsoIndices,
            uint256[] memory _prices,
            uint256 _random
        ) external;
        ```

=== "Songbird"

    FTSO data providers submit data through the [PriceSubmitter contract](../getting-started/contract-addresses.md).

    - **Commit**: A separate hash is needed for each submission.

        ```solidity
        function submitPriceHashes(
            uint256 _epochId,
            uint256[] memory _ftsoIndices,
            bytes32[] memory _hashes
        ) external;
        ```

    - **Reveal**: Along with each data submission, a random number must be submitted too.

        ```solidity
        function revealPrices(
            uint256 _epochId,
            uint256[] memory _ftsoIndices,
            uint256[] memory _prices,
            uint256[] memory _randoms
        ) external;
        ```

## Retrieving Data

Data produced by the FTSO is **publicly available** on the Flare and Songbird networks.

All data can be retrieved either through the `FtsoRegistry` contract or directly through one of the `Ftso` contracts.
In any case, using the `getCurrentPriceWithDecimals` method is recommended.
The following examples show how to use this method to retrieve price data.

=== "Retrieve by pair index"

    From the `FtsoRegistry` contract:

    ```solidity
    function getCurrentPriceWithDecimals(
        uint256 _ftsoIndex
    ) external view returns (
        uint256 _price,
        uint256 _timestamp,
        uint256 _assetPriceUsdDecimals
    );
    ```

    Where `_ftsoIndex` is one of the allowed indices returned by `getSupportedIndices`, for example.

=== "Retrieve by pair symbol"

    From the `FtsoRegistry` contract:

    ```solidity
    function getCurrentPriceWithDecimals(
        string memory _symbol
    ) external view returns (
        uint256 _price,
        uint256 _timestamp,
        uint256 _assetPriceUsdDecimals
    );
    ```

    Where `_symbol` is one of the allowed symbols returned by `getSupportedSymbols`, for example.

=== "Retrieve directly"

    First you need to obtain the address of the `Ftso` contract managing the price pair you are interested in.
    You can use `getSupportedIndicesSymbolsAndFtsos` from the `FtsoRegistry`, for example.

    Then call `getCurrentPriceWithDecimals` on the FTSO directly:

    ```solidity
    function getCurrentPriceWithDecimals(
    ) external view returns (
        uint256 _price,
        uint256 _timestamp,
        uint256 _assetPriceUsdDecimals
    );
    ```

    !!! note

        Individual FTSO contracts might be updated periodically, which will change their addresses. Instead of caching these addresses, use the `FtsoRegistry`.

`GetCurrentPriceWithDecimals` returns the requested price (the outcome of the previous 3-minute price epoch) in `$USD` shifting the comma by the amount of decimal places returned in `_assetPriceUsdDecimals`.
That is, the actual price is `_price` \* 10 ^-`_assetPriceUsdDecimals`^.

For example, a return value of `2603` with `_assetPriceUsdDecimals` of `5` means a price of `0.02603 USD` (There are only **5** significant decimal places).

A [standard Unix timestamp](https://en.wikipedia.org/wiki/Unix_time) of the last price update is also returned.

## Related Tutorials

* [FTSO](../tutorials/ftso/)
