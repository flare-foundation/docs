# Troubleshooting Price Providers

### When trying to whitelist my address I get the error "vote power too low"

To whitelist the address of your [data provider](glossary.md#data_provider) you need a minimum amount of vote power, derived both from the address' staked `WSGB` and [delegation](glossary.md#delegate).

This error is caused mainly by two reasons:

- Your vote power is below the vote power of the 100<sup>th</sup> provider in the current whitelist.
  Only the first 100 data providers can be whitelisted, strictly ordered by voting power, so you need to increase yours.

- Your vote power is high enough, but it hasn't been taken into account yet.
  Keep in mind that vote power is only read and whitelists updated once per reward epoch.
  On [Songbird](../../dev/reference/network-configs.md) reward epochs start roughly on Saturdays at 8:40AM UTC, so you will need to wait.

### I have increased my vote power, but the address is still not getting whitelisted, what is wrong?

Addresses are whitelisted based on vote power as reflected in the vote power block of the current reward epoch. Increased vote power on a different block will not enable your address to be whitelisted.

### How do I find the vote power block of the current reward epoch?

In the FtsoManager [contract](https://songbird-explorer.flare.network/address/0xbfA12e4E1411B62EdA8B035d71735667422A6A9e/read-contract) use #8 for reading `getCurrentRewardEpoch`. Then use #13 `getRewardEpochVotePowerBlock` where one should set the current reward epoch number (from #8) and see the vote power block for that epoch.

### How do I check my vote power for a specific vote power block?

In the WNat [contract](https://songbird-explorer.flare.network/address/0x02f0826ef6aD107Cfc861152B32B52fD11BaB9ED/read-contract) use #26 `votePowerOfAt,` set the address and the block and read the response.

### My submissions are reverted as being in the wrong epoch

You might be submitting a bit too late in the current epoch. Try to submit the price a few seconds earlier. You might want to consider running an observation node that provides a better quality connection to the network. Also, check if your server time is synced with through Network Time Protocol (NTP).

### I am experiencing strange reverts when submitting and revealing prices

The unexpected reverts might come from the too low gas amount provided to submit/reveal transactions. Increase the gas limit of the transaction to 2500000.
