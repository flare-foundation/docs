# Governance

## Introduction

Flare governance gives everyone in the ecosystem the opportunity to collaborate on decision-making on the [Flare and Songbird](./flare.md#the-flare-networks) networks, making governance an important element of decentralization.

This process enables the Flare Foundation and Flare and Songbird community members to:

* Propose policy changes.
* Vote on them.
* Execute them if accepted.

The following sections detail the different kinds of proposals Flare allows and the process for each of them.

If you are already familiar with Flare's governance and just need to know how to cast your vote through the Flare Portal, check the [Voting User Guide](../user/governance/voting.md).

## Flare's Governance

Excluding the [testnets](glossary.md#test_network) Coston and Coston2, Flare currently has two networks: Flare and Songbird.
Moreover, two kinds of proposals are planned, depending on who initiates them: those proposed by the community and those proposed by the Flare Foundation.

This situation leads to four types of proposals, of which only two are currently supported and detailed next.

## Flare Improvement Proposals and Songbird Test Proposals

Flare Improvement Proposals (FIPs) and Songbird Test Proposals (STPs) are initiated by the Flare Foundation and are aimed at improving the Flare and Songbird networks.
Community-initiated proposals will be supported later.

To increase its stability, FIPs are rejected by default, meaning that they are accepted only if enough votes are cast in their favor.

To increase the swiftness at which new proposals can be tested on Songbird, STPs are accepted by default, meaning that they are rejected only if enough votes are cast against them.

See [Voting Outcomes](#voting-outcomes) below for more details.

### Who Votes

To vote on a proposal on a network, you must have the valid wrapped token:

| Network  | Proposal Type | Token  | Wrapped Token |
| -------- | ------------- | ------ | ------------- |
| Flare    | FIP           | `$FLR` | `$WFLR`       |
| Songbird | STP           | `$SGB` | `$WSGB`       |

!!! important

    * Available votes depend on the amount of valid wrapped tokens you have, not the native tokens. Therefore, **remember to wrap your tokens**.
    * Don't wrap all your tokens. **Keep some of them to pay for transaction fees**.
    * To vote with your tokens, they must be wrapped before the proposal is submitted.

The Flare Foundation announces proposals in advance, so that users can read them and wrap their tokens if they have to.

??? info "Vote Transfer"

    Votes can be transferred to another account while the wrapped tokens remain in your possession.
    Being able to transfer votes is useful, for example, if you have wrapped tokens in multiple self-custody wallets, because voting can then be simplified by transferring all the votes to a single wallet and voting from there.
    { #vote-transfer }

    Votes can only be transferred to one address, but it can receive votes from multiple addresses.
    Received votes cannot be transferred again to a third address.

    **Once activated, vote transfers always send 100% of an account's votes to the selected address and remain active until they are canceled.**

    As an example, if you have 100 `$WSGB` before a proposal and you activate the transfer, you will transfer 100 votes.
    If you later add 100 more `$WSGB`, for the next proposal you will automatically transfer 200 votes, since the transfer remains active until you cancel it.

    The following is a more complex example, showing the changes produced by vote transfers, and token wrapping and unwrapping on Songbird:

    <figure markdown>
      ![Changes in number of votes on Songbird](gov-changes-in-number-of-votes.png){ loading=lazy .allow-zoom }
      <figcaption>Changes in the number of votes on Songbird.</figcaption>
    </figure>

    !!! note
        Transferring votes has no connection with FTSO delegation:
        Wrapped tokens can be delegated to an [FTSO data provider](glossary.md#data_provider) and at the same time the votes they grant can be transferred to a different address.

#### The Vote Count Block

Since the amount of wrapped tokens an account holds varies over time, a snapshot of all accounts is taken before each voting period starts.
The amount of wrapped tokens held by an account at the snapshot then dictates the number of votes available later.

The block at which the snapshot is taken is called the **vote count block**.

To encourage users to use their tokens and keep them in the network, instead of just acquiring them for voting and then disposing of them, the vote count block is randomly selected.
The next section details when this happens.

### Voting Process

The image in this section shows the voting process, which includes several conditions:

* **Threshold condition**: A minimum quorum must be reached, meaning that enough votes must be cast, or no minimum quorum is required.

* **Majority condition**: More than 50% of the votes cast, must be for or against the proposal.

<figure markdown>
  ![Voting process](gov-voting-process.png){ loading=lazy .allow-zoom }
  <figcaption>Voting process.</figcaption>
</figure>

* **Announcement**: The Flare Foundation publishes the proposal online and announces it through social media channels (linked on the footer of this page) and [the Flare website](https://flare.network).

* **Notice period**: Once the proposal is published, the Flare Foundation allows a notice period before voting can start, typically lasting one week.
    During this time the proposal can be discussed, clarified, commented on, and even cancelled if serious issues are found with it.

    For security reasons only, the Foundation may reduce the timeframe of this period.

* **Block selection period**: The [vote count block](#the-vote-count-block) is selected at a random time during this period.
    The duration of this period is also random.

    !!! warning
        If you need to wrap tokens, do so before this period starts since tokens wrapped after the selected vote count block will not result in additional votes.

* **Voting period**: The proposal is submitted to the [Flare Portal](https://portal.flare.network), and it is immediately available for voting.
    Voting concludes after a week, and final results are presented on the portal.

### Voting Outcomes

#### FIPs

Voting on FIPs is acceptance-based.
For an FIP to be accepted, a simple majority of the votes cast must be in favor of it.
No minimum quorum is required.

Therefore, an FIP will be rejected only if less than half of the cast votes are for it.

#### STPs

Voting on STPs is rejection-based.
For an STP to be rejected, both of the following conditions must be true:

* **Threshold condition**: The minimum quorum is at least 75% of all `$SGB` tokens circulation (excluding the Flare Foundation's tokens) at the [vote count block](#the-vote-count-block).

    Note that the quorum is specified as a fraction of the circulating native `$SGB` tokens instead of the wrapped tokens `$WSGB` used for voting.
    This measure tries, again, to encourage users to wrap their tokens and use them in the network.

* **Majority condition**: More than 50% of the votes cast, must be against the proposal.

Therefore, an STP will be accepted if the quorum threshold is not reached or if less than half of the cast votes are against it.

### Execution

Once a proposal is accepted, Flare's governance contracts allow for its automatic execution via a contract call.

However, some proposals might require changes that are not implementable through a smart contract and therefore automatic execution is disabled for them.
Both FIPs and STPs are manually executed by the Flare Foundation.

## Related User Guides

* [Voting](../user/governance/voting.md)
