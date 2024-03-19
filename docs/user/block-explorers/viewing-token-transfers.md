# Viewing Token Transfers

!!! example "This page is for advanced users."

The following guide refers to the [original Flare block explorers](./index.md).

Use the block explorer to view token transfers to and from an address.

1. Retrieve the address whose token transfers you want to view.
2. Open the [block explorer](./index.md) for the appropriate network.
   [The block explorer dashboard](./user-interface.md) is displayed.
3. Insert the address from Step 1 into the **Search** field.
   If the address exists, it is highlighted in the results list.
4. Click the highlighted address. The **Address Details** page is displayed.
5. Click the **Token Transfers** tab, as shown in the following image:

    <figure markdown>
    ![Token Transfers](block-explorer-transfers.png){ loading=lazy .allow-zoom}
    <figcaption>Token Transfers.</figcaption>
    </figure>

    The **Token Transfers** list is displayed.

6. Click the transaction hash for the token transfer you want to view.
   The following details about the transfer are displayed:

    * **Transaction Hash**: A unique identifier that proves a transaction is verified and added to the blockchain.
    * **Result**: The state of the transaction.
    The state is either **Success**, **Pending**, or **Failed**.
    * **Status**: The status of the transaction.
    The status is either **Confirmed** or **Unconfirmed**.
    * **Block**: The number of the block that contains the transaction.
    * **Timestamp**: The date and time when the transaction was added to the blockchain and the amount of time required to confirm it.
    * **From**: The address of the transaction sender.
    * **Interacted With (To)**: The address of the contract that handles the transaction.
    * **Tokens Transferred**
        * **From**: The address that initiated the transaction with the contract.
        * **To**: The address of the recipient of the token in the transaction.
        * **For**: The symbol of the token and its quantity in the transaction.
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
    * **Transaction Burnt Fee**: The amount of `$FLR` [burned](glossary.md#burn) for the transaction.
    * **Gas Used by Transaction**: The actual amount of gas used by the transaction.
    * **Nonce Position**: The transaction number from the sender's address.
    Each transaction made by an address increases the nonce by one.
    * **Raw Input**: The hashed input of a transaction.
    This input accompanies the transaction to process it.
    * **Input**: The relevant functions that were called and parameters used in the transaction.
