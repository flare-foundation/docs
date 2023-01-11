---
og_image: assets/launch-process-thumb.png
og_description: The goal of this page is to remove any confusion around Flare's launch process.
---

# Flare Launch Process

The Flare launch is delicate, as it involves a rather **large airdrop**, a **community vote**, and the deployment of a **novel meritocratic consensus** system.
For this reason, it has been divided into a series of **sequential phases** with **clearly-defined triggers** that signal each transition.

The main goal of this page is to **remove any confusion around the launch process** by clearly describing the purpose of each phase and what happens in them.

The secondary goal is to serve as a real-time tracker of the **current phase**.

Without further ado:

<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
viewBox="0 0 895 1844" style="background: white; padding: 8px;">
  <image width="895" height="1844" xlink:href="../../assets/launch-process.png"></image>
  <title>Click on a phase to navigate to its description.</title>
  <a href="#private-observation-mode">
    <rect x="262" y="111" fill="#fff" opacity="0" width="189" height="87"></rect>
  </a>
  <a href="#public-observation-mode">
    <rect x="262" y="297" fill="#fff" opacity="0" width="189" height="87"></rect>
  </a>
  <a href="#initial-distribution-period">
    <rect x="262" y="664" fill="#fff" opacity="0" width="189" height="87"></rect>
  </a>
  <a href="#fip01-notice-period">
    <rect x="262" y="847" fill="#fff" opacity="0" width="189" height="87"></rect>
  </a>
  <a href="#fip01-voting-period">
    <rect x="262" y="1032" fill="#fff" opacity="0" width="189" height="87"></rect>
  </a>
  <a href="#regular-operation-beta">
    <rect x="262" y="1217" fill="#fff" opacity="0" width="189" height="185"></rect>
  </a>
  <a href="#regular-operation">
    <rect x="262" y="1502" fill="#fff" opacity="0" width="189" height="185"></rect>
  </a>
  <a href="#regular-non-fip01-operation">
    <rect x="502" y="1502" fill="#fff" opacity="0" width="189" height="185"></rect>
  </a>
</svg>

## Definitions

Some definitions are required so the rest of the page is clear and unambiguous.

