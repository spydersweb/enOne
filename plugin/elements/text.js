"use strict";

import Container from "./container.js";

export default class Text extends Container {

    constructor(text) {
        super();
        this.setTypes(['String', 'Bold']);

        if (!this.safeType(text))
            throw new Error(`${this.constructor.name} can't have child of type ${text.constructor.name}`);

        this.text = text;
    }

    toHtml() {

        return this.text;
    }

}