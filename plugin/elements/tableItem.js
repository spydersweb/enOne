"use strict";

const TextualConatiner = require('./containers/textualcontainer');

module.exports = class TableItem extends TextualConatiner {

    constructor(item) {
        super();

        if (this.safeType(item))
            throw new Error(`The table item can't be of type ${item.constructor.name}`);

        this.item = item;
    }

    getHead(){

        return Object.keys(this.item).map(key => `<th scope="col">${key}</th>`).join(' ');
    }

    toHtml() {

        return `<tr>${Object.values(this.item).map(value => `<td>${value}</td>`).join(' ')}</tr>`;
    }

}