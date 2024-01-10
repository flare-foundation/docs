# Smart Contracts Docgen

Run `build-docs.sh` from this folder to:

* Clone a number of Flare smart contract repositories.
* Patch them to add solidity-docgen functionality.
* Run solidity-docgen to generate doc pages from code comments.
* Copy these doc pages to the /docs/apis/smart-contracts folder.
* Update the index.md page that lists all generated contracts.
* Update mkdocs.yml to include the new pages.

Add new repositories to be processed to the `repos.list` file.
Each line contains these items, separated by whitespace:

* The git URL of the repo.
* The hardhat config file, typically `hardhat.config.ts` or `hardhatSetup.config.ts`.
* The command required to build the repo.
  It can contain spaces, since this is the last item in the line.

Add new contracts to be processed to each repository list file.
