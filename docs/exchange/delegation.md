# Delegating on the User's Behalf

Delegation is one of the multiple ways in which the Flare blockchain rewards participants of the ecosystem.
In particular, delegation allows token holders to put their stake behind an FTSO [data provider](glossary.md#data_provider) to increase its relative weight (See the [FTSO page](../tech/ftso.md#delegation) for more information).
In return, each time a data provider submits useful information it **shares its reward with all the token holders that delegated to it**.

The [Delegation Guide](../user/delegation/index.md) details this process for users.
However, since Exchanges keep user's tokens, only Exchanges can perform delegation.
If you are an Exchange and want to offer your users the ability to earn rewards by delegation, this page summarizes the process and explains how to perform it on the user's behalf.

## Introduction

Flare (and Songbird) accounts can delegate **any percentage they choose** of their tokens to **one or two FTSO data providers**.

This limitation means that, if your Exchange keeps all users' tokens in **a single wallet** (as described in the [Architecture of an Exchange](./architecture.md) page), you cannot give your users the option to select the data provider they want to delegate to: **The wallet containing all tokens can only delegate to one (or two) data providers**.

Keeping this in mind, this page explains how to delegate the users' tokens and collect the rewards.

!!! note "Reward Epochs"
    As shown later, several features of the delegation mechanism are timed in **Reward Epochs**.

    * On Songbird, these epochs last 7 days and start every **Saturday at around 8:40AM UTC**.
    * On Flare, they last 3.5 days and start roughly every **Monday at 7:00 UTC and Thursday at 19:00 UTC**.

## Selecting a Data Provider

It is the Exchange that must select the FTSO [data provider](glossary.md#data_provider) upon which to delegate, so the first step is to choose the one you are most confident to provide **consistently good data** (and therefore higher rewards).

Anyone can become an FTSO data provider, but only the ones that had the most [voting power](glossary.md#voting-power) during the previous reward epoch are available for delegation.

The list of **available data providers** for the current reward epoch can be retrieved from the `VoterWhitelister` smart contract, method `getFtsoWhitelistedPriceProviders`.
There exist a number of websites like [flaremetrics.io](https://flaremetrics.io/) or [ftso-signal-providers](https://github.com/TowoLabs/ftso-signal-providers) that display this information in a far more convenient way.

!!! note
    Data providers [take a fee](../tech/ftso.md#rewards) before sharing their rewards with their delegators.
    An Exchange can decide to **run its own data provider** to avoid paying this fee to an external entity, at the cost of having to **develop a good price prediction algorithm**.

    Keep in mind that FTSO data providing is already a very competitive business, and only the most successful algorithms are being rewarded.

Lastly, delegations can be changed at any time, but they are only taken into account **once per reward epoch** (See more details in the [FTSO](../tech/ftso.md#vote-power) page).
Therefore, depending on the time it is submitted, **a new delegation will not take effect until the beginning of the next reward epoch, or the one after that**.
Furthermore, rewards cannot be collected until **another reward epoch has elapsed**.

## Delegation Process

See [Manual Delegation and Claiming](../tech/ftso.md#manual-delegation-and-claiming) in the FTSO page.
