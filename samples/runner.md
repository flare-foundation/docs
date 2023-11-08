{% macro js(folder, filename, params) %}

```js title="{{filename}}.js" linenums="1"
--8<-- "samples/{{folder}}{{filename}}.js"
```

[Source code license](https://github.com/flare-foundation/docs/blob/main/LICENSE.md)
{ .source-code-license }

<script>
async function {{filename | replace('-', '_')}}_runner() {
  console.old_log = console.log;
  if (!document.getElementById('{{filename}}-run-me-button').hasAttribute('open')) {
    console.log = console.old_log;
    return;
  }
  console.old_log = console.log;
  output = document.getElementById('{{filename}}-output').getElementsByTagName('code')[0];
  output.innerHTML = "";
  console.log = function(message) {
    output.innerHTML += (typeof message == 'object' ? JSON.stringify(message, null, 2) : message) + "\n";
  };
  await {{filename | replace('-', '_') }}_run({{params}});
  console.log = console.old_log;
}
</script>

??? info "Run with Node.js"

    This tutorial has been tested with **[npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) v9.5** and **Node.js v18.16**.

    1. Create a new folder and move into it.
    2. Copy & paste the code above into a new file called `{{filename}}.js`.
    3. Install dependencies with:
        ```bash
        npm init
        npm install ethers @flarenetwork/flare-periphery-contract-artifacts
        ```
    4. Run the program with:
        ```bash
        node {{filename}}.js
        ```

<details class="run-me" id="{{filename}}-run-me-button" ontoggle="{{filename | replace('-', '_')}}_runner();">
<summary>Run in browser</summary>
``` { #{{filename}}-output }
```
</details>

{% endmacro %}

{% macro sol(folder, filename) %}

```solidity title="{{filename}}.sol" linenums="1"
--8<-- "samples/{{folder}}{{filename}}.sol"
```

[Source code license](https://github.com/flare-foundation/docs/blob/main/LICENSE.md)
{ .source-code-license }

??? info "Building with Hardhat"

    1. Create a new folder and move into it.
    2. Create a new Hardhat project (More information in [the Hardhat setup guide](/dev/getting-started/setup/hardhat/index.md)):
        ```bash
        npm init
        npm install hardhat @nomicfoundation/hardhat-toolbox
        npx hardhat init
        ```
    3. You will not be using the sample project, therefore:
        * Remove `contracts/Lock.sol`
        * Remove `test/Lock.js`
    4. Add Flare's Periphery Package as a dependency with:
        ```bash
        npm install @flarenetwork/flare-periphery-contracts
        ```
    5. Copy the Solidity code above into a new file called `{{filename}}.sol` in the `contracts` folder.
    6. Compile with `npx hardhat compile`.

??? info "Testing with Hardhat"

    Testing smart contracts before deploying them is typically performed by [forking the network](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks) or by [using mock contracts](https://ethereum.org/nl/developers/tutorials/how-to-mock-solidity-contracts-for-testing/).
    These instructions quickly show you how to use the former.

    1. Build the Hardhat project following the previous instructions.
    2. Modify your `hardhat.config.js` to look like this:
        ```js title="hardhat.config.js"
        require("@nomicfoundation/hardhat-toolbox");

        /** @type import('hardhat/config').HardhatUserConfig */
        module.exports = {
            solidity: "0.8.19",
            networks: {
                hardhat: {
                    forking: {
                        url: 'https://flare-api.flare.network/ext/C/rpc',
                    },
                },
            },
        };
        ```
    3. Copy the code below into a new file called `Test{{filename}}.js` in the `test` folder.
        ```js title="Test{{filename}}.js"
        --8<-- "samples/{{folder}}Test{{filename}}.js"
        ```
    4. Run the test with `npx hardhat test`.

{% endmacro %}

{% macro multisnippet(pathname, solstart, solend, jsstart, jsend) %}

=== "Solidity"

    ```solidity linenums="{{solstart}}"
    --8<-- "samples/{{pathname}}.sol:{{solstart}}:{{solend}}"
    ```

=== "JavaScript"

    ```js linenums="{{jsstart}}"
    --8<-- "samples/{{pathname}}.js:{{jsstart}}:{{jsend}}"
    ```

{% endmacro %}
