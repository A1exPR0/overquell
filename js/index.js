import Highway from "@dogstudio/highway";
import Slide_l from "./Transitions/Slide_l"
import Slide_r from "./Transitions/Slide_r"
import Slide_up from "./Transitions/Slide_up"
import Slide_d from "./Transitions/Slide_d"
import Fade from "./Transitions/Fade";

import PageLoader from "./pageLoader";
import gsap from "gsap/gsap-core";
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
const show_zagl = new CustomEvent("show-zagl");
const load_page=new CustomEvent("load-page");
const hide_page=new CustomEvent("hide-page");
const PL = new PageLoader;



document.addEventListener("load-page",()=>{
    // console.log("animating load page");
    PL.loadPage(window.location.pathname);
    
});
document.addEventListener("hide-page",()=>{
    // console.log("animating load page");
    PL.hidePage(window.location.pathname);
    
});

// console.log(Z);

window.onload = function () {
    orientation=getOrientation();
    
    // document.dispatchEvent(show_zagl);
    // console.log(Z);
    // check orintation
    if(orientation=="Landscape"){
        var div = document.querySelector("#load_zagl_div");
        if(div){
            gsap.to(div,1,{opacity:0,onComplete:()=>{
                div.remove();
                document.dispatchEvent(load_page);
            }}
                )
        }
        else {
            document.dispatchEvent(load_page);
        }
       
      }
    if(orientation=="Portrait"){
        document.dispatchEvent(show_zagl);
    }
    //if landscape load page
    
   
}

//listen for updating links in gallery
document.addEventListener("update-links",function (e){
    // H.attach(e.node);
    H.attach(e.detail.nodes);
});

document.addEventListener("show-zagl",()=>{
    console.log("I TRY TO SHOW ZAGL");
    PL.hidePage(window.location.pathname);
    const Z = new Zaglushka();
    Z.show();
    
});
//Managing link styles
// Listen the `NAVIGATE_IN` event
// This event is sent everytime a `data-router-view` is added to the DOM Tree
const links = document.querySelectorAll('nav a');
H.on('NAVIGATE_OUT', ({
    location
}) => {
    // console.log(location.pathname);
    // Check Active Link
    if(location.pathname!="/work.html"){
    for (var i = 0; i < links.length; i++) {
        const link = links[i];

        // Clean class
        link.classList.remove('active');

        // Active link
        if (link.href === location.href) {
            link.classList.add('active');
        }
    }}
});

H.on('NAVIGATE_END', ({
    to,location
}) => {
    // console.log("NAVIGATE END");
    // manageScripts(to);
    // PL.updateDirections(location.pathname);
    document.dispatchEvent(load_page);
    
});
H.on('NAVIGATE_IN', ({

    location
}) => {
    document.dispatchEvent(hide_page);
});

function getOrientation(){
    var orient = window.innerWidth > window.innerHeight ? "Landscape" : "Portrait";
    return orient;
}

 window.onresize = function(){ 

    var new_orientation=getOrientation();
    
    //   проверка ориентации какая была
        if(new_orientation!=orientation)
        {
            orientation=new_orientation;

            // новая ориентация портрет
            if(new_orientation=="Portrait"){
                create_zagl_bg(true);   
                setTimeout(()=>{document.dispatchEvent(show_zagl)}, 2000);
            }

            // новая ориентация лэндскейп
           if (orientation == "Landscape") {
               var div = document.querySelector("#load_zagl_div");
               var div2 = document.querySelector("#zagl_container");
               if (div) {
                   console.log("div1");
                   gsap.to(div, 1, {
                       opacity: 0,
                       onComplete: () => {
                           div.style.display="none";
                           document.dispatchEvent(load_page);
                       }
                   })
               } else{
                   console.log("no div");
                  document.dispatchEvent(load_page);
               }

           }
         
        }


    // если ориентация изменилась с гориз на вертикальную

    //то начать функцию заглушки

    //когда заглушка отработала то начать загрузку страницы


    }


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
