# Verifying the Vote-Power Block

!!! example "This page is for advanced users."

Use the block explorer to verify the [vote-power block](../../tech/ftso.md#vote-power) snapshot for a specific epoch.
The snapshot indicates when your delegations are enacted.

1. Open a [block explorer](./index.md) for the appropriate network.
   [The block explorer dashboard](./user-interface.md) is displayed.
2. From the block explorer, follow the [Retrieval from Blockchain procedure](../../dev/reference/contracts.md#retrieval-from-blockchain) to find and open the `FtsoManager` contract.
   The **Contract Address Details** page is displayed.
3. Click the **Read Contract** tab.
4. On the **Read Contract** tab, locate the `getRewardEpochVotePowerBlock` method, and specify the epoch number.
5. Click **Query** to run the `getRewardEpochVotePowerBlock` method.
   The block number that was used to determine the vote power for the next epoch is returned.
6. Copy this block number, paste it into the **Search** field, and press Enter.
   The **Block Details** page is displayed.
   The timestamp is displayed, as shown in the following image:

    <figure markdown>
    ![Vote-Power Block Snapshot](../../assets/block-explorer-vp-snapshot.png){ loading=lazy .allow-zoom}
    <figcaption>Vote-Power Block Snapshot.</figcaption>
    </figure>

    The displayed timestamp is the exact date and UTC time when vote power was locked during the epoch you specified.
