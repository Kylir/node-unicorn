/* jshint undef: true, node: true, esnext: true, eqeqeq: true */
'use strict';

const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const debug = require('debug')('colours');
const LEDS_SERVER_URL = 'http://localhost:3000/display';
const COLOR_PORT = 6001;
const C = require('./constants');

//Set the web api to interact with the matrix
let app = express();
app.use(bodyParser.json()); // for parsing application/json

//Set the routes
app.get('/color/:name', (req, res) => {
    let colorName = req.params.name;
    let leds = C[colorName];
    
    debug('Received a color: ' + colorName + '. leds are: ' + leds);
    if (leds) {
        displayGrid(C[colorName]);
        res.json({response: 'ok'});
    } else {
        res.json({response: 'error, not a valid color.', color: colorName});
    }
});

let server = app.listen(COLOR_PORT, function () {
    console.log('Color server started. Listening on port ' + COLOR_PORT);
});

//Function to display the matrix
function displayGrid (leds) {
    request
        .post({url: LEDS_SERVER_URL, body: {leds: leds}, json: true })
        .on('response', res => { console.log('Response status: ' + res.statusCode); });
}

