import Highway from "@dogstudio/highway";
import {
    TimelineLite
} from "gsap";

class Film extends Highway.Transition {
    out({
        from,
        done
    }) {
        done();
    } in ({
        from,
        to,
        done
    }) {
        //move from and to down with horiz line fast then to apears again
        //
        var tl = new TimelineLite({onComplete:()=>{from.remove();done();}});
        tl.to(from,0.15,{ 
            yPercent:100 ,
            rotate:'20deg',//страя идет вниз,
            border:"50px solid white"
        },'0')
        .from(to,0.15,{ 
            yPercent:-100 // новая идет из верха
        }).
        fromTo(from, 0.3, {
            yPercent: -100, 
            rotate:"-10deg"// старая из верха
        },{
            yPercent: 100,
            rotate:0 // старая идет вниз
        },"-=0.2").
        fromTo(to, 0.3, { 
            yPercent: -100,
            rotate:"-10deg", //новая из верха,
            border: "50px solid white"
        },{
            yPercent:0,
            rotate:0, // новая встала на место
            border: "0px solid white"
        }, "-=0.2");

    }

}

export default Film;