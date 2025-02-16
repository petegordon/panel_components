import panel as pn

class CustomTopNavbar(pn.custom.JSComponent):
    """A Panel component that embeds the custom navbar from jsDelivr."""
    _esm = "https://cdn.jsdelivr.net/gh/petegordon/panel_components@main/custom-top-navbar/custom-top-navbar.js"

# Initialize Panel extension
pn.extension()

# Create and serve the navbar
navbar = CustomTopNavbar()
pn.serve(navbar)
