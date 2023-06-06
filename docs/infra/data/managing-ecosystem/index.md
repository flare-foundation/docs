# Managing the Ecosystem

The following information explains how to manage the FTSO ecosystem by participating in the FTSO Management Group, as described in [FIP.02](https://proposals.flare.network/FIP/FIP_2.html#fip02-add-an-ftso-management-group), which was accepted on March 6, 2023.

To prevent malicious behaviors that impair the FTSO ecosystem, the FTSO Management Group reports [possible infractions](https://proposals.flare.network/FIP/FIP_2.html#1-brief-description) committed by FTSO data providers and determines whether to [punish them](https://proposals.flare.network/FIP/FIP_2.html#22-process-for-chill-proposals).

Punished data providers are [chilled](https://proposals.flare.network/FIP/FIP_2.html#23-chill-effects), which means they are removed from the [whitelist](../whitelisting.md), either temporarily or permanently, depending on the quantity of infractions they have committed.

Any address can request to be a member of the group, but only [upstanding FTSO data providers](https://proposals.flare.network/FIP/FIP_2.html#21-management-group-members) are accepted.

As a security measure to be used only when absolutely necessary, the Flare Foundation reserves the right to add and remove members on its own accord.

## Management Process

The group adheres to the following [management process](https://proposals.flare.network/FIP/FIP_2.html#22-process-for-chill-proposals).
For complete details about each step in the process, click each hyperlink.

1. [Discuss possible infractions](https://proposals.flare.network/FIP/FIP_2.html#22-process-for-chill-proposals) (section 2.2.1).
2. [Submit a chill proposal](https://proposals.flare.network/FIP/FIP_2.html#22-process-for-chill-proposals) (section 2.2.2).
3. [Vote on the proposal](https://proposals.flare.network/FIP/FIP_2.html#22-process-for-chill-proposals) (sections 2.2.2 - 2.2.4).

Depending on the outcome of the vote, [the provider might be chilled](https://proposals.flare.network/FIP/FIP_2.html#23-chill-effects) (section 2.3).

## Discussing Infractions

When you suspect a data provider is harming the ecosystem, you must discuss the malicious behavior with other group members in the [Flare FTSO Self-Policing Forum](https://forum.flare.network/) to inform the FTSO community about the problem and gather the necessary quorum for a potential vote.
It facilitates the decision about whether to submit a formal proposal to chill the attacker.
The discussion is not binding.

## Retrieving the `PollingFtso` contract

The `PollingFtso` contract handles interactions such as managing group members, submitting proposals, voting, and more.
The following procedure explains how to interact directly with this contract.
However, if you prefer a simpler interface, the Flare community is developing front-ends to facilitate the interactions, such as [Flaremetrics](https://flaremetrics.io/ftso/proposals).

1. Open a [block explorer](../../../user/block-explorers/index.md) for the appropriate network.
2. Follow the [Retrieval from Blockchain procedure](../../../dev/getting-started/contract-addresses.md#retrieval-from-blockchain) to find and open the `PollingFtso` contract.
    The **Contract Address Details** page is displayed.
3. Optional: If you need to call a method in the **Write** tab, click the **Write Contract** tab, click **Connect Wallet**, and complete the steps to connect your wallet.

After the `PollingFtso` contract is open in the explorer, you can complete operations to manage members and chill proposals.

## Managing Group Members

To be a member you need to be an [upstanding data provider](https://proposals.flare.network/FIP/FIP_2.html#21-management-group-members), which means:

* You have received FTSO rewards for the last 20 reward epochs.
* You have not been chilled in the last 20 reward epochs.
* You have not been removed from the group in the last week.

After [the `PollingFtso` contract is open](#retrieving-the-pollingftso-contract) in the explorer, you can do the following operations, among others.

### Adding Members

Anyone can request to become a member of the FTSO Management Group.

1. In the **Write** tab, locate the `addMember` method, and click **Write** to call it.
2. Follow the steps to complete the transaction in your wallet.

    Your request to be added to the group is submitted.
    If you meet [the conditions of an upstanding data provider](#managing-group-members), you are automatically added to the group.

### Removing Members

Anyone can ask for a member of the FTSO Management Group to be removed.

1. In the **Write** tab, locate the `removeMember` method, and specify a value for this parameter:

    * `_account(address)`: The address of the member you want to remove from the group.

2. Click **Write** to call the `removeMember` method.
3. Follow the steps to complete the transaction in your wallet.

    Your request to remove a member from the group is submitted.
    If the member no longer meets the [conditions of an upstanding data provider](#managing-group-members), the member is immediately removed.

## Managing Chill Proposals

After [the `PollingFtso` contract is open](#retrieving-the-pollingftso-contract) in the explorer, you can do the following operations, among others.

### Submitting a Proposal

If you are a member of the FTSO Management Group or a member's [proxy](#setting-a-proxy-voter), you can submit a chill proposal.

1. In the **Write** tab, locate the `propose` method, and specify values for these parameters:

    * `_description(string)`: A free-form description of the problem to be voted on.
        It does not have a fixed structure, but it must contain at least [the URL for the discussion in the forum](https://proposals.flare.network/FIP/FIP_2.html#22-process-for-chill-proposals) (section 2.2.2.d)
    * `value(FLR or SGB)`: The cost to call the `propose` method to submit the proposal, which you must specify as the value.
    The current cost is 100 `$FLR` or `$SGB`.
    Because this cost can fluctuate, retrieve the current cost by locating the `proposalFeeValueWei` method in the **Read** tab, which automatically displays the cost.

2. Click **Write** to call the `propose` method.
3. Follow the steps to complete the transaction in your wallet.

    Your proposal is submitted, and the `proposalId` is returned.

4. Post the `proposalId` in the discussion thread so that members of the group can use it to vote on the proposal.

### Voting on a Proposal

You can vote on a proposal when the following conditions are met:

* You are a member of the FTSO Management Group or a member's [proxy](#setting-a-proxy-voter).
* The proposal is active.

To vote on a proposal:

1. In the **Write** tab, locate the `castVote` method, and specify values for these parameters:

    * `_proposalId(uint256)`: The proposal ID posted by the proponent in the discussion thread.
        This ID was obtained by proponent when the proposal was submitted.
    If you specify nonexistent IDs or IDs for proposals that have completed, the transaction reverts, and the explorer returns empty results.
    * `_support(uint8)`: Specify one of the following values.

        * `0`: Vote against the proposal.
        * `1`: Vote in favor of the proposal.

        If you specify values other than `0` or `1`, the transaction reverts.

2. Click **Write** to call the `castVote` method.
3. Follow the steps to complete the transaction in your wallet.

    Your vote is cast.

### Setting a Proxy Voter

If you are a member of the group, you can declare one address that can manage proposals and vote on them on your behalf.
This address is known as your proxy.
Your proxy can submit proposals and vote on them.

1. In the **Write** tab, locate the `setProxyVoter` method, and specify the value for this parameter:

    * `_proxyVoter(address)`: The address you want to declare as your proxy.

2. Click **Write** to call the `setProxyVoter` method.
3. Follow the steps to complete the transaction in your wallet.

    The specified address is set as your proxy voter.

### Removing a Proxy Voter

1. In the **Write** tab, locate the `setProxyVoter` method, and specify the value for this parameter:

    * `_proxyVoter(address)`: Specify  the [zero address](glossary.md#zero-address) `0x0000000000000000000000000000000000000000`.

2. Click **Write** to call the `setProxyVoter` method.
3. Follow the steps to complete the transaction in your wallet.

    The previously specified proxy address is revoked.

### Determining Your Proxy Voter's Address

1. In the **Read** tab, locate the `providerToProxy` method, and specify the value for this parameter:

    * `(address)`: The address that declared the proxy.

2. Click **Query** to call the `providerToProxy` method.

    The address of the proxy voter is returned.

### Retrieving the Last Proposal

   In the **Read** tab, locate the `getLastProposal` method.

   The number of the most recent proposal and its description are displayed.

### Retrieving a List of Group Members

   In the **Read** tab, locate the `getManagementGroupMembers` method.

   A list of the addresses of members is displayed.

### Retrieving a Proposal Description

1. In the **Read** tab, locate the `getProposalDescription` method, and specify the value for this parameter:

    * `proposalId(uint256)`: The ID of the proposal whose description you want.
      If you don't know the proposal ID, refer to the proposal's discussion thread.

2. Click **Query** to call the `getProposalDescription` method.

    The description of the specified proposal ID is returned.
    If you specified a nonexistent ID for the `proposalId` parameter, an empty string is returned.

### Retrieving a Vote Count

1. In the **Read** tab, locate the `getProposalVotes` method, and specify the value for this parameter:

    * `proposalId(uint256)`: The ID of the proposal whose vote count you want.
      Proposal IDs are posted in its corresponding discussion thread.

2. Click **Query** to call the `getProposalVotes` method.

    The number of votes in favor of the proposal and the number of votes against it are returned.
    If you specified a nonexistent ID for the `proposalId` parameter, `0` is returned as the number of votes for the proposal and as the number of votes against it.

### Determining a Member's Vote Status

1. In the **Read** tab, locate the `hasVoted` method, and specify the value for these parameters:

    * `proposalId(uint256)`: The ID of the proposal for which you want to determine a member's vote status.
    * `voter(address)`: The address of the member.
    If you do not know the address, refer to the [list of addresses for all group members](#retrieving-a-list-of-group-members).

2. Click **Query** to call the `hasVoted` method.

    A boolean value indicating whether the member has voted is returned.
    If you specified a nonexistent ID for the `proposalId` parameter, `false` is returned.

## Related Guides

* [Exploring Collusion](exploring-collusion.md)
* [Monitoring Price History](monitoring-price-history.md)
