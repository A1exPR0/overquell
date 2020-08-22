import gsap from 'gsap'
import {
    TimelineLite
} from 'gsap'
import {
    SVG
} from "@svgdotjs/svg.js"
import Player from "@vimeo/player";
import Highway from "@dogstudio/highway";


class PageLoader {
    play_video(id, name) {
        // console.log("PLay_video function running");
        // console.log(id);
        //hide menu
        gsap.to(".top_nav", 1, {
            yPercent: -120
        });
        gsap.to(".header_logo", 1, {
            yPercent: -120
        });
        gsap.to(".bottom_nav", 1, {
            yPercent: 120
        });
        gsap.to(".social_nav", 1, {
            yPercent: 120
        });
        //hide page
        gsap.to("section", 1, {
            opacity: 0
        });

        //add and show close btn 
        var draw = new SVG().addTo("body").size(70, 70);
        draw.line(0, 0, 30, 30).move(10, 10);
        draw.line(0, 30, 30, 0).move(10, 10);
        draw.addClass("close_btn");
        draw.stroke({
            width: 5,
            color: '#FFF',
        });
        gsap.from(".close_btn", 1, {
            yPercent: -120
        });
        draw.click(() => {
            this.close_video();
        });

        //create player
        var player_div = document.createElement("div");
        player_div.id = "vimeo_fullscreen";
        //for testing
        var h1 = document.createElement("h1");
        h1.innerHTML = name;

        //draw custom controls
        // var draw_controls=SVG().addTo(player_div).size(40,40);
        // var line = draw_controls.line(0,0,0,10).stroke({width:10,color:"#FFF"});
        // var line = draw_controls.line(10,0,10,10).stroke({width:10,color:"#FFF"}).move(20,0);
        // line.style.cssText="position:absolute";


        player_div.appendChild(h1);
        document.querySelector("body").appendChild(player_div);
        var width = document.documentElement.clientWidth;
        var height = document.documentElement.clientHeight;
        height -= h1.offsetHeight;
        var vimeo_options = {
            id: id,
            width: width,
            height: height,
            autoplay: true,
            color: "F8BA01",
            controls: false

        };

        var player = new Player(player_div, vimeo_options);
        //show player
        gsap.fromTo("#vimeo_fullscreen", 1, {
            display: "none",
            opacity: 0
        }, {
            display: "block",
            opacity: 1
        });
        //play video
        //it starts playing automatically onload

        //hide share controls
        //???   
    }

    close_video() {
        // console.log("Closing video");

        //hide close_btn
        gsap.to(".close_btn", 1, {
            yPercent: -100,
            onComplete: () => {
                //kill close_btn
                document.querySelector(".close_btn").remove();
            }
        });

        //show menu
        gsap.to(".top_nav", 1, {
            yPercent: 0
        });
        gsap.to(".header_logo", 1, {
            yPercent: 0
        });
        gsap.to(".bottom_nav", 1, {
            yPercent: 0
        });
        gsap.to(".social_nav", 1, {
            yPercent: 0
        });

        //show page
        gsap.to("section", 1, {
            opacity: 1
        });

        //hide player
        var iframe = document.querySelector('iframe');
        var player = new Player(iframe);
        gsap.to("#vimeo_fullscreen", 1, {
            opacity: 0,
            onComplete: () => {
                //kill player
                player.setVolume(0);
                player.pause();
                document.querySelector("#vimeo_fullscreen").remove();
            }
        })
    }

