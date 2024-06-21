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

## Minting and Redeeming

| Parameter                                                                    | Open Beta (Coston) |
| ---------------------------------------------------------------------------- | ------------------ |
| **Supported underlying assets**                                              | `$XRP`             |
| **Minting cap** <br>Total amount of allowed FAssets in circulation. Once reached, no more FAssets can be minted until some are redeemed. This is intended as a security measure. In the final deployment this cap will be gradually increased and finally removed. | none |
| [**Lot size**](./minting.md#lots)                                            | 20 XRP             |
| [**Collateral reservation fee (CRF)**](./minting.md#crf)                     | 0.1%               |
| [**Redemption fee**](./redemption.md#redemption-fee)                         | 0.1%               |
| [**Redemption default premium**](./redemption.md#redemption-payment-failure) | 10%                |
| **Redemption default premium source** <br>Where does the premium come from when an agent fails to pay the redeemer on time. | Solely from the agent's vault if the [vault CR](./collateral.md#the-collateral-ratio) > 1.1, the agent's vault and the collateral pool otherwise. |

## Collateral Ratios

| Parameter                                                                                   | Open Beta (Coston)                  |
| ------------------------------------------------------------------------------------------- | ----------------------------------- |
| [**Backing factor**](./index.md#backing-factor)                                             | 100%                                |
| [**Vault collateral**](./collateral.md#vault-collateral)                                    |                                     |
| &emsp;&bullet;&emsp; **Supported types**                                                    | `$USDC`, `$USDT`, simulated `$WETH` |
| &emsp;&bullet;&emsp; [**Minimal CR**](./collateral.md#minimal-cr)                           | 1.4                                 |
| &emsp;&bullet;&emsp; [**Collateral call band CR**](./collateral.md#collateral-call-band-cr) | 1.3                                 |
| &emsp;&bullet;&emsp; [**Safety CR**](./collateral.md#safety-cr)                             | 1.5                                 |
| [**Pool collateral**](./collateral.md#pool-collateral)                                      |                                     |
| &emsp;&bullet;&emsp; **Supported types**                                                    | `$CFLR`                             |
| &emsp;&bullet;&emsp; [**Minimal CR**](./collateral.md#minimal-cr)                           | 2.0                                 |
| &emsp;&bullet;&emsp; [**Collateral call band CR**](./collateral.md#collateral-call-band-cr) | 1.9                                 |
| &emsp;&bullet;&emsp; [**Safety CR**](./collateral.md#safety-cr)                             | 2.1                                 |
| **Minting pool holdings required** <br>Minimum amount of pool tokens an agent must hold to be able to mint, as a percentage of the FAssets the agent is currently backing. Unlike pool and vault collateral ratios, if the agent's pool tokens go below this threshold, the agent does not go into liquidation, they just can't mint. | 50% |

## Liquidation

| Parameter                                                                                               | Open Beta (Coston)                       |
| ------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| [**CCB time**][ccb-time] <br>Maximum time an agent can remain in CCB before liquidation starts.         | 180s                                     |
| [**Liquidation premium**](./liquidation.md#liquidation-process) <br>Increases in steps, as time passes. | Step 1: 5%<br>Step 2: 10%<br>Step 3: 15% |
| **Liquidation step time** <br>Elapsed time before the liquidation premium advances to the next step.    | 180s                                     |
| **Liquidation source** <br>Where do the funds come from to pay for liquidations.                        |                                          |
| &emsp;&bullet;&emsp; Liquidated value                                                                   | The agent's vault                        |
| &emsp;&bullet;&emsp; Premium                                                                            | The collateral pool                      |

[ccb-time]:./collateral.md#collateral-call-band-cr

## Default Agent Settings

These are the default values for [the agent bot provided by the Flare foundation](../../infra/fassets/agent.md#setting-up-the-agent).
Agents are free to adjust these settings as they see fit.

| Parameter                                    | Open Beta (Coston) |
| -------------------------------------------- | ------------------ |
| [**Minting fee**](./minting.md#minting-fee)  | 0.25%              |
| [**Pool share**](./minting.md#pool-share)    | 40%                |
| [**Minting CR**](./collateral.md#minting-cr) |                    |
| &emsp;&bullet;&emsp; **Agent vault**         | 1.6                |
| &emsp;&bullet;&emsp; **Collateral pool**     | 2.4                |
| [**Exit CR**](./collateral.md#exit-cr)       | 2.6                |
| [**Top-up CR**](./collateral.md#top-up-cr)   | 2.2                |
| &emsp;&bullet;&emsp; **Top-up discount**     | 20%                |
| [**Discount for agent self-close**](./liquidation.md#stopping-liquidations) <br>In self-close exit, the pool token holder burns FAssets to increase pool CR enough to enable exit. Normally, the burned FAssets are redeemed in the normal redemption process. However, if the closed amount is less than 1 lot, or on explicit request, the agent buys the underlying assets (at a discounted FTSO price, to compensate the agent for possible price fluctuations) and pays the exiting token holder in vault collateral.| 1% |

## Rewarding

| Parameter                             | Open Beta (Coston)                       |
| ------------------------------------- | ---------------------------------------- |
| [**Challenger reward**](./index.md#challengers) <br>After a successful challenge for an illegal operation, the agent goes into full liquidation and the challenger is paid this reward from the agent's vault. | 300 `$USD` converted to vault collateral |
| [**Confirmation by others**](./redemption.md#edge-cases) <br>If an agent or redeemer becomes unresponsive, anybody can confirm payments and non-payments some time after the request was made, and get a reward from the agent's vault. | |
| &emsp;&bullet;&emsp; **Minimum time** | 2 hours                                  |
| &emsp;&bullet;&emsp; **Reward**       | 100 `$USD` converted to vault collateral |

## Time locks

These settings are far shorter in the Beta phases than in the final version, in order to be able to perform quick experiments.

| Parameter | Open Beta (Coston) |
| --------- | ------------------ |
| **Agent withdrawal time lock** <br>Agent has to announce any collateral withdrawal or vault destruction and then wait this time before executing it. | 60 s |
| **Maximum governance update frequency** <br>Minimum amount of time between updates of any governance setting. | 60s |
| **Token invalidation time** <br>Time between the moment a token is deprecated by governance and it becomes invalid. Agents still using it as vault collateral get liquidated after this time. | 1 day |
| **Agent exit available time lock** <br>The time the agent has to wait after announcing exit from the list of publicly available agents and executing the exit. | 60s |
| **Agent fee change time lock** <br>The time the agent has to wait between announcing and changing the agent fee or the pool share. | 120s |
| **Agent minting CR change time lock** <br>The time the agent has to wait between announcing and changing the minting CR (vault or pool). | 120s |
| **Pool exit and top-up change time lock** <br>The time the agent has to wait between announcing and changing any pool exit and top-up settings. | 120s |
| **Agent time-locked operation window** <br>Once the above time locks expire, agents have this amount of time to execute the requested operation. | 1 hour |
| **Collateral pool token time lock** <br>Amount of seconds that a user entering the collateral pool must wait before spending (exit or transfer) the obtained pool tokens. | 60 s |

<style>
.md-typeset table:not([class]) td {
    padding-bottom: 4px;
    padding-top: 4px;
}
.md-typeset table:not([class]) tbody tr:hover {
    background-color: var(--md-accent-fg-color--transparent);
}
</style>
