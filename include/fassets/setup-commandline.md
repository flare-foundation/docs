## Prerequisites

To participate in the open beta, you need a server with at least a minimum of 2 CPUs and 4GB RAM, or 2GB if the database is on a separate server.

You will need knowledge of the following tools:

* [Git](https://git-scm.com/) version control system;
* [Yarn](https://yarnpkg.com/) package manager;
* Command line terminal;
* Code editor.

!!! warning

    If you are using Windows, it is strongly recommended to use [Windows Subsystem for Linux, version 2](https://docs.microsoft.com/en-us/windows/wsl/about) (WSL 2).

## Setting up the FAssets tools

### Clone and Setup the Tools Repository

!!! info

    If you set up an FAssets agent, bot or user, please use a separate directory for each role.

1. Clone the repository and enter the working directory:

    ```bash
    git clone https://github.com/flare-labs-ltd/fasset-bots.git
    cd fasset-bots
    ```

2. Switch to the `open_beta` branch:

    ```bash
    git checkout open_beta
    ```

3. Install dependencies and build the project:

    ```bash
    yarn && yarn build
    ```

    !!! info

        Fresh installation can take more than 10 minutes, depending on if you have cached dependencies before.

4. Copy the environment file from a template `.env.template` to `.env`:

    ```bash
    cp .env.template .env
    ```
