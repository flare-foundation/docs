{% macro js_runner(folder, filename) %}

```js title="{{filename}}.js" linenums="1"
--8<-- "samples/{{folder}}{{filename}}.js"
```

<script>
async function {{filename}}_runner() {
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
  await {{filename}}_run();
  console.log = console.old_log;
}
</script>

??? info "Run with Node.js"

    1. Create a new folder and move into it.
    2. Copy & paste the code above into a new file called `{{filename}}.js`.
    3. Install dependencies with `npm init es6` and `npm install ethers`.
    4. Run the program with `node {{filename}}.js`

<details class="run-me" id="{{filename}}-run-me-button" ontoggle="{{filename}}_runner();">
<summary>Run in browser</summary>
``` { #{{filename}}-output }
```
</details>

{% endmacro %}
