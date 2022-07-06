# IGovernanceSettings

A special contract that holds Flare governance address.
This contract enables updating governance address and timelock only by hard forking the network,
meaning only by updating validator code.

## getGovernanceAddress

```solidity
function getGovernanceAddress() external view returns (address)
```

Get the governance account address.
The governance address can only be changed by a hardfork.

## getTimelock

```solidity
function getTimelock() external view returns (uint256)
```

Get the time in seconds that must pass between a governance call and execution.
The timelock value can only be changed by a hardfork.

## getExecutors

```solidity
function getExecutors() external view returns (address[])
```

Get the addresses of the accounts that are allowed to execute the timelocked governance calls
once the timelock period expires.
Executors can be changed without a hardfork, via a normal governance call.

## isExecutor

```solidity
function isExecutor(address _address) external view returns (bool)
```

Check whether an address is one of the executors.
