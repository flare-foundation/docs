# Finding the Reward Epoch

!!! example "This page is for advanced users."

[Reward epochs](../../tech/ftso.md#reward-epoch) are periods during which delegations rewards are accrued. Use the block explorer to find the current reward epoch, which you can use to find the epoch for which you can claim rewards and to determine the [vote-power block](../../tech/ftso.md#vote-power) for the next epoch.

The following guide refers to the [original Flare block explorers](./index.md).

1. Open a [block explorer](./index.md) for the appropriate network.
   [The block explorer dashboard](./user-interface.md) is displayed.
2. From the block explorer, follow the [Retrieval from Blockchain procedure](../../dev/getting-started/contract-addresses.md#retrieval-from-blockchain) to find and open the `FtsoManager` contract.
   The **Contract Address Details** page is displayed.
3. Click the **Read Contract** tab, and locate the `getCurrentRewardEpoch` method.
   The current reward epoch number is already displayed beside the function, as shown in the following example:

    <figure markdown>
    ![Current Reward Epoch](block-explorer-current-epoch.png){ loading=lazy .allow-zoom}
    <figcaption>Current Reward Epoch.</figcaption>
    </figure>

    In this example, the FTSO reward epoch is 80.
