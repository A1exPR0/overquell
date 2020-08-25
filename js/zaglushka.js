import gsap from "gsap";
import {TimelineLite} from "gsap"
import {
    SVG
} from "@svgdotjs/svg.js"

export default class Zaglushka {
    created
    svg
    tail
    group
    div
    tl=new TimelineLite();
    
    constructor() {

        
    }
    show() {
       //create svg and text
       this.create_svg();
        this.tl.fromTo(this.div,1,{opacity:0},{opacity:1});
       //reveal svg and text

       //rotate svg

       //when orientation chanched start loading

       //hide svg and text

       //hide bg

       //destroy svg
    }

    create_svg(){
        this.div = document.querySelector("#load_zagl_div");
        console.log(this.div);
        this.div.style.display="block";
        this.svg = SVG("#logo_for_zagl").addTo(this.div);
        
        this.tail = document.querySelector("#tail");
        this.group = document.querySelector("#group_logo");
        this.svg.css({
            display:"block",
            "z-index":"1000",
            // position:"absolute",
            width:"150px",
            margin:"10vh auto auto auto"
        });
        var h3=document.createElement("h3");
        h3.innerText="Переверните устройство";
        h3.style.fontSize="6rem";
        h3.style.width="100vw";
        h3.style.textAlign="center";
        h3.style.marginTop="5vh";
        this.div.appendChild(h3);
    }

    destroy_svg(){

    }

    rotatetoVertical() {    
  
    }
    rotatetoHorizontal() {
    
    }

    loading() {

    }

    hide() {

    }
}