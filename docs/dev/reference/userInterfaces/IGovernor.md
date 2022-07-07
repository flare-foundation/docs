# IGovernor

<div class="api-node-type" markdown>

## Enums

<div class="api-node" markdown>
### ProposalState

```solidity
enum ProposalState {
  Pending,
  Active,
  Defeated,
  Succeeded,
  Queued,
  Expired,
  Executed
}
```
</div>
</div>
<div class="api-node-type" markdown>

## Events

<div class="api-node" markdown>
### ProposalCreated

```solidity
event ProposalCreated(
    uint256 proposalId,
    address proposer,
    address[] targets,
    uint256[] values,
    bytes[] calldatas,
    uint256 startTime,
    uint256 endTime,
    string description,
    uint256 votePowerBlock,
    uint256 wrappingThreshold,
    uint256 absoluteThreshold,
    uint256 relativeThreshold
)
```

Event emitted when a proposal is created

_Required for compatibility with Tally (OpenZeppelin style)
Violates compatibility with Tally (startTime and endTime instead of startBlock and endBlock)
additional data - votePowerBlock, wrappingThreshold, absoluteThreshold, relativeThreshold
remove data - string[] signatures: they are always a list of empty strings in our case_

</div>
<div class="api-node" markdown>
### ProposalExecuted

```solidity
event ProposalExecuted(
    uint256 proposalId
)
```

Event emitted when a proposal is executed

_Required for compatibility with Tally (OpenZeppelin style)_

</div>
<div class="api-node" markdown>
### VoteCast

```solidity
event VoteCast(
    address voter,
    uint256 proposalId,
    uint8 support,
    uint256 weight,
    string reason
)
```

Event emitted when a vote is cast

_Required for compatibility with Tally (OpenZeppelin style)_

</div>
</div>
<div class="api-node-type" markdown>

## Functions

<div class="api-node" markdown>
### propose

```solidity
function propose(
    string _description
) external returns (
    uint256);
```

Creates a new proposal without execution parameters
Emits a ProposalCreated event

*Parameters*

| Name | Type | Description |
| ---- | ---- | ----------- |
| _description | string | String description of the proposal |

*Returns*

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | Proposal id (unique identifier obtained by hashing proposal data) |
</div>
<div class="api-node" markdown>
### propose

```solidity
function propose(
    address[] _targets,
    uint256[] _values,
    bytes[] _calldatas,
    string _description
) external returns (
    uint256);
```

Creates a new proposal with execution parameters
Emits a ProposalCreated event

_Required for compatibility with Tally (OpenZeppelin style)_

*Parameters*

| Name | Type | Description |
| ---- | ---- | ----------- |
| _targets | address[] | Array of target addresses on which the calls are to be invoked |
| _values | uint256[] | Array of values with which the calls are to be invoked |
| _calldatas | bytes[] | Array of call data to be invoked |
| _description | string | String description of the proposal |

*Returns*

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | Proposal id (unique identifier obtained by hashing proposal data) |
</div>
<div class="api-node" markdown>
### castVote

```solidity
function castVote(
    uint256 _proposalId,
    uint8 _support
) external returns (
    uint256);
```

Casts a vote on a proposal
Emits a VoteCast event

_Required for compatibility with Tally (OpenZeppelin style)_

*Parameters*

| Name | Type | Description |
| ---- | ---- | ----------- |
| _proposalId | uint256 | Id of the proposal |
| _support | uint8 | A value indicating vote type (against, for, abstaint) |

*Returns*

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | Vote power of the cast vote |
</div>
<div class="api-node" markdown>
### castVoteWithReason

```solidity
function castVoteWithReason(
    uint256 _proposalId,
    uint8 _support,
    string _reason
) external returns (
    uint256);
```

Casts a vote on a proposal with a reason
Emits a VoteCast event

_Required for compatibility with Tally (OpenZeppelin style)_

*Parameters*

| Name | Type | Description |
| ---- | ---- | ----------- |
| _proposalId | uint256 | Id of the proposal |
| _support | uint8 | A value indicating vote type (against, for, abstaint) |
| _reason | string | Vote reason |

*Returns*

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | Vote power of the cast vote |
</div>
<div class="api-node" markdown>
### castVoteBySig

```solidity
function castVoteBySig(
    uint256 _proposalId,
    uint8 _support,
    uint8 _v,
    bytes32 _r,
    bytes32 _s
) external returns (
    uint256);
```

Casts a vote on a proposal using the user cryptographic signature
Emits a VoteCast event

_Required for compatibility with Tally (OpenZeppelin style)_

*Parameters*

| Name | Type | Description |
| ---- | ---- | ----------- |
| _proposalId | uint256 | Id of the proposal |
| _support | uint8 | A value indicating vote type (against, for, abstaint) |
| _v | uint8 | v part of the signature |
| _r | bytes32 | r part of the signature |
| _s | bytes32 | s part of the signature |

</div>
<div class="api-node" markdown>
### execute

