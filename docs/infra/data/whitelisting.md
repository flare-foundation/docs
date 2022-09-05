# Whitelisting a Price Provider

## Procedure

Only top vote power holders per FTSO are allowed to submit prices.
Per FTSO, the vote power of an address is based on the wrapped tokens balance (`$WFLR` or `$WSGB`).
Whitelisting a price provider is done in a fully decentralized way and facilitated by the `VoterWhitelister` contract.
Price providers can request to be whitelisted for a specific asset index using `requestWhitelistingVoter()` or request whitelisting for all assets at once `requestFullVoterWhitelisting()`.

The `VoterWhitelister` contract enables price submissions only by whitelisted addresses.
For each FTSO, up to N (currently 100) voters can be listed.
The number of voters per asset can vary and is configurable by Governance.
When a price provider tries to whitelist itself, its vote power is calculated using the vote power block of the current reward epoch.

The prerequisite for a price provider is explicit whitelisting.
Each user can request its address to be whitelisted by the `VoterWhitelister` contract.
If the whitelist is not full, the address is immediately whitelisted.
If the list is full, the user with the lowest voter power is found and replaced with the requesting user only if the new user's power is strictly greater.

Should the number of voter slots ever be reduced, voter addresses will be removed from the whitelist one by one, each time removing the address with the lowest power.
Events are fired to notify voters about the change of voter status on the whitelist.

There are two methods that you can use to whitelist your public address.
The method `requestFullVoterWhitelisting` tries to whitelist your address for all available FTSOs, while `requestWhitelistingVoter` tries to whitelist the address for a specified FTSO index.

## FAQ

### Is there a minimal vote power required to be whitelisted as a price provider?

There is no minimum vote power required.
Top 100 price providers with the highest vote power can provide prices.
This is handled on-chain by the `VoterWhitelister` contract.
Once all the slots in the list are taken and a new address is being whitelisted, the address with the lowest vote power will be kicked out of the list.

### Where can I check if I am whitelisted as a price provider?

Every time a new price provider’s address is added to the whitelist (or an old one is removed), an event is emitted.
Once an address is unlisted, submissions will also start failing (reverting).
It can also help to listen to events that will notify you about delisting once it happens.

### If I was removed from the whitelist, how can I re-list myself?

If your address was kicked out of the whitelist, you will be able to list yourself once the next reward epoch starts.
For doing this you will need more vote power than one of the listed providers.
You should see if you can have more delegations done to your address before the next reward epoch vote power block (snapshot) is chosen.
You should probably try to re-list anyway, since maybe some other provider has fewer delegations and lower vote power than you by the time you try again.
See also [troubleshooting](./troubleshooting.md)
