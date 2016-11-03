/* jshint undef: true, node: true, esnext: true, eqeqeq: true */
'use strict';

/**
 * This is a toy example to test our led server.
 * It is rendering a random color at a random index.
 */

const request = require('request');
const LED_SERVER_URL = 'http://localhost:3000';

request
    .get(LED_SERVER_URL + '/clear')
    .on('response', res => { console.log('Clear: ' + res.statusCode); });
