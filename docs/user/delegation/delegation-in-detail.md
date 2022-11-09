# Delegation in detail

Delegation enables a user to keep holding their balance (tokens) while delegating the vote power this balance represents.
Two delegation methods are supported: The basic (normal) delegation is **delegation by percentage**, the other being **explicit delegation**.

With percentage delegation, any address can delegate a percentage of its holding; this is limited to x addresses.
Example: Alice has 20 tokens and delegates 50% to Bob, Bob will have additional vote power of 10 on the top of his own balance (own vote power).
This means any transfer of tokens to or from Alice will update 50% of the delegated vote power to Bob
If Alice delegates to another address, each token transfer to or from Alice will update the vote power of those other addresses.
This in turn will cause higher gas costs for transfer functions.
To cap those extra costs, this delegation option has a limited number of delegation destinations.
In the case that an address (user or contract) wishes to delegate vote power to more addresses, they have the option of the **explicit delegation method**.

With **explicit delegation**, an explicit amount of vote power is delegated.
While useful, this does create more complications for the user since the balance corresponding to the delegated vote power can’t be transferred.
For example, if Alice has 20 tokens and explicitly delegates vote power of 20 to Bob, the delegated balance is actually locked.
Alice can’t send out these tokens unless the 20 vote power is explicitly un-delegated.
Another complication here is that for each new token received, a new delegate operation has to be performed; vote power will not be automatically delegated upon token reception.

The explicit delegation method is built for advanced users or for contracts holding a large number of tokens for different users.
Imagine a collateral contract holding many WSGB for many users.
Each user depositing tokens might want to delegate to a different set of data providers.
Explicit delegation will enable this contract to update the explicit delegation per user deposit and un-delegate every time a user wishes to withdraw its funds.

Only one of the delegation methods can be used per address.
Furthermore, an address can never change its delegation method: if a user called delegate-explicit once from its address, they will never be able to do a percentage delegation with the same address, and vice versa.

The delegation system supports:

* Delegation of vote power to up to two addresses.
* Several addresses delegating to a single address.
* 1 level delegation.
  If Alice delegates to Bob and Bob delegates to Charlie, Charlie will only get the delegated balance of Bob, and will not be affected by the delegation Alice did.

Delegation units are the same as balance units.

## Check pointing historical data

Token data regarding vote power, delegation, balance and supply is all checkpointed to allow the retrieval of historical values.
Per change in any value, a checkpoint is added to the array which includes the updated value and the block number.
When trying to read historical data, a binary search is performed on the array.
With this, the data retrieval cost grows on a logarithmic scale.

## Vote power data

The above delegation scheme creates a mapping from balance to vote power for each address.
The vote power of each address reflects its own balance plus any delegated vote power from other addresses.
Vote power is never reused (double-spent): if vote power is delegated, the delegating address does not have this vote power under its own account.

## Voting campaigns using the vote power token

Checkpointed vote power data is used in voting campaigns (like FTSO reward epochs, for example).
A voting campaign uses a randomly chosen block number from the past (vote power block).
When an address (data provider) casts its vote for a specific campaign, its vote power is taken from the vote power block for this campaign.
Hence, the vote power of an address for this campaign does not reflect its present balance and delegation but rather the state at the time of the snapshot (in the vote power block).
This design allows for a free use of tokens (non-locked) and a consistent vote power snapshot of token holdings.
Voting campaigns are a generic concept; in FTSO system, the vote power of data providers is used as an influence in choosing the final price.
Each price submission is weighted according to the vote power scheme described here.

## Revoke

Due to the substantial length of time one past vote power block is used for price submissions, a revoke feature was added.
This feature can be used in case any specific data provider is found trying to attack and skew the reported price of the FTSO (flare oracle).
In this situation, an off chain process (e.g. twitter storm) calls users to revoke vote power from a specific data provider.
The revoke will update the cached value of the vote power for the specific block which is being used for this reward epoch.
So if a user revokes its vote power delegation on a specific block, checkpoints for the vote power will not be updated, only the cached vote power values are zeroed.

## Vote power block selection

<figure markdown>
![Vote power block selection diagram](../../assets/votepower diagram.svg){.allow-zoom}
<figcaption>Vote power block selection.</figcaption>
</figure>

