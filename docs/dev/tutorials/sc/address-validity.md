# Simple Attestation Request

{% import "runner.md" as runner %}

{{ runner.js("sc/", "AddressValidity", true, [
  {"name": "Network (e.g. btc, eth)", "value": "btc"},
  {"name": "Address to Verify", "value":"tb1p4mdyx3dvgk4dhvv8yv2dtuymf00wxhgkkjheqm7526fu7znnd6msw3qxvj"}
  ]) }}

<script>
--8<-- "samples/sc/AddressValidity.js::160"
</script>
