# Contributing Guidelines

## Workflow

This repository uses a docs-as-code approach, meaning that the same workflow used to contribute source code is followed.
This means that to contribute new text or modify existing pages, a git branch should be created and then a [GitHub Pull Request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) (PR) should be submitted.

PRs must be peer-reviewed before then getting merged into main.
Once a PR is merged, its changes are automatically published via a GitHub Action.

## Style

### General

* Always keep the scope of the document in mind. A document should precisely fulfill its purpose, nothing more, nothing less. It is a common pitfall to end up going into rabbit holes and spending half a document explaining irrelevant details.
* Try to write short sentences whenever possible to avoid complex grammar, complex use of tenses, ambiguous pronouns and so on. A good guideline when it comes to technical writing is to aim for 20-30 words per sentence. Keeping sentences short should however never come at the expense of clarity, syntactic cues and important information.
* Just like in code, consistency is key.

### Sections

* Section titles should follow the [Chicago Title Capitalization](https://en.wikipedia.org/wiki/Title_case#Chicago_Manual_of_Style) standard.
* Documents should start with a level one heading and should ideally be the same as the file name.
* Sections should be ordered hierarchically. Each document starts with a level one heading (`#`), which can contain one or more level two headings (`##`), which can contain one or more level threes (`###`) and so on.

### Formatting

* Lists should use the `*` character rather than the `-` character.
* Paragraphs that include multiple sentences should have the sentences on separate lines, so that updating one sentence results in a clear diff where one line changes.
* For long files that are not served within this repository, it is best to have a table of contents at the end of the introduction of the level one heading section.
* Always specify the language for code blocks so that neither the syntax highlighter nor the text editor must guess. If no specific type makes sense, just use `text`.

### Technical Writing

* Use American English (`organize` instead of `organise`, `behavior` instead of `behaviour`, etc.)
* Do not use gendered pronouns when talking about users/consumers/whatever but always `they/their` instead.
* Do not use the future tense but use present simple for expressing general truths instead.
* Use active voice when there is no specific need to use passive.
* Abbreviations and acronyms should be spelled out the first time they appear in any technical document with the shortened form appearing in parentheses immediately after the term. The abbreviation or acronym can then be used throughout the document.
* Avoid ambiguous and abstract language (i.e. really, quite, very), imprecise or subjective terms (i.e. fast, slow, tall, small) and words that have no precise meaning (i.e. bit, thing, stuff).
* Avoid contractions (i.e. don't, you'll, etc.) as they are meant for informal contexts.
* Avoid generalized statements, because they are difficult to substantiate and too broad to be supported.
* Avoid story-telling, remain factual and concise.
* Avoid jargon and humor.
* Avoid em-dashes. Putting non-restrictive relative clauses into separate sentences leads to simpler, clearer writing. If em-dashes are needed, make sure to use the right character: `—` (alt code: `ALT+0151`).
* When referring to something in a certain way (i.e. `FBAS` for *Federated Byzantine Agreement System*) make sure to consistently use only FBAS after the term is introduced.

### Links

* Use informative link titles. For example, instead of naming your links "link" or "here", wrap part of the sentence that is meant to be linked as a title.
* Links to external sources should be:
    * Clear, concise, factual (not tips & tricks-type articles, or blog posts)
    * Reliable to stand the test of time (will not start to 404 because it's a personal blog and the person decided to get rid of it for example)
    * From reliable sources (this is where Wikipedia isn't always perfect, but fine for technical subjects)
* Whenever possible, use internal links instead of external ones (if something has been described in our documents somewhere, link to it instead of externally)

### Official Spellings

Pay special attention to the capitalization and spacing of the following words:

* Fassets
* Layer Cake
* Smart contracts
