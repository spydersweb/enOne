"use strict";

const Container = require("./container.js");
const CardClass = require("../stylie/cardclass.js");

export default class Title extends Container {

    constructor(child) {
        super();
        this.setTypes(['String', 'Bold']);

        if (!this.safeType(child))
            throw new Error(`${this.constructor.name} can't have child of type ${child.constructor.name}`);

        this.child = child;
    }

    toHtml() {

        return `
            <h5 class="${CardClass[this.constructor.name]}">
                ${this.child.constructor.name === 'Anchor' ? this.child.toHtml() : this.child}
            </h5>
        `;
    }

}