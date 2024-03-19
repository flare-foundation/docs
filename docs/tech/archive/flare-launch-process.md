---
og_image: assets/thumbnails/launch-process-thumb.png
og_description: The goal of this page is to remove any confusion around Flare's launch process.
search:
  boost: 0.5
---

# Flare Launch Process

The Flare launch included a rather **large airdrop**, a **community vote**, and the deployment of a **novel meritocratic consensus** system.
Because of its complexity, it was divided into a series of **sequential phases** with **clearly-defined triggers** that signaled each transition.

The following information was intended to **remove any confusion around the launch process** by clearly describing the purpose of each phase and what happened in them.

<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
viewBox="0 0 895 1844" style="background: white; padding: 8px;">
  <image width="895" height="1844" xlink:href="../../../assets/images/tech/archive/launch-process.png"></image>
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

The following definitions make the rest of this page clear and unambiguous.

* **FIP.01**: [A governance proposal](https://proposals.flare.network/FIP/FIP_1.html) that, among other things, changed the initial token distributions as explained below.
This proposal needed to be voted on according to the schedule described in this page.

* **Flare Airdrop for XRP Holders**: Certain holders of XRP tokens on Dec 12, 2020, were eligible to register for the FLR token distribution (then called _Spark_ tokens) once the Flare network launched.

    The FIP.01 proposal modified the way in which the airdrop worked.

* **Original Airdrop**: 28.53B FLR tokens, which in the original distribution plan went to those who registered for the distribution.

* **New Airdrop**: 4.28B FLR tokens destined for those that registered for the distribution.

* **Delegation Incentive Pool (DIP)**: 24.25B FLR tokens destined for _any Flare holder_ that participated in the network over 36 months as per the FIP.01 distribution plan.

    _Note that the New Airdrop plus the DIP match the Original Airdrop._

* **Token Distribution Event (TDE)**: The moment when the initial `$FLR` tokens were distributed to those who registered for the `$FLR` token distribution.
These tokens were minted and locked when the network was created, and they were released when it was sufficiently decentralized.

## Token Distribution Plans

The following distribution plans were offered. The FIP.01 Distribution Plan was implemented after [FIP.01](https://proposals.flare.network/FIP/FIP_1.html) was approved.

* **Original Distribution Plan**:

    * 15% of the original airdrop would have been sent to those who registered for the `$FLR` distribution upon the TDE, and the rest would have been delivered monthly over the subsequent 36 months.
    * Inflation would have been 10% of the fully diluted supply, per annum.

* **FIP.01 Distribution Plan**:

    * The new airdrop was sent to those who registered for the `$FLR` distribution upon the TDE, and the DIP was distributed to all `$FLR` token holders (actually, wrapped `$FLR` holders) over 36 months. Flare employees and companies were excluded.
    * Inflation is 10% of available supply in the first year, then 7% the following year, 5% the year after and in perpetuity, except that from year 3 onwards [inflation](glossary.md#inflation) is capped at 5bn `$FLR` per year.
    * Inflation distribution: 70% to [FTSO](../ftso.md) rewards, 20% to [validator](../validators.md) rewards and 10% to the default Attestation Provider Set of the [state connector](../state-connector.md).

## Launch Phases

### Private Observation Mode

!!! danger "Trigger: The Flare network launches"

On July 14, 2022, the network started centralized, with only 21 validators, run by the Flare Foundation.

Flare validator source code was **not** available yet.

FTSO data providers:

* Could submit data, as they do on Songbird, but did not act as validators because they could not run nodes.

* Were not rewarded. [All inflation would be burned during observation mode](https://flare.network/om-inflation/).

---

### Public Observation Mode

!!! danger "Trigger: The [Flare validator source code](https://github.com/flare-foundation/go-flare) becomes publicly available"

During this mode, professional validators started onboarding, so the network started to become decentralized.

FTSO data providers:

* Could submit data, as they do on Songbird, but did not act as validators because they would not have funds to stake until the TDE.

* Were not rewarded. [All inflation was burned during observation mode](https://flare.network/om-inflation/).

---

### Initial Distribution Period

!!! danger "Trigger: 66% of validator power is independent of Flare,<br/>AND <br/>Exchanges agree to distribute the `$FLR` token to their customers within a few days of the TDE"

!!! tip "Token Distribution Event (TDE) happens"
    The **new airdrop** was sent to the Flare addresses provided by `$XRP` token holders when they claimed.

    Part of the airdrop went to Exchange accounts, which distributed it to the users that originally claimed (the **intended recipients**).

During this period, Flare monitored how many of the airdrop tokens reached the intended recipients, by following the Exchange's communication channels.

FTSO data providers:

* Could deploy their own **validator** nodes.

* Acted as validators and their voting power [depended on their FTSO performance and stake](../validators.md).

FTSO and validator rewards were enabled.
Inflation was not burned anymore.

---

### FIP.01 Notice Period

!!! danger "Trigger: 66% of the new airdrop reaches its intended recipients"

[FIP.01](https://proposals.flare.network/FIP/FIP_1.html) proposed to modify how the rest of the tokens (after the TDE) would be distributed, so it required the community to vote.
Users voted with their `$FLR` token stake, so voting could not start until enough tokens had reached the intended recipients.

After 66% of the FLR tokens distributed during the TDE reached these users, **a 1-week notice period** began.

Flare announced to the community that enough tokens were distributed and the notice period had started.

---

### FIP.01 Voting Period

!!! danger "Trigger: 1 week after Notice Period starts"

All `$FLR` token holders (obtained either from the new airdrop or bought at Exchanges) could vote on [FIP.01](https://proposals.flare.network/FIP/FIP_1.html) using a voting front-end.

Flare announced to the community that the Voting Period had started and relayed instructions about how to vote.

Voting Period lasted 1 week.

---

### Regular Operation (Beta)

!!! danger "Trigger: FIP.01 is approved after 1 week of voting"

The changes proposed in [FIP.01](https://proposals.flare.network/FIP/FIP_1.html) **were implemented**.
The **DIP** will be distributed to ALL holders of FLR during 37 months.

[Flare Beta](../flare-beta.md) is still in operation, but community-run validators are gradually gaining more power.

---

### Regular Operation

!!! danger "Trigger: Community-run FTSO validators are deemed reliable enough"

[Flare Beta](../flare-beta.md) will end.

FTSO validators' validation power is not artificially reduced anymore and validator rewards (20% of inflation) will be distributed equally among all validators according to their performance and stake.
