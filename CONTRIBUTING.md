# Contributing Guidelines

## Workflow

This repository uses a docs-as-code approach, meaning that the same workflow used to contribute source code is followed.
This means that to contribute new text or modify existing pages, a git branch should be created and then a GitLab Merge Request (MR) should be submitted.

MRs must be peer-reviewed before getting merged into main.
GitLab automatically generates previews for all MRs.
Once an MR is merged, its changes are automatically published.

## Automatic Checking

### Markdown Linting

If using [Visual Studio Code](https://code.visualstudio.com/), install the [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one), the [Markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) and the [nbsp-vscode](https://marketplace.visualstudio.com/items?itemName=possan.nbsp-vscode) extensions.

Then make sure these settings are present in your `.vscode/settings.json` file:

```json
    "markdownlint.config": {
        "MD004": {      // All lists should use asterisks
            "style": "asterisk"
        },
        "MD007": {
            "indent": 4 // Unordered lists indented by 4, as per the standard
        },
        "MD013": false, // We allow long lines
        "MD033": false, // We allow inline HTML
        "MD026": {      // We do not allow this specific trailing punctuation in headers
            "punctuation": ".,;:"
        },
        "MD024": {
            "siblings_only": true // Allow headers with same name if they are not siblings
        },
        "MD025": false, // We allow both H1 and front matter titles, to have shorter TOCs but full page titles
        "MD042": false, // We sometimes use empty links to create buttons
        "MD046": false, // Because Admonition indentation looks like an indented code block
    },
```

### Link Checking

> **NOTE:**
> The procedure below currently does not work because of the huge amount of links to GitLab and GitHub that we have.

Install [linkchecker-markdown](https://github.com/scivision/linkchecker-markdown):

```bash
pip install linkcheckmd
```

And run `linkcheckmarkdown --recurse --sync docs` before submitting PRs to verify you are not introducing broken links.

These are currently false positives which can be safely ignored:

```text
 ('how-to-access-flare-network-with-a-ledger-device.md', 'https://metamask.io/download.html', 404)
 ('how-to-access-flare-network-with-metamask.md', 'https://metamask.io/download.html', 404)
 ('how-to-access-flare-network-with-a-trezor-device.md', 'https://metamask.io/download.html', 404)
 ('network-configs.md', 'https://bitcoin-api.flare.network', 405)
 ('network-configs.md', 'https://litecoin-api.flare.network', 405)
 ('network-configs.md', 'https://dogecoin-api.flare.network', 405)
 ('network-configs.md', 'https://xrpl-api.flare.network', 400)
 ('network-configs.md', 'https://algorand-api.flare.network', 404)
 ('safepal-s1-wallet.md', 'https://safepalsupport.zendesk.com/hc/en-us/articles/360046051752-How-to-Set-Up-a-S1-Hardware-Wallet', 403)
```

## Style

### General

* Always keep the scope of the document in mind. A document should precisely fulfill its purpose, nothing more, nothing less. It is a common pitfall to end up going into rabbit holes and spending half a document explaining irrelevant details.
* Try to write short sentences whenever possible to avoid complex grammar, complex use of tenses, ambiguous pronouns and so on. A good guideline when it comes to technical writing is to aim for 20-30 words per sentence. Keeping sentences short should however never come at the expense of clarity, syntactic cues and important information.
* Just like in code, consistency is key.
* USE A SPELL CHECKER.
* Use a markdown checker or linter to get rid of the most common (and annoying) markdown issues, like trailing white space, blank lines, etc.
  At some point this might be enforced.

### Sections

* Section titles should follow the [Chicago Title Capitalization](https://en.wikipedia.org/wiki/Title_case#Chicago_Manual_of_Style) standard.
* Documents should start with a level one heading and should ideally be the same as the file name.
* Sections should be ordered hierarchically. Each document starts with a level one heading (`#`), which can contain one or more level two headings (`##`), which can contain one or more level threes (`###`) and so on.

### Formatting

* Lists should use the `*` character rather than the `-` character, always start capitalized and end with a full stop.
* Paragraphs that include multiple sentences should have the sentences on separate lines, so that updating one sentence results in a clear diff where one line changes.
* For long files that are not served within this repository, it is best to have a table of contents at the end of the introduction of the level one heading section.
* Always specify the language for code blocks so that neither the syntax highlighter nor the text editor must guess. If no specific type makes sense, just use `text`.
* Token names should always start with a dollar sign `$` and be enclosed in backticks `` ` ``: `$FLR`.

### Technical Writing

* Use American English (`organize` instead of `organise`, `behavior` instead of `behaviour`, etc.)
* Use the American format for dates with long month names: `January 9, 2023`.
  3-letter short month names can be used when space is at a premium, for example on narrow table columns.
  In this case, use the Day-Month-Year format: `9-Jan-2023`.
* Do not use gendered pronouns when talking about users/consumers/whatever but always `they/their` instead.
* Avoid talking about *us*, or *we*, even if it means resorting to passive voice.
* Use active voice when there is no specific need to use passive.
* Do not use the future tense but use present simple for expressing general truths instead.
* Abbreviations and acronyms should be spelled out the first time they appear in any technical document with the shortened form appearing in parentheses immediately after the term. The abbreviation or acronym can then be used throughout the document.
* Avoid ambiguous and abstract language (i.e. really, quite, very), imprecise or subjective terms (i.e. fast, slow, tall, small) and words that have no precise meaning (i.e. bit, thing, stuff).
* Avoid contractions (i.e. don't, you'll, etc.) as they are meant for informal contexts.
* Avoid generalized statements, because they are difficult to substantiate and too broad to be supported.
* Avoid story-telling, remain factual and concise.
* Avoid jargon and humor.
* Avoid em-dashes. Putting non-restrictive relative clauses into separate sentences leads to simpler, clearer writing. If em-dashes are needed, make sure to use the right character: `—` (alt code: `ALT+0151`).
* When referring to something in a certain way (i.e. `FBAS` for *Federated Byzantine Agreement System*) make sure to consistently use only FBAS after the term is introduced.
* Use digits when the number is mostly meant to be used in a program. Spell out numbers when they are not (e.g., when a number can be a pronoun, such as in *that's the one I used*).

### Links

* Use informative link titles. For example, instead of naming your links "link" or "here", wrap part of the sentence that is meant to be linked as a title.
* Links to external sources should be:
    * Clear, concise, factual (not tips & tricks-type articles, or blog posts).
    * Reliable to stand the test of time (will not start to 404 because it's a personal blog and the person decided to get rid of it, for example).
    * From reliable sources (this is where Wikipedia isn't always perfect, but fine for technical subjects).
* Whenever possible, use internal links instead of external ones (if something has been described in our documents somewhere, link to it instead of externally).
* Shortened links: thanks to the `Autolink` plugin we can use only the file name, without path, and mkdocs will search for the file.
    This only works for files with unique names, so its usage is restricted to images, contract names, and the glossary, for convenience:
    * `![This is an image](block-explorer-balance.png)`
    * `[FtsoRegistry](FtsoRegistry.md)`
    * `[FBA](glossary.md#fba)`
* All other links to internal pages should be relative to the current page, so always start them with `./` or `../`.
* Links to admonitions (aka info boxes) do not work out of the box.
    You need to drop a manual anchor with `{ #anchor_name }` on the line before the info box, and still separated by a blank line,
    and then link to that anchor in the usual way `[link title](../target_page.md#anchor_name)`

### Official Spellings

Pay special attention to the capitalization and spacing of the following words:

* autoclaiming
* dapp
* FAssets
* FIP.01
* Flare network (the blockchain, sibling to the Songbird network)
* Flare Networks (The company)
* Flare Time Series Oracle
* LayerCake
* mainnet (or main network)
* Merit-Based Consensus
* P-Chain, C-Chain and X-Chain (this is how Avalanche calls them)
* Relay (when talking about Flare's cross-chain data relay protocol)
* smart contracts
* State Connector
* `$FLR`, `$SGB`, `$WFLR` and `$WSGB` (the wrapped tokens)
* testnet (or test network)
* web3

**Products** are capitalized: State Connector, LayerCake, and FAssets.
**Roles** are not capitalized: FTSO data providers, State Connector attestation providers, FAsset agents, minters, redeemers, liquidators, and challengers.

### Images

* In the screenshots, no partner should be prioritized over others.
    For example, all FTSO data provider names and addresses should be blurred to make them illegible.
    Use a 20px Gaussian Blur filter on Gimp (Or 7 Standard Deviations if your version of Gimp does not allow specifying pixels).
