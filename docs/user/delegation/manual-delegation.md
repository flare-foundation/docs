# Manual delegation

This page explains how to delegate using a block explorer and Metamask.

!!! caution

    This page is intended for advanced users who know how to interact with the blockchain through a block explorer.

    Congratulations on taking this more technical approach! It will enable you to better understand the system.

## How can I find the address of my chosen price provider?

Google 'Flare metrics' and in that website, chose a price provider.
Find the Flare or Songbird address which should look something like `0xbf61db1cdb43d196309824473fa82e5b17581159`.

Input that address in a [block explorer](../block-explorer.md).
You should see that every few minutes it is submitting transactions named `SubmitPriceHashes` and `RevealPrices`.

## Where can I find the delegation API

The delegation API can be found in the WNAT contract, in function `delegate`.

## What values should I use in the delegation API?

The API for delegation is: `delegate(_to address, bips)`, where `bips` is the percentage in basis points. 10000 bips = 100% and 5000 bips = 50%.
If one wants to delegate 100% of his vote power to the price provider in address: `0xbf61db1cdb43d196309824473fa82e5b17581159` the call should look like: `delegate(0xbf61db1cdb43d196309824473fa82e5b1758115, 10000)`.

## How do I remove my delegation from a price provider?

To remove a delegation you should delegate 0% to the price provider you want to remove delegations from.

## What is the easiest way to re-delegate my vote power?

It is probably easiest to first use the `undelegateAll()` API and then delegate to your chosen price provider/s.
