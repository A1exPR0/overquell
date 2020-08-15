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
        // console.log(dur,offset,my_ease);

        //UNCOMENT TO RETURN LOADER 
        // const loader = document.createElement('div');
        // loader.className = "slide_loader_vert";
        // document.querySelector("main").appendChild(loader);
        const tl = new TimelineLite();
        tl.to(from, dur, {
                xPercent: -100,
                ease: my_ease,
            })
  
            //UNCOMENT TO RETURN LOADER 
            // .fromTo(loader, dur, {
            //     left: '100%',
            //     width: '20px'
            // }, {
            //     left: '0%',
            //     width: '5px',
            //     ease: my_ease,
            // }, offset)
            .from(to, dur, {
                    xPercent: 100,
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

export default Slide_l;