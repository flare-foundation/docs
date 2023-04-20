# Personal Delegation Accounts

Flare token holders are eligible to receive a number of rewards, for example through [FTSO Delegation](./ftso.md#delegation).
The Flare network offers the option to set up Personal Delegation Accounts (PDAs) to temporarily receive and store rewards to track which funds are from rewards, for example, for personal or tax purposes.
In certain jurisdictions, delaying the realization of earnings for a specified time can lead to a reduced tax rate.

Each Flare address can be associated with one PDA, which behaves like a regular account in many respects.
For example, it can receive funds from any address.
Like regular accounts, it is under control of the owner and can perform functions such as delegation and claiming.

Here are some of the differences from a regular account:

* A PDA cannot have another PDA of its own.
* PDA addresses cannot participate in [governance](./governance.md) directly, but their owners can transfer all their votes to another address (their main account or someone else's).
* A PDA automatically converts any `$FLR` tokens transferred to it to wrapped Flare tokens (`$WFLR`), which are more useful for functions such as delegation.
* Only the owner of the main account can transfer funds from the PDA and only to the main account.
* When an [executor](./automatic-claiming.md) is configured, it will claim rewards both from the main account and the PDA, and send them to the PDA.

!!! warning

    The Flare Foundation is not liable for any damages, especially pertaining to tax related issues when using this service.
    Check your local tax laws.

!!! example "Developing PDA functionality"

    For information on how to develop a PDA, or how to write an application that supports a PDA, see [Personal Delegation Accounts](../dev/reference/personal-delegation-account.md) in the Developer section.

## Related User Guides

* [Managing your PDA](../user/personal-delegation-account.md)

## Related Developer Docs

* [Managing PDAs in applications](../dev/reference/personal-delegation-account.md)
