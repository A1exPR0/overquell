import Highway from '@dogstudio/highway';
import {
    TimelineLite
} from 'gsap';
import gsap from 'gsap';
import {
    off
} from '@svgdotjs/svg.js';

class Slide_l extends Highway.Transition {
    out({
        from,
        done
    }) {
        done();
    } in ({
        to,
        from,
        done
    }) {
        const dur = 1;
        const offset = "-=" + dur;
        const my_ease = "power2.in";
        // console.log(dur, offset, my_ease);
       console.log("up");
        //UNCOMENT TO RETURN LOADER 
        // const loader = document.createElement('div');
        // loader.className = "slide_loader_horiz";
        // document.querySelector("main").appendChild(loader);
        const tl = new TimelineLite();
        tl.to(from, (dur / 2), {
                scale: 0.9
            })
            .to(from, dur, {
                // yPercent: -100,
                // ease: my_ease,
                opacity:0
            })
  
            //UNCOMENT TO RETURN LOADER 
            // .fromTo(loader, dur, {
            //     bottom: '-5px',
            //     height: '20px',
                
            // }, {
            //     bottom: '100%',
            //     height: '5px',
            //     ease: my_ease,
            //     // ease: my_ease,
            // }, offset)
            .fromTo(to, dur,{
                    clip: "rect(0,100vw,0,0)"
            }, {
                    // yPercent:-100,
                    // opacity: 0,
                    clip: "rect(0,100vw,100vh,0)",
                    ease:my_ease,
                    onComplete: () => {
                        console.log("complete");
                        //UNCOMENT TO RETURN LOADER 
                        // loader.remove();
                        from.remove();
                        done();
                    }
                },
                offset);
    }
}

export default Slide_l;