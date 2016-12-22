/* jshint undef: true, node: true, esnext: true, eqeqeq: true */
'use strict';

const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const utils = require('./utils');
const debug = require('debug')('colors');

const LEDS_SERVER_URL = 'http://localhost:3000/display';
const COLOR_PORT = 3001;
const NUMBER_OF_LEDS = 32;

//Set the web api to interact with the matrix
let app = express();
app.use(bodyParser.json()); // for parsing application/json

// Set the static folder to public
app.use(express.static(path.join(__dirname, 'public')));

/*
// Set the views and the view engine.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 */

//Set the route
app.get('/color/name/:name', (req, res) => {
    let colorName = req.params.name;
    let leds = utils.generateColorArrayFromName(NUMBER_OF_LEDS, colorName);
    
    debug('Received a color name: ' + colorName + '. leds are: ' + leds);
    displayGrid(leds);
    res.json({response: 'ok'});
});

// a stop route to shutdown everything gracefully
// TODO: is there any risk the server stops before returning?
app.get('/stop', (req, res) => {
    debug('Stop command received. Shuting down the server.');
    res.json({response: 'ok'});
    server.close();
    process.exit(0);
});

let server = app.listen(COLOR_PORT, function () {
    debug('Color server started. Listening on port ' + COLOR_PORT);
});

//Function to display the matrix by posting to the server
function displayGrid (leds) {
    request
        .post({url: LEDS_SERVER_URL, body: {leds: leds}, json: true })
        .on('response', res => { console.log('Response status: ' + res.statusCode); });
}
