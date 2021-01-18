"use strict";

const Container = require("./container.js");

export default class Bold extends Container {

    constructor(text) {
        super();
        this.setTypes(['String']);

        if (!this.safeType(text))
            throw new Error(`${this.constructor.name} can't have child of type ${text.constructor.name}`);

        this.text = text;
    }

    toHtml() {

        return `
            <b>${this.text}</b>
        `;
    }

}