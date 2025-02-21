import gradio as gr
from gradio.routes import App
# Simple HTML content without script tags
html_content = """
<fancy-button label="Click Me in Gradio!"></fancy-button>
"""

with gr.Blocks() as block:
    gr.HTML(html_content)
    block.load(None, js="""() => {
                console.log('Hello');
                class FancyButton extends HTMLElement {
                    constructor() {
                    super();
                    console.log('FancyButton constructor');
                    this.attachShadow({ mode: 'open' });
                    const button = document.createElement('button');
                    button.textContent = this.getAttribute('label') || 'Fancy Button';
                    button.addEventListener('click', () => alert('Fancy Button Clicked!'));

                    const style = document.createElement('style');
                    style.textContent = `
                        button {
                        padding: 10px 20px;
                        background-color: #4CAF50;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        transition: background-color 0.3s;
                        }
                        button:hover {
                        background-color: #45a049;
                        }
                    `;

                    this.shadowRoot.append(style, button);
                    }
                }

                if (!customElements.get('fancy-button')) {
                    customElements.define('fancy-button', FancyButton);
                }
               
               }

               """)
    
    
block.launch(debug=True, 
            share=False)

block.close()