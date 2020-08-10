import Highway from "@dogstudio/highway";
import {TimelineLite} from "gsap";

class Scale extends Highway.Transition {
    in ({
        from,
        to,
        done
    }) {

        const tl = new TimelineLite();
        // console.log("im in");
        tl.to(from, 0.5, {
            scale: 0,
            // border: "50px solid #F8BA01",
            ease:"power3.in",
            onComplete: ()=> {
                from.remove();   
            }
        })
        .fromTo(to,0.5,{
            // border: "50px solid #F8BA01",
            opacity:0,
            scale:0
        },{
            // border: "0px solid #F8BA01",
            opacity:1,
            scale:1,
            onComplete: done
        });


    }
    out({
        from,
        done
    }) {
        done();
    }
}

export default Scale;