    loadPage(pathname) {

        var play_btns = document.querySelectorAll(".play_btn");
        for (let i = 0; i < play_btns.length; i++) {
            play_btns[i].addEventListener("click", () => {
                this.play_video(play_btns[i].getAttribute("data-id"), play_btns[i].getAttribute("data-name"));
            });
        }
        const tl = new TimelineLite();
        // console.log("LOAD");

        //Contacts

        //open contacts
        var open_cont = document.querySelector("#contacts_menu");
        open_cont.addEventListener("click", () => {
            gsap.to(".contacts", 0.5, {
                yPercent: -110
            });
        });

        //close contacts
        var close_cont = document.querySelector("#contact_close");
        close_cont.addEventListener("click", () => {
            gsap.to(".contacts", 0.5, {
                yPercent: 0
            });
        });


        // GALERY
        if (pathname === "/gallery.html" || pathname === "/commercial.html" || pathname === "/live.html") {
            // console.log("this is gallery - END");

            //adding transition context to works
            var works = document.querySelectorAll(".work_in_gallery");
            works.forEach((work) => {
                work.setAttribute("data-transition", "down");

            })
            // console.log(works);
            //animating works scroll

            //add eventlistener s
            var arrows = document.querySelectorAll(".arrow");
            var works_grid = document.querySelector(".gallery_grid");

            // console.log(arrows);
            arrows.forEach((arrow) => {
                if (arrow.classList.contains("left")) {
                    // console.log("this is left arrow");
                    arrow.addEventListener("click", () => {
                        console.log("you clicked left arrow");
                        gsap.from(works_grid, 1, {
                            xPercent: "-=25.6",
                            ease: "power3.inOut",
                            clearProps: "xPercent",
                            onStart: () => {
                                var node_list = [];
                                for (let i = 2; i > 0; i--) {
                                    var new_work = works[works.length - (i)].cloneNode(true)
                                    works_grid.insertBefore(new_work, works[0]);
                                    node_list.push(new_work);
                                }

                                var update_links_event = new CustomEvent("update-links", {
                                    detail: {
                                        nodes: node_list
                                    }
                                });
                                document.dispatchEvent(update_links_event);

                            },
                            onComplete: () => {
                                for (let i = 2; i > 0; i--) {
                                    works[works.length - (i)].remove();
                                }
                                works = document.querySelectorAll(".work_in_gallery");
                                console.log(works);

                            }
                        });


                    });
                }
                if (arrow.classList.contains("right")) {
                    // console.log("this is right arrow");
                    arrow.addEventListener("click", () => {
                        console.log("you clicked right arrow");

                        gsap.to(works_grid, 1, {
                            xPercent: "-=25.6",
                            ease: "power3.inOut",
                            clearProps: "xPercent",
                            onStart:()=>{
                                 var node_list = [];
                                 for (let i = 0; i < 2; i++) {
                                     var new_work = works[i].cloneNode(true)
                                     works_grid.appendChild(new_work);
                                     node_list.push(new_work);

                                 }

                                 var update_links_event = new CustomEvent("update-links", {
                                     detail: {
                                         nodes: node_list
                                     }
                                 });
                                 document.dispatchEvent(update_links_event);
                            },
                            onComplete: () => {
                                for (let i = 0; i < 2; i++) {
                                    works[i].remove();
                                }
                                works = document.querySelectorAll(".work_in_gallery");
                                console.log(works);

                            }

                        });

                    });
                }
            });
            //move container

            //check the edge




            var imgs = document.querySelectorAll(".gallery_img");
            imgs.forEach((img) => {
                img.style.transform = "scale(0.2)";
            })
            tl.fromTo(".gallery_img", 1, {
                opacity: 0,
                scale: 0.2
            }, {
                opacity: 1,

                scale: 1,
                ease:"power2.inOut",
                clearProps: "scale"
            });
            var imgs = document.querySelectorAll(".gallery_img");
            imgs.forEach((img) => {
                img.className += " transition05";
            });
        }
        //INDEX
        if (pathname === "/index.html" || pathname === "/") {
            var logo = document.querySelector(".main_logo");
            // console.log("this is Index - END");
            tl.fromTo(logo.children, 0.5, {
                    opacity: 0,
                    x: '+=500',
                    // y: -40
                }, {
                    opacity: 1,
                    x: '-=500',
                    // y: 0,
                    stagger: 0.1
                })
                .fromTo(".play_btn", 0.7, {
                        scale: 0.4,
                        ease: 'power2.out',
                        opacity: 0
                    }, {
                        scale: 1,
                        opacity: 1
                    },
                    "-=1");
        }

        //WORK
        if (pathname === "/work.html") {
            var div2 = document.querySelector(".back_names div");
            var div = document.querySelector(".back_names");

            var span = div2.children[0];
            // console.log(window.getComputedStyle(span));
            var sp_width = span.offsetWidth;
            var sp_height = span.offsetHeight;

            var doc_w = window.innerWidth;
            var doc_h = window.innerHeight;
            var num_rows = Math.floor(doc_h * 0.7 / sp_height);
            var num_cols = Math.floor(doc_w / sp_width);
            if ((sp_width * num_cols) > doc_w) {
                num_cols--;
            }

            // console.log(num_cols, num_rows, sp_width, sp_height, doc_w, doc_h);
            for (let i = 0; i < num_rows; i++) {
                var new_div = document.createElement("div");
                div.appendChild(new_div);
                console.log("break");
                for (let j = 0; j < num_cols; j++) {
                    var new_span = document.createElement("span");
                    new_span.innerHTML = span.innerHTML;
                    new_div.appendChild(new_span);
                }

            }
            span.remove();
            div2.remove();
            gsap.to(div, 1, {
                opacity: 0.3
            });

            var buttons = document.querySelectorAll("button");
            buttons.forEach((button) => {
                button.addEventListener("click", () => {
                    buttons.forEach((button) => {
                        if (button.classList.contains("active_btn")) {
                            button.classList.remove("active_btn");
                        }
                    })
                    button.classList.add("active_btn");
                    var info = button.parentNode.parentNode;
                    // console.log(info);
                    var slides = info.children;
                    var active_slide;
                    slides.forEach((slide) => {
                        if (slide.classList.contains("active_slide")) {
                            active_slide = slide;
                        }
                    })
                    switch (button.innerText) {
                        case "BACKSTAGE":
                            if (active_slide != slides[2]) {
                                slides[2].classList.add("active_slide")
                                gsap.to(active_slide, 0.5, {
                                    xPercent: -50,
                                    opacity: 0
                                });
                                gsap.fromTo(slides[2], 0.5, {
                                    xPercent: 50,
                                    opacity: 0
                                }, {
                                    xPercent: 0,
                                    opacity: 1
                                });
                                active_slide.classList.remove("active_slide");
                            }
                            break;
                        case "ABOUT":
                            if (active_slide != slides[1]) {
                                slides[1].classList.add("active_slide")
                                gsap.to(active_slide, 0.5, {
                                    xPercent: -50,
                                    opacity: 0
                                });
                                gsap.fromTo(slides[1], 0.5, {
                                    xPercent: 50,
                                    opacity: 0
                                }, {
                                    xPercent: 0,
                                    opacity: 1
                                });
                                active_slide.classList.remove("active_slide");
                            }
                            break;
                        case "CREDITS":
                            if (active_slide != slides[3]) {
                                slides[3].classList.add("active_slide")
                                gsap.to(active_slide, 0.5, {
                                    xPercent: -50,
                                    opacity: 0
                                });
                                gsap.fromTo(slides[3], 0.5, {
                                    xPercent: 50,
                                    opacity: 0
                                }, {
                                    xPercent: 0,
                                    opacity: 1
                                });
                                active_slide.classList.remove("active_slide");
                            }
                            break;
                        default:
                            break;
                    }
                    // console.log(slides);
                });

            })

        }


        //ABOUT
        if (pathname === "/about.html") {
            //clicks on team members

            //add eventlistener
            var team=document.querySelectorAll(".team_member");
            // console.log(team);

            var team_div = document.querySelectorAll(".team_member div");
            team_div.forEach((member) => {
                member.addEventListener("mouseover", () => {
                    gsap.to(member, 0.2, {
                        scale: 1.1
                    });
                });
                member.addEventListener("mouseout", () => {
                    gsap.to(member, 0.2, {
                        scale: 1
                    });
                })});
            //hovering members
            team.forEach((member)=>{
               
                // console.log(member);
                var id=member.id;
                member.addEventListener("click", ()=>{
                    console.log(id);
                    var tl = new TimelineLite;
                    //create close btn
                    var draw = new SVG().addTo("#team_container").size(70, 70);
                    draw.line(0, 0, 30, 30).move(10, 10);
                    draw.line(0, 30, 30, 0).move(10, 10);
                    draw.addClass("close_btn");
                    draw.opacity(0);
                    draw.stroke({
                        width: 3,
                        color: '#FFF',
                    });
                    gsap.to(".close_btn", 1, {
                        yPercent: 120,
                        opacity:1,
                        cursor:"pointer"
                    });
                    draw.click(() => {
                        tl.reverse();
                        gsap.to(".close_btn", 1, {
                            yPercent: 0,
                            opacity:0,
                            onComplete: ()=>{document.querySelector(".close_btn").remove();}
                        });
                    });
                    switch(id){
                        case("pavel"):{
                            tl.to(".cover_container img", 1, {
                                // yPercent: 0,
                                scale: 1.5,
                                onComplete: console.log("scaled to pasha")
                            },0)
                            .to(".team_member:not(#"+id+")",1,{
                                opacity: 0,
                                onComplete: console.log("hide others")
                                
                            },0)
                            .to("#"+id+" div",0.5,{
                                xPercent: 50,
                                onComplete: console.log("moved pasha")
                            },1)
                                .to("#" + id,0.1,{

                                pointerEvents: "none",
                            },0)
                                .to("#" + id +" p",0.5,{
                                display:"block",
                                xPercent:-20,
                                opacity:1
                            },1);

                            break;
                        }
                        case("gregory"):{
                            tl.to(".cover_container img", 1, {
                                xPercent:20,
                                yPercent:-20,
                                scale: 1.5,
                                onComplete: console.log("scaled to pasha")
                            }, 0)
                                .to(".team_member:not(#" + id + ")", 1, {
                                    opacity: 0,
                                    onComplete: console.log("hide others")

                                }, 0)
                                .to("#" + id + " div", 0.5, {
                                    yPercent: 150,
                                    onComplete: console.log("moved pasha")
                                }, 1)
                                .to("#" + id, 0.1, {

                                    pointerEvents: "none",
                                }, 0)
                                .to("#" + id + " p", 0.5, {
                                    display: "block",
                                    yPercent: -150,
                                    opacity: 1
                                }, 1);
                            break;
                        }
                        case("vladimir"):{
                            tl.to(".cover_container img", 1, {
                                xPercent: -20,
                                yPercent: -20,
                                scale: 1.5,
                                onComplete: console.log("scaled to pasha")
                            }, 0)
                                .to(".team_member:not(#" + id + ")", 1, {
                                    opacity: 0,
                                    onComplete: console.log("hide others")

                                }, 0)
                                .to("#" + id + " div", 0.5, {
                                    yPercent: -150,
                                    onComplete: console.log("moved pasha")
                                }, 1)
                                .to("#" + id, 0.1, {

                                    pointerEvents: "none",
                                }, 0)
                                .to("#" + id + " p", 0.5, {
                                    display: "block",
                                    xPercent: -100,
                                    opacity: 1
                                }, 1)
                                .to(".cover_container::after",1,{
                                    opacity:0.5
                                },0);
                            break;
                        }
                        default:break;
                    }
                });
            });
            //hide others
            //show gradinet
            //show additional text

            // console.log("About page");
            var clients_btn = document.querySelector("#clients_btn");
            clients_btn.addEventListener("click", () => {
                //hide team
                gsap.to(".team_member", 1, {
                    opacity: 0,
                    yPercent: -100,
                    pointerEvents: 'none'
                });
                gsap.to(clients_btn, 1, {
                    opacity: 0,
                    yPercent: -100,
                    pointerEvents: 'none'
                });
                gsap.to(".cover_container img", 1, {
                    yPercent: -10,
                    scale: 1.25
                });
                //create close or nav btn
                var team_btn = document.createElement("h4");
                var link = document.createElement("a");
                link.innerHTML = "Команда";
                team_btn.style.opacity = 0;
                team_btn.appendChild(link);
                team_btn.id = "team_btn";
                gsap.fromTo(team_btn, 1, {
                    opacity: 0,
                    yPercent: 200
                }, {
                    opacity: 1,
                    yPercent: 0,
                    onComplete:console.log("created team btn")
                });
                team_btn.addEventListener("click", () => {
                    //show team
                    gsap.to(".team_member", 1, {
                        opacity: 1,
                        yPercent: 0,
                        pointerEvents: 'auto',
                        clearProps: "transform",
                            onComplete: console.log("showed team members")
                    });
                    gsap.to(clients_btn, 1, {
                        opacity: 1,
                        yPercent: 0,
                        pointerEvents: 'auto',
                        onComplete: console.log("showed clients btn")
                    });
                    gsap.to(".cover_container img", 1, {
                        yPercent: 0,
                        scale: 1,
                        onComplete: console.log("scale of cover restored")
                    });

                    //hide clients
                    gsap.to(".clients_container", 1, {
                        opacity: 0,
                        yPercent: 20,
                        onComplete: console.log("clients container hiden")
                    });
                    gsap.to(team_btn, 1, {
                        opacity: 0,
                        yPercent: 200,
                        onComplete: () => {
                            team_btn.remove();
                            console.log("team btn hidden and killed");
                        }
                    });

                });
                document.querySelector("section").appendChild(team_btn);

                //show clients
                gsap.to(".clients_container", 1, {
                    opacity: 1,
                    yPercent: -100
                });
            });
        }

        //uncomment for multi directional slides
        this.updateDirections(pathname);
        return true;
    }

