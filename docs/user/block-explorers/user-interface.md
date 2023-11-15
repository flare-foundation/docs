# Block Explorer Dashboard

Each block explorer provides this dashboard, which includes:

<figure markdown>
![Block Explorer Dashboard](block-explorer-dashboard.png){ loading=lazy }
<figcaption>Block Explorer Dashboard.</figcaption>
</figure>

* [Navigation Bar](#header-navigation-bar)
* [Metrics](#metrics)
* [Blocks](#blocks)
* [Transactions](#transactions)

This dashboard represents the dashboard of the [original Flare block explorers](./index.md).

## Navigation Bar

Use the options in the navigation bar to explore the blockchain and toggle light and dark modes.

* **Blocks**: View recently created blocks and their constituent transactions.
* **Transactions**: View validated or pending transactions.
* **Tokens**: View a list of all the tokens on the blockchain or the addresses of wallets that hold a specific token.
* **APIs**: For web3 developers to retrieve blockchain data.
* **Network**: View the explorers for other networks in the Flare ecosystem.
* **Display theme**: Toggle between light and dark mode.
* **Search**: Search the blockchain by address, token symbol, token name, transaction hash, or block number.

## Metrics

The metrics section displays the following information:

* **Gas tracker**: The average amount of gas required to process a transaction on a Flare network. Gas is denominated in units of gwei, where 1,000,000,000 gwei equals one token on a Flare network.
* **Average block time**: The average time required to confirm a block.
* **Total transactions**: The total amount of verified transactions.
* **Total blocks**: The total amount of confirmed blocks.
* **Wallet addresses**: The total amount of wallets created on the network.

## Blocks

A block is a group of transactions submitted, validated, and recorded on the blockchain.
Each block has a sequential ID and a number of transactions aggregated in the block.
To view details about a block and the transactions it contains, click the block ID.
Alternatively, view a continuous list of confirmed blocks as they occur by clicking **View All Blocks**.

<figure markdown>
![Blocks](block-explorer-blocks.png){ loading=lazy .allow-zoom}
<figcaption>Blocks.</figcaption>
</figure>

## Transactions

Transactions are the various actions you can take on a blockchain.
They are categorized by the following types:

* **Standard**: Transfers of tokens between two wallets.
* **Contract**: Interactions between two smart contracts or a wallet and a smart contract.
  Contract transactions include delegating tokens, transferring tokens, wrapping and unwrapping tokens, and so on.
  Interactions between two smart contracts are [internal transactions](./viewing-transactions.md#internal-transactions).

<figure markdown>
![Transaction Types](block-explorer-transaction-types.png){ loading=lazy .allow-zoom}
<figcaption>Transaction Types.</figcaption>
</figure>