```solidity
function execute(
    string _description
) external returns (
    uint256);
```

Executes a successful proposal without execution parameters
Emits a ProposalExecuted event

*Parameters*

| Name | Type | Description |
| ---- | ---- | ----------- |
| _description | string | String description of the proposal |

</div>
<div class="api-node" markdown>
### execute

```solidity
function execute(
    address[] _targets,
    uint256[] _values,
    bytes[] _calldatas,
    bytes32 _descriptionHash
) external payable returns (
    uint256);
```

Executes a successful proposal with execution parameters
Emits a ProposalExecuted event

_Required for compatibility with Tally (OpenZeppelin style)_

*Parameters*

| Name | Type | Description |
| ---- | ---- | ----------- |
| _targets | address[] | Array of target addresses on which the calls are to be invoked |
| _values | uint256[] | Array of values with which the calls are to be invoked |
| _calldatas | bytes[] | Array of call data to be invoked |
| _descriptionHash | bytes32 | Hashed description of the proposal |

</div>
<div class="api-node" markdown>
### state

```solidity
function state(
    uint256 _proposalId
) external view returns (
    enum IGovernor.ProposalState);
```

Returns the current state of a proposal

_Required for compatibility with Tally (OpenZeppelin style)_

*Parameters*

| Name | Type | Description |
| ---- | ---- | ----------- |
| _proposalId | uint256 | Id of the proposal |

*Returns*

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | enum IGovernor.ProposalState | ProposalState enum |
</div>
<div class="api-node" markdown>
### getVotes

```solidity
function getVotes(
    address _voter,
    uint256 _blockNumber
) external view returns (
    uint256);
```

Returns the vote power of a voter at a specific block number

_Required for compatibility with Tally (OpenZeppelin style)_

*Parameters*

| Name | Type | Description |
| ---- | ---- | ----------- |
| _voter | address | Address of the voter |
| _blockNumber | uint256 | The block number |

*Returns*

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | Vote power of the voter at the block number |
</div>
<div class="api-node" markdown>
### quorum

```solidity
function quorum(
    uint256 _blockNumber
) external view returns (
    uint256);
```

Returns the minimal vote power required for a proposal to be successful

_Required for compatibility with Tally (OpenZeppelin style)_

*Parameters*

| Name | Type | Description |
| ---- | ---- | ----------- |
| _blockNumber | uint256 | Block number for quorum (quorum depends on wNat total supply) |

*Returns*

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | Vote power representing the quorum at _blockNumber |
</div>
<div class="api-node" markdown>
### hasVoted

```solidity
function hasVoted(
    uint256 _proposalId,
    address _voter
) external view returns (
    bool);
```

Returns information if a voter has cast a vote on a specific proposal

*Parameters*

| Name | Type | Description |
| ---- | ---- | ----------- |
| _proposalId | uint256 | Id of the proposal |
| _voter | address | Address of the voter |

*Returns*

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | True if the voter has cast a vote on the proposal, and false otherwise |
</div>
<div class="api-node" markdown>
### getProposalInfo

```solidity
function getProposalInfo(
    uint256 _proposalId
) external view returns (
    address _proposer,
    uint256 _votePowerBlock,
    uint256 _voteStartTime,
    uint256 _voteEndTime,
    uint256 _execStartTime,
    uint256 _execEndTime,
    bool _executed);
```

Returns information of the specified proposal

*Parameters*

| Name | Type | Description |
| ---- | ---- | ----------- |
| _proposalId | uint256 | Id of the proposal |

*Returns*

| Name | Type | Description |
| ---- | ---- | ----------- |
| _proposer | address | Address of the proposal submitter |
| _votePowerBlock | uint256 | Block number used to determine the vote powers in voting process |
| _voteStartTime | uint256 | Start time (in seconds from epoch) of the proposal voting |
| _voteEndTime | uint256 | End time (in seconds from epoch) of the proposal voting |
| _execStartTime | uint256 | Start time (in seconds from epoch) of the proposal execution window |
| _execEndTime | uint256 | End time (in seconds from epoch) of the proposal exectuion window |
| _executed | bool | Flag indicating if proposal has been executed |
</div>
<div class="api-node" markdown>
### getProposalVP

```solidity
function getProposalVP(
    uint256 _proposalId
) external view returns (
    uint256 _totalVP,
    uint256 _for,
    uint256 _against,
    uint256 _abstain);
```

Returns vote power (for, against, abstain) of the specified proposal 
                and total vote power at the vote power block

*Parameters*

| Name | Type | Description |
| ---- | ---- | ----------- |
| _proposalId | uint256 | Id of the proposal |

*Returns*

| Name | Type | Description |
| ---- | ---- | ----------- |
| _totalVP | uint256 | Total vote power at the vote power block |
| _for | uint256 | Accumulated vote power for the proposal |
| _against | uint256 | Accumulated vote power against the proposal |
| _abstain | uint256 | Accumulated vote power abstained from voting |
</div>
</div>

