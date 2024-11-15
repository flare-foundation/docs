---
title: Operational Parameters
search:
  boost: 2
---

# FAsset Operational Parameters

This page lists the current values for the most important parameters of the [FAssets system](./index.md).

Each listed parameter links to its documentation when available.
Otherwise, it includes a description of the purpose of the parameter.

!!! warning "Some of the values might be adjusted during the Beta phases."

## Open Beta (Coston) Parameter Values

### Minting and Redeeming

| Parameter                                                                                                                                                                                                                                                                         | XRP            | BTC            | DOGE           |                |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------|----------------|----------------|----------------|
| **Minting cap** <br>Total amount of allowed FAssets in circulation. Once reached, no more FAssets can be minted until some are redeemed. This is intended as a security measure. In the final deployment this cap will be gradually increased and finally removed.                | none           | none           | none           |                |
| [**Lot size**](./minting.md#lots)                                                                                                                                                                                                                                                 | 20 XRP         | 0.0004 BTC     | 100 DOGE       |                |
| [**Collateral reservation fee (CRF)**](./minting.md#crf)                                                                                                                                                                                                                          | 0.1%           | 0.1%           | 0.1%           |                |
| [**Redemption fee**](./redemption.md#redemption-fee)                                                                                                                                                                                                                              | 0.1%           | 0.1%           | 0.1%           |                |
| [**Redemption default premium**](./redemption.md#redemption-payment-failure)                                                                                                                                                                                                      | 10%            | 10%            | 10%            |                |
| **Redemption default premium source** <br>Where does the premium come from when an agent fails to pay the redeemer on time? <br>If the [vault CR](./collateral.md#the-collateral-ratio) > 1.1, from the agent's vault. Otherwise, from the agent's vault and the collateral pool. | From the vault | From the vault | From the vault |

### Minting and Redeeming Payment Times

| Parameter                                                                                                                                                              | XRP        | BTC        | DOGE       |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------|------------|------------|
| **Underlying blocks for payment** <br>The number of underlying blocks during which the minter or agent can pay the underlying value.                                   | 500        | 10         | 50         |
| **Underlying seconds for payment** <br>The minimum time allowed for an agent to pay for a redemption or a minter to pay for minting.                                   | 15 minutes | 2 hours    | 50 minutes |
| **Average block time** <br>The average time between two successive blocks on the underlying chain.                                                                     | 2 seconds  | 10 minutes | 1 minute   |
| **Time of proof availability** <br>The amount of time that proofs of payment or nonpayment must be available on the Data Connector.                                    | 1 day      | 1 day      | 1 day      |
| **Amount of extra time per redemption** <br>The extra amount of time per redemption granted to an agent when many redemption requests occur in a short period of time. | 30 seconds | 60 seconds | 60 seconds |

### Collateral Ratios

| Parameter                                                                                                                                                                                                                                                                                                                             | XRP                                 | BTC                                 | DOGE                                |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------|-------------------------------------|-------------------------------------|
| [**Backing factor**](./index.md#backing-factor)                                                                                                                                                                                                                                                                                       | 100%                                | 95%                                 | 100%                                |
| [**Vault collateral**](./collateral.md#vault-collateral)                                                                                                                                                                                                                                                                              |                                     |                                     |                                     |
| &emsp;&bullet;&emsp; **Supported types**                                                                                                                                                                                                                                                                                              | `$USDC`, `$USDT`, simulated `$WETH` | `$USDC`, `$USDT`, simulated `$WETH` | `$USDC`, `$USDT`, simulated `$WETH` |
| &emsp;&bullet;&emsp; [**Minimal CR**](./collateral.md#minimal-cr)                                                                                                                                                                                                                                                                     | 1.4                                 | 1.4                                 | 1.4                                 |
| &emsp;&bullet;&emsp; [**Collateral call band CR**](./collateral.md#collateral-call-band-cr)                                                                                                                                                                                                                                           | 1.3                                 | 1.3                                 | 1.3                                 |
| &emsp;&bullet;&emsp; [**Safety CR**](./collateral.md#safety-cr)                                                                                                                                                                                                                                                                       | 1.5                                 | 1.5                                 | 1.5                                 |
| [**Pool collateral**](./collateral.md#pool-collateral)                                                                                                                                                                                                                                                                                |                                     |                                     |                                     |
| &emsp;&bullet;&emsp; **Supported types**                                                                                                                                                                                                                                                                                              | `$CFLR`                             | `$CFLR`                             | `$CFLR`                             |
| &emsp;&bullet;&emsp; [**Minimal CR**](./collateral.md#minimal-cr)                                                                                                                                                                                                                                                                     | 2.0                                 | 2.0                                 | 2.0                                 |
| &emsp;&bullet;&emsp; [**Collateral call band CR**](./collateral.md#collateral-call-band-cr)                                                                                                                                                                                                                                           | 1.9                                 | 1.9                                 | 1.9                                 |
| &emsp;&bullet;&emsp; [**Safety CR**](./collateral.md#safety-cr)                                                                                                                                                                                                                                                                       | 2.1                                 | 2.1                                 | 2.1                                 |
| **Minting pool holdings required** <br>Minimum amount of pool tokens an agent must hold to be able to mint, as a percentage of the FAssets the agent is currently backing. Unlike pool and vault collateral ratios, if the agent's pool tokens go below this threshold, the agent does not go into liquidation, they just can't mint. | 50%                                 | 50%                                 | 50%                                 |

### Liquidation

| Parameter                                                                                               | XRP                                      | BTC                                      | DOGE                                     |
|---------------------------------------------------------------------------------------------------------|------------------------------------------|------------------------------------------|------------------------------------------|
| [**CCB time**][ccb-time] <br>Maximum time an agent can remain in CCB before liquidation starts.         | 180 seconds                              | 180 seconds                              | 180 seconds                              |
| [**Liquidation premium**](./liquidation.md#liquidation-process) <br>Increases in steps, as time passes. | Step 1: 5%<br>Step 2: 10%<br>Step 3: 15% | Step 1: 5%<br>Step 2: 10%<br>Step 3: 15% | Step 1: 5%<br>Step 2: 10%<br>Step 3: 15% |
| **Liquidation step time** <br>Elapsed time before the liquidation premium advances to the next step.    | 180 seconds                              | 180 seconds                              | 180 seconds                              |
| **Liquidation source** <br>Where do the funds come from to pay for liquidations.                        |                                          |                                          |                                          |
| &emsp;&bullet;&emsp; Liquidated value                                                                   | The agent's vault                        | The agent's vault                        | The agent's vault                        |
| &emsp;&bullet;&emsp; Premium                                                                            | The collateral pool                      | The collateral pool                      | The collateral pool                      |

[ccb-time]:./collateral.md#collateral-call-band-cr

### Default Agent Settings

These are the default values for [the agent bot provided by the Flare foundation](../../infra/fassets/deploying-agent.md#setting-up-the-agent).
Agents are free to adjust these settings as they see fit.

| Parameter                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | XRP   | BTC   | DOGE  |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------|-------|-------|
| [**Minting fee**](./minting.md#minting-fee)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 0.25% | 0.25% | 0.25% |
| [**Pool share**](./minting.md#pool-share)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 40%   | 40%   | 40%   |
| [**Minting CR**](./collateral.md#minting-cr)                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |       |       |       |
| &emsp;&bullet;&emsp; **Agent vault**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 1.6   | 1.6   | 1.6   |
| &emsp;&bullet;&emsp; **Collateral pool**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 2.3   | 2.3   | 2.3   |
| [**Exit CR**](./collateral.md#exit-cr)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 2.3   | 2.3   | 2.3   |
| [**Top-up CR**](./collateral.md#top-up-cr)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 2.1   | 2.1   | 2.1   |
| &emsp;&bullet;&emsp; **Top-up discount**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 10%   | 10%   | 10%   |
| [**Discount for agent self-close**](./liquidation.md#stopping-liquidations) <br>In self-close exit, the pool token holder burns FAssets to increase pool CR enough to enable exit. Normally, the burned FAssets are redeemed in the normal redemption process. However, if the closed amount is less than 1 lot, or on explicit request, the agent buys the underlying assets (at a discounted FTSO price, to compensate the agent for possible price fluctuations) and pays the exiting token holder in vault collateral. | 1%    | 1%    | 1%    |

### Rewarding

| Parameter                                                                                                                                                                                                                               | XRP                                      | BTC                                      | DOGE                                     |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------|------------------------------------------|------------------------------------------|
| [**Challenger reward**](./index.md#challengers) <br>After a successful challenge for an illegal operation, the agent goes into full liquidation and the challenger is paid this reward from the agent's vault.                          | 300 `$USD` converted to vault collateral | 300 `$USD` converted to vault collateral | 300 `$USD` converted to vault collateral |
| [**Confirmation by others**](./redemption.md#edge-cases) <br>If an agent or redeemer becomes unresponsive, anybody can confirm payments and non-payments some time after the request was made, and get a reward from the agent's vault. |                                          |                                          |                                          |
| &emsp;&bullet;&emsp; **Minimum time**                                                                                                                                                                                                   | 2 hours                                  | 4 hours                                  | 4 hours                                  |
| &emsp;&bullet;&emsp; **Reward**                                                                                                                                                                                                         | 100 `$USD` converted to vault collateral | 100 `$USD` converted to vault collateral | 100 `$USD` converted to vault collateral |

### Time Locks

These settings are far shorter in the Beta phases than in the final version, in order to be able to perform quick experiments.

| Parameter                                                                                                                                                                                     | XRP         | BTC         | DOGE        |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------|-------------|-------------|
| **Agent withdrawal time lock** <br>Agent has to announce any collateral withdrawal or vault destruction and then wait this time before executing it.                                          | 60 seconds  | 60 seconds  | 60 seconds  |
| **Maximum governance update frequency** <br>Minimum amount of time between updates of any governance setting.                                                                                 | 60 seconds  | 60 seconds  | 60 seconds  |
| **Token invalidation time** <br>Time between the moment a token is deprecated by governance and it becomes invalid. Agents still using it as vault collateral get liquidated after this time. | 1 day       | 1 day       | 1 day       |
| **Agent exit available time lock** <br>The time the agent has to wait after announcing exit from the list of publicly available agents and executing the exit.                                | 60 seconds  | 60 seconds  | 60 seconds  |
| **Agent fee change time lock** <br>The time the agent has to wait between announcing and changing the agent fee or the pool share.                                                            | 120 seconds | 120 seconds | 120 seconds |
| **Agent minting CR change time lock** <br>The time the agent has to wait between announcing and changing the minting CR (vault or pool).                                                      | 120 seconds | 120 seconds | 120 seconds |
| **Pool exit and top-up change time lock** <br>The time the agent has to wait between announcing and changing any pool exit and top-up settings.                                               | 120 seconds | 120 seconds | 120 seconds |
| **Agent time-locked operation window** <br>Once the above time locks expire, agents have this amount of time to execute the requested operation.                                              | 1 hour      | 1 hour      | 1 hour      |
| **Collateral pool token time lock** <br>Amount of seconds that a user entering the collateral pool must wait before spending (exit or transfer) the obtained pool tokens.                     | 60 seconds  | 60 seconds  | 60 seconds  |
| **Minimum diamond-cut time lock** <br>Amount of time that must elapse before the system performs a [diamond cut](https://eips.ethereum.org/EIPS/eip-2535).                                                                               | 2 hours     | 2 hours     | 2 hours     |

### Emergency Pause

| Parameter                                                                                                                                               | XRP    | BTC    | DOGE   |
|---------------------------------------------------------------------------------------------------------------------------------------------------------|--------|--------|--------|
| **Emergency pause** <br>The maximum time for a pause triggered by governance or some other entity.                                                      | 1 day  | 1 day  | 1 day  |
| **Emergency pause reset** <br>The amount of time since the last emergency pause. After it has elapsed, the pause duration counter automatically resets. | 1 week | 1 week | 1 week |

### FAssets Upgrade

| Parameter                                                                                                                | XRP  | BTC  | DOGE |
|--------------------------------------------------------------------------------------------------------------------------|------|------|------|
| **Buyback collateral premium** <br>The premium at which agents can buy back their collateral when f-asset is terminated. | 0.3% | 0.3% | 0.3% |
| **Burn collateral premium** <br>The premium at which agents can burn collateral to unstick a minting process.            | 0%   | 0%   | 0%   |

<style>
.md-typeset table:not([class]) td {
    padding-bottom: 4px;
    padding-top: 4px;
}
.md-typeset table:not([class]) tbody tr:hover {
    background-color: var(--md-accent-fg-color--transparent);
}
</style>
