/* jshint undef: true, node: true, esnext: true, eqeqeq: true */
/* global jasmine, describe, it, expect, spyOn, beforeEach, afterEach */

'use strict';

var colorUtils = require('../lib/colors/utils');

describe('In the colors module', function() {

    // We want to generate a random grid
    describe('The generateColorArrayFromValue function', function () {

        it('should generate valid arrays of color for a 8x4 matrix.', function() {
            const numElements = 8*4, 
                  color = 0x123456;
            let array = colorUtils.generateColorArrayFromValue(numElements, color);
            
            // Result must be an array
            expect(Array.isArray(array)).toEqual(true);
            // with the right number of elements
            expect(array.length).toEqual(numElements);
            // and the same color everywhere
            for (let i=0; i<array.length; i++) {
                expect(array[i]).toEqual(color);
            }
        });

    });

    // We want to generate a random grid
    describe('The generateColorArrayFromName function', function () {

        it('should generate valid arrays of color when using a color name.', function() {
            const numElements = 32, 
                  colorName = 'blue',
                  correspondingColorValue = 0x0000ff;
            let array = colorUtils.generateColorArrayFromName(numElements, colorName);
            
            // Result must be an array
            expect(Array.isArray(array)).toEqual(true);
            // with the right number of elements
            expect(array.length).toEqual(numElements);
            // and the same color everywhere
            for (let i=0; i<array.length; i++) {
                expect(array[i]).toEqual(correspondingColorValue);
            }
        });

        it('should generate an array of black when using an unknown color name.', function() {
            const numElements = 32, 
                  colorName = 'this is not a color',
                  correspondingColorValue = 0x000000;
            let array = colorUtils.generateColorArrayFromName(numElements, colorName);
            
            // and the same color everywhere
            for (let i=0; i<array.length; i++) {
                expect(array[i]).toEqual(correspondingColorValue);
            }
        });

    });

});