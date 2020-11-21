"use strict";

const Container = require('./containers/container');

// holds title, text, paragraph and achor
module.exports = class Body extends Container {

    constructor() {
        
        super();
    }

    safeType(child) {

        return child.constructor.name == 'Paragraph' ||
            child.constructor.name == 'Anchor' ||
            child.constructor.name == 'Text' ||
            child.constructor.name == 'Title' ||
            child.constructor.name == 'List';
    }

    toHtml() {

        return `
            <div class="card-body">
                ${this.childrenToHtml()}
            </div>
        `;
    }

}