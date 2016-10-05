/* jshint undef: true, node: true, esnext: true, eqeqeq: true */
'use strict';



module.exports = {

    /**
     * Shift to the left a given line
     * @param  {integer} lineIndex the line number
     * @param  {Array of Arrays} matrix    [description]
     * @return {[type]}           [description]
     */
    left: function (lineIndex, matrix) {
        var line = matrix[lineIndex];
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
        var line = matrix[lineIndex];
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
        var l = matrix.length;
        
        // save the value of the first line
        var firstValue = matrix[0][col];

        // for each line, starting at the second one
        // assign the value of the line below
        for (var i=0; i<(l-1); i++) {
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
        var l = matrix.length;
        
        // save the value of the first line
        var lastValue = matrix[l-1][col];

        // for each line, starting at the last one
        // assign the value of the line above
        for (var i=(l-1); i>0; i--) {
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

    applyMoves: function (listOfMoves, matrix) {
        for (var i=0; i<listOfMoves.length; i++) {
            var move = listOfMoves[i][0];
            var index = listOfMoves[i][1];
        }
    }

};