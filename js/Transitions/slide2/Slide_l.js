import Highway from '@dogstudio/highway';
import {
    TimelineLite
} from 'gsap';
import gsap from 'gsap';

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
        console.log("left");
        // console.log(dur,offset,my_ease);

        //UNCOMENT TO RETURN LOADER 
        // const loader = document.createElement('div');
        // loader.className = "slide_loader_vert";
        // document.querySelector("main").appendChild(loader);
        const tl = new TimelineLite();
        tl.to(from, (dur / 2), {
                scale: 0.9
            })
            .to(from, dur, {
            opacity:0
        })
        .from(to, dur,{
                    xPercent: 100,
                    opacity: 0,
                    ease: my_ease,
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