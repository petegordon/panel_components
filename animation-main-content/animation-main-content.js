class AnimatedContent extends HTMLElement {
    constructor() {
        super();

        // Attach Shadow DOM
        this.attachShadow({ mode: 'open' });

        // Define component template
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    height: 50vh;
                    width: 100vw;
                    font-family: 'Inter', sans-serif;
                }

                /* Small Content Container */
                .small-content-container {
                    height: 25vh;
                    display: flex;
                    justify-content: center;
                    align-items: flex-end;
                    position: relative;            
                    padding: 0 16px; /* Prevents edge-cut on mobile */
                }

                /* Small Content (Styled Button) */
                .small-content {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    border-radius: 50px;
                    padding: 10px 20px;
                    font-size: clamp(10px, 3vw, 14px); /* Adjust font size dynamically */
                    font-weight: 500;
                    cursor: pointer;
                    opacity: 0;
                    transform: translateY(-20px);
                    animation: fadeDown 1.5s ease-out 0.3s forwards;
                    transition: background 0.3s ease, border-color 0.3s ease;
                    position: absolute;
                    white-space: nowrap;
                    max-width: 90%; /* Prevents overflow */
                    text-align: center;
                    flex-wrap: nowrap;  /* Ensures everything stays in a row */
                    min-width: 250px;  /* Ensures it doesn’t shrink too much */                            
                }

                /* Ensure left text is bolder */
                .small-content .text-left {
                    font-weight: 600;  /* Bold left text */
                }

                /* Ensure right text is lighter */
                .small-content .text-right {
                    font-size: 10px;
                    display: flex;
                    align-items: center;
                    gap: 2px; /* Add space between text and arrow */
                    white-space: nowrap; /* Prevents wrapping */
                }

                /* Hover Effect */
                .small-content:hover {
                    background: rgba(255, 255, 255, 0.15);
                    border-color: rgba(255, 255, 255, 0.5);
                }

                /* Responsive Wrapping */
                .small-content span {
                    display: flex;
                    flex-wrap: wrap;
                }

                /* Adjust space between right text and arrow */
                .arrow {
                    margin-left: 2px;  /* Adds more space to the left of the arrow */
                    transition: transform 0.3s ease;
                }

                /* Hover & Active Effects */
                .small-content:hover .arrow,
                .small-content:active .arrow {
                    transform: translateX(5px);
                }

                /* Main Content Container */
                .main-content-container {
                    height: 25vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 0 16px; /* Prevents edge-cut on mobile */
                    text-align: center;
                }

                /* Main Content */
                .main-content {
                    font-size: clamp(18px, 4vw, 32px); /* Adjust font size dynamically */
                    font-weight: bold;
                    opacity: 0;
                    transform: translateY(30px);
                    animation: fadeUp 1.5s ease-out 0.5s forwards;
                    max-width: 90%; /* Prevents overflow */
                }

                /* Fade-in + slight downward transition */
                @keyframes fadeDown {
                    0% { opacity: 0; transform: translateY(-20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }

                /* Fade-in + slight upward transition */
                @keyframes fadeUp {
                    0% { opacity: 0; transform: translateY(30px); }
                    100% { opacity: 1; transform: translateY(0); }
                }

                /* Responsive Design */
                @media (max-width: 600px) {
                    .small-content {
                        flex-direction: column;
                        text-align: center;
                        padding: 8px 12px;
                    }

                    .main-content {
                        font-size: 20px; /* Slightly smaller on mobile */
                    }
                }
            </style>

            <!-- Small Content -->
            <div class="small-content-container">
                <div class="small-content">
                    <span class="text-left">Auth and Payment integration</span>
                    <span class="text-right">Read more<span class="arrow">→</span></span>
                </div>
            </div>

            <!-- Main Content -->
            <div class="main-content-container">
                <div class="main-content">Main Content Fading & Rising</div>
            </div>
        `;
    }
}

export { AnimatedContent };

// Register the custom element
if (!customElements.get("animation-main-content")) {
    customElements.define("animation-main-content", AnimatedContent);
}
// Register the custom element
customElements.define('animation-main-content', AnimatedContent);