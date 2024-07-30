# Working with Whitelists

## Introduction

To be a data provider, you must be **whitelisted**.
Only the top 100 data providers with the most [vote power](../../tech/ftso/index.md#vote-power) per FTSO can submit data.
Therefore, to enter the whitelist you must have higher vote power than the lowest provider currently in the list.
Per FTSO, a data provider's vote power is based on its balance of `$WFLR` or `$WSGB`.
When a data provider tries to whitelist itself, its vote power is calculated by the vote-power block of the current reward epoch.
Increased vote power on a different block will not enable your address to be whitelisted.
Vote power is only read and whitelists updated once per reward epoch.
Reward epochs start roughly on Saturdays at 8:40AM UTC on Songbird, and on Monday at 7:00 UTC and Thursday at 19:00 UTC on Flare.
Whitelisting a data provider is a fully decentralized process facilitated by the `VoterWhitelister` contract.
To retrieve this contract, see [Developer Hub](https://dev.flare.network/).

To be added to the whitelist, submit a request for your address by using one of the functions listed in the next section.
When the whitelist is not full, your address is immediately added to it.
If both the list is full and your vote power is greater than the data provider with the lowest vote power, your address replaces that data provider's address on the whitelist.

If the number of spaces for data providers is ever reduced by governance, addresses will be removed from the whitelist one by one, beginning with the address with the lowest vote power.

Events are emitted to notify providers about changes of their status on the whitelist.
Once an address is delisted, submissions will also start reverting.

## Requesting to be Added to the Whitelist or Relisted

Use the following methods in the `VoterWhitelister` contract:

* `requestWhitelistingVoter()`: Requests whitelisting for a specific asset index.
* `requestFullVoterWhitelisting()`: Requests whitelisting for all assets.

Ensure you have more delegations and vote power than the data provider that has the lowest amount before the vote power block is chosen and before you submit the request to be relisted.

## Reading Whitelists

Each FTSO contains an array of whitelisted addresses.
Use the functions in the following contracts to determine whether you are on the list and eligible to submit data:

* **`VoterWhitelister` contract**

    The `getFtsoWhitelistedPriceProviders` function returns a list of addresses for all data providers on the whitelist.
    Specify the required index, run the query, and search for your address.

* **`PriceSubmitter` contract**

    The `voterWhitelistBitmap` function returns a bitmap corresponding to allowed FTSO indices in big-endian format.
    Specify your address, run the query and examine the returned bitmap.
    E.g., if you were allowed to submit prices for FTSOs with indices 0, 2 and 3, the returned bitmap would be 13 (`1101` in binary).

## Monitoring Your Whitelist Status

When you are added to a whitelist, the `VoterWhitelisted` event is emitted from the `VoterWhitelister` contract.
When you are removed from a whitelist, the `VoterRemovedFromWhitelist` event is emitted, and your subsequent submissions fail.
To stay aware of your whitelist status, consider listening to events that notify you about additions and removals when they happen.
