import gsap from 'gsap'
import {
    TimelineLite
} from 'gsap'
import {
    SVG
} from "@svgdotjs/svg.js"
import Player from "@vimeo/player";
import Parallax from "parallax-js";


class PageLoader {
    play_video(id, name) {
        // console.log("PLay_video function running");
        // console.log(id);
        //hide menu
        gsap.to(".top_nav", 1, {
            yPercent: -120,
                display: "none"
        });
        gsap.to(".header_logo", 1, {
            yPercent: -120,
                display: "none"
        });
        gsap.to(".bottom_nav", 1, {
            yPercent: 120,
                display: "none"
        });
        gsap.to(".social_nav", 1, {
            yPercent: 120,
            display:"none"
        });
        //hide page
        gsap.to("section", 1, {
            opacity: 0,
                display: "none"
        });

        //add and show close btn 
        var draw = new SVG().addTo("body").size(50, 50);
        draw.line(0, 0, 20, 20).move(5, 5);
        draw.line(0, 20, 20, 0).move(5, 5);
        draw.addClass("close_btn");
        draw.stroke({
            width: 3,
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
        // var h1 = document.createElement("h1");
        // h1.innerHTML = name;

        //draw custom controls
        // var draw_controls=SVG().addTo(player_div).size(40,40);
        // var line = draw_controls.line(0,0,0,10).stroke({width:10,color:"#FFF"});
        // var line = draw_controls.line(10,0,10,10).stroke({width:10,color:"#FFF"}).move(20,0);
        // line.style.cssText="position:absolute";


        // player_div.appendChild(h1);
        document.querySelector("body").appendChild(player_div);
        var width = document.documentElement.clientWidth;
        var height = document.documentElement.clientHeight;
        // height -= h1.offsetHeight;
        var vimeo_options = {
            id: id,
            width: width,
            height: height,
            autoplay: true,
            color: "F8BA01",
            controls: true

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
            yPercent: 0,
                display: "block"
        });
        gsap.to(".header_logo", 1, {
            yPercent: 0,
                display: "block"
        });
        gsap.to(".bottom_nav", 1, {
            yPercent: 0,
                display: "block"
        });
        gsap.to(".social_nav", 1, {
            yPercent: 0,
                display: "block"
        });

        //show page
        gsap.to("section", 1, {
            opacity: 1,
                display: "block"
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
            tl.fromTo(".contacts", 0.5, {
                display: "flex",
                yPercent: 110
            },{
                display: "flex",
                yPercent: 0
            });
        });

        //close contacts
        var close_cont = document.querySelector("#contact_close");
        close_cont.addEventListener("click", () => {
            tl.to(".contacts", 0.5, {
                yPercent: 110,
                display: "none"
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
                        tl.from(works_grid, 1, {
                            xPercent: "-=25.6",
                            ease: "power3.inOut",
                            clearProps: "xPercent",
                            onStart: () => {
                                var node_list = [];
                                for (let i = 2; i > 0; i--) {
                                    var new_work = works[works.length - (i)].cloneNode(true)
                                    works_grid.insertBefore(new_work, works[0]);
                                    node_list.push(new_work);
                                    arrow.style.pointerEvents = "none";
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
                                arrow.style.pointerEvents = "auto";

                            }
                        });


                    });
                }
                if (arrow.classList.contains("right")) {
                    // console.log("this is right arrow");
                    arrow.addEventListener("click", () => {
                        console.log("you clicked right arrow");

                        tl.to(works_grid, 1, {
                            xPercent: "-=25.6",
                            ease: "power3.inOut",
                            clearProps: "xPercent",

                            onStart: () => {
                                var node_list = [];
                                for (let i = 0; i < 2; i++) {
                                    var new_work = works[i].cloneNode(true)
                                    works_grid.appendChild(new_work);
                                    node_list.push(new_work);
                                    arrow.style.pointerEvents = "none";

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
                                arrow.style.pointerEvents = "auto";


                            }

                        });

                    });
                }
            });

            //animation of images appearance

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
                ease: "power2.inOut",
                clearProps: "scale"
            });

            if (pathname === "/commercial.html") {
                this.backnames(tl);
            }
            // var imgs = document.querySelectorAll(".gallery_img");
            // // imgs.forEach((img) => {
            // //     // img.className += " transition05";
            // // });
        }

