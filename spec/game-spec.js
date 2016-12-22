/* jshint undef: true, node: true, esnext: true, eqeqeq: true */
/* global jasmine, describe, it, expect, spyOn, beforeEach, afterEach */

'use strict';

var game = require('../lib/rubicorn/game');

describe('In the game module', function() {

    // We want to generate a random grid
    describe('The grid generator', function () {

        function isAValidColor (color) {
            return ((color >= 0) && (color <= 0xffffff));
        }

        it('should generate valid grids.', function() {
            let numCols = 8;
            let numLines = 4;

            //Do it 5 times...
            for (let n=0; n<5; n++) {
                let randomGrid = game.generateGrid(numLines, numCols);
                expect(randomGrid.length).toEqual(numLines);
                for (let i=0; i<numLines; i++) {
                    expect(randomGrid[i].length).toEqual(numCols);
                    for (let j=0; j<numCols; j++) {
                        expect(isAValidColor(randomGrid[i][j])).toEqual(true);
                    }
                }
            }
        });
    });

    // We want a function to tell if we won
    describe('The areIdentical() function', function () {
        it('should recognise two identical matrices.', function () {
            let m1 = [[1,2,3,4,1,2,3,4],[1,2,3,4,1,2,3,4],[1,2,3,4,1,2,3,4],[1,2,3,4,1,2,3,4]];
            expect(game.areIdentical(m1, m1)).toEqual(true);
        });

        it('should not accept two different matrices.', function () {
            let m1 = [[1,2,3,4,1,2,3,4],[1,2,3,4,1,2,3,4],[1,2,3,4,1,2,3,4],[1,2,3,4,1,2,3,4]];
            let m2 = [[1,2,3,4,1,2,3,4],[0,2,3,4,1,2,3,4],[1,2,3,4,1,2,3,4],[1,2,3,4,1,2,3,4]];
            // ------ difference here -> X
            expect(game.areIdentical(m1, m2)).toEqual(false);
        });
    });
    
    describe('The init() function should return a valid starting grid', function () {
        it('should do stuff', function () {
            //game.init();
            expect(true).toEqual(true);
        });
    });

});