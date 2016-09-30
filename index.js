/* jshint undef: true, node: true, eqeqeq: true, esnext: true */

var strip = require('rpi-ws281x-native');
strip.init(32);
strip.setBrightness(100);

var leds = [
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0xff0000    
];

strip.render(leds);
var interval = setInterval(function() {
    console.log('Rendering!');
    var led = leds.shift();
    leds.push(led);
    strip.render(leds);
}, 100);

setTimeout(function () {
    console.log('Stop!');
    clearInterval(interval);
    strip.reset();
}, 10000);
