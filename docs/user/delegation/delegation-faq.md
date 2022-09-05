# Delegation FAQ

## Why should I delegate?

When delegating your vote power, you can earn rewards, but even more importantly, you can support reliable price providers which in turn will strengthen the stability of the FTSO and the whole ecosystem.

## Can I still use my tokens after delegating my vote power?

Yes. The tokens are never locked and can be used for any purpose: send, deposit etc.

## Do I lose ownership of my tokens when delegating my vote power?

No, delegation never requires giving up ownership of your tokens.

## What is the first step for delegating my vote power?

The first step is to wrap your native tokens (`$FLR` or `$SGB`) into `$WFLR` or `$WSGB`.
Wrapped tokens have a 1:1 conversion to native tokens.
This is a fundamental step for enabling users to delegate their vote power.

## How do I wrap my native tokens?

1. Through a supported wallet: see the [wallets section](../../user/wallets/index.md).
2. Through a [dapp](glossary.md#dapp): some FTSO data providers have already started providing these dapps as a convenience, like [FTSO AU](https://app.ftso.au){target=_blank} or [Aureus Ox](https://aureusox.com/dashboard){target=_blank}.
3. Through direct interaction with the blockchain, once you understand [manual delegation](manual-delegation.md).

## How many tokens should I wrap?

Note that gas cannot be paid with wrapped tokens, therefore always make sure not to wrap your full native holdings.
Rather, keep some tokens unwrapped for paying gas fees with your account.

## How do I delegate my vote power?

Same mechanisms as explained in [How do I wrap my native tokens?](#how-do-i-wrap-my-native-tokens) above.

## How much vote power should I delegate?

Once you own wrapped tokens, it is best to delegate 100% of your vote power.

## To whom should I delegate my vote power?

For the ongoing stability of the FTSO it is highly recommended delegating to reliable price providers.
I.e. ones that are committed to providing accurate price feeds.
One should also consider the expected reward rate each price provider can offer.

Google for "Flare Metrics" to find lists of FTSO data providers.

## How many price providers can I delegate to?

Each user can delegate to one or two price providers.

## Should I delegate to one or two price providers?

For an account with a low balance (~ 500 tokens) it is better to delegate to 1 price provider, since the gas amount when claiming rewards for two providers is a bit higher.
If you have a larger account, consider delegating to two price providers.

## When I send or receive tokens is my delegation data automatically updated?

Yes, if a user is using delegation by percentage, which means any `$WFLR` or `$WSGB` that is newly wrapped, sent or received will automatically update the actual delegated vote power.

On the other hand, if you receive native tokens, you have to first wrap them to be able to contribute to existing delegations.

## What if I want to update my delegations?

When updating delegation data the total percentage should always be equal to or smaller than 100%.
So if you want to reduce some percentage from one price provider and increase for the other, you should first decrease the percentage from one price provider.

## When is my delegation reflected?

Your delegation is reflected in the next reward epoch **if it happens before the vote power snapshot**.
Any delegation done after the snapshot block will only be reflected **once the next reward epoch ends**.

## Do claimed, wrapped and delegated tokens become immediately effective in the ongoing reward epoch?

No. In general, they start becoming effective for rewards in the next reward epoch, that is assuming wrapping and delegation were carried out before the vote power snapshot block.

## When is the snapshot vote power taken for a reward epoch?

A vote power block snapshot for current reward epoch is selected randomly and retroactively at the beginning of a new epoch.
It is selected from the last half (on Flare) or the last quarter (on Songbird) of the previous reward epoch (in terms of **blocks** produced in the previous reward epoch).

## Why should I avoid delegating in the last half or quarter of the current reward epoch?

Your delegation might be too late for consideration in the next reward epoch since the vote power block for the next reward epoch will be randomly chosen from the blocks in the last half (on Flare) or quarter (on Songbird) of the current epoch.

## How much reward can each price provider earn for me?

This depends on a few factors:

* The delegated balance.

* The price provider reward rate.

* The price provider fee. How much fee does the price provider take from addresses delegating to it.

* The amount of vote power already delegated to this price provider.

To encourage decentralization, there is a vote power cap and any excess vote power is not counted during the median calculation and rewarding phase.
If there is over delegation, the same amount of rewards is split between more delegators.

## Where can I see the expected rewards from a price provider?

Each price provider has different performance that results in different reward rates.
Sources for this data can be found on the web.
Note the reward rate might be changing per each week.
Try googling for "Flare metrics".
