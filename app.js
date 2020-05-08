'use strict';
const express      = require( 'express' );
const bodyParser   = require( 'body-parser' );
const logger       = require( 'morgan' );
const type         = require( 'type-of' )
const fs           = require( 'fs' );
const isHexColor   = require( 'validate.io-color-hexadecimal' ); // @TODO could probably use `Color` instead.
const Color        = require( 'color' );
const colorConvert = require('color-convert'); // @TODO above may be redudent.
// const driver       = require('rpi-ws281x-native');

/**
 * Helpers 
 */
const isValidHexColour   = ( col ) => col == 0 || isHexColor( col );
const convertHexToRGBDec = ( col ) => {
	if ( col == 0 ) return 0;
	return Color( '#'+col.replace('#','')).rgbNumber()
};

const app = express();
app.use(logger('dev'));  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	next();
  });  

app.get('/', ( req, res ) => {
	res.send('see readme for instructions')
});

app.get('/state', ( req, res ) => {
	fs.readFile('cache/state.txt', (err, data) => {
		res.json( JSON.parse( data ) );
	});
});

app.post('/display/off', ( req, res ) => {
	if ( unicorn( 0, 0 ) ) { // @TODO should make unicorn() a controller so this doesn't need to be a return check.
		res.json({status:'success'}); 
	} else {
		res.json({status:'error'});
	}
});

app.post('/display/:colour/:brightness', ( req, res ) => {
	let colour = req.params.colour;
	if ( ! isValidHexColour( colour ) )
		colour = colorConvert.keyword.hex( colour );

	if ( unicorn( colour, req.params.brightness ) ) { // @TODO should make unicorn() a controller so this doesn't need to be a return check.
		res.json({status:'success'});
	} else {
		res.json({status:'error'});
	}
});

// Display an custom array of colors as pixels.
app.post('/display', ( req, res ) => {
	if ( unicorn( req.body.leds, req.body.brightness ) ) { // @TODO should make unicorn() a controller so this doesn't need to be a return check.
		res.json({status:'success'});
	} else {
		res.json({status:'error'});
	}
});

module.exports = app;

/**
 * Main Controller 
 * 
 * @param {string|array} hexColour single hex string, or array of hex values.
 * @param {int} brightness 0=low,100=brightest
 */
function unicorn ( hexColour, brightness ) {
	let leds = hexColour;
	brightness = parseInt( brightness );

	// if it's a single, make it an array
	if ( 'string' == type( leds ) || 0 == leds ) {
		leds = [];
		for ( let i=0;i!=process.env.NUMBER_OF_LEDS;i++ )
			leds.push( hexColour );
	}

	// validate the array.
	if ( process.env.NUMBER_OF_LEDS != leds.length || ! leds.every( isValidHexColour ) ) {
		return false;
	}

	// convert all values from HEX to RGBDec, except for 0    
	const ledsInRGBnum = leds.map( hex => { 
		if ( 0 == hex ) 
			return 0;
		return convertHexToRGBDec( hex ); 
	} );

	//driver.render( ledsInRGBnum );
	//driver.setBrightness( brightness );

	const state = JSON.stringify( {
		leds,
		ledsInRGBnum,
		brightness
	} );
	fs.writeFile('cache/state.txt', state, (err, data) => {
		if (err) logger(`unable to write state`);
	});
	return true;
}
