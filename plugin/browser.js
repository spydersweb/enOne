const open = require('open');

/**
 * @param {string} filename is HTML file to be opened in the browser
 */
const lanuch = filename => {

    (async() => {
        await open(filename);
    })();

}

module.exports = {
    lanuch: lanuch
};