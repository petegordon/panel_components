from panel.custom import JSComponent
import json
import param

class CustomTopNavbarESM(JSComponent):

    print("CustomTopNavbarESM loaded")

    _esm = 'custom_top_navbar.js'
    
    nav_tree_string = param.String(default='{"Home": "/"}')

        # Override _get_model_data to handle JSON serialization
    def _get_model_data(self):
        print("CustomTopNavbarESM _get_model_data")
        data = super()._get_model_data()
        # Convert the dict to a JSON string
        data['nav_tree_string'] = json.dumps(self.nav_tree_string)
        print("CustomTopNavbarESM _get_model_data data:", data)
        return data  


    def __init__ (self, nav_tree, **params):
        super().__init__(**params)
        self.nav_tree_string = json.dumps(nav_tree)

    
