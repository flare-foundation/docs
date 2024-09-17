!!! info

    This command can only be executed once, after which all secret keys will be generated.
    You must use a separate directory for each role you want to perform: agent, bot, or minter and redeemer.

!!! warning

    * The addresses in `secrets.json` are for hot wallets and shouldn’t hold large token amounts, as their private keys are on an always-online machine. Keep your main account in an offline wallet and transfer funds as needed.
    * Back up the `secrets.json` file immediately after creation and whenever new keys are added. Store the backup securely, preferably on an external drive in a physical vault, as unauthorized access can compromise the agent. Regular backups aren’t needed unless changes are made.