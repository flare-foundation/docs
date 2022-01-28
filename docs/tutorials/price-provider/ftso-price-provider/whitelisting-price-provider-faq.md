# Whitelisting price provider FAQ

### Is there a minimal vote power required to be whitelisted as a price provider?

There is no minimal vote power required. Top 100 price providers with the highest vote power can provide prices. This is handled on-chain by `VoterWhitelister` contract. Once all the slots in the list are taken and a new address is being whitelisted, the address with the lowest vote power will be kicked out of the list.

### Where can I check if I am whitelisted as a price provider?

Every time a new price provider’s address is added to the whitelist (or an old one is removed), an event is emitted. Once an address is unlisted, submissions will also start failing (reverting). It can also help to listen to events that will notify you about unlisting once it happens.

### If I was removed from the whitelist, how can I re-list myself?

If your address was kicked out of the whitelist, you will be able to list yourself once the next reward epoch starts. For doing this you will need more vote power then one of the listed providers. You should see if you can have more delegations done to your address before the next reward epoch vote power block (snapshot) is chosen. Anyway you should try to re-list since maybe some other provider has less delegations and less vote power then your own. See also [troubleshooting](../troubleshooting/ "mention")
