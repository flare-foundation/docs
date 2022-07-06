# IVPContractEvents

## Delegate

```solidity
event Delegate(address from, address to, uint256 priorVotePower, uint256 newVotePower)
```

Event triggered when an account delegates or undelegates another account. 
Definition: `votePowerFromTo(from, to)` is `changed` from `priorVotePower` to `newVotePower`.
For undelegation, `newVotePower` is 0.

Note: the event is always emitted from VPToken's `writeVotePowerContract`.

## Revoke

```solidity
event Revoke(address delegator, address delegatee, uint256 votePower, uint256 blockNumber)
```

Event triggered only when account `delegator` revokes delegation to `delegatee`
for a single block in the past (typically the current vote block).

Note: the event is always emitted from VPToken's `writeVotePowerContract` and/or `readVotePowerContract`.

