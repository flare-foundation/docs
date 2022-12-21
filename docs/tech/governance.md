# Governance

## Introduction

Flare governance gives everyone in the ecosystem the opportunity to collaborate on decision-making on the [Flare and Songbird](network-configs.md) networks, making governance an important element of decentralization.

The governance process supports the ability for the Flare Foundation and Flare and Songbird community members to propose policy changes, vote on them, and execute them.

The governance process will eventually include four types of proposals:

* Songbird Testing Proposals (STPs).
* Flare Improvement Proposals (FIPs).
* Songbird Improvement Proposals (SIPs).
* Songbird Improvement Proposals (SIPs) that enable community members to propose changes to Flare.

## Proposals

Only the first type of proposals, STPs, are currently available.

### STPs

When changes to the Flare network require testing, the Flare Foundation submits Songbird Testing Proposals (STPs).

### Types of Voting

Proposals can have one of two types of voting: Acceptance-based or rejection-based.

* **Acceptance-based**: Proposals need a minimum number of **in-favor** votes to be approved.
* **Rejection-based**: Proposals need a minimum number of **against** votes to be rejected.

To avoid overburdening the community with an excessive amount of votes, STPs are rejection-based.
Conversely, future FIPs will be acceptance-based for improved stability.

### Proposal Information

Here is the proposal information that a user can retrieve:

| Information   | Comments                                      |
|:------------- | :-------------------------------------------- |
| Address | Of the creator of the proposal. |
| Type of proposal | `True` if it is acceptance-based; `False` if it is rejection-based. STPs are rejection-based, i.e., they are accepted unless there is a large majority (more than 50%) against it and 75% or more of possible votes are cast. |
| Vote count block | The block at which the number of votes each user has available for voting on this proposal is determined. |
| Voting start time | In UNIX seconds. |
| Voting end time | In UNIX seconds. |
| Execution start time | In UNIX timestamp; `0` if the proposal is for gathering the community’s opinion only and does not require execution of any contract. |
| Execution end time | In UNIX timestamp; `0` if the proposal is for gathering the community’s opinion only and does not require execution of any contract. |
| Threshold condition (in BIPS) | Percentage of the total possible votes that are needed for the proposal to proceed. 10'000 BIPS = 100%. |
| Majority condition (in BIPS) | Percentage of the cast votes that are needed to reject a proposal. 10'000 BIPS = 100%. |
| All possible votes | Available at the proposal's vote count block. |

### Notice Period

When a proposal is published, the Flare Foundation allows a one-week notice period before voting can start.
During this time the Flare Foundation and others may make formal comments on the proposal.
For security reasons only, the Foundation may reduce the timeframe of this period.

### Canceling a Proposal

If a problem arises with the proposal settings, the proposal creator can cancel the proposal if voting has not yet begun.
Voting on a canceled proposal is not possible.
The proposer can create a new proposal with a new ID and the correct settings.

## Voting

Here is the proposal and voting process for STPs:

<figure markdown>
  ![STP governance process after launch](gov-stp-governance-process.png){ loading=lazy .allow-zoom }
  <figcaption>STP governance process after Flare launch.</figcaption>
</figure>

### Who Votes

Anyone who holds `$SGB` can vote on Songbird.
The tokens must be wrapped before the proposal is submitted to be able to vote with them.

!!! important
    Your available votes depend on the amount of wrapped tokens (`$WSGB`) you hold, not your native `$SGB` tokens.
    Remember to wrap your tokens.
    Always keep some amount of native SGB to pay for gas fees.

Flare will announce proposals through their website and social media, so that you can read the proposal and wrap your tokens if you want to vote.

### Delegation of Votes

You can transfer votes to another address by signing a delegation transaction for a recipient.
For example, if you have more than one address, you can consolidate your votes by delegating them to a single address.
A delegation is valid from the time the delegation transaction is confirmed.
You can only delegate to one address, but any address can be the recipient for multiple delegations.
Users cannot redelegate votes that other addresses delegated to them.

!!! note
    Delegating votes has no connection with or effect on FTSO delegation.

#### Changing Delegation

To change the delegation of votes, delegate to a different recipient or remove the delegation.

In the following example you can see changes of votes due to delegations from others, delegating to another address, and due to wrapping or unwrapping tokens.

<figure markdown>
  ![Changes in number of votes](gov-changes-in-number-of-votes.png){ loading=lazy .allow-zoom }
  <figcaption>Changes in the number of votes.</figcaption>
</figure>

### Voting Period

The Flare Foundation will generally adhere to a one-week voting period.
For security reasons only, the Foundation may reduce the timeframe of this period.

### Two Ways to Vote

You can vote using a point-and-click user interface, or, if you are a developer, you can vote directly through the contracts.

