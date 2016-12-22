/* jshint undef: true, node: true, esnext: true, eqeqeq: true */
'use strict';

const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const debug = require('debug')('rubicorn');
const LEDS_SERVER_URL = 'http://localhost:3000/display';
const GAME_PORT = 6000;

// The game "engine"
let game = require('./game');

//Set the web api to interact with the matrix
let app = express();
app.use(bodyParser.json()); // for parsing application/json

//Set the routes
app.get('/move/:move/:num', (req, res) => {
    let move = req.params.move;
    let num = req.params.num;

    debug('Received a move: ' + move + num);
    game.updatePlayerGrid(move, num);
    displayGrid();

    res.json({response: 'ok'});
});

// a stop route to shutdown everything gracefully
app.get('/stop', (req, res) => {
    debug('Stop command received. Shuting down the server.');
    res.json({response: 'ok'});
    server.close();
    process.exit(0);
});

let server = app.listen(GAME_PORT, function () {
    console.log('Game server started.');
});

//Start the game
game.init();

//Function to display the game matrix
function displayGrid () {
    request
        .post({url: LEDS_SERVER_URL, body: {leds: game.getPlayerGrid()}, json: true })
        .on('response', res => { console.log('Response status: ' + res.statusCode); });
}

