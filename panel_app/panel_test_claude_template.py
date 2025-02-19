import panel as pn
import pathlib

from custom_top_navbar import CustomTopNavbarESM

# Initialize Panel
pn.extension()
_ROOT = pathlib.Path(__file__).parent

class CustomTemplate(pn.template.VanillaTemplate):

    _template = _ROOT / "custom_template2.html"

# Create Panel components
sidebar = pn.Column(
    pn.pane.Markdown("### Navigation"),
    pn.widgets.Button(name="Dashboard", width=200),
    pn.widgets.Button(name="Analytics", width=200),
    pn.widgets.Button(name="Settings", width=200)
)

main = pn.Column(
    pn.pane.Markdown("## Welcome to Dashboard"),
    pn.pane.Markdown("This is the main content area."),
)

# Create template using VanillaTemplate instead of BaseTemplate

nav_tree = {
    "Hello World": "/",
    "About Us All": "/about",
    "Services Please": {"Service 1": "/service1", "Service 2": "/service2", "Service 3": "/service3"},
    "Contact": "/contact"
}

top_navbar = CustomTopNavbarESM(nav_tree=nav_tree)

template = CustomTemplate(
    title="My Dashboard",
    header=top_navbar,
    main=main
)

# Serve
if __name__ == "__main__":
    template.servable()
    pn.serve(template, port=5006)