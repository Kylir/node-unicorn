/* jshint undef: true, node: true, esnext: true, eqeqeq: true */

'use strict';

const debug = require('debug')('color-utils');
const colors = require('./constants');

let utils = {

    // generate an array of the same color value.
    generateColorArrayFromValue: (size, colorValue) => {
        let array = new Array(size);
        for (let i=0; i<size; i++) {
            array[i] = colorValue;
        }
        debug('generateColorArrayFromValue: received size ' + size + ' and value ' + colorValue);
        debug('Sending back ', array);
        return array;
    },

    generateColorArrayFromName: (size, colorName) => {
        let colorValue = colors[colorName];
        if (!colorValue) {
            colorValue = 0;
        }
        debug('generateColorArrayFromName: received ' + colorName + ', translating it to value: ' + colorValue);
        return utils.generateColorArrayFromValue(size, colorValue);
    }

};

module.exports = utils;