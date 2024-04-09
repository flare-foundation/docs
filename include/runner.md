{% macro js(folder, filename, runFromBrowser='false', requiresWallet='false', params=[]) %}

```js title="{{filename}}.js" linenums="1"
--8<-- "./docs/samples/{{folder}}{{filename}}.js"
```

{% if requiresWallet == 'true' -%}
`tutorialData` provided by the [`connect_wallet.js`](/assets/javascripts/connect_wallet.js) script. 
{% endif -%}

[Source code license](https://github.com/flare-foundation/docs/blob/main/LICENSE.md).
{ .source-code-license }

??? info "Run with Node.js"

    This tutorial has been tested with **[npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) v9.5** and **Node.js v18.16**.

    1. Create a new folder and move into it.
    2. Copy & paste the code above into a new file called `{{filename}}.js`.
    3. Initialize project and install dependencies with:
        ```bash
        npm init
        npm install ethers@6.3 @flarenetwork/flare-periphery-contract-artifacts@0.1.7
        ```
    4. Run the program with:
        ```bash
        node {{filename}}.js
        ```

{% if runFromBrowser == 'true' -%}
<script>
async function {{filename | replace('-', '_')}}_runner() {
  console.old_log = console.log;
  if (!document.getElementById('{{filename}}-run-me-box').hasAttribute('open')) {
    console.log = console.old_log;
    return;
  }
  console.old_log = console.log;
  output = document.getElementById('{{filename}}-output').getElementsByTagName('code')[0];
  output.textContent = "";
  console.log = function(message) {
    output.textContent += (typeof message == 'object' ? JSON.stringify(message, null, 2) : message) + "\n";
  };
  try {
    await run{{filename | replace('-', '_') }}(
{% for param in params %}document.getElementById('{{param.name}}').value,{% endfor %}
    );
  } catch(error) {
    console.log (error.message);
  }
  console.log = console.old_log;
}
</script>

<details class="run-me" id="{{filename}}-run-me-box">
<summary>Run in browser</summary>
{% for param in params -%}
<label for="{{param.name}}">{{param.name}}:</label>
<input type="text" id="{{param.name}}" name="{{param.name}}" value="{{param.value}}"/>
{%- endfor %}
{% if requiresWallet == 'true' -%}
<script src="/assets/javascripts/connect_wallet.js"></script>
<p>This tutorial requires an account to sign transactions.
Get test currency from <a href="https://faucet.flare.network/">the faucet</a> and click on <b>Connect Wallet</b> before clicking on <b>Run</b>.</p>
<button class="md-button" id="{{filename}}-connect" onclick="connect_wallet('{{filename}}')">Connect Wallet</button>
{%- endif -%}
<button class="md-button" id="{{filename}}-run" onclick="{{filename | replace('-', '_')}}_runner();">Run</button>
``` { #{{filename}}-output }
```
<script type="importmap">
  { "imports": {
      "ethers": "/assets/javascripts/ethers-6.3.esm.min.js",
      "@flarenetwork/flare-periphery-contract-artifacts": "https://esm.run/@flarenetwork/flare-periphery-contract-artifacts@0.1.7",
      "@flarenetwork/flare-periphery-contract-artifacts/dist/coston/StateConnector/libs/ts/utils.js": "/assets/javascripts/utils.js"
  } }
</script>
{% endif %}
</details>
{% endmacro %}

{% macro sol(folder, filename) %}

```solidity title="{{filename}}.sol" linenums="1"
--8<-- "./docs/samples/{{folder}}{{filename}}.sol"
```

[Source code license](https://github.com/flare-foundation/docs/blob/main/LICENSE.md)
{ .source-code-license }

=== "Using Hardhat"

    ??? info "Building with Hardhat"

        1. Create a new folder and move into it.
        2. Initialize a new npm project and install dependencies:
            ```bash
            npm init
            npm install hardhat @nomicfoundation/hardhat-toolbox @flarenetwork/flare-periphery-contracts
            ```
        3. Create a new Hardhat project (More information in [the Hardhat setup guide](/dev/getting-started/setup/hardhat/)):
            ```bash
            npx hardhat init
            ```
        4. You will not be using the sample project, therefore:
            * Remove `contracts/Lock.sol`
            * Remove `test/Lock.js`
        5. Edit `hardhat.config.js` to specify the correct EVM version. Make sure you include the highlighted lines:
            ```js title="hardhat.config.js" hl_lines="5-12"
            require("@nomicfoundation/hardhat-toolbox");

            /** @type import('hardhat/config').HardhatUserConfig */
            module.exports = {
                solidity: {
                    compilers: [{
                        version: "0.8.17",
                        settings: {
                            evmVersion: "london"
                        },
                    }],
                }
            };
            ```
        6. Copy the Solidity code above into a new file called `{{filename}}.sol` in the `contracts` folder.
        7. Compile with:
            ```bash
            npx hardhat compile
            ```

    ??? info "Testing with Hardhat"

        Testing smart contracts before deploying them is typically performed by [forking the network](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks) or by [using mock contracts](https://ethereum.org/nl/developers/tutorials/how-to-mock-solidity-contracts-for-testing/).
        These instructions quickly show you how to use the former.

        1. Build the Hardhat project following the previous instructions.
        2. Include network information in the `hardhat.config.js` file. Make sure you include the highlighted lines:
            ```js title="hardhat.config.js" hl_lines="13-19"
            require("@nomicfoundation/hardhat-toolbox");

            /** @type import('hardhat/config').HardhatUserConfig */
            module.exports = {
                solidity: {
                    compilers: [{
                        version: "0.8.17",
                        settings: {
                            evmVersion: "london"
                        },
                    }],
                },
                networks: {
                    hardhat: {
                        forking: {
                            url: 'https://flare-api.flare.network/ext/bc/C/rpc',
                        },
                    },
                },
            };
            ```
        3. Copy the code below into a new file called `Test{{filename}}.js` in the `test` folder.
            ```js title="Test{{filename}}.js"
            --8<-- "./docs/samples/{{folder}}Test{{filename}}.js"
            ```
        4. Run the test with:
            ```bash
            npx hardhat test
            ```

=== "Using Foundry"

    ??? info "Building with Foundry"

        1. If you don't have Foundry installed, follow the instructions for your operating system in the [Foundry's Installation guide](https://book.getfoundry.sh/getting-started/installation).
        2. Create a new Foundry project:
            ```bash
            forge init <PROJECT_NAME>
            ```
            This command creates a new directory called `<PROJECT_NAME>`. Use a name that suits your needs.
        3. Move into the project's directory:
            ```bash
            cd <PROJECT_NAME>
            ```
        4. Install dependencies with:
            ```bash
            forge install flare-foundation/flare-foundry-periphery-package
            ```
        5. Remove the sample project that Foundry created for you, as you do not need it:
            * Remove `src/Counter.sol`
            * Remove `test/Counter.t.sol`
        6. Copy the Solidity code above into a new file called `{{filename}}.sol` in the `src` folder.
        7. Open the `foundry.toml` file, and add the following lines at the end:
            ```toml
            evm_version = "london"
            remappings = [ "@flarenetwork/flare-periphery-contracts/=lib/flare-foundry-periphery-package/src/"]
            ```
        8. Compile with:
            ```bash
            forge build
            ```

    ??? info "Testing with Foundry"

        Testing smart contracts before deploying them is typically performed by [forking the network](https://book.getfoundry.sh/forge/fork-testing) or by [using mock contracts](https://ethereum.org/nl/developers/tutorials/how-to-mock-solidity-contracts-for-testing/).
        These instructions quickly show you how to use the former.

        1. Build the Foundry project following the previous instructions.
        2. Copy the code below into a new file called `{{filename}}.t.sol` in the `test` folder.
            ```solidity title="{{filename}}.t.sol"
            --8<-- "./docs/samples/{{folder}}{{filename}}.t.sol"
            ```
        3. Run the test with:
            ```bash
            forge test -vv
            ```
=== "Using Remix"

    [Open In Remix](https://remix.ethereum.org/#url={{ config.site_url }}samples/{{folder}}{{filename}}.sol&evmVersion=london){ .md-button }

{% endmacro %}

{% macro multisnippet(pathname, solstart, solend, jsstart, jsend) %}

=== "Solidity"

    ```solidity linenums="{{solstart}}"
    --8<-- "./docs/samples/{{pathname}}.sol:{{solstart}}:{{solend}}"
    ```

=== "JavaScript"

    ```js linenums="{{jsstart}}"
    --8<-- "./docs/samples/{{pathname}}.js:{{jsstart}}:{{jsend}}"
    ```

{% endmacro %}
