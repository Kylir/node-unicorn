/* jshint undef: true, node: true, esnext: true, eqeqeq: true */
'use strict';

const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const utils = require('utils');
const debug = require('debug')('colours');

const LEDS_SERVER_URL = 'http://localhost:3000/display';
const COLOR_PORT = 3001;

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
    let leds = utils.generateColorArrayFromName(colorName);
    
    debug('Received a color name: ' + colorName + '. leds are: ' + leds);
    displayGrid(leds);
    res.json({response: 'ok'});
});

let server = app.listen(COLOR_PORT, function () {
    console.log('Color server started. Listening on port ' + COLOR_PORT);
});

//Function to display the matrix by posting to the server
function displayGrid (leds) {
    request
        .post({url: LEDS_SERVER_URL, body: {leds: leds}, json: true })
        .on('response', res => { console.log('Response status: ' + res.statusCode); });
}
