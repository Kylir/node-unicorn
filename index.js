/* jshint undef: true, node: true, eqeqeq: true, esnext: true */

var strip = require('rpi-ws281x-native');

const PHAT = [
    [24, 16, 8,  0],
    [25, 17, 9,  1],
    [26, 18, 10, 2],
    [27, 19, 11, 3],
    [28, 20, 12, 4],
    [29, 21, 13, 5],
    [30, 22, 14, 6],
    [31, 23, 15, 7]
];

const RED = 0xff0000;
const GREEN = 0x00ff00;
const BLUE = 0x0000ff;
const WHITE = 0xffffff;

strip.init(32);
strip.render([
    RED, GREEN, BLUE, WHITE,
    RED, GREEN, BLUE, WHITE,
    RED, GREEN, BLUE, WHITE,
    RED, GREEN, BLUE, WHITE,
    RED, GREEN, BLUE, WHITE,
    RED, GREEN, BLUE, WHITE,
    RED, GREEN, BLUE, WHITE,
    RED, GREEN, BLUE, WHITE    
]);
strip.show();

setTimeout(function () {
    strip.reset();
}, 3000);
