import Highway from '@dogstudio/highway';
import {
    TimelineLite
} from 'gsap';
import gsap from 'gsap';
import {
    create_filter_blur
} from "./../transiiton_filter";

 

class Blur extends Highway.Transition {
    out({
        from,
        done
    }) {
        done();
    }
      
    in ({
        to,
        from,
        done
    }) {
         var draw = create_filter_blur();
         console.log(draw);
         console.log("LEFT", draw[2] + ' 0');
        var tl = new TimelineLite;
        // add blur  //dissolve from  //opaque to //reduce blur
        tl.to(draw[1].node, 0.5, {
            attr: {
                stdDeviation:draw[2]+' 0'
            }
        },"0")
        .to(from,1,{
            xPercent:-100,
            opacity:0
        },"0")
        .from(to,1,{
            xPercent:100,
            opacity:0
        },"0")
        .to(draw[1].node, 0.5, {
            attr:{
            stdDeviation: "0 0",  
            },
            onComplete:()=>{
                from.remove();
                draw[0].remove();
                done();
            }
        },'0.5');

    }
}

export default Blur;