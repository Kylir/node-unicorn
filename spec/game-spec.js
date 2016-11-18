/* jshint undef: true, node: true, esnext: true, eqeqeq: true */
/* global jasmine, describe, it, expect, spyOn, beforeEach, afterEach */

'use strict';

var game = require('../lib/rubicorn/game');

describe('The game module', function() {

    // We want to generate a random grid using 

    describe('The color matrix', function () {

        it('should have some red stuff', function() {
            expect(game.colors.R).toEqual(0xff0000);
        });
    });
});