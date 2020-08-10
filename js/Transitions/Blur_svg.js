import Highway from '@dogstudio/highway';
import {
    TimelineLite
} from 'gsap';
import gsap from 'gsap';
// import filterGen from './../filterGen';
import {
    SVG
} from '@svgdotjs/svg.js';
import Filter from "@svgdotjs/svg.filter.js";


var draw;
var filter;
var blur;
var filter_id;
class Blur extends Highway.Transition {
    out({
        from,
        done
    }) {
        // draw = SVG().addTo("body").size('100%', '100%');

        // filter = draw.filterWith(function (add) {
        //     blur = add.gaussianBlur(0);
        // });
        // var section = document.querySelectorAll("section");
        // filter_id = filter.filterer().id();
        // section[0].style.cssText = "filter:url(#" + filter_id + ");";
        // var tl = new TimelineLite;
        // tl.to(blur.node,1, {
        //     attr: {
        //         stdDeviation: '50 5'
        //     },
        //     onComplete:()=>{ done();}
        // })
        // .to(from,0.2,{
        //     opacity:0
        // },"-=0.2");
        done();
    } in ({
        to,
        from,
        done
    }) {
        draw = SVG().addTo("body").size('100%', '100%');
        console.log(draw);
        filter = draw.filterWith(function (add) {
            blur = add.gaussianBlur(0);
        });
        console.log(filter);
        var section = document.querySelectorAll("section");
        console.log(section);
        filter_id = filter.filterer().id();
        console.log(filter_id);
        section[0].style.cssText = "filter:url(#" + filter_id + ");";
        section[1].style.cssText = "filter:url(#" + filter_id + ");";
        console.log(section[0].style.cssText);
        console.log(section[1].style.cssText);
        var tl = new TimelineLite;
        // add blur  //dissolve from  //opaque to //reduce blur
        tl.to(blur.node,1,{
            attr: {
                stdDeviation: '50 5'
            }
        },"0")
        .to(from,0.5,{
            opacity: 0
        },"0.5")
        .from(to,0.5,{
            opacity:0
        },"0.5")
        .to(blur.node,1,{
            attr:{
            stdDeviation: "0 0",  
            },
            onComplete:()=>{
                from.remove();
                draw.remove();
                done();
            }
        },'0.5');


        // var tl2 = new TimelineLite({ paused: true });
        // tl.to(blur.node, 1, {
        //     attr: {
        //         stdDeviation: '50 5'
        //     },
        //     onComplete: () => {
        //         console.log("blur is done");
        //         console.log("starting new time line");
        //         tl2.play();

        //  }
        // })
        //     .to(from, 1, {
        //         opacity: 0
        //     }, "-=1")
   
        // tl2.from(to,1,{
        //     opacity:0
        // },"-=1")
        // .to(blur.node, 1, {
        //     attr: {
        //         stdDeviation: "0 0",
        //     },
        //     onComplete: () => {
        //         console.log("blur is out");

        //         from.remove();
        //         draw.remove();
        //         done();
        //     }
        // });

    }
}

export default Blur;