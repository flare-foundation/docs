# Managing Delegations Using the Block Explorer

!!! example "This page is for advanced users."

When you make [delegations to FTSO data providers](../../tech/ftso.md#delegation), you increase their vote power, reinforce the stability of the FTSO ecosystem, and earn monetary rewards.

Use the following information to manage your vote-power delegations with the the block explorer, which provides many options but is more complex.
Alternatively, if you prefer a simpler interface, use the [Flare Portal](https://portal.flare.network/).

## Prerequisites

Before you delegate your vote power, you must:

* [Wrap your native tokens](../wrapping-tokens.md).
  Wrapped tokens are required to delegate your vote power to data providers.
* Choose 1 or 2 data providers.
  Multiple lists of data providers are available online, such as [FlareMetrics](https://flaremetrics.io/).
  As you browse the lists, consider the [factors that affect the potential for rewards](../../tech/ftso.md#rewards).
* [Understand how the timing of delegations affects rewards](../../tech/ftso.md#effects-of-the-vote-power-block-snapshot-on-delegations), and consider the implications about the vote-power snapshot that will affect your rewards.

## Delegating Your Vote Power

1. After you choose your data provider from the [list of data providers](https://flaremetrics.io/), locate its address beneath its name, and copy it.
2. To verify the address of the data provider, open a [block explorer](../block-explorers/index.md), paste the address in the search field, and click the same address displayed as the result.

    On the **Transactions** tab, a list of recently submitted `SubmitHash` and `RevealPrices` transactions are displayed to confirm that the data provider is operating.

3. Open a [block explorer](./index.md) for the appropriate network.
   The [block explorer dashboard](./user-interface.md) is displayed.
4. Follow the [Retrieval from Blockchain procedure](../../dev/getting-started/contract-addresses.md#retrieval-from-blockchain) to find and open the `WNat` contract.
   The **Contract Address Details** page is displayed.
5. Click the **Write Contract** tab, and then click **Connect Wallet**, as shown in the following image:

    <figure markdown>
    ![Write Contract Tab and Connect Your Wallet](block-explorer-write-wallet.png){ loading=lazy .allow-zoom}
    <figcaption>Write Contract Tab and Connect Your Wallet.</figcaption>
    </figure>

6. Complete the steps to connect your wallet.
7. Locate the `delegate` method, and specify values for these parameters:

    * **_to(address)**: The address for the data provider you copied in Step 1.
    * **_bips(uin256)**: The percentage in basis points. For example, 10000 bips = 100%, and 5000 bips = 50%.

8. Click **Write** to run the `delegate` method.
9. Follow the steps to complete the transaction in your wallet.
   Delegation is complete.

   In the next reward epoch, your newly delegated tokens will be included in the calculation of your selected data provider's weight.
   If the data provider submits useful data and garners any rewards, you will be able to [claim your share of the rewards](./managing-rewards.md) when the reward epoch is over.

## Removing Delegations

1. Open a [block explorer](./index.md) for the appropriate network.
   The [block explorer dashboard](./user-interface.md) is displayed.
2. Follow the [Retrieval from Blockchain procedure](../../dev/getting-started/contract-addresses.md#retrieval-from-blockchain) to find and open the `WNat` contract.
   The **Contract Address Details** page is displayed.
3. Click the **Write Contract** tab, and then click **Connect Wallet**, as shown in the following image:

    <figure markdown>
    ![Write Contract Tab and Connect Your Wallet](block-explorer-write-wallet.png){ loading=lazy .allow-zoom}
    <figcaption>Write Contract Tab and Connect Your Wallet.</figcaption>
    </figure>

4. Complete the steps to connect your wallet.
5. Locate the `delegate` method, change the value of **_bips(uin256)** for the data provider's address to 0, and click **Write** to run the method.
6. Follow the steps to complete the transaction in your wallet.

## Redelegating Vote Power

1. Open a [block explorer](./index.md) for the appropriate network.
   The [block explorer dashboard](./user-interface.md) is displayed.
2. Follow the [Retrieval from Blockchain procedure](../../dev/getting-started/contract-addresses.md#retrieval-from-blockchain) to find and open the `WNat` contract.
   The **Contract Address Details** page is displayed.
3. Click the **Write Contract** tab, and then click **Connect Wallet**, as shown in the following image:

    <figure markdown>
    ![Write Contract Tab and Connect Your Wallet](block-explorer-write-wallet.png){ loading=lazy .allow-zoom}
    <figcaption>Write Contract Tab and Connect Your Wallet.</figcaption>
    </figure>

4. Complete the steps to connect your wallet.
5. Locate the `undelegateAll` method, and click **Write** to run the method.
6. Follow the steps to complete the transaction in your wallet.
   All your delegations are removed.
7. Delegate to the data providers you've chosen by following [the previous set of steps to delegate](#delegating-your-vote-power).

## Revoking Vote Power

You can [immediately revoke your vote power](../../tech/ftso.md#immediate-delegation-revocation) from a malicious data provider.

1. Open a [block explorer](./index.md) for the appropriate network.
   The [block explorer dashboard](./user-interface.md) is displayed.
2. Follow the [Retrieval from Blockchain procedure](../../dev/getting-started/contract-addresses.md#retrieval-from-blockchain) to find and open the `WNat` contract.
   The **Contract Address Details** page is displayed.
3. Click the **Write Contract** tab, and then click **Connect Wallet**, as shown in the following image:

    <figure markdown>
    ![Write Contract Tab and Connect Your Wallet](block-explorer-write-wallet.png){ loading=lazy .allow-zoom}
    <figcaption>Write Contract Tab and Connect Your Wallet.</figcaption>
    </figure>

4. Complete the steps to connect your wallet.
5. Locate the `revokeDelegationAt` method, and specify values for the following parameters:

    * **_who(address)**: The address of the data provider from whom you will revoke your delegation.
    * **_blockNumber(uint256)**: The block number at which your delegation will be revoked.

6. Click **Write** to run the method.
7. Follow the steps to complete the transaction in your wallet.
   Your delegation is immediately revoked.
