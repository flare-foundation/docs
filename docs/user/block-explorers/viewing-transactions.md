# Viewing Transactions

!!! example "This page is for advanced users."

Use the block explorer to view transaction details that explain where the transactions exist on the blockchain, when they were processed, how much gas they consumed, and more.

1. Retrieve the address whose transactions you want to view.
2. Open the [block explorer](./index.md) for the appropriate network.
   [The block explorer dashboard](./user-interface.md) is displayed.
3. Insert the address from Step 1 into the **Search** field.
   If the address exists, it is highlighted in the results list.
4. Click the highlighted address.
   The **Address Details** page is displayed, as shown in the following image. The preselected **Transactions** tab lists the transactions associated with the address.

    <figure markdown>
    ![Transactions](block-explorer-transactions.png){ loading=lazy .allow-zoom}
    <figcaption>Transactions.</figcaption>
    </figure>

5. Click the transaction hash, as shown in the following image, which highlights in sequence a [standard transaction and a contract transaction](./user-interface.md#transactions).
   The listed transactions were made by the address you specified. Details about a transaction are displayed when you click a transaction hash.

    <figure markdown>
    ![Transaction Hash](block-explorer-tx-hash.png){ loading=lazy .allow-zoom}
    <figcaption>Transaction Hash.</figcaption>
    </figure>

    The **Transaction Details** page is displayed, as shown in the following image:

    <figure markdown>
    ![Transaction Details](block-explorer-tx-details.png){ loading=lazy .allow-zoom}
    <figcaption>Transaction Details.</figcaption>
    </figure>

## Transaction Details

The following transaction information is provided:

* **Transaction Hash**: A unique identifier that proves a transaction is verified and added to the blockchain.
* **Result**: The state of the transaction.
  The state is either **Success**, **Pending**, or **Failed**.
* **Status**: The status of the transaction.
  The status is either **Confirmed** or **Unconfirmed**.
* **Block**: The number of the block that contains the transaction.
* **Timestamp**: The date and time when the transaction was added to the blockchain and the amount of time required to confirm it.
* **From**: The address of the transaction sender.
* **To**: The address of the transaction recipient.
* **Value**: The quantity of tokens sent.
* **Transaction Fee**: The total cost of the transaction.
* **Gas Price**: The price per unit of gas specified by the sender.
  Units are measured in gwei.
* **Transaction Type**:
* **Gas Limit**: The maximum amount of gas approved for the transaction.
* **Max Fee Per Gas**: The maximum total amount per unit of gas the sender would pay, including the base fee and priority fee.
* **Max Priority Fee per Gas**: The maximum fee per unit of gas specified by the sender to pay a validator to prioritize the transaction.
  This fee is also called a tip.
* **Priority Fee/Tip**: The priority fee specified by the sender to pay a validator to prioritize the transaction.
* **Transaction Burnt Fee**: The amount of `$FLR` burned for the transaction.
* **Gas Used by Transaction**: The actual amount of gas used by the transaction.
* **Nonce Position**: The transaction number from the sender's address.
  Each transaction made by an address increases the nonce by one.

The following elements are specific to contract transactions:

* **Interacted With (To)**: The address of the contract that handles the transaction.
* **Tokens Minted**
    * **From**: The address that initiated the transaction with the contract.
    * **To**: The address of the recipient of the token in the transaction.
    * **For**: The symbol of the token and its quantity in the transaction.
* **Raw Input**: The hashed input of a transaction. This input accompanies the transaction to process it.

### Input

The **Input** section shows the methods that were called and the parameters used in the transaction.

### Internal Transactions

Internal transactions occur between multiple smart contracts.
In some cases, tokens are transferred to a smart contract during an internal transaction.

1. Locate the **Internal Transactions** tab, as shown in the following image:

    <figure markdown>
    ![Internal Transactions](block-explorer-internal-tx.png){ loading=lazy .allow-zoom}
    <figcaption>Internal Transactions.</figcaption>
    </figure>

2. Click the transaction hash, as shown in the following image:

    <figure markdown>
    ![Transaction Hash](block-explorer-tx-hash.png){ loading=lazy .allow-zoom}
    <figcaption>Transaction Hash.</figcaption>
    </figure>

    The [transaction details](#tx-details) are displayed.

### Logs

Transaction logs show events that were trigged by smart contracts during a transaction and information related to those events.

Click the **Logs** tab, as shown in the following image:

<figure markdown>
![Logs](block-explorer-logs.png){ loading=lazy .allow-zoom}
<figcaption>Logs.</figcaption>
</figure>

The logs are displayed.

### Raw Trace

The raw trace shows all parameters and data related to a transaction.
If errors occurred during the transaction, this information can be used to debug them.

Click the **Raw Trace** tab, as shown in the following image:

<figure markdown>
![Raw Trace](block-explorer-raw-trace.png){ loading=lazy .allow-zoom}
<figcaption>Raw Trace.</figcaption>
</figure>

The raw trace is displayed in JSON format.