        //INDEX
        if (pathname === "/index.html" || pathname === "/") {

            //animate play_btn hover
            var pl_btn = document.querySelector(".play_btn");
            pl_btn.addEventListener("mouseover", () => {
                gsap.to(pl_btn, 0.2, {
                    scale: 1.1
                });
            });
            pl_btn.addEventListener("mouseout", () => {
                gsap.to(pl_btn, 0.2, {
                    scale: 1
                });
            });

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
                }, 0.5)
                .fromTo(".play_btn", 0.7, {
                        scale: 0.4,
                        ease: 'power2.out',
                        opacity: 0
                    }, {
                        scale: 1,
                        opacity: 1
                    },
                    0.5)
                .fromTo(".cover img:not(#dont_move)", 1, {
                    yPercent: 50,
                    opacity: 0
                }, {
                    yPercent: 0,
                    opacity: 1,
                    stagger: 0.1,
                    onComplete: () => {
                        console.log("init parralax");
                        var scene = document.querySelector(".cover");
                        var parallax = new Parallax(scene);
                    }
                }, 0);
        }

        //WORK
        if (pathname === "/work.html") {

            this.backnames(tl);
            
            gsap.to(".play_btn", 0.5, {
                opacity: 1
            });
            gsap.to(".work h1", 1, {
                opacity: 1
            });

            //Create work HOVER animation
            var work=document.querySelector("section .work");
            const tlH=new TimelineLite({paused:true});
            tlH.to("section .work .work_cover img", 0.5, {
                    scale: 1.3
                }, 0)
                .to("section .work .work_cover .overlay", 0.5, {
                    backgroundColor: "rgba(0,0,0,0.1)"
                }, 0)
                .to("section .work .artist", 0.5, {
                    color: "transparent",
                    webkitTextStroke: "1.5px #EEEEEE",
                    yPercent: -150
                }, 0)
                .to("section .work .project", 0.5, {
                    color: "transparent",
                    webkitTextStroke: "1.5px #EEEEEE",
                    yPercent: 150
                }, 0)
                .to("section .work .play_btn", 0.5, {
                    fill: "white",
                    stroke: "none"
                }, 0);
            work.addEventListener("mouseover",()=>{
                tlH.play();
            });
            work.addEventListener("mouseout", () => {
                tlH.reverse();
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
            var team = document.querySelectorAll(".team_member");
            // console.log(team);

            var team_div = document.querySelectorAll(".team_member div");
            team_div.forEach((member_div) => {
                member_div.addEventListener("mouseover", () => {
                    gsap.to(member_div, 0.2, {
                        scale: 1.1
                    });
                });
                member_div.addEventListener("mouseout", () => {
                    gsap.to(member_div, 0.2, {
                        scale: 1
                    });
                })
            });
            //hovering members
            team.forEach((member) => {

                // console.log(member);
                var id = member.id;
                member.addEventListener("click", () => {
                    // console.log(id);
                    var tl = new TimelineLite;
                    //create close btn
                    var draw = new SVG().addTo("#team_container").size(50, 50);
                    draw.line(0, 0, 20, 20).move(5, 5);
                    draw.line(0, 20, 20, 0).move(5, 5);
                    draw.addClass("close_btn");
                    draw.opacity(0);
                    draw.stroke({
                        width: 3,
                        color: '#FFF',
                    });
                    gsap.to(".close_btn", 1, {
                        yPercent: 100,
                        opacity: 1,
                        cursor: "pointer"
                    });
                    tl.to(clients_btn, 1, {
                        opacity: 0,
                        pointerEvents: "none"
                    }, 0);
                    draw.click(() => {
                        tl.reverse();
                        gsap.to(".close_btn", 1, {
                            yPercent: 0,
                            opacity: 0,
                            onComplete: () => {
                                document.querySelector(".close_btn").remove();
                            }
                        });
                    });

                    //get data-move coordinates for member and paragraph
                    // member x and y
                    // cover x and y
                    // p x and y
                  
                    
                    switch (id) {
                        case ("pavel"): {
                            tl.to(".cover_container img", 1, {
                                    yPercent: member.dataset.coverY,
                                    xPercent: member.dataset.coverX,
                                    scale: 1.5,
                                    // onComplete: console.log("scaled to pasha")
                                }, 0)
                                .to(".team_member:not(#" + id + ")", 1, {
                                    opacity: 0,
                                    // onComplete: console.log("hide others")

                                }, 0)
                                .to("#" + id + " div", 0.5, {
                                    xPercent: member.dataset.memberX,
                                    yPercent: member.dataset.memberY,
                                    // onComplete: console.log("moved pasha")
                                }, 1)
                                .to("#" + id, 0.1, {

                                    pointerEvents: "none",
                                }, 0)
                                .to("#" + id + " p", 0.5, {
                                    display: "block",
                                    xPercent: member.dataset.pX,
                                    yPercent: member.dataset.pY,
                                    opacity: 1
                                }, 1);

                            break;
                        }
                        case ("gregory"): {
                            tl.to(".cover_container img", 1, {
                                    yPercent: member.dataset.coverY,
                                    xPercent: member.dataset.coverX,
                                    scale: 1.5,
                                    // onComplete: console.log("scaled to pasha")
                                }, 0)
                                .to(".team_member:not(#" + id + ")", 1, {
                                    opacity: 0,
                                    // onComplete: console.log("hide others")

                                }, 0)
                                .to("#" + id + " div", 0.5, {
                                    xPercent: member.dataset.memberX,
                                    yPercent: member.dataset.memberY,
                                    // onComplete: console.log("moved pasha")
                                }, 1)
                                .to("#" + id, 0.1, {

                                    pointerEvents: "none",
                                }, 0)
                                .to("#" + id + " p", 0.5, {
                                    display: "block",
                                    xPercent: member.dataset.pX,
                                    yPercent: member.dataset.pY,
                                    opacity: 1
                                }, 1);
                            break;
                        }
                        case ("vladimir"): {
                            tl.to(".cover_container img", 1, {
                                yPercent: member.dataset.coverY,
                                xPercent: member.dataset.coverX,
                                scale: 1.5,
                                // onComplete: console.log("scaled to pasha")
                            }, 0)
                            .to(".team_member:not(#" + id + ")", 1, {
                                opacity: 0,
                                // onComplete: console.log("hide others")

                            }, 0)
                            .to("#" + id + " div", 0.5, {
                                xPercent: member.dataset.memberX,
                                yPercent: member.dataset.memberY,
                                // onComplete: console.log("moved pasha")
                            }, 1)
                            .to("#" + id, 0.1, {

                                pointerEvents: "none",
                            }, 0)
                            .to("#" + id + " p", 0.5, {
                                display: "block",
                                xPercent: member.dataset.pX,
                                yPercent: member.dataset.pY,
                                opacity: 1
                            }, 1);
                            break;
                        }
                        default:
                            break;
                    }
                });
            });
            //hide others
            //show gradinet
            //show additional text

            // console.log("About page");
            var clients_btn = document.querySelector("#clients_btn");
            clients_btn.addEventListener("click", () => {
                //darken overlay
                var darken = document.createElement("div");
                darken.style.width = "100%";
                darken.style.height = "100%";
                darken.style.backgroundColor = "#000";
                darken.style.opacity = 0;
                darken.style.position = "absolute";
                darken.style.zIndex = "2";
                darken.id = "darken";
                var cover = document.querySelector(".cover_container");
                cover.appendChild(darken);
                gsap.to(darken, 1, {
                    opacity: 0.7
                });



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
                // svg
                var team_btn = new SVG().addTo(".cover_container").size(50, 50);
                team_btn.line(0, 0, 20, 20).move(5, 5);
                team_btn.line(0, 20, 20, 0).move(5, 5);
                team_btn.addClass("close_btn");
                team_btn.opacity(0);
                team_btn.css("z-index","10");
                team_btn.stroke({
                    width: 3,
                    color: '#FFF',
                });
                gsap.to(".close_btn", 1, {
                    yPercent: 100,
                    opacity: 1,
                    cursor: "pointer"
                });
                // 


                // var team_btn = document.createElement("h4");
                // var link = document.createElement("a");
                // link.innerHTML = "Х";
                // team_btn.style.opacity = 0;
                // team_btn.appendChild(link);
                // team_btn.id = "team_btn";
                // gsap.fromTo(team_btn, 1, {
                //     opacity: 0,
                //     yPercent: 200
                // }, {
                //     opacity: 1,
                //     yPercent: 0,
                //     onComplete: console.log("created team btn")
                // });
                team_btn.click(() => {
                    //show team
                    gsap.to(".team_member", 1, {
                        opacity: 1,
                        yPercent: 0,
                        pointerEvents: 'auto',
                        clearProps: "transform",
                        // onComplete: console.log("showed team members")
                    });
                    gsap.to(clients_btn, 1, {
                        opacity: 1,
                        yPercent: 0,
                        pointerEvents: 'auto',
                        // onComplete: console.log("showed clients btn")
                    });
                    gsap.to(".cover_container img", 1, {
                        yPercent: 0,
                        scale: 1,
                        // onComplete: console.log("scale of cover restored")
                    });

                    //hide clients
                    gsap.to(".clients_container", 1, {
                        opacity: 0,
                        yPercent: 20,
                        onComplete: darken.remove()
                    });
                    gsap.to(".close_btn", 1, {
                        opacity: 0,
                        yPercent: -100,
                        onComplete: () => {
                            team_btn.remove();
                            // console.log("team btn hidden and killed");
                        }
                    });



                });
                // document.querySelector("section").appendChild(team_btn);

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
            gsap.to(".gallery_img", 0.5, {
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
            var cover_imgs = document.querySelectorAll(".cover img:not(#dont_move)");

            cover_imgs.forEach(element => {
                console.log("setting up opacity");
                element.style.opacity = 0;

            });
        }

    }
    updateDirections(pathname) {
        // console.log("Updating direction for ", pathname);
        //const arr=['/index.html','galery.html','/commercial.html','/live.html'];

        //Getting all links array
        var all_links = document.querySelectorAll('nav a');
        if (pathname == "/work.html") {
            all_links.forEach((link) => {
                if (link.parentElement.parentElement.parentElement.className == "top_nav") {
                    link.setAttribute("data-transition", "up");
                }
                if (link.parentElement.parentElement.parentElement.className == "bottom_nav") {
                    link.setAttribute("data-transition", "down");
                }
            });
            return true;
        }
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
    backnames(tl){
        //start of filling backnames
        var div2_names = document.querySelector(".back_names div");
        var div_names = document.querySelector(".back_names");

        var span = div2_names.children[0];
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
            div_names.appendChild(new_div);
            // console.log("break");
            for (let j = 0; j < num_cols; j++) {
                var new_span = document.createElement("span");
                new_span.innerHTML = span.innerHTML;
                new_div.appendChild(new_span);
            }

        }
        span.remove();
        div2_names.remove();
        tl.to(div_names, 1, {
            opacity: 0.3
        });
        //end of filling backnames
    }
}
export default PageLoader;