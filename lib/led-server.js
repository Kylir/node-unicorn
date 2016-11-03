/* jshint undef: true, node: true, esnext: true, eqeqeq: true */
'use strict';

/*
Made of simple routes:
    - `GET /clear`: reset the LEDs (fills with zeros)
    - `POST /display + parameters`: display the array of colors.
    - TODO: `GET /stop`: will reset and stop the server.
    - TODO: `POST /brightness + parameters`: update the brightness.
*/

const express = require('express');
const bodyParser = require('body-parser');
const driver = require('rpi-ws281x-native');

const NUMBER_OF_LEDS = 32;

let app = express();
app.use(bodyParser.json()); // for parsing application/json

// Set all the LEDs to zero
app.get('/clear', function (req, res) {
    const zeros = [
        0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0
    ];
    driver.render(zeros);
    res.json({response: 'ok'});
});

// Display an array of colors
app.post('/display', function (req, res) {
    let leds = req.body.leds;

    function isAValidColor(elt, index, array) { 
        return (elt >= 0 && elt <= 0xffffff);
    }

    // validate the input: must be an array of number in the color range
    if (leds && Array.isArray(leds) && (leds.length === NUMBER_OF_LEDS) && leds.every(isAValidColor)) {
        driver.render(leds);
        res.json({response: 'ok'});
    } else {
        res.status(400).json({response: 'error', received: leds});
    }
});

app.listen(3000, function () {
    driver.init(NUMBER_OF_LEDS);
    driver.setBrightness(100);
});