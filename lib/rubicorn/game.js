/* jshint undef: true, node: true, esnext: true, eqeqeq: true */
'use strict';

let matops = require('./matrix-operations');

module.exports = {

    // Seven predefined colors
    colors: {
        R: 0xff0000,
        G: 0x00ff00,
        B: 0x0000ff,
        Y: 0xffff00,
        C: 0x00ffff,
        M: 0xff00ff,
        W: 0xffffff
    },

    areIdentical: (matrix1, matrix2) => {
        let flat1 = matops.flatten(matrix1);
        let flat2 = matops.flatten(matrix2);
        if (flat1.length !== flat2.length) {
            return false;
        } else {
            for (let i=0; i<=flat1.length; i++) {
                if (flat1[i] !== flat2[i]) {
                    return false;
                }
            }
            return true;
        }
    },

    generateGrid: (lines, cols) => {
        let c = module.exports.colors;
        return [[c.R,c.R,c.R,c.R,c.R,c.R,c.R,c.R],
                [c.G,c.G,c.G,c.G,c.G,c.G,c.G,c.G],
                [c.B,c.B,c.B,c.B,c.B,c.B,c.B,c.B],
                [c.Y,c.Y,c.Y,c.Y,c.Y,c.Y,c.Y,c.Y]];
    },

    init: (numberOfLines, numberOfCols) => {
        // We create a new random matrix
        this.originalGrid = module.exports.generateGrid(numberOfLines, numberOfCols);
        // And we clone it using the JSON trick
        this.playerGrid = JSON.parse(JSON.stringify(this.originalGrid));
    },

    getPlayerGrid: () => {
        return matops.flatten(this.playerGrid);
    },

    updatePlayerGrid: (move, num) => {
        this.playerGrid = matops.applyMoves([[move,num]], this.playerGrid);
    }

};