The vote power of each data provider is cached and only recalculated at the start of each reward epoch.
The selected vote power block (snapshot block) for a new epoch is selected randomly once the reward epoch starts.
It is selected randomly with uniform probability from the last half (on Flare) or the last quarter (on Songbird) of mined blocks.
This can **roughly** be approximated as taking the random block in the last half or quarter time-wise, but it is **not necessarily correct**, as block mining density can change.

### Example for Songbird

Reward epoch with index `10` started at block `2487672` with timestamp `1637397708` (Saturday, November 20, 2021 8:41:48 AM GMT) and lasted until block `3003881` with timestamp `1638002503` (Saturday, November 27, 2021 8:41:43 AM GMT).

This means that `516209` blocks were mined in this epoch and the last quarter of the blocks started with the block number `2487672 + 516209 * 3 / 4 = 2874828` with timestamp `1637817710` (Thursday, November 25, 2021 5:21:50 AM GMT).

Any block between `2874828` and `3003881` is therefore eligible for selection as the vote power block.
In this reward epoch, block `2881097` with timestamp `1637825442` (Thursday, November 25, 2021 7:30:42 AM GMT) was selected.
This is before the last quarter of the week (Thursday, November 25, 2021 2:41:33 PM GMT) if we were to take the timestamp measure.

## Developer information

### Contracts

The `VPToken` (Vote Power Token) is the base contract for wrapped tokens.

This token contract is built to enable delegation of vote power without locking the holder’s token.
It works by adding the vote power and delegation functions to the ERC20 token contract.
Basically, balance represents vote power; with the additional code, a holder can delegate a percentage of its own vote power to another address and still use their tokens freely.
The `transfer/mint/burn` functions will immediately update the actual vote power being held by the delegator and the vote power of the address it delegates to.

All vote power data is being checkpointed by block.
For any vote power update due to delegation, transfer, or otherwise, a checkpoint is added.
For anyone familiar with the [MiniMe token](https://github.com/Giveth/minime), the checkpoint mechanism is similar, while differing in that more data is being checkpointed.

When a voting campaign occurs, a past block will be randomly chosen and all vote power data will be taken from this block.
This would actually work like taking a vote power snapshot for a specific block and using that for all addresses voting (providing prices) in the campaign.
The random process of choosing a block is designed to mitigate attacks such as flash-loan or short term loans.

### API

* ERC20 APIs.
* `BalanceOfAt(address, block)`, `totalSupplyAt(block)` as in MiniMe token.
* Delegation and vote power interfaces are described in `IIVPToken` interface file.
* Mint and burn APIs are handled in the inheriting contracts.

### Caching

Due to reward distribution constraints that are described in the FTSO reward manager specification, the same vote power block is used for a rather long period of time.
This time frame, named "reward epoch", includes many short price epochs.
Meaning, FTSO price feeds commencing over a period of a few days will continuously derive vote power from the same vote power block in the past.

Usage of the same vote power block for many campaigns calls for a caching mechanism.
The caching mechanism stores the vote power per address per block if done through a dedicated caching enabled function.
For example, the normal vote power query function is `votePowerOfAt(address, block)`.
This has a matching cache query: `votePowerOfAtCache(address, block)` which also caches the data on its first usage for a specific address and block.
Later calls to both of these functions will use the cached value if it exists.

### Retrieving historical data

A large part of the native token inflation is distributed to participants in the FTSO price submission process.
The reward won by a data provider is shared between the data provider and the vote power delegators to the data provider.
The VP token exposes APIs that enable delegators to see how much vote power was delegated to a data provider in any past block.
To enable this, the delegation percentage data are checkpointed after every change.
Using the combination of delegation percentage and historical balance, each user can accurately see and show how much vote power they delegated to any address in the past.

This API is also used by the reward manager, when the reward sharing is calculated.

For explicit delegation, historical data is limited.
It would be quite costly to continuously update a list of independent explicit delegations.
That being said, when rewards are claimed for addresses that used explicit delegation, the delegator must already know which data providers it delegated vote power to in the relevant block.

To recap, historical delegation APIs exist.
For percentage delegations, each address can determine the full list of addresses it delegated to in any block in history.
For explicit delegations, a user must use their own methods to build the list of addresses it delegated to at specific times.
After building this list, one can query how much vote power was delegated to each address.
Two options for building this list would be:

1. Saving this data in real time while delegating.
2. Reading past delegation events for this address.
