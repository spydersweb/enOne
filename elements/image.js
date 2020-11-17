"use strict";

const TextualConatiner = require("./containers/textualcontainer");

module.exports = class Image extends TextualConatiner {

    constructor(src, alt) {

        if (!safeType(src))
            throw new Error(`The URL can't be of type ${typeof url}`);

        this.src = src;
        this.alt = alt ? alt : "Card-Image";
    }

    toHtml() {

        return `
            <img src="${src}" class="card-img-top" alt="${alt}" />
        `;
    }

}