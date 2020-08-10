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
        //Blur
        // let filter = document.querySelector("#blur");
        //turbulance displ
        let filter = document.querySelector("#displacement");
        // console.log(displ);
        const tl=new TimelineLite();
        tl.to(from, 1, {
                xPercent: -100
            })
            .fromTo(loader, 1, {
                x:-20,
                left: '100%',
                width: '10px'
            }, {
                x:-20,
                left: '0%',
                width: '1px'
            }, "-=1")
            // .from
            .to(filter, 0.5, {
                attr:{
                    //Displacement
                    scale:"100"
                    //Blur
                    // stdDeviation: '20 0'
                }
            }, "-=1")
            .to(filter, 1, {
                attr: {
                    //Displacement
                    scale:'0'
                    //Blur
                    // stdDeviation: '0 0'
                }
            }, )
            .from(to, 1, {
                xPercent: 100,
                onComplete: () => {
                    loader.remove();
                    from.remove();
                    done();
                }
            },
            "-=2")
            ;
    }
}

export default Slide_l;