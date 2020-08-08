import Highway from "@dogstudio/highway";
import {
    TimelineLite
} from "gsap";
import {
    TweenLite
} from "gsap";
import gsap from "gsap/gsap-core";

class Loader extends Highway.Transition {
    in ({
        from,
        to,
        done
    }) {
        const tl = new TimelineLite();
        console.log(location.href);
        tl.fromTo(to, 0.8, {
            // opacity: 0,
            height: 0,
            top: '50%'
        }, {
            // opacity: 1,
            height: '100vh',
            top: 0,
            onComplete:done()
        });

    }
    out({
        from,
        done
    }) {
        // const tw=new TweenLite();
        const tl2 = new TimelineLite();
        tl2.to(from, 0.3, {
                scaleY: 0.01,
                // opacity:0.3,
                // ease:"power4.in"
            }).to(".loader", 0.5, {
                left: 0,
            }).to(from,0.3,{
                opacity:0
            })
            .to(".loader", 0.2, {
                opacity: 0,
                onComplete: function () {
                    document.querySelector(".loader").setAttribute('style', 'left:-100%');
                    from.remove();
                    done();
                }
                // opacity: 1
                // })
                // .to(from.children,0.5,{
                //     opacity: 0, 
                //     // x: '-100%',
                //     onComplete: function () {

                //         from.remove();
                //         done();
                //     }
            });


    }
}

export default Loader;