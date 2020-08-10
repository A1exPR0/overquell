

export default class filterGen {
    createFilter(where, filter_id = 'my_filter') {
        let prnt = document.querySelector(where);
        let svg = document.createElement("svg");
        let defs = document.createElement("defs");
        let filter = document.createElement("filter");

        filter.setAttribute('id', filter_id);
        filter.setAttribute('filterUnits', 'objectBoundingBox');
        filter.setAttribute('x', '0%');
        filter.setAttribute('y', '0%');
        filter.setAttribute('width', '100%');
        filter.setAttribute('height', '100%');
        defs.appendChild(filter);
        svg.appendChild(defs);
        prnt.appendChild(svg);

        return {
            selector: "#" + filter_id,
            el:filter
        };
    }

    addBlur(filter, stdDeviation, blur_id, result, in_layer) {
        let blur = document.createElement('feGaussianBlur');

        blur.setAttribute("stdDeviation", stdDeviation);
        blur.setAttribute('id', blur_id);
        blur.setAttribute('x', '0%');
        blur.setAttribute('y', '0%');
        blur.setAttribute('result', result);
        blur.setAttribute('in', in_layer);
        blur.setAttribute('edgeMode', 'none');
        filter.appendChild(blur);

        return {
            selector: "#" + blur_id,
            el: blur
        };

    }
}