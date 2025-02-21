import panel as pn
import pathlib
from time import sleep

from custom_top_navbar import CustomTopNavbarESM
from animation_main_content import AnimatinoContentESM

# Initialize Panel
pn.extension()
pn.config.theme = 'dark'

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

animation_content = AnimatinoContentESM()

main = pn.Column(
    pn.pane.Markdown("## Main Content"),
    animation_content
)

def get_response(contents, user, instance):
    if "turbine" in contents.lower():
        response = "A wind turbine converts wind energy into electricity."
    else:
        response = "Sorry, I don't know."
    sleep(1)
    return response

chat_bot = pn.chat.ChatInterface(callback=get_response, max_height=500)
chat_bot.send("Ask me what a wind turbine is", user="Assistant", respond=False)
#main.append(chat_bot)

# Generate a customer datafarme example
import pandas as pd
import numpy as np
df = pd.DataFrame(np.random.randn(10, 5), columns=list('ABCDE'))
# create a tabulator from df
tabulator = pn.widgets.Tabulator(df, height=500, theme='site', sizing_mode='stretch_width')
main.append(tabulator)




# Create template using VanillaTemplate instead of BaseTemplate

nav_tree = {
    "Hello OSU AI Bootcamp": "/",
    "With Yuyang!": {"Amazing TA!": "/amzaingta", "Class Rocks!": "/classrocks"},
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