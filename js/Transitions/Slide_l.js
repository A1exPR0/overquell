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
        const loader = document.createElement('div');
        loader.className = "slide_loader_vert";
        document.querySelector("main").appendChild(loader);
        const tl=new TimelineLite();
        tl.to(from, 0.5, {
                xPercent: -100
            })
            .fromTo(loader, 0.5, {
                left: '100%',
                width: '50px'
            }, {
                left: '0%',
                width: '5px'
            }, "-=0.5")
            .from(to, 0.5, {
                xPercent: 100,
                onComplete: () => {
                    loader.remove();
                    from.remove();
                    done();
                }
            },
            "-=0.5");
    }
}

export default Slide_l;