/* confetti.js */
//import { AnimationContent } from "https://cdn.jsdelivr.net/gh/petegordon/panel_components@latest/animation-main-content/animation-main-content.js";
import { AnimationContent } from "../animation-main-content/animation-main-content.js";


export function render({ model }) {
console.log("AnimationContent loaded:", AnimationContent);

// ✅ Create an instance of the custom element
const animationContent = document.createElement("animation-main-content");

return animationContent;
}
