import Highway from '@dogstudio/highway';
import {
    TimelineLite
} from 'gsap';
import gsap from 'gsap';
import {create_filter_blur} from "./../transiiton_filter";


var draw;
var filter;
var blur;
var filter_id;
class Blur extends Highway.Transition {
    out({
        from,
        done
    }) {
        done();
    }in ({
        to,
        from,
        done
    }) {
        var draw = create_filter_blur();
        console.log(draw);
        var tl = new TimelineLite;
        // add blur  //dissolve from  //opaque to //reduce blur
        tl.to(draw[1].node, 1, {
                attr: {
                    stdDeviation:'0 ' + draw[2]
                }
            }, "0")
            .to(from, 2, {
                yPercent: -100,
                opacity: 0
            }, "0")
            .from(to, 2, {
                yPercent: 100,
                opacity: 0
            }, "0")
            .to(draw[1].node, 1, {
                attr: {
                    stdDeviation: "0 0",
                },
                onComplete: () => {
                    from.remove();
                    draw[0].remove();
                    done();
                }
            }, '1');

    }
}

export default Blur;