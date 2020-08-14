import gsap from "gsap";
import {TimelineLite} from "gsap"
import {
    SVG
} from "@svgdotjs/svg.js"

export default class Zaglushka {
    div
    div_id
    created
    svg
   tl=new TimelineLite();
    
    constructor() {
        this.div=document.createElement("div");
        this.div_id="zagl_div";
        this.div.id=this.div_id;
        this.created=true;
        // console.log("constructor running ...");
        this.div.style.backgroundColor = "#191919";
        this.div.style.position = "absolute";
        this.div.style.width = "100vw";
        this.div.style.height = "100vh";
        this.div.style.zIndex = "20";
        this.div.style.opacity = "0";
        this.div.style.top="0";
        this.div.style.left="0";

        var h3=document.createElement("h3");
        h3.style.textAlign="center";
        h3.style.fontSize="5rem";
        h3.style.lineHeight="100vh";
        h3.style.opacity=0;
        h3.innerText="Переверните устройство";
        this.div.appendChild(h3);

        // return true;
    }
    show() {
        //
     
        document.body.appendChild(this.div);
        this.tl.to(this.div, 0.5, {
            opacity: 1
        })
        .to(this.div.children[0],1,{
            opacity:1
        });

        this.created=true;
        // return div.id;
    }

    rotate() {

    }

    loading() {

    }

    hide() {
        // var div=document.querySelector("#"+div_id);
        console.log(this.div);
        this.tl.to(this.div.children[0], 0.5, {
            opacity: 0
        })
        .to(this.div,1,{
            opacity:0,
            onComplete: () => {
                this.div.remove();
                this.created=false;
            }
        })
    }
}