    hidePage(pathname) {
        //
        //Gallery
        // console.log("HIDE");
        if (pathname === "/gallery.html" || pathname === "/commercial.html" || pathname === "/live.html") {
            gsap.to(".gallery_img", 0.1, {
                opacity: 0
            });
        }
        //
        //Index

        if (pathname === "/index.html") {
            var logo = document.querySelector(".main_logo");
            gsap.to(logo.children, 0.01, {
                opacity: 0
            });
            gsap.to(".play_btn", 0.01, {
                opacity: 0
            });
        }

    }
    updateDirections(pathname) {
        // console.log("Updating direction for ", pathname);
        //const arr=['/index.html','galery.html','/commercial.html','/live.html'];

        //Getting all links array
        var all_links = document.querySelectorAll('nav a');

        //Finding active nav 
        var active_nav;
        for (var i = 0; i < all_links.length; i++) {
            if (all_links[i].className === "active") {
                active_nav = all_links[i].parentNode.parentNode.parentNode;
                // console.log("Active nav is ", active_nav.className);
            }
        }
        // console.log("nav." + nav.className);

        //Getting links of active nav
        var links = document.querySelectorAll("nav." + active_nav.className + " a");

        //Finding active link id
        var active_id;
        // console.log(links);
        for (var i = 0; i < links.length; i++) {
            if (links[i].className === "active") {
                active_id = i;
                // console.log("Active id is ", active_id);
            }
        }
        //setting left or right for active nav
        for (var i = 0; i < links.length; i++) {
            if (i < active_id) {
                links[i].setAttribute("data-transition", "right");
            }
            if (i > active_id) {
                links[i].setAttribute("data-transition", "left");
            }
        }

        //Finding inactive nav
        var inactive_nav_id;
        var inactive_nav_direction;
        const all_navs = document.querySelectorAll("nav");
        for (var i = 0; i < all_navs.length; i++) {
            if (all_navs[i].className != active_nav.className) {
                if (all_navs[i].className === "top_nav") {
                    inactive_nav_id = i;
                    inactive_nav_direction = "up";
                }
                if (all_navs[i].className === "bottom_nav") {
                    inactive_nav_id = i;
                    inactive_nav_direction = "down";
                }
            }

        }

        //Getting inactive nav links
        var inactive_nav_links = document.querySelectorAll("nav." + all_navs[inactive_nav_id].className + " a");
        //Setting up or down fot inactive menu
        for (var i = 0; i < inactive_nav_links.length; i++) {
            inactive_nav_links[i].setAttribute("data-transition", inactive_nav_direction);
        }
    }
}
export default PageLoader;