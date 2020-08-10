import Highway from '@dogstudio/highway';
import {
    TimelineLite
} from 'gsap';
import gsap from 'gsap';

class Grid_rotate extends Highway.Transition {
    out({
        from,
        done
    }) {
        gsap.to(from,0.5,{opacity:0,delay:0.5});
        const main = document.querySelector("main");
        const grid = document.createElement("div");
        for (var i = 0; i < 144; i++) {
            console
            var div = document.createElement("div");
            grid.appendChild(div);

        }
        //   console.log(arr);

        grid.className = "grid_loader";
        //   arr.forEach(function (cell){ grid.appendChild(cell);});
        console.log(grid);
        main.appendChild(grid);
        const tl = new TimelineLite();
        tl.from(grid.children, 0.1, {
            scale: 0,
            rotate:360,
            stagger: {
                grid: "auto",
                amount: 0.5,
                from: "start",
                // axis:"y"
            },
            onComplete: () => {
                from.remove();
                done();

            }
        });

    } in ({
        to,
        from,
        done
    }) {
        gsap.from(to, 0.5, {
            opacity: 0
        });
        const tl = new TimelineLite();
        var grid = document.querySelector(".grid_loader");
        tl.to(grid.children, 0.1, {
            scale: 0,
            rotate:360,
            stagger: {
                grid: "auto",
                amount: 0.5,
                from: "start",
                    // axis: "y"
            },
            onComplete: () => {
                grid.remove();
                done();

            }
        });


    }
}
export default Grid_rotate;