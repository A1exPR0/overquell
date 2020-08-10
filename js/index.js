import Highway from "@dogstudio/highway"
import Fade from "./Transitions/Fade"
import PageLoader from "./pageLoader";
import gsap from "gsap/gsap-core";
import {
    SVG
} from "@svgdotjs/svg.js";


const H = new Highway.Core({
    transitions: {
        default: Fade
        // contextual: {
        //     left: Slide_l,
        //     right: Slide_r,
        //     down: Slide_d,
        //     up: Slide_up
        // }
    }
});

const links = document.querySelectorAll('nav a');
const PL = new PageLoader;
window.onload = function () {
    PL.loadPage(document.location.pathname);


}
// Listen the `NAVIGATE_IN` event
// This event is sent everytime a `data-router-view` is added to the DOM Tree
H.on('NAVIGATE_OUT', ({
    location
}) => {
    // Check Active Link
    for (var i = 0; i < links.length; i++) {
        const link = links[i];

        // Clean class
        link.classList.remove('active');

        // Active link
        if (link.href === location.href) {
            link.classList.add('active');
        }
    }
});

H.on('NAVIGATE_END', ({
    location
}) => {
    PL.loadPage(location.pathname);
});
H.on('NAVIGATE_IN', ({

    location
}) => {
    PL.hidePage(location.pathname);
});

//contacts
function closeContacts() {
    var close_cont = document.querySelector("#contact_close");
    close_cont.addEventListener("click", () => {
        gsap.to(".contacts", 0.5, {
            yPercent: -110
        });
    });

    return true;
}