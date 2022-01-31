# Delegation FAQ

### Why should I delegate?

When delegating your vote power, you can earn rewards, but even more important one can support reliable price providers which in turn will strengthen the stability of the FTSO and the whole ecosystem.

### Can I still use my tokens after delegating my vote power?

Yes. The tokens are never locked and can be used for any purpose: send, deposit etc.

### Do I lose ownership of my tokens when delegating my vote power?

No, delegation never requires giving up ownership of your tokens.

### What is the first step for delegating my vote power?

The first step is to wrap your SGB and create WSGB. WSGB has 1:1 conversion to SGB, it is a fundamental step for enabling a user to delegate his vote power.

### How do I wrap my SGB tokens?

The actual wrapping will be done differently depending on the wallet you are using. See [wallets](../wallets/ "mention")section for more details.

### How much SGB should I wrap?

Note that gas can't be paid with wSGB. Always make sure not to wrap your full SGB holdings, but rather keep some SGB unwrapped for paying gas fees with your account.

### How do I delegate my WSGB vote power?

wSGB. Delegation is done differently, depending on the wallet you use. See [wallets](../wallets/ "mention")section for more details.

### How much vote power should I delegate?

Once you own WSGB, it is best to delegate 100% of your vote power.

### To whom should I delegate my vote power?

For the ongoing stability of the FTSO it is highly recommended to delegate to reliable price providers. Ones that are committed to providing accurate price feeds. One should also consider the expected reward rate each price provider can offer.

### How many price providers can I delegate to?

Each user can delegate to one or two price providers.

### Should I delegate to one or two price providers?

For an account with lower SGB balance (\~ 500) it is better to delegate to 1 price provider, since the gas amount when claiming for two providers is a bit higher, if you have a larger account, consider delegating to two price providers.

### How much rewards can each price provider earn for me?

This depends on a few factors:

* The delegated balance.
* The price provider reward rate.
* The price provider fee. How much fee does the price provider take from addresses delegating to it.
* The amount of vote power already delegated to this price provider.

To encourage decentralization, there is a vote power cap and any excess vote power is not counted during the median calculation and rewarding phase. If there is over delegation, the same amount of rewards is split between more delegators.

### Where can I see the expected rewards from a price provider?

Each price provider has different performance that results in different reward rates. Sources for this data can be found on the web. Note the reward rate might be changing per each week. Try googling 'Flare metrics'.

### If I send or receive tokens should I update my delegations?

No, if a user is using delegation by percentage, which means any WSGB that is newly wrapped, sent or received will automatically update the actual delegated vote power. If on the other hand you receive SGB coins, you have to first wrap them to WSGB to be able to contribute to existing delegations.

### What if I want to update my delegations?

For updating delegation data the total percentage should always be equal to or smaller than 100%. So if you want to reduce some percentage from one price provider and increase for the other, you should first decrease the percentage from one price provider.

### When is my delegation reflected?

Your delegation is reflected if it happens before a vote power snapshot is done for a reward epoch. Any delegation done after the snapshot block will only be reflected in the next reward epoch. See the reward section for more details.

### Do claimed, wrapped and delegated SGB become immediately effective in the ongoing reward epoch?

No. In general they start become effective for rewards in the next reward epoch if wrapping and delegation were carried out before the vote power snapshot block.

### When is the snapshot vote power taken for a reward epoch?

A vote power block snapshot for current reward epoch is selected randomly and retroactively at the beginning of a new epoch. It is selected from the last quarter of the previous reward epoch (in terms of blocks produced in the previous reward epoch).

### Why should I avoid delegating in the last quarter of the current reward epoch?

Your delegation might be too late for consideration in the next reward epoch since the vote power block for the next reward epoch will be randomly chosen from the blocks in the last quarter of the current epoch.
