import Highway from "@dogstudio/highway";
import Slide_l from "./Transitions/Slide_l"
import Slide_r from "./Transitions/Slide_r"
import Slide_up from "./Transitions/Slide_up"
import Slide_d from "./Transitions/Slide_d"
import Fade from "./Transitions/Fade";

import PageLoader from "./pageLoader";
// import gsap from "gsap/gsap-core";
// import {
//     SVG
// } from "@svgdotjs/svg.js";
import Zaglushka from "./zaglushka"

const H = new Highway.Core({
    transitions: {
        default: Fade,
        contextual: {
            left: Slide_l,
            right: Slide_r,
            down: Slide_up,
            up: Slide_d
        }
    }
});


var orientation;
const Z = new Zaglushka();
// console.log(Z);
const PL = new PageLoader;
window.onload = function () {
    orientation=getOrientation();
    // console.log(Z);
    // check orintation
    if(orientation=="Landscape"){
        var div=document.querySelector("#"+Z.div_id);
        if(div){
            div.remove();
        }  
        Z.created=false; 
      }
    //if landscape load page
    
    PL.loadPage(document.location.pathname);


}

//listen for updating links in gallery
document.addEventListener("update-links",function (e){
    // H.attach(e.node);
    H.attach(e.detail.nodes);
});


//Managing link styles
// Listen the `NAVIGATE_IN` event
// This event is sent everytime a `data-router-view` is added to the DOM Tree
const links = document.querySelectorAll('nav a');
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
    to,location
}) => {
    // console.log("NAVIGATE END");
    // manageScripts(to);
    // PL.updateDirections(location.pathname);
    PL.loadPage(location.pathname);
    
});
H.on('NAVIGATE_IN', ({

    location
}) => {
    PL.hidePage(location.pathname);
});

function getOrientation(){
    var orient = window.innerWidth > window.innerHeight ? "Landscape" : "Portrait";
    return orient;
}

//  window.onresize = function(){ 

//     var new_orientation=getOrientation();
    
      //проверка ориентации какая была
        // if(new_orientation!=orientation)
        // {
        //     orientation=new_orientation;

            //новая ориентация портрет
            // if(new_orientation=="Portrait" && !Z.created){
            //     Z.setSvgVertical();
            //   Z.show();    
            // }

            // новая ориентация лэндскейп
        //    if(new_orientation=="Landscape" && Z.created){
        //        Z.hide();
        //    }
         
        // }


    // если ориентация изменилась с гориз на вертикальную

    //то начать функцию заглушки

    //когда заглушка отработала то начать загрузку страницы


    // }


//Managing scripts loading for each page

    function manageScripts(to) {
        // Your main JS file, used to prepend other scripts
        const main = document.querySelector('#main-script');
        const a = [...to.page.querySelectorAll('script:not([data-no-reload])')];
        const b = [...document.querySelectorAll('script:not([data-no-reload])')];
        // Compare Scripts
        for (let i = 0; i < b.length; i++) {
            const c = b[i];
            for (let j = 0; j < a.length; j++) {
                const d = a[j];
                if (c.outerHTML === d.outerHTML) {
                    // Create Shadow Script
                    const script = document.createElement(c.tagName);
                    // Loop Over Attributes
                    for (let k = 0; k < c.attributes.length; k++) {
                        // Get Attribute
                        const attr = c.attributes[k];
                        // Set Attribute
                        script.setAttribute(attr.nodeName, attr.nodeValue);
                    }
                    // Inline Script
                    if (c.innerHTML) {
                        script.innerHTML = c.innerHTML;
                    }
                    // Replace
                    c.parentNode.replaceChild(script, c);
                    // Clean Arrays
                    b.splice(i, 1);
                    a.splice(j, 1);
                    // Exit Loop
                    break;
                }
            }
        }
        // Remove Useless
        for (const script of b) {
            // Remove
            script.parentNode.removeChild(script);
        }
        // Add Scripts
        var iter = 0;
        for (const script of a) {
            // console.log(script);
            const loc = script.parentNode.tagName;
            if (loc === 'HEAD') {
                document.head.appendChild(script);
            }
            if (loc === 'BODY') {
                document.body.insertBefore(script, main);
            }
            // console.log(iter++);
        }
    }
