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
    tail
    group
   tl=new TimelineLite();
    
    constructor() {
        this.div=document.createElement("div");
        this.group = document.querySelector("#group_logo");
        this.tail = document.querySelector("#tail");
        this.div_id="zagl_div";
        this.div.id=this.div_id;
        this.created=true;
        this.svg = new SVG("#logo_for_zagl");
        // console.log("constructor running ...");
       
          // this.div.appendChild(this.svg);

        // return true;
    }
    show() {
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
      


        //create svg
        
        // console.log(this.svg);

        this.svg.opacity(0);
        this.svg.scale(0.5);
        this.svg.css({position: "absolute",
            'z-index': 21,
            display:"block",
            top: 0,
            left: 0});

        //

     
        document.body.appendChild(this.div);

        this.tl.to(this.div, 0.5, {
            opacity: 1
        })
        .to(this.div.children[0],1,{
            opacity:1
        })
        .to(this.svg, 1,{
            opacity:1,
            onComplete:()=>{
                this.rotatetoHorizontal();
                        }
            
        });

        this.created=true;
        // return div.id;
    }

    rotatetoVertical() {    
            this.tl.to(this.tail,1,{
                yPercent:50,
                xPercent:-50
            }).
            to(this.group,1,{
                rotate:90,
                transformOrigin:"60% 50%"
            },"-=1");
    }
    rotatetoHorizontal() {
            this.tl.to(this.tail,1,{
                yPercent:-50,
                xPercent:50
            }).
            to(this.group,1,{
                rotate:-90,
                transformOrigin:"50% 60%"
            },"-=1");
    }
    setSvgVertical(){
        var svg_group= new SVG(this.group);
        svg_group.transform({
            // origin:["60%","50%"],
            rotate:90,
            // scale:0.5
        });
        var svg_tail= new SVG(this.tail);
        // svg_tail.dx(-50);
        svg_tail.dy(50);
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