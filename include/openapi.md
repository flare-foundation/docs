{% macro embed(api_filename) %}
<swagger-ui src="./openapispec/{{ api_filename }}" />
<script type="text/javascript" src="/assets/javascripts/scroll.js"></script>
{% endmacro %}