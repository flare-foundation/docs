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
    2. Follow [any of the setup guides](/dev/getting-started/setup) to create a new project.
        For example:
        ```bash
        npm init
        npm install hardhat @nomicfoundation/hardhat-toolbox
        npx hardhat
        ```
    3. Add Flare's Periphery Package as a dependency with:
        ```bash
        npm install @flarenetwork/flare-periphery-contracts
        ```
    4. Copy the code above into a new file called `{{filename}}.sol` in the `contracts` folder.
    5. Compile with `npx hardhat compile`.

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
