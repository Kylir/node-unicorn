/* jshint undef: true, node: true, esnext: true, eqeqeq: true */
/* global jasmine, describe, it, expect, spyOn, beforeEach, afterEach */

'use strict';

var matrix = require('../lib/rubicorn/matrix-operations');

describe('The matrix module', function() {

    describe('the rotation operations', function () {

        it('should shift correctly a line to the left', function() {
            var initialState = [
                [0,0,0,0,0,0,0,0],
                [1,2,3,4,5,6,7,8],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0]
            ];
            var newState = matrix.left(1, initialState);
            expect(newState[1]).toEqual([2,3,4,5,6,7,8,1]);
        });

        it('should shift correctly a line to the right', function() {
            var initialState = [
                [0,0,0,0,0,0,0,0],
                [1,2,3,4,5,6,7,8],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0]
            ];
            var newState = matrix.right(1, initialState);
            expect(newState[1]).toEqual([8,1,2,3,4,5,6,7]);
        });

        it('should shift correctly a line up', function() {
            var initialState = [
                [0,0,0,1,0,0,0,0],
                [0,0,0,2,0,0,0,0],
                [0,0,0,3,0,0,0,0],
                [0,0,0,4,0,0,0,0]
            ];

            var correctFinalState = [
                [0,0,0,2,0,0,0,0],
                [0,0,0,3,0,0,0,0],
                [0,0,0,4,0,0,0,0],
                [0,0,0,1,0,0,0,0]
            ];

            var newState = matrix.up(3, initialState);
            expect(newState).toEqual(correctFinalState);
        });

        it('should shift correctly a line down', function() {
            var initialState = [
                [0,0,0,1,0,0,0,0],
                [0,0,0,2,0,0,0,0],
                [0,0,0,3,0,0,0,0],
                [0,0,0,4,0,0,0,0]
            ];

            var correctFinalState = [
                [0,0,0,4,0,0,0,0],
                [0,0,0,1,0,0,0,0],
                [0,0,0,2,0,0,0,0],
                [0,0,0,3,0,0,0,0]
            ];

            var newState = matrix.down(3, initialState);
            expect(newState).toEqual(correctFinalState);
        });
    });

    it('should flatten correctly the matrix', function () {
        var initialState = [
            [0,0,0,1,0,0,0,0],
            [0,0,0,2,0,0,0,0],
            [0,0,0,3,0,0,0,0],
            [0,0,0,4,0,0,0,0]
        ];

        var correctFinalState = [0,0,0,1,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,4,0,0,0,0];

        var newState = matrix.flatten(initialState);
        expect(newState).toEqual(correctFinalState);
    });

    it('should apply correctly the list of move(s): [L1]', function () {
        var initialState = [
            [0,0,0,1,0,0,0,0],
            [0,0,0,2,0,0,0,0],
            [0,0,0,3,0,0,0,0],
            [0,0,0,4,0,0,0,0]
        ];

        var correctFinalState = [
            [0,0,0,1,0,0,0,0],
            [0,0,2,0,0,0,0,0],
            [0,0,0,3,0,0,0,0],
            [0,0,0,4,0,0,0,0]
        ];

        var newState = matrix.applyMoves([['L',1]], initialState);
        expect(newState).toEqual(correctFinalState);
    });

    it('should apply correctly a list of move(s): [R2]', function () {
        var initialState = [
            [0,0,0,1,0,0,0,0],
            [0,0,0,2,0,0,0,0],
            [0,0,0,3,0,0,0,0],
            [0,0,0,4,0,0,0,0]
        ];

        var correctFinalState = [
            [0,0,0,1,0,0,0,0],
            [0,0,0,2,0,0,0,0],
            [0,0,0,0,3,0,0,0],
            [0,0,0,4,0,0,0,0]
        ];

        var newState = matrix.applyMoves([['R',2]], initialState);
        expect(newState).toEqual(correctFinalState);
    });

    it('should apply correctly a list of move(s): [U2]', function () {
        var initialState = [
            [0,0,0,0,0,0,0,0],
            [1,2,3,4,5,6,7,8],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0]
        ];

        var correctFinalState = [
            [0,0,3,0,0,0,0,0],
            [1,2,0,4,5,6,7,8],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0]
        ];

        var newState = matrix.applyMoves([['U',2]], initialState);
        expect(newState).toEqual(correctFinalState);
    });

    it('should apply correctly a list of move(s): [D3]', function () {
        var initialState = [
            [0,0,0,0,0,0,0,0],
            [1,2,3,4,5,6,7,8],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0]
        ];

        var correctFinalState = [
            [0,0,0,0,0,0,0,0],
            [1,2,3,0,5,6,7,8],
            [0,0,0,4,0,0,0,0],
            [0,0,0,0,0,0,0,0]
        ];

        var newState = matrix.applyMoves([['D',3]], initialState);
        expect(newState).toEqual(correctFinalState);
    });

    it('should apply correctly a list of move(s): [L1, R2, U3, D4]', function () {
        var initialState = [
            [0,0,0,0,1,0,0,0],
            [1,2,3,4,5,6,7,8],
            [0,0,0,0,2,0,0,0],
            [0,0,0,0,3,0,0,0]
        ];

        var correctFinalState = [
            [0,0,0,5,3,0,0,0],
            [2,3,4,0,1,7,8,1],
            [0,0,0,0,6,2,0,0],
            [0,0,0,0,0,0,0,0]
        ];

        var newState = matrix.applyMoves([['L',1],['R',2],['U',3],['D',4]], initialState);
        expect(newState).toEqual(correctFinalState);
    });


    it('should skip incorrect moves like [L1, Z3, R2, U3, W8, D4] ', function () {
        var initialState = [
            [0,0,0,0,1,0,0,0],
            [1,2,3,4,5,6,7,8],
            [0,0,0,0,2,0,0,0],
            [0,0,0,0,3,0,0,0]
        ];

        var correctFinalState = [
            [0,0,0,5,3,0,0,0],
            [2,3,4,0,1,7,8,1],
            [0,0,0,0,6,2,0,0],
            [0,0,0,0,0,0,0,0]
        ];

        var newState = matrix.applyMoves([['L',1], ['Z',3], ['R',2], ['U',3], ['W',8], ['D',4]], initialState);
        expect(newState).toEqual(correctFinalState);
    });


});