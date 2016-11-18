/* jshint undef: true, node: true, esnext: true, eqeqeq: true */
'use strict';

/**
 * This is a toy example to clear the LEDs of the Unicorn pHat.
 */

const request = require('request');
const LED_SERVER_DEFAULT_URL = 'http://localhost:3000';

request
    .get(LED_SERVER_DEFAULT_URL + '/stop')
    .on('response', res => { console.log('Stop: ' + res.statusCode); });
