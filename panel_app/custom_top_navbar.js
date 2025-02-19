/* confetti.js */
import { CustomTopNavbar } from "https://cdn.jsdelivr.net/gh/petegordon/panel_components@latest/custom-top-navbar/custom-top-navbar.js";


export function render({ model }) {
console.log("CustomTopNavbar loaded:", CustomTopNavbar);

// ✅ Create an instance of the custom element
const navbar = document.createElement("custom-top-navbar");

// ✅ Set attributes (optional, depending on how `CustomTopNavbar` expects data)
console.log("model.nav_tree_string:", model.nav_tree_string);
let nav_tree_string = model.nav_tree_string; 
//`${model._nav_tree_string}`;
//let nav_tree_string = `{"Home": "/home", "About": "/about", "Contact": "/contact"}`;
navbar.setAttribute(
    "data-nav",
    nav_tree_string
);

return navbar;
}
