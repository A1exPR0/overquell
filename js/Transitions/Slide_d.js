import Highway from '@dogstudio/highway';
import {
    TimelineLite
} from 'gsap';
import gsap from 'gsap';
import { off } from '@svgdotjs/svg.js';

class Slide_d extends Highway.Transition {
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
        // to.addClassName("moving");
        // var el = document.querySelectorAll(to);
        // console.log(el);
         
        //UNCOMENT TO RETURN LOADER 
        // console.log(dur, offset, my_ease);
        // const loader = document.createElement('div');
        // loader.className = "slide_loader_horiz";
        // document.querySelector("main").appendChild(loader);
        const tl = new TimelineLite();
        tl.to(from, dur, {
                yPercent: 100,
                ease: my_ease,
            })
            // .from(noises[1],dur,{
            //     opacity:0
            // },offset)
            //UNCOMENT TO RETURN LOADER 
            // .fromTo(loader, dur, {
            //     bottom: '100%',
            //     height: '20px',
            // }, {
            //     bottom: '-5px',
            //     height: '5px',
            //     ease: my_ease
            // }, offset)
            .from(to, dur, {
                    yPercent: -100,
                    ease: my_ease,
                    onComplete: () => {

                        //UNCOMENT TO RETURN LOADER 
                        // loader.remove();
                        from.remove();
                        done();
                    }
                },
                offset);
    }
}

export default Slide_d;