* **FIP.01**: [A governance proposal](https://flare.xyz/fip01/) that, among other things, changes the initial token distributions as explained below.
This proposal needs to be voted on according to the schedule described in this page.

* **Flare Airdrop for XRP Holders**: Certain holders of XRP tokens on Dec 12, 2020, were eligible to register for the FLR token distribution (then called _Spark_ tokens) once the Flare network launched.
    The claiming process is described in this (slightly outdated) [Flare blog post](https://flare.xyz/claiming-spark-faqs/).

    The FIP.01 proposal modifies the way in which the airdrop works.

* **Original Airdrop**: 28.53B FLR tokens, which in the original distribution plan went to those who registered for the distribution.

* **New Airdrop**: 4.28B FLR tokens destined for those that registered for the distribution.

* **Delegation Incentive Pool (DIP)**: 24.25B FLR tokens destined for _any Flare holder_ that participates in the network over 36 months as per the FIP.01 distribution plan.

    _Note that the New Airdrop plus the DIP match the Original Airdrop._

* **Token Distribution Event (TDE)**: The moment when the initial FLR tokens are distributed to those that registered for the FLR token distribution.
These tokens were minted and locked when the network was created and will be released when it is sufficiently decentralized.

## Token Distribution Plans

It is worth summarizing the two current token distribution plans, as only one of them will be implemented depending on whether [FIP.01](https://flare.xyz/fip01/) is approved or not.

* **Original Distribution Plan**:

    * 15% of the original airdrop is sent to those that registered for the FLR distribution upon the TDE, with the rest delivered monthly over the following 36 months.
    * Inflation is 10% of the fully diluted supply, per annum.

* **FIP.01 Distribution Plan**:

    * The new airdrop is sent to those that registered for the FLR distribution upon the TDE, the DIP will be distributed  to ALL FLR token holders (actually, wrapped FLR holders) over 36 months (Flare employees and companies excluded).
    * Inflation is 10% of available supply in the first year, then 7% the following year, 5% the year after and in perpetuity, except that from year 3 onwards inflation is capped at 5bn FLR per year.
    * Inflation distribution: 70% to [FTSO](./ftso.md) rewards, 20% to [validator](./validators.md) rewards and 10% to the default Attestation Provider Set of the [state connector](./state-connector.md).

## Flare Beta

Decentralization will be achieved by moving the transaction validation duty **from the Flare Foundation to community-run FTSO** [data providers](glossary.md#data_provider), but this will not happen instantly.

Instead, in order to ensure a safe transition, a number of **professional validators** will be initially employed.

The professional validators will be chosen among companies with proven experience running blockchain infrastructure, and will **at first hold most of the validation power**.
This power, though, will be **progressively shifted** onto the community-run validators until they run the network on their own.

This initial period is called **Flare Beta**, and it will span several launch phases (marked in blue in the diagram above).

### Flare Beta Details

During this period:

* There are 22 total validators **with equal validation power** (20K FLR each, initially).
    * 4 run by the Flare Foundation.
    * 16 run by 4 professional validators.
    * 2 "virtual validators" collectively run by ALL FTSO data providers together.

        FTSO data providers have their initial validation power **artificially reduced** so that all of them combined have the power of **two** validators (i.e. 40K FLR tokens).

        Validator rewards (20% of inflation) are split 50% for the professional validators and 50% for the FTSO data providers.

* The validation power for each FTSO validator will be **calculated monthly** by an external script (public, auditable and based on on-chain data) and shared among all validators.
    * Each FTSO's share of validation power will depend on its FTSO performance and its own stake, as is done with the voting power used in the [normal FTSO operation](./ftso.md#vote-power).
    * The total validation power allocated for FTSO will start at 40K FLR but will gradually increase until it matches the real stake each FTSO has (including delegations).

* Validation rewards for FTSOs will increase accordingly as their collective validation power increases.

* Estimated duration: 6-9 months, depending on the evolution of the network.

## Launch Phases

### Private Observation Mode

!!! danger "Trigger: The Flare network Launches"

On July 14th 2022 the network started centralized, with only 21 validators, run by the Flare Foundation.

Flare validator source code is **not** available yet.

FTSO data providers:

* Can submit data, as they do on Songbird, but don't act as validators since they cannot run nodes.

* Are not rewarded. [All inflation is burned during observation mode](https://flare.xyz/om-inflation/).

---

### Public Observation Mode

!!! danger "Trigger: The Flare validator source code becomes publicly available"

Professional validators start onboarding, so the network starts becoming decentralized.

FTSO data providers:

* Can submit data, as they do on Songbird, but don't act as validators since they won't have funds to stake until the TDE.

* Are not rewarded. [All inflation is burned during observation mode](https://flare.xyz/om-inflation/).

---

### Initial Distribution Period

!!! danger "Trigger: 66% of validator power is independent of Flare,<br/>AND <br/>Exchanges agree to distribute the FLR token to their customers within a few days of the TDE"

!!! important "Token Distribution Event (TDE) happens"
    The **new airdrop** is sent to the Flare addresses provided by XRP token holders when they claimed.

    Part of the airdrop is expected to go to Exchange accounts, which will then distribute it to the users that originally claimed (the **intended recipients**).

Flare will monitor how many of the airdrop tokens have reached the intended recipients, by following the Exchange's communication channels.

FTSO data providers:

* Can now deploy their own **validator** nodes. The guide to do so will be available.

* Act as validators and their voting power [depends on their FTSO performance and stake](./validators.md).

FTSO and validator rewards are enabled.
Inflation is not burned anymore.

---

### FIP.01 Notice Period

!!! danger "Trigger: 66% of the new airdrop reaches its intended recipients"

The [FIP.01 proposal](https://flare.xyz/fip01/) modifies how the rest of the tokens (after the TDE) are to be distributed, so it needs to be voted on by the community.
Users will vote with their FLR token stake, so voting cannot start until enough tokens have reached the intended recipients.

Once 66% of the FLR tokens distributed during the TDE reach these users, **a 1-week notice period** will start.

Flare will announce to the community that enough tokens have been distributed and the notice period has started.

---

### FIP.01 Voting Period

!!! danger "Trigger: 1 week after Notice Period starts"

All FLR token holders (obtained either from the new airdrop or bought at Exchanges) can vote on [FIP.01](https://flare.xyz/fip01/) using a voting front-end (under development).

Flare will announce to the community that the Voting Period has started and relay instructions on how to vote.

Voting Period will last 1 week.

---

### Regular Operation (Beta)

!!! danger "Trigger: FIP.01 is approved after 1 week of voting"

The changes proposed in [FIP.01](https://flare.xyz/fip01/) **are implemented**.
The **DIP** is distributed to ALL holders of FLR during 37 months.

[Flare Beta](#flare-beta) is still in operation but community-run validators gradually gain more power.

---

### Regular Operation

!!! danger "Trigger: Community-run FTSO validators are deemed reliable enough"

[Flare Beta](#flare-beta) ends.

FTSO validators's validation power is not artificially reduced anymore and validator rewards (20% of inflation) are distributed equally among all validators according to their performance and stake.

---

### Regular Non-FIP.01 Operation

!!! danger "Trigger: FIP.01 is NOT approved after 1 week of voting"

The [Original Distribution Plan](#token-distribution-plans) is implemented.
