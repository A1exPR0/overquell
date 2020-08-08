import Highway from '@dogstudio/highway';
import {
    TimelineLite
} from 'gsap';
import gsap from 'gsap';

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
        const loader=document.createElement('div');
        loader.className="slide_loader_horiz";
        document.querySelector("main").appendChild(loader);
        const tl=new TimelineLite();
        tl.to(from, 0.5, {
                yPercent: 100
            }) 
            .fromTo(loader,0.5,{
                bottom:'100%',
                height:'50px'
            },{
               bottom: '-10%',
               height:'5px'
            },"-=0.5")
            .from(to, 0.5, {
                yPercent: -100,
                onComplete: () => {
                    loader.remove();
                    from.remove();
                    done();
                }
            },
            "-=0.5");
    }
}

export default Slide_d;