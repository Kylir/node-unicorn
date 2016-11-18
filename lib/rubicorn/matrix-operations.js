/* jshint undef: true, node: true, esnext: true, eqeqeq: true */
'use strict';

/**
 * A bunch of functions to manipulate a matrix.
 */

module.exports = {

    /**
     * Shift to the left a given line
     * @param  {integer} lineIndex the line number
     * @param  {Array of Arrays} matrix    [description]
     * @return {[type]}           [description]
     */
    left: function (lineIndex, matrix) {
        let line = matrix[lineIndex];
        line.push(line.shift());
        return matrix;
    },

    /**
     * Shift to the right a given line
     * @param  {integer} lineIndex the line number
     * @param  {Array of Arrays} matrix    [description]
     * @return {[type]}           [description]
     */
    right: function (lineIndex, matrix) {
        let line = matrix[lineIndex];
        line.unshift(line.pop());
        return matrix;
    },
    
    /**
     * Function to shift one column up.
     * 
     * @param  {integer} col The column to shift up. Starts at 0.
     * @param  {Array of Arrays} matrix The matrix to work on.
     * @return {Array of Arrays} the new matrix with shifted column 
     */
    up: function (col, matrix) {
        let l = matrix.length;
        
        // save the value of the first line
        let firstValue = matrix[0][col];

        // for each line, starting at the second one
        // assign the value of the line below
        for (let i=0; i<(l-1); i++) {
            matrix[i][col] = matrix[i+1][col];
        }

        //Finally the last line takes the value of the first one
        matrix[l-1][col] = firstValue;

        return matrix;
    },

    /**
     * Function to shift one column down.
     * 
     * @param  {integer} col The column to shift down. Starts at 0.
     * @param  {Array of Arrays} matrix The matrix to work on.
     * @return {Array of Arrays} the new matrix with shifted column 
     */
    down: function (col, matrix) {
        let l = matrix.length;
        
        // save the value of the first line
        let lastValue = matrix[l-1][col];

        // for each line, starting at the last one
        // assign the value of the line above
        for (let i=(l-1); i>0; i--) {
            matrix[i][col] = matrix[i-1][col];
        }

        //Finally the first takes the value of the last one
        matrix[0][col] = lastValue;

        return matrix;
    },

    /**
     * Transform an array of arrays of values into an array of values.
     * [ [a,b], [c,d], [e,f] ] -> [a,b,c,d,e,f]
     * @param  {Array of Arrays} matrix the matrix of values
     * @return {[type]} The array of values
     */
    flatten: function (matrix) {
        return [].concat.apply([], matrix);
    },

    /**
     * Apply a series of moves to a given matrix.
     * A move is an array of 2 elements:
     * - a one letter code for the direction (L, R, U or D)
     * - an integer for the index of the column or line.
     * 
     * @param  {Array of moves} listOfMoves For instance [ ['L',1], ['U',3]] for Left line 1 then up col 3.
     * @param  {Array of Arrays} matrix the matrix to apply the moves on.
     * @return {Array of Arrays} the modified matrix.
     */
    applyMoves: function (listOfMoves, matrix) {
        for (let i=0; i<listOfMoves.length; i++) {
            let move = listOfMoves[i][0];
            let index = listOfMoves[i][1];
            switch (move) {
                case 'L':
                    this.left(index, matrix);
                    break;
                case 'R':
                    this.right(index, matrix);
                    break;
                case 'U':
                    this.up(index, matrix);
                    break;
                case 'D':
                    this.down(index, matrix);
                    break;
                default:
                    break;
            }
        }
        return matrix;
    }
};