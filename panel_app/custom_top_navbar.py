from panel.custom import JSComponent
import json
import param

class CustomTopNavbarESM(JSComponent):

    print("CustomTopNavbarESM loaded")

    _esm = 'custom_top_navbar.js'
    
    nav_tree_string = param.String(default='{"Home": "/"}')


    def __init__ (self, nav_tree, **params):
        super().__init__(**params)
        self.nav_tree_string = json.dumps(nav_tree)

    
