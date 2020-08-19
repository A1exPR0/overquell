import {
    SVG
} from '@svgdotjs/svg.js';
import Filter from "@svgdotjs/svg.filter.js";



export function create_filter_blur() {

    var draw;
    var filter;
    var blur;
    var filter_id;
    const blur_ammnout=50;
    console.log("createfilter fuct from class");
    draw = SVG().addTo("body").size('100%', '100%');
    // console.log(draw);
    filter = draw.filterWith(function (add) {
        blur = add.gaussianBlur(0);
    });
    // console.log(filter);
    var section = document.querySelectorAll("section");
    // console.log(section);
    filter_id = filter.filterer().id();
    // console.log(filter_id);
    section[0].style.cssText = "filter:url(#" + filter_id + ");";
    section[1].style.cssText = "filter:url(#" + filter_id + ");";
    // console.log(section[0].style.cssText);
    // console.log(section[1].style.cssText);

    return [draw,blur,blur_ammnout];

}