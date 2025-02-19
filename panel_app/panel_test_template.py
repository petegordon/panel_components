import panel as pn
import holoviews as hv

pn.extension()

template = """
{% extends base %}

<!-- goes in head -->
{% block postamble %}
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
{% endblock %}

<!-- goes in body -->
{% block contents %}
{{ app_title }}
<p>This is a Panel app with a custom template allowing us to compose multiple Panel objects into a single HTML document.</p>
<br>
<div class="container">
  <div class="row">
    <div class="col-sm">
      {{ embed(roots.A) }}
    </div>
    <div class="col-sm">
      {{ embed(roots.B) }}
    </div>
  </div>
</div>
{% endblock %}
"""

nb_template = """
{% extends base %}

{% block contents %}
{{ app_title }}
<p>This is a Panel app with a custom template allowing us to compose multiple Panel objects into a single HTML document.</p>
<br>
<div style="display:table; width: 100%">
  <div style="display:table-cell; margin: auto">
    {{ embed(roots.A) }}
  </div>
  <div style="display:table-cell; margin: auto">
    {{ embed(roots.B) }}
  </div>
</div>
{% endblock %}
"""

tmpl = pn.Template(template, nb_template=nb_template)

tmpl.add_variable('app_title', '<h1>Custom Template App</h1>')

tmpl.add_panel('A', hv.Curve([1, 2, 3]))
tmpl.add_panel('B', hv.Curve([1, 2, 3]))

tmpl.servable()