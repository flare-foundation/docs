---
hide:
  - toc
---

# Welcome to the Flare Network Documentation

Flare is the blockchain for data. It is a Layer 1, EVM smart contract platform designed to expand the utility of blockchain. Read more in [**What Is Flare?**](./tech/flare.md)

#### For token holders

<div class="flr-card has-background1" markdown>

## User Guides

Step-by-step guides for tools like the Explorer or the different wallets.

<div class="flr-card-links" markdown>

Quick links:

* [Metamask](./user/wallets/how-to-access-flare-network-with-metamask.md)
* [Claiming the FlareDrop](./tech/the-flaredrop.md)
* [Using FlareStake to Stake](./user/staking/staking-flarestake.md)

</div>
</div>

#### For developers

<div class="flr-card has-background2" markdown>

## Developer Guides

All developer guides are now in the [Flare Dev Hub](https://dev.flare.network/).

</div>

#### For everyone

<div class="flr-cards" markdown>

<div class="flr-card has-background5" markdown>

## Flare Products

Descriptions of Flare’s products

<div class="flr-card-links is-vertical" markdown>

Quick links:

* [FTSO](https://dev.flare.network/ftso/overview)
* [Flare Data Connector](./tech/data-connector.md)
* [FAssets](./tech/fassets/index.md)

</div>
</div>

<div class="flr-card has-background6" markdown>

## Flare Concepts

Descriptions of Flare’s key concepts, technology and tools

<div class="flr-card-links is-vertical" markdown>

Quick links:

* [Governance](./user/governance/index.md)
* [The FlareDrop](./user/claiming-the-flaredrop.md)
* [Personal Delegation Accounts](./user/personal-delegation-account.md)

</div>
</div>

These pages are a **Work In Progress**.
Use the contact buttons at the bottom of the page if there is anything you cannot find here!

<style>
    /*Remove the "Last updated" text at the bottom*/
    .md-source-file {
        display: none;
    }
    .md-typeset .flr-cards {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        flex-wrap: wrap;
    }
    .md-typeset .flr-cards .flr-card {
        flex: 1;
    }
    .md-typeset .flr-card {
        background-color: var(--flr-dark);
        max-width: 900px;
    }
    .md-typeset .flr-card.is-fullwidth {
        flex-basis: 100%;
    }
    /* Content/description */
    .md-typeset .flr-card > p {
        padding: 1rem;
        margin: 0;
        padding-top: 0;
    }
    /* Title */
    .md-typeset .flr-card h2 {
        margin-top: 0;
        height: 100px;
        /* background-color: var(--flr-dark); */
        background-color: #000;
        background-size: cover;
        padding: 2rem 1rem;
        font-weight: 400;
        background-position: center right;
    }
    /* Content/description */
    .md-typeset .flr-card-links > p {
        margin: 0;
        padding: 0;
        text-transform: uppercase;
        font-size: 0.6rem;
        padding-left: 1rem;
        padding-bottom: 0.5rem;
    }
    .md-typeset .flr-card-links > ul {
        display: flex;
        flex-direction: column;
        margin:0;
        padding:0;
        list-style: none;
        border-top:  1px solid var(--flr-dark-light);
    }
    .md-typeset .flr-card-links.is-vertical > ul {
        flex-direction: column;
    }
    .md-typeset .flr-card-links > ul li {
        flex: 1;
        margin:0;
        display: flex;
        align-items: center;
    }
    .md-typeset .flr-card-links > ul li:not(:last-child) {
        border-bottom: 1px solid var(--flr-dark-light);
    }
    .md-typeset .flr-card-links > ul a {
        text-decoration: none;
        display: block;
        flex: 1;
        position: relative;
        color: var(--md-accent-fg-color);
        font-weight: 500;
        padding: 0.5rem 1rem;
        padding-right: 0.75rem;
    }
    .md-typeset .flr-card-links > ul a:after {
        position: absolute;
        content: "";
        color: currentColor;
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        border-left: 6px solid currentColor;
        right: 12px;
        top: calc(50% - 6px);
    }
    .flr-card.has-background1 h2 {
        background-image: url('assets/images/home/user-guide-card-bkg.png');
    }
    .flr-card.has-background2 h2 {
        background-image: url('assets/images/home/get-started-card-bkg.png');
    }
    .flr-card.has-background3 h2 {
        background-image: url('assets/images/home/developer-guides-card-bkg.png');
    }
    .flr-card.has-background4 h2 {
        background-image: url('assets/images/home/api-reference-card-bkg.png');
    }
    .flr-card.has-background5 h2 {
        background-image: url('assets/images/home/flare-products-card-bkg.png');
    }
    .flr-card.has-background6 h2 {
        background-image: url('assets/images/home/flare-concepts-card-bkg.png');
    }
    .flr-card.has-background7 h2 {
        background-image: url('assets/images/home/infrastructure-card-bkg.png');
    }
    .md-typeset h1 {
        margin-bottom: 1.5rem;
    }
    .md-typeset h1 a {
        text-decoration: none;
        color: var(--flr-dark);
    }
    .md-typeset h4 {
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 0.25rem;
        margin-top: 2rem;
    }

    /* Tablet+ */
    @media screen and (min-width:60em) {
        .md-typeset .flr-card-links > ul {
            flex-direction: row;
        }
        .md-typeset .flr-cards {
            flex-direction: row;
            align-items: start;
        }
        .md-typeset .flr-card-links:not(.is-vertical) > ul li:not(:last-child) {
            border-right: 1px solid var(--flr-dark-light);
            border-bottom: none;
        }
    }
</style>
