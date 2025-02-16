class CustomTopNavbar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        // Default navbar structure (empty, will be replaced)
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    font-family: 'Inter', sans-serif;
                }

                .navbar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 12px 20px;
                    color: white;
                }

                .nav-container {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    width: 100%;
                    justify-content: space-between;
                }

                .logo {
                    display: flex;
                    align-items: center;
                }

                .logo img {
                    width: 64px;
                    height: 64px;
                }

                .nav-links {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .nav-links a {
                    text-decoration: none;
                    color: #ccc;
                    transition: color 0.3s ease-in-out;
                    padding: 6px 12px;
                }

                .nav-links a:hover {
                    color: white;
                }

                /* Dropdown */
                .dropdown {
                    position: relative;
                    display: flex;
                    align-items: center;
                }

                .dropdown-menu {
                    position: absolute;
                    top: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    background-color: #111;
                    border-radius: 12px;
                    padding: 16px;
                    min-width: 280px;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 10px;
                    box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.3);
                    opacity: 0;
                    transform: translateY(-10px) translateX(-50%);
                    transition: opacity 0.3s ease, transform 0.3s ease;
                    pointer-events: none;
                }

                .dropdown:hover .dropdown-menu {
                    opacity: 1;
                    transform: translateY(0) translateX(-50%);
                    pointer-events: all;
                }

                .dropdown-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px;
                    border-radius: 8px;
                    transition: background 0.3s ease-in-out, color 0.3s;
                    cursor: pointer;
                }

                .dropdown-item:hover {
                    background: #222;
                    color: white;
                }

                .dropdown-item span {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 24px;
                    height: 24px;
                }

                /* Hamburger Menu */
                .hamburger {
                    display: none;
                    cursor: pointer;
                    font-size: 24px;
                    color: white;
                }

                @media (max-width: 768px) {
                    .nav-links {
                        display: none;
                        flex-direction: column;
                        background-color: rgba(0, 0, 0, 0.9);
                        position: fixed;
                        top: 60px;
                        left: 0;
                        width: 100%;
                        height: calc(100vh - 60px);
                        text-align: center;
                        padding: 20px 0;
                        border-top: 1px solid rgba(255, 255, 255, 0.2);
                        z-index: 1000;
                    }

                    .nav-links a {
                        display: block;
                        padding: 10px 0;
                    }

                    .hamburger {
                        display: block;
                    }

                    .nav-links.active {
                        display: flex;
                    }
                }
            </style>

            <header class="navbar">
                <div class="nav-container">
                    <div class="logo">
                        <img src="pythonai_logo.webp" alt="Logo">
                    </div>  

                    <!-- Hamburger Menu Icon -->
                    <div class="hamburger" id="hamburger">☰</div>

                    <nav class="nav-links" id="navLinks">
                        <!-- Dynamic links will be injected here -->
                    </nav>
                </div>
            </header>
        `;
    }

    connectedCallback() {
        // ✅ Fetch the attribute inside `connectedCallback` to avoid `null` issue
        const navDataAttr = this.getAttribute('data-nav');
        if (!navDataAttr) {
            console.error("Missing 'data-nav' attribute in <custom-navbar>");
            return;
        }

        try {
            this.navData = JSON.parse(navDataAttr);
            this.buildNav();
            this.setupEventListeners();
        } catch (error) {
            console.error("Invalid JSON format in 'data-nav' attribute:", error);
        }
    }

    buildNav() {
        const navLinksContainer = this.shadowRoot.getElementById("navLinks");
        navLinksContainer.innerHTML = ''; // Clear existing

        Object.keys(this.navData).forEach((key) => {
            const value = this.navData[key];

            if (typeof value === 'string') {
                // Regular links
                const link = document.createElement("a");
                link.href = value;
                link.textContent = key;
                navLinksContainer.appendChild(link);
            } else {
                // Dropdown menu
                const dropdown = document.createElement("div");
                dropdown.classList.add("dropdown");

                const dropdownTitle = document.createElement("a");
                dropdownTitle.textContent = key;

                const dropdownMenu = document.createElement("div");
                dropdownMenu.classList.add("dropdown-menu");

                Object.keys(value).forEach((subKey) => {
                    const subValue = value[subKey];

                    const dropdownItem = document.createElement("div");
                    dropdownItem.classList.add("dropdown-item");

                    const icon = document.createElement("span");
                    if (typeof subValue === "object" && subValue.icon) {
                        icon.textContent = subValue.icon;
                    }

                    const link = document.createElement("a");
                    link.href = typeof subValue === "object" ? subValue.link : subValue;
                    link.textContent = subKey;

                    dropdownItem.appendChild(icon);
                    dropdownItem.appendChild(link);
                    dropdownMenu.appendChild(dropdownItem);
                });

                dropdown.appendChild(dropdownTitle);
                dropdown.appendChild(dropdownMenu);
                navLinksContainer.appendChild(dropdown);
            }
        });
    }

    setupEventListeners() {
        const hamburger = this.shadowRoot.getElementById("hamburger");
        const navLinks = this.shadowRoot.getElementById("navLinks");

        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }
}

export default CustomTopNavbar;
// Register the custom element
if (!customElements.get("custom-top-navbar")) {
    customElements.define("custom-top-navbar", CustomTopNavbar);
}
