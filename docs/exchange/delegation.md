# Delegating on the user's behalf

Delegation is one of the multiple ways in which the Flare blockchain rewards participants of the ecosystem.
In particular, delegation allows token holders to put their stake behind an FTSO [data provider](glossary.md#data_provider) to increase its relative weight (See this [FTSO blog post](https://flare.xyz/ftso-a-breakdown/){target=_blank} for more information).
In return, each time a data provider submits useful information it **shares its reward with all the token holders that delegated to it**.

The [Delegation Guide](../user/delegation/README.md) details this process for users.
However, since Exchanges keep user's tokens, only Exchanges can perform delegation.
If you are an Exchange and want to offer your users the ability to earn rewards by delegation, this page summarizes the process and explains how to perform it on the user's behalf.

## Introduction

Flare (and Songbird) accounts can delegate **any percentage they choose** of their tokens to **one or two FTSO data providers**.

This limitation means that, if your Exchange keeps all users' tokens in **a single wallet** (as described in the [Architecture of an Exchange](./architecture.md) page), you cannot give your users the option to select the data provider they want to delegate to: **The wallet containing all tokens can only delegate to one (or two) data providers**.

Keeping this in mind, this page explains how to delegate the users' tokens and collect the rewards.

!!! note "Reward Epochs"
    Delegation works in 7-day periods called **Reward Epochs** which start every **Saturday at around 8:40AM UTC**.
    As shown later, several features of the delegation mechanism are timed according to these epochs.

!!! note "Source of Rewards"
    FTSO data provider rewards are generated through **inflation**. Please see the [Tokenomics page](./tokenomics.md) for more information.

## Selecting a data provider

It is the Exchange that must select the FTSO [data provider](glossary.md#data_provider) upon which to delegate, so the first step is to choose the one you are most confident to provide **consistently good data** (and therefore higher rewards).

The list of **available data providers** for the current reward epoch can be retrieved from the [VoterWhitelister](https://songbird-explorer.flare.network/address/0xa76906EfBA6dFAe155FfC4c0eb36cDF0A28ae24D/read-contract){target=_blank} smart contract, method `getFtsoWhitelistedPriceProviders` (#4).
There exist a number of websites like [flaremetrics.io](https://flaremetrics.io/ftso){target=_blank} or [ftso-signal-providers](https://github.com/TowoLabs/ftso-signal-providers){target=_blank} that display this information in a far more convenient way.

!!! note
    The available data providers are the ones that had the most [voting power](glossary.md#voting-power) during the previous reward epoch.

Bear in mind that delegations can be changed at any time, but they are only taken into account **once per reward epoch**, at a random point roughly in the 42h prior to a new reward epoch starting.
Therefore, depending on the time it is submitted, **a new delegation might not take effect until 7 days later**, and any reward might not be collected until **7 days later than that**.

## Delegation Process

<figure markdown>
  ![Delegation process summary](delegation-summary.png){ loading=lazy .allow-zoom }
  <figcaption>Delegation process summary.</figcaption>
</figure>

1. **Obtain WSGB tokens**

    The native token of the Songbird Network is the **Songbird** (`SGB`), whereas voting power is staked on a data provider using the **Wrapped Songbird** (`WSGB`) token.

    One `WSGB` token can be obtained for each `SGB` token without cost (except gas fees) using the [WNat contract](https://songbird-explorer.flare.network/address/0x02f0826ef6aD107Cfc861152B32B52fD11BaB9ED/write-contract){target=_blank}'s `deposit` method (#7).

    `WSGB` tokens can be "unwrapped" back to `SGB` tokens at any time using the [WNat contract](https://songbird-explorer.flare.network/address/0x02f0826ef6aD107Cfc861152B32B52fD11BaB9ED/write-contract){target=_blank}'s `withdraw` method (#28).

    The `SGB` tokens are locked inside the [WNat contract](https://songbird-explorer.flare.network/address/0x02f0826ef6aD107Cfc861152B32B52fD11BaB9ED/write-contract){target=_blank} and cannot be used until the `WSGB` tokens are unwrapped.

2. **Delegate**

    Choose what **percentage of your total `WSGB`** you want to delegate to each data provider (up to two).
    Should your `WSGB` balance change, the delegated amounts are automatically adjusted.

    Delegation is performed through the [WNat contract](https://songbird-explorer.flare.network/address/0x02f0826ef6aD107Cfc861152B32B52fD11BaB9ED/write-contract){target=_blank} too, using the `delegate` method (#5).
    You need to provide the address of the chosen data provider and the percentage of your total WSGB you want to delegate **in bips** (hundredths of 1%, so 100% is 10’000 bips).

    After a successful invocation of this method, **delegation is complete**.
    **The following reward epoch** will take your delegated tokens into account when computing your selected data provider's weight.
    If the data provider submits useful data and garners any rewards, you will be able to claim your share in the **subsequent reward epochs**.

3. **Claim the rewards**

    Each time a data provider produces valuable information all accounts that delegated to it **earn a reward** proportional to the amount they delegated.

    These rewards accumulate in the [FtsoRewardManager contract](https://songbird-explorer.flare.network/address/0xc5738334b972745067fFa666040fdeADc66Cb925/write-contract){target=_blank}, from where you can collect them **once the reward epoch is finished**, using the `claimReward` method (#3).

    **Rewards can be claimed for several epochs at once**, which saves transaction fees, so the `claimReward` method requires the list of epochs to claim for.
    To get the list of epochs with pending rewards you can use the `getEpochsWithUnclaimedRewards` method (#11).

    **Unclaimed rewards expire after 90 days!**

    For security reasons, the [FtsoRewardManager contract](https://songbird-explorer.flare.network/address/0xc5738334b972745067fFa666040fdeADc66Cb925/write-contract){target=_blank} contains a **limited amount of tokens** and is replenished periodically.
    If you are unable to claim your rewards because the contract is empty, please **try again the next day**.
    This might happen when all delegators claim their rewards in a short period of time, so it is usually better to avoid claiming right when the reward epoch finishes.
