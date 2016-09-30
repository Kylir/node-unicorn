/* jshint undef: true, node: true, eqeqeq: true, esnext: true */

var NUMBER_OF_LEDS = 32;
var strip = require('rpi-ws281x-native');
strip.init(NUMBER_OF_LEDS);
strip.setBrightness(100);

var leds = [
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0    
];

// Loop every 0.1 sec: randomise an index and a colour and display it
strip.render(leds);
var interval = setInterval(function() {
    var randomIndex = Math.floor(Math.random() * NUMBER_OF_LEDS);
    var randomColour = Math.floor(Math.random() * 0xffffff);
    leds[randomIndex] = randomColour;
    console.log('Rendering colour ' + randomColour + ' at index ' + randomIndex);
    strip.render(leds);
}, 100);

// After 10 secondes, stop.
setTimeout(function () {
    console.log('Stop!');
    clearInterval(interval);
    strip.reset();
}, 10000);
