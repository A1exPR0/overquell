import Highway from '@dogstudio/highway';
import {
    TimelineLite
} from 'gsap';
import gsap from 'gsap';

class Fade extends Highway.Transition {
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
        var tl = new TimelineLite({
            onComplete: () => {
                from.remove();
                done();
            }
        });
        tl.to(from, 0.3, {
            opacity: 0,
            onComplete: () => {
                from.remove();
                done();
            }
        }).fromTo(to, 2, {
            opacity: 0
        }, {
            opacity: 1,
        },"-=0.3");

    }
}

export default Fade;