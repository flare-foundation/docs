# Managing Delegations

Use this information to manage your [delegations](../../tech/ftso.md#delegation) to FTSO data providers by using the Flare Portal or the block explorer. When you make delegations to data providers, you increase their vote power, reinforce the stability of the FTSO ecosystem, and earn monetary rewards.

## Prerequisites

Before you delegate your vote power, you must:

* [Wrap your native tokens](../wrapping-tokens.md). Wrapped tokens are required to delegate your vote power to data providers.
* Choose 1 or 2 data providers. Multiple lists of data providers are available online, such as [FlareMetrics](https://flaremetrics.io/). As you browse the lists, consider the [factors that affect the potential for rewards](../../tech/ftso.md#rewards).
* [Understand how the timing of delegations affects rewards](../../tech/ftso.md#effects-of-the-vote-power-block-snapshot-on-delegations), and consider the following implications about the vote-power snapshot that will affect your rewards.

## Using the Flare Portal

This information explains how to manage your delegations using the [Flare Portal](https://portal.flare.network).

### Delegating Your Vote Power

1. Open the [Flare Portal](https://portal.flare.network). The home page is displayed.

    <figure markdown>
    ![Flare Portal Home](delegation-portal-connect.png){ loading=lazy .allow-zoom width=500px }
    <figcaption>Flare Portal home.</figcaption>
    </figure>

2. Click **Connect to Wallet** and log into your wallet. The interface to your **Main Account** opens.
3. Ensure you are connected to the network you want. In the following image, the wallet is connected to the Flare network.

    <figure markdown>
    ![Flare Portal Main Account](delegation-portal-main.png){ loading=lazy .allow-zoom width=500px }
    <figcaption>**Main Account** on the Flare network.</figcaption>
    </figure>

4. On the **Main Account** tab, locate the **FTSO provider delegations** field, and click **Delegate**. The **Delegate FTSO providers** window is displayed.
5. Click the **Main provider** dropdown menu, click the data provider you want, and drag the slider to select the percentage of your vote power you want to delegate to the data provider.

       <figure markdown>
         ![FTSO data providers](delegation-portal-providers.png){ loading=lazy .allow-zoom }
         <figcaption>**Delegate FTSO providers** window.</figcaption>
       </figure>

6. **Optional**: If you want to delegate to a second data provider, locate the **Second (optional) provider** field, and repeat step 3.
7. Click **Submit**.
8. Follow the steps to confirm the transaction in your wallet.

### Removing Delegations

1. Open the [Flare Portal](https://portal.flare.network), connect your wallet, and ensure you are connected to the network you want.
2. On the **Main Account** tab, locate the **FTSO provider delegations** field, and click **Delegate**. The **Delegate FTSO providers** window is displayed.
3. Drag the slider to 0% for one or both of the data providers, and click **Submit**.
4. Follow the steps to confirm the transaction in your wallet.

## Using the Block Explorer

!!! example "This section is for advanced users."

This information explains how to manage your delegations using the [block explorer](../block-explorer.md).

### Delegating Your Vote Power

1. After you choose your data provider from the [list of data providers](https://flaremetrics.io/), locate its address beneath its name, and copy it.
2. To verify the address of the data provider, open a [block explorer](../block-explorer.md), paste the address in the search field, and click the same address displayed as the result.

    On the **Transactions** tab, a list of recently submitted `SubmitHash` and `RevealPrices` transactions are displayed to confirm that the data provider is operating.

3. Open a [block explorer](../block-explorer.md) if you have not done so yet.
4. From the block explorer, follow the [Retrieval from Blockchain procedure](../../dev/reference/contracts.md#retrieval-from-blockchain) to find and open the `WNat` contract.
5. Click **Connect Wallet**, and complete the steps to connect your wallet.
6. Click the **Write Contract** tab, locate the `delegate` method, and specify values for these parameters:

    * **_to(address)**: The address for the data provider you copied in Step 1.
    * **_bips(uin256)**: The percentage in basis points. For example, 10000 bips = 100%, and 5000 bips = 50%.

7. Click **Write** to run the `delegate` method.
8. Follow the steps to complete the transaction in your wallet. Delegation is complete.

    In the next reward epoch, your newly delegated tokens will be included in the calculation of your selected data provider's weight.
    If the data provider submits useful data and garners any rewards, you will be able to [claim your share of the rewards](./managing-rewards.md) when the reward epoch is over.

### Removing Delegations

1. On the **Write Contract** tab in the `WNat` contract, locate the `delegate` method, change the value of **_bips(uin256)** for the data provider's address to 0, and click **Write** to run the method.
2. Follow the steps to complete the transaction in your wallet.

### Redelegating Vote Power

1. On the **Write Contract** tab in the `WNat` contract, locate the `undelegateAll` method, and click **Write** to run the method.
2. Follow the steps to complete the transaction in your wallet. All your delegations are removed.
3. Delegate to the data providers you've chosen by following [the previous set of steps to delegate](#delegating-your-vote-power_1).

### Revoking Vote Power

1. On the **Write Contract** tab in the `WNat` contract, locate the `revokeDelegationAt` method, and specify values for the following parameters:

    * **_who(address)**: The address of the data provider from whom you will revoke your delegation.
    * **_blockNumber(uint256)**: The block number at which your delegation will be revoked.

2. Click **Write** to run the method.
3. Follow the steps to complete the transaction in your wallet. Your delegation is immediately revoked.
