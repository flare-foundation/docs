---
title: Using the Flare Portal
---

# Using the Flare Portal to Stake

The [Flare Portal](https://portal.flare.network/) is a dapp developed by Flare Network that enables you to earn rewards by staking your `$FLR` in your MetaMask wallet to validators on the Flare network.

Alternatively, you can use the [FlareStake command-line interface](./staking-cli.md) or the [FlareStake, the GUI tool for staking](./staking-flarestake.md) to stake.

Staking works by locking funds for a period of time to support a specific [network validator](../../tech/validators.md).
When validator owners stake to their own nodes they _self-bond_, whereas all other participants are said to _delegate_ their stake to that validator.
Note that delegating your stake to a validator is different from [FTSO delegation](../../tech/ftso/index.md/#delegation).

!!! note

    Proof of stake is being implemented on Flare in phases.
    Ensure that you have read the [Validators page](../../tech/validators.md#deployment-phases) to learn about them.

Participants choose how much to stake and for how long their stake will be locked.
The minimum values are:
{ #minimum-values }

|                  | Self-bond | Delegation |
| ---------------- | --------: | ---------: |
| Minimum amount   | 1M `$FLR` | 50K `$FLR` |
| Minimum duration |   60 days |    14 days |

At the end of every [reward epoch](../../tech/ftso/index.md#reward-epoch), participants are rewarded according to how well their chosen validator performed in that period.

!!! info "Staking limits"

    When you choose your validator and amount to stake, consider the [delegation factor and the staking cap](./index.md#limits).

    You can stake to any number of validators, but [rewards](./staking-flarestake.md#reward-claiming-guide), [FlareDrops](../../tech/the-flaredrop.md), and [governance vote power](../../tech/governance.md#the-vote-count-block) only apply for up to 3 different validators.

The [deployment phases summary](../../tech/validators.md#summary) shows other rewards that staked funds can still earn while they are locked.

Given that the Flare network uses two [independent underlying chains](../../tech/flare.md#flare-chains), there is one extra step that must be considered.
Funds must be transferred from the C-chain, where smart contracts run, to the P-chain, where staking happens.
After the staking period expires and funds are unlocked, they can be transferred back to the C-chain.

## Staking Guide for MetaMask

If you do not have MetaMask installed, follow the [MetaMask guide](../wallets/how-to-access-flare-network-with-metamask.md) to set it up to manage Flare assets.

### 1. Enable Your Staking Account

[Flare uses two chains](../../tech/flare.md/#flare-chains), the C-chain and the P-chain.
Staking is done on the P-chain, so you need an account on this chain to serve as your staking account.
Establishing this account costs only the transaction fee.

1. Open the [Flare Portal](https://portal.flare.network/), and click **Staking** in the top navigation bar.
2. Check for your staking address, which is an address on the [P-chain](../../tech/flare.md/#flare-chains), in the middle of the Staking window.
   If your staking address is already displayed, go to [Step 2](#2-enable-eth_sign-requests).
   Otherwise, continue to enable your staking account.
3. Click **Enable** beside the **Staking address** field.
   The **Enable staking account** window prompts you to verify the transaction before you complete it in MetaMask.
   You do not need to verify it, and you can close the window.
4. In the open MetaMask window, click **Confirm** to complete the transaction to enable the account.
   Your new staking address is displayed in the middle of the **Staking information** window.

### 2. Enable **Eth_sign requests**

The transactions to stake your `$FLR` require a form of blind signing.

When you blind sign a transaction, the data relevant to your transaction is encoded, which makes it unintelligible.
This lack of complete transparency makes blind signing a risky procedure because it exposes your wallet to various types of attack.
Unfortunately, blind signing is the procedure because of the way the P-chain, which is inherited from Avalanche, is designed to sign transactions.

To mitigate these risks, you will verify the transactions using a verification tool.
After initiating a transaction, you will copy the transaction data and paste it into the verification tool, which decodes the data and displays several specific parameters of each transaction.

You will compare the decoded data with the data provided by MetaMask to ensure they are identical to each other.
To complete this type of transaction, you must enable the **Eth_sign requests** setting in MetaMask.

1. Open the MetaMask browser extension and unlock your MetaMask wallet with your password.
2. Click the vertical three-dot menu and click **Settings**.
3. Click **Advanced**.
4. Locate **Eth_sign requests**, and toggle the switch to **ON**.
   The **Use at your own risk** warning message is displayed.
5. Read the warning message, click the checkbox to indicate that you understand the risks, and then click **Continue**.
6. Type the statement the message prompts you to type, and click **Enable**.
   **Eth_sign requests** is enabled.

### 3. Move Funds to the P-chain

Transfers between chains are made of two operations: an **export** from the C-chain followed by an **import** to the P-chain.
Therefore, you are asked to confirm TWO transactions on your hardware wallet.

When transferring from the C-chain to the P-chain, transaction fees are wholly paid from the C-chain.
Make sure you leave enough funds on the C-chain after the transfer, or it will fail.

1. In the Flare Portal, in the **Staking** tab, click **Deposit**.
2. In the **Amount to deposit** field, specify the amount of `$FLR` from your main account that you want to deposit into your staking account, and click **Deposit**.
    The **Deposit funds** window is displayed to begin the **export** transaction.

    As an additional security measure, verify all transactions when using blind signing as follows:
    { #transaction-verification }

    !!! note "Transaction Verification"

        1. Install [npm, the Node package manager](https://www.npmjs.com/package/npm).
            You only need to do this once.
        2. In the **Deposit funds** window, click **Copy unsigned transaction**.
        3. Open a terminal window, and run the [Flare Transaction Verification Tool](https://github.com/flare-foundation/flare-tx-verifier) by issuing:

            ```bash
            npx @flarenetwork/flare-tx-verifier INPUT
            ```

            where `INPUT` is the transaction information you copied in the previous step.

            The verification process is run, and the details of the transaction are displayed.
            For example:

            ```json
            network: "Flare Mainnet"
            description: "Export from C-chain"
            recipients: ["flare1a9aduj4xv5ptrz35xwd5zmr3a7c9ar4vq7j7cn"]
            values: ["0.501 FLR"]
            fee: 0.00034813 FLR
            warnings: []
            messageToSign: "0x2330e2bbd17ebedb1142c4d17a9a01457ec60323baef20a964f8106ad0c3ebe3"
            ```

        4. Locate the `messageToSign` value and compare it to the value of the message in the **Signature request** window in MetaMask.

            Continue the process only if both values match.

3. In MetaMask, click **Sign**.
   MetaMask issues a message to warn you that your funds might be at risk.
4. Click **Sign** again.
   After the transaction is confirmed, the **import** operation begins, and you are required to sign another transaction.
5. In MetaMask, click **Sign**.
   MetaMask issues a message to warn you that your funds might be at risk.
6. Click **Sign** again.
   After the second transaction is confirmed, the **Available funds** field should reflect the new amount.
   If not, refresh the page.

### 4. Stake Your Funds

To stake funds, delegate them to an existing validator.

1. Identify the validator to which you will stake your funds by reviewing validator data on sites like [FlareMetrics](https://flaremetrics.io/validators), [flare.builders](https://www.flare.builders/validators), [SolidiFi](https://solidifi.app/validators), or the [Flare Validator Tracker](https://flare-validators.flare.network/), for example, and record its NodeID.
2. In the **Staked funds** field, click **Stake**.
   In the **Amount to stake** field, specify the amount of your available funds that you want to stake.
   The [minimum amount is 50000 `$FLR`](#minimum-values).
3. In the **Stake until** field, specify the date and time on which you want to unstake your funds.
   Be mindful of the [14-day minimun duration](#minimum-values).
4. From the **Validator node** dropdown menu, select the NodeID for the validator to which you want to stake.
5. Click **Stake**.
    Before staking can occur, you must sign several transactions.

    !!! note "Transaction Verification"

        It is highly recommended that you verify all transactions using the [Transaction Verification](#transaction-verification) procedure described in the box above.

After the transactions are confirmed, your funds are staked to the validator you specified.

### 5. Disable **Eth_sign requests**

Because of the potential risks previously described, turn off **Eth_sign requests** after your funds are staked.
Do not make any transactions outside the Flare Portal without first turning off **Eth_sign requests**.
To locate the **Eth_sign requests** setting, see [step 2](#2-enable-eth_sign-requests).

## Staking Guide for WalletConnect, Coinbase Connect, and Other Wallets

If your wallet supports the Eth_sign transaction method, you can stake your funds with it on the Flare Portal.
Otherwise, you must use either [FlareStake GUI](./staking-flarestake.md) or the [FlareStake CLI](./staking-cli.md) to stake your funds.
