import Highway from '@dogstudio/highway';
import {
    TimelineLite
} from 'gsap';
import gsap from 'gsap';
import filterGen from './../filterGen';

const fG = new filterGen;
const tl = new TimelineLite();
let blur;
let filter;
  
class Blur extends Highway.Transition {
    out({
        from,
        done
    }) {

        filter = fG.createFilter("body", "js_filter");
        blur = fG.addBlur(filter.el, '0 0', 'blur', 'blur', 'SourceGraphic');
        let main = document.querySelector('section');
        main.style.cssText = "filter:url('#js_filter');";
        tl.to(blur.selector, 1, {
            attr: {
                stdDeviation: "5 5"
            },
            onComplete: () => {
                done();
            }
        });

    } in ({
        to,
        from,
        done
    }) {
        from.remove();
        tl.from(blur.selector, 1, {
            attr: {
                stdDeviation: "5 5"
            },
            onComplete: () => {
                // filter.el.parentNode.parentNode.remove();
                done();
            }
        });


    }
}

export default Blur;