# Automatically Generate Documentation for Smart Contracts with Docgen

## 1. Set Up SSH for GitLab/GitHub Account

To run the script you will need to have access to a GitLab/GitHub (or other Git hosting service) account with SSH set up. If you already have one, proceed to the next step.

If not, follow these steps to set up SSH:

### 1.1 Generate a new SSH key

Open a terminal window and run the following command to generate a new SSH key if you do not already have one on your machine.

You will need to replace `your_email@example.com` with your email address:

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

If you want to use RSA instead of ED25519, you can run:

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

### 1.2 Copy your SSH public key

You can copy your public SSH key to your clipboard with the command `pbcopy < ~/.ssh/id_ed25519.pub`, replacing `id_ed25519.pub` with the name of your SSH key file.

If you are on a Windows machine use `clip < ~/.ssh/id_ed25519.pub` instead.

Alternatively, locate your SSH key file manually (ends in `.pub`) and copy its contents.

### 1.3 Add your SSH key to your GitLab/GitHub account

#### GitLab

To [add a new SSH key](https://gitlab.com/-/profile/keys) to your GitLab account:

Log in to your GitLab account and click on your avatar in the top left corner.

Click on “Preferences” from the dropdown menu.

![Click on Preferences](/readme/click-preference.jpeg)

In the left sidebar, click on “SSH Keys”.

![Click on SSH keys](/readme/click-ssh.jpg)

Click on "Add new key"

![Click Add key](/readme/click-add-key.jpeg)

Paste your public SSH key into the “Key” field.

Enter the key title, select a usage type, and enter an optional expiry date.

Click the “Add key” button.

![Add key to Gitlab](/readme/add-to-gitlab.jpeg)

#### GitHub

To [add a new SSH key](https://github.com/settings/ssh/new) to your GitHub account:

Log in to your GitLab account and click on your avatar in the top right corner.

Click on “Settings” from the dropdown menu.

Click on "SSH and GPG keys" in the left sidebar.

Click "New SSH key".

Enter a title and paste in your public SSH key, then click "Add SSH key".

![Add key to Github](/readme/add-to-github.jpeg)

**Note**: Ensure that your GitHub/GitLab account is set up to use the specific SSH key you are currently using to avoid a `Permission denied (publickey)` error.

## 2. Add Desired Repos to `repos.list`

The `repos.list` file contains the links to the code repos you wish to generate documentation for.

To add a new repo to `repos.list`, enter the following on one line, separated by whitespace:

* The git URL of the repo.
* Branch where the documentation resides.
* URL where the public source code resides.
* The hardhat config file, typically `hardhat.config.ts` or `hardhatSetup.config.ts`.
* The command required to build the repo. It can contain spaces since this is the last item in the line.

### Example

```bash
git@gitlab.com:flarenetwork/state-connector-protocol.git STAT-28 https://github.com/flare-foundation/songbird-state-connector-protocol/tree/main hardhat.config.ts yarn hardhat compile
```

This generates docs from the `STAT-28` branch in the gitlab repo.
But the gitlab repo is private, so a different URL is used to provide links to the source code.
The Hardhat config file is `hardhat.config.ts` and the command to build the repo is `yarn hardhat compile`.

## 3. Run `build-docs.sh`

In your terminal, navigate to the `docgen` folder.

Run the following command:

```bash
sh build-docs.sh
```

Enter your SSH key passphrase if prompted.

Each repo in your `repos.list` file will be cloned and documentation (in Markdown) will be automatically generated for it. This process can take quite some time.

The generated docs will be saved in a `/docs/apis/smart-contracts` directory and an `index.md` file, which contains a grouped list of docs, is also saved in the same directory.

After the script has generated the documentation and updated the `index.md` file, you can preview the documentation locally using this command:

```bash
mkdocs serve
```

If any changes are made to the documentation (i.e., if any smart contract comments have been updated), the script stages these changes and creates a new commit in your local Git repository.

After the commit is created, you can review the changes. If everything looks good, you can manually push the commit to the remote repository.