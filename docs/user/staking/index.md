# Staking on Validators

This section contains information about staking Flare assets on [validators](../../tech/validators.md) and receiving rewards earned from your stake.

* [Using FlareStake to Stake](./staking-flarestake.md)
* [Using the Flare Portal to Stake](./staking-portal.md)
* [Using the Command Line to Stake](./staking-cli.md)

## Lists of Validators

Use any of the following tools to obtain the latest list of validators and analyze their statistics:

* [FlareMetrics](https://flaremetrics.io/validators)
* [Flarescan](http://flarescan.com/validators)
* [flare.builders](https://www.flare.builders/validators)
* [SolidiFi](https://solidifi.app/validators)

!!! info "Conditions for Choosing Profitable Validators"

    As you analyze validator statistics, remember that you will earn staking rewards in the current validation reward period only when the following conditions are met:

      * Your chosen validator is running an FTSO data provider
      * Your chosen validator is running an FTSO data provider that has earned any [FTSO rewards](../../tech/ftso/index.md#rewards) during the four FTSO reward epochs inside the current validation reward period
      * Your chosen validator is operational at least 80% of the time

## Limits

The amount that you can stake and the rewards you can gain by staking are restricted by these limits:

* **Delegation factor**: Limits the total amount that can be staked to a validator to its self-bond, which is the amount validators stake to their own nodes, times the _delegation factor_, which is 15.
For example, if a validator has a self-bond stake of 1M `$FLR`, the total sum of all stakes, including delegations, cannot exceed 15M `$FLR`.
This limit allows for 14M `$FLR` of delegations.

    To determine whether a validator has space for more delegations, open the [FlareMetrics list of validators](https://flaremetrics.io/validators), hover over the progress bar in the **Total Stake** column, and look at the **Free Space** amount.

* **Staking cap**: Limits the reward performance of individual validators to **5% of the total staked amount**.
If you stake your funds on a validator with more than 5% of the total staked amount, you receive less `$FLR` in reward.
To maximize your reward, delegate your staking funds to a validator with less than 5% of the total staked amount of `$FLR`.

    To determine whether a validator exceeds the staking cap, open the [FlareMetrics list of validators](https://flaremetrics.io/validators) and look for an exclamation mark beside the amount of `$FLR` staked in the **Total Stake** column and hover over it.

* **Maximum number of validators**: You can stake to any number of validators, but [rewards](./staking-flarestake.md#reward-claiming-guide), [FlareDrops](../../tech/the-flaredrop.md), and [governance vote power](../../tech/governance.md#the-vote-count-block) only apply for up to 3 different validators.

    For more information about validators, see [Validator Nodes](../../tech/validators.md).
