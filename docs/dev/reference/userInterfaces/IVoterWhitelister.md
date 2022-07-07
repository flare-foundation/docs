# IVoterWhitelister

<div class="api-node-type" markdown>

## Events

<div class="api-node" markdown>
### VoterWhitelisted

```solidity
event VoterWhitelisted(
    address voter,
    uint256 ftsoIndex
)
```

Raised when an account is removed from the voter whitelist.

</div>
<div class="api-node" markdown>
### VoterRemovedFromWhitelist

```solidity
event VoterRemovedFromWhitelist(
    address voter,
    uint256 ftsoIndex
)
```

Raised when an account is removed from the voter whitelist.

</div>
</div>
<div class="api-node-type" markdown>

## Functions

<div class="api-node" markdown>
### requestWhitelistingVoter

```solidity
function requestWhitelistingVoter(
    address _voter,
    uint256 _ftsoIndex
) external;
```

Request to whitelist `_voter` account to ftso at `_ftsoIndex`. Will revert if vote power too low.
May be called by any address.

</div>
<div class="api-node" markdown>
### requestFullVoterWhitelisting

```solidity
function requestFullVoterWhitelisting(
    address _voter
) external returns (
    uint256[] _supportedIndices,
    bool[] _success);
```

Request to whitelist `_voter` account to all active ftsos.
May be called by any address.
It returns an array of supported ftso indices and success flag per index.

</div>
<div class="api-node" markdown>
### defaultMaxVotersForFtso

```solidity
function defaultMaxVotersForFtso(
) external view returns (
    uint256);
```

Maximum number of voters in the whitelist for a new FTSO.

</div>
<div class="api-node" markdown>
### maxVotersForFtso

```solidity
function maxVotersForFtso(
    uint256 _ftsoIndex
) external view returns (
    uint256);
```

Maximum number of voters in the whitelist for FTSO at index `_ftsoIndex`.

</div>
<div class="api-node" markdown>
### getFtsoWhitelistedPriceProvidersBySymbol

```solidity
function getFtsoWhitelistedPriceProvidersBySymbol(
    string _symbol
) external view returns (
    address[]);
```

Get whitelisted price providers for ftso with `_symbol`

</div>
<div class="api-node" markdown>
### getFtsoWhitelistedPriceProviders

```solidity
function getFtsoWhitelistedPriceProviders(
    uint256 _ftsoIndex
) external view returns (
    address[]);
```

Get whitelisted price providers for ftso at `_ftsoIndex`

</div>
</div>

