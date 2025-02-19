import panel as pn

# Load the custom Jinja2 template
with open("custom_template.html", "r") as f:
    template_content = f.read()

# Create a Panel Template
pn_template = pn.Template(template_content)

# ✅ Retrieve `embed` function from Panel state
embed_func = pn.state.jinja2_variables.get("embed")
if embed_func:  
    pn_template.add_variable("embed", embed_func)  # Only add if found

# Add dynamic content
pn_template.add_panel("main", pn.pane.Markdown("## Hello World Again"))
pn_template.add_panel("sidebar", pn.pane.Markdown("### Sidebar Menu"))

# Serve the app
pn.serve(pn_template)
