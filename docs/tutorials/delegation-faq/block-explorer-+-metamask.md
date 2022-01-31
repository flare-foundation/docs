---
description: FAQ for users using the block explorer + metamask combination.
---

# Block explorer + metamask FAQ

Congratulations on taking this more technical approach, it will enable you to better understand the system.

## How to find the address of my chosen price provider?

In Flare metrics one can press on one chosen price provider and find the ‘songbird address’ which should look something like: `0xbf61db1cdb43d196309824473fa82e5b17581159`. When browsing such an address in the block explorer you should see that every few minutes it is submitting a transaction named: `SubmitPriceHashes` or `RevealPrices`.

## Where can I find the delegation API

The delegation API can be found in the WNAT contract here [https://songbird-explorer.flare.network/address/0x02f0826ef6aD107Cfc861152B32B52fD11BaB9ED/write-contract](https://songbird-explorer.flare.network/address/0x02f0826ef6aD107Cfc861152B32B52fD11BaB9ED/write-contract) in function no. 5 `delegate`.

## What values to use in the delegation API?

The API for delegation is: `delegate(_to address, bips)`, where `bips` is the percentage in basis points. 10000 bips = 100% and 5000 bips = 50%. If one wants to delegate 100% of his vote power to the price provider in address: `0xbf61db1cdb43d196309824473fa82e5b17581159` the call should look like: `delegate(0xbf61db1cdb43d196309824473fa82e5b1758115, 10000)`.

## How do I remove my delegation from a price provider?

For removing a delegation you should delegate 0% to the price provider you want to remove delegations from.

## What is the easiest way to redelegate my vote power?

It is probably easiest to first use `undelegateAll()` API - see No. 25 in the wNat contract here [https://songbird-explorer.flare.network/address/0x02f0826ef6aD107Cfc861152B32B52fD11BaB9ED/write-contract/](https://songbird-explorer.flare.network/address/0x02f0826ef6aD107Cfc861152B32B52fD11BaB9ED/write-contract/)and then delegate to your chosen price provider/s.
