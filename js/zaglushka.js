import gsap from "gsap";
import {
    TimelineLite
} from "gsap"
import {
    SVG
} from "@svgdotjs/svg.js"

export default class Zaglushka {
    svg
    tail
    group
    div
    h3
    svg_code = '<svg id="logo_for_zagl" style="display: none;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y = "0px" viewBox = "0 0 320 320" style = "enable-background:new 0 0 320 320;" xml: space = "preserve" > <style type = "text/css"> .st0 { fill: #DDDDDD; } </style> <rect id="tail" x="187.5" y="191.5" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -86.4113 202.9496)" class = "st0" width="28.6" height="28.6" /><g id="group_logo" ><path class="st0" d="M98,159.6c0,31.6,25.6,57.2,57.2,57.2s57.2-25.6,57.2-57.2h-28.6c0,15.8-12.8,28.6-28.6,28.6s-28.6-12.8-28.6-28.6L98,159.6L98,159.6z" /> <path class = "st0" d="M212.4,102.4c0-31.6-25.6-57.2-57.2-57.2S98,70.8,98,102.4s25.6,57.2,57.2,57.2S212.4,134,212.4,102.4z M126.6, 102.4c0-15.8,12.8-28.6,28.6-28.6 s28.6,12.8,28.6,28.6S171,131,155.2,131 S126.6,118.2,126.6,102.4z" /> </g> </svg>'

    show() {
        this.create_svg();
        gsap.fromTo(this.svg, 1, {
            opacity: 0, delay: 1
        }, {
            opacity: 1
            
        }, 0);
        this.rotatetoHorizontal();
    }

    create_svg() {
        this.div = document.querySelector("#load_zagl_div");
        this.div.style.display = "block";
        this.svg = SVG(this.svg_code).addTo(this.div);

        this.tail = document.querySelector('#tail');
        this.group = document.querySelector('#group_logo');
        this.svg.css({
            display: "block",
            "z-index": "1000",
            width: "100%",
            // "max-width": "400px",
            "max-height": "30%",
            // margin: "0 auto 0 auto",
            top:"35%",
            position:"absolute"
        });
        this.h3 = document.createElement("h3");
        this.h3.innerText = "Переверните устройство";
        this.h3.style.fontSize = "4.5rem";
        this.h3.style.width = "100vw";
        this.h3.style.opacity = "1";
        this.h3.style.textTransform = "uppercase";
        this.h3.style.position = "absolute";
        this.h3.style.textAlign = "center";
        this.h3.style.bottom = "20vh";
        this.div.appendChild(this.h3);
    }

    rotatetoHorizontal() {
        gsap.to(this.tail, 1, {
                xPercent: 100,
                yPercent: -60,
                delay:2
            });
        gsap.to(this.group, 1, {
                rotate: -90,
                transformOrigin: "55% 50%",
                delay:2
            });
        console.log(this.tl);

    }

    loading() {
        this.h3.remove();
        console.log(this.tl);
        this.svg = SVG("#logo_for_zagl").addTo(this.div);

        this.tail = SVG('#tail');
        this.group = SVG('#group_logo');

        var rect = this.svg.rect("100%", "100%").fill("white").dmove("-100%", 0);
        var mask = this.svg.mask();
        mask.add(this.group.clone().fill("#FFF"))
        mask.add(this.tail.clone().fill("#FFF"))
        rect.maskWith(mask);
        rect.animate(3000, '<>').dmove(0, 0);
        setTimeout(this.hide.bind(this), 2000);
    }

    hide() {
        gsap.to(this.div,0.5,{opacity:0,onComplete:()=>{
            this.div.remove();
            var e=new CustomEvent("load-page");
            document.dispatchEvent(e);
            
        }});

    }
}