To vote using the user interface, go to [Governance Proposals](https://governance.dev.aflabs.org/songbird).<!---This link is a place holder. What is the link to the UI doc?-->

??? example "Vote Directly through the Contracts (for Developers)"

    To cast a vote, sign a transaction, which calls one of the following functions:

    * `PF.castVote(uint256 proposalId, uint8 support)`
    * `PF.castVoteWithReason(uint256 proposalId, uint8 support, string reason)`
    * `PF.castVoteBySig(uint256 proposalId, uint8 support, uint8 v, bytes32 r, bytes32 s)`

    The `support` parameter has two possible values:

    *  `0` for voting against the proposal (NO)
    *  `1` to vote in support of the proposal (YES)

    The `reason` parameter in the second function is used to state an optional reason for your vote.
    
    The `v`, `r` and `s` parameters represent a signature.
    They are used to submit the vote for a signed entity.
    An example of using a signature is when a user does not want to expose his private key and signs his vote offline.
    Using the third function, any address can then cast this user’s vote provided that he provides the signature parts `v`, `r` and `s`.

    To create the signature to use for the input parameters of the third function, perform the following actions (stated here in TypeScript):

    1. Calculate the  `domainSeparator`:
    ```
    let typeHash = web3.utils.soliditySha3("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)");
    let hashedName = web3.utils.soliditySha3(PF.name());
    let versionHex = web3.utils.utf8ToHex(PF.version());
    let hashedVersion = web3.utils.soliditySha3(versionHex);
    let chainId = <chainId>; // 19 for Songbird, 14 for Flare
    let contractAddress = <contractAddress>;
    let encodedDomainSeparator = web3.eth.abi.encodeParameters(["bytes32", "bytes32", "bytes32", "uint256", "address"], [typeHash, hashedName,  hashedVersion, chainId, contractAddress])
    let domainSeparator = web3.utils.soliditySha3(encodedDomainSeparator) as string;
    ```

    2. Calculate hashes:
    ```
    let abi = web3.eth.abi.encodeParameters(['bytes32', 'uint256', 'uint8'], [PF.BALLOT_TYPEHASH(), <proposalId>, <support>]); 
    let structHash = web3.utils.keccak256(abi);
    let abiEncodePacked = "0x1901" + domainSeparator.slice(2) + structHash.slice(2);
    let hashTypedDataV4 = web3.utils.soliditySha3(abiEncodePacked) as string;
    ```

    3. Sign with your private key:
    ```
    let signature = web3.eth.accounts.sign(hashTypedDataV4, <privateKey>);
    let v = signature.v;
    let r = signature.r;
    let s = signature.s;
    ```

    All functions return the number of votes with which the user voted (multiplied by 10^18 and returned as an integer).

    To check if you already voted on a proposal, call the function `PF.hasVoted(uint256 proposalId, address user)`, which returns either `true` or `false`.
    To check how you voted, check the transaction that called one of the functions for casting a vote.

### Criteria for Proposal Success

A vote must satisfy two conditions, a Threshold condition and a Majority condition.
Because voting on STPs is rejection-based, both conditions must hold true or they will be accepted:

* The voting threshold must be reached, meaning that enough votes must be cast (at least 75% of all `$WSGB` tokens in circulation at a specific time).
* The majority, greater than 50% of the votes cast, must be against the proposal.

### How Votes are Calculated

Essentially, the number of votes that a user has is equal to the amount of wrapped Songbird (`$WSGB`) that this address holds at the specified time (at some block).
The number of votes can be a decimal number (up to 18 places).

Some important concepts explain how votes are calculated in greater detail:

* The vote count block.<!---Name- votepowerblock, vote count block - is TBD.-->
* Delegated votes.

#### The Vote Count Block

Because the number of wrapped tokens is subject to change, the block to use to count the tokens must be determined.
This block is called the _vote count block_ and this is how it is determined:

The vote count block is selected by going back a specified amount of seconds.
From there, a random block number is selected that is between the starting block of that reward epoch and the current block.
The number of votes that the user has is equal to the amount of wrapped Songbird tokens (`$WSGB`) that the user holds at that random block.

<figure markdown>
  ![Vote power block selection](gov-vote-power-block-selection.png){ loading=lazy .allow-zoom }
  <figcaption>Vote count block selection.</figcaption>
</figure>

### Voting Results

Voting results returned include:

* Total possible number of votes for the proposal.
* Votes cast in support.
* Votes cast against.

### Proposal Statuses

Here are the possible statuses of proposals:

| Status        | Description                                   |
|:------------- | :-------------------------------------------- |
| _Pending_ | Submitted, but not open for voting yet. Every proposal starts in the _Pending_ status. Includes the notice period when the community can comment on the proposal. |
| _Canceled_ | If a problem arises with the proposal settings, the creator can cancel the it if the voting period has not yet begun. |
| _Active_ | The voting period is open. Unless otherwise announced, it is open for one-week. |
| _Defeated_ | 75% or more of potential voters cast a vote and more than 50% voted against it. See [Criteria for proposal success](#criteria-for-proposal-success). |
| _Succeeded_ | 75% or more of potential voters cast a vote and 50% or less voted against it. Waiting for the execution window to start. The Execution Start Time is configurable, which may cause a wait time unless it is set to last 0 seconds. See [Criteria for proposal success](#criteria-for-proposal-success) and [Execution](#execution). |
| _Queued_ | Execution window has started. Waiting for the proposal creator to actually execute the proposal. See [Execution](#execution). |
| _Executed_ | Succeeded and the proposal creator has executed it. See [Execution](#execution). |

<figure markdown>
  ![Proposal statuses](gov-stp-statuses.png){ loading=lazy .allow-zoom }
  <figcaption>Proposal statuses.</figcaption>
</figure>

If a proposal is _Pending_, _Active_, _Succeeded_, or _Queued_, it still has a chance of being executed.

If a proposal is _Canceled_ or _Defeated_ it will not be executed.

## Execution

For an STP to be executed, it must meet certain conditions:

* It must not be rejected.
  See [Rejection based voting](#rejection-based-voting).
* The user who submitted the proposal must sign an execute transaction.
