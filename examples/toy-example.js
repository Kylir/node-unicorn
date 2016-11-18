/* jshint undef: true, node: true, esnext: true, eqeqeq: true */
'use strict';

/**
 * This is a toy example to test our led server.
 * It is rendering a random color at a random index.
 */

const request = require('request');
const LED_SERVER_DEFAULT_URL = 'http://localhost:3000';
const NUMBER_OF_LEDS = 32;

let leds = [
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0    
];

request
    .get(LED_SERVER_DEFAULT_URL + '/clear')
    .on('response', res => { console.log('Clear: ' + res.statusCode); });

// Loop every 0.1 sec: 
let interval = setInterval(() => {
    // Pick a random LED and a random color and set it
    let randomIndex = Math.floor(Math.random() * NUMBER_OF_LEDS);
    let randomColour = Math.floor(Math.random() * 0xffffff);
    leds[randomIndex] = randomColour;
    console.log('Rendering colour ' + randomColour + ' at index ' + randomIndex);

    // Contact the server and pass the array of LEDs
    request
        .post({url: LED_SERVER_DEFAULT_URL + '/display', body: {leds: leds}, json: true })
        .on('response', res => { console.log('Response status: ' + res.statusCode); });
}, 100);

// After 10 secondes, stop.
setTimeout(() => {
    console.log('Stop!');
    clearInterval(interval);
}, 10000);
