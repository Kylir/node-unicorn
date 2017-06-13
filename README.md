# node-unicorn

**WARNING: THIS IS A WORK IN PROGRESS**

This is a bunch of NodeJS scripts to drive your Pimoroni Unicorn pHat.
In no time you will be able to display fancy colors and play a puzzle game.


## Quick intro

### Set-up

- Install NodeJS on your Raspberry Pi.
- Clone this Git repository in a folder on your Raspberry Pi.
- Install the dependencies with a `npm install`.
- (Optional) Run the tests with `npm test`.
- (Optional?) Mess up with the code as much as you want, make something cool and share your project.

### Toy Example

To motivate yourself you can start with a nice little example.

**WARNING**: The low level module used to talk to the Unicorn needs to run with root priviledges... Sorry about that, nothing I can do about it I'm afraid. Note that the official Python API from Pimoroni needs the same. See for instance the examples [here using sudo](https://github.com/pimoroni/unicorn-hat/tree/master/examples#unified-unicorn-hat-and-phat-examples).

Start the LED driver and then run the `toy-example` script with the following commands:

```
sudo node ./lib/server/led-server.js &
node ./examples/toy-example.js
```

If everything is working fine you should see some pretty colors on your Unicorn!


## The LED driver

The project is in several parts. The main one is the LED driver. All the low level magic is handle by a nice and simple module called `rpi-ws281x-native`. You can find more info about this module on its npm page [here](https://www.npmjs.com/package/rpi-ws281x-native).

As we said, the LED driver is a separate process that must run with root priviledges. It is a simple Express JS application running locally only on the port 3000. It is stateless so it is not possible to retrieve the state of a LED. 

It is a simple API that has three simple routes:

- `POST /display {leds: [<color values>]}`: display the array of colors.
- `GET /clear`: reset the LEDs (fills with zeros)
- `GET /stop`: will reset and stop the server.


### Start

To start the server you need to run the script located in `lib/server` using `sudo`:

```
sudo node ./lib/server/led-server.js &
```


### Stop

The server can be stopped using the `stop` script in the `examples` folder:

```
node ./examples/stop.js
```

Or you can use curl to trigger the `stop` route:

```
curl http://127.0.0.1:3000/stop
```


### Display

You can set the LEDs using the display route. You need to POST a JSON object containing the variable `leds`, an array of color values. For instance to display one red LED (0xFF0000 is 16711680) and all the others black (value 0):

```
curl -H "Content-Type: application/json" -X POST -d "{\"leds\":[16711680,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0]}" http://127.0.0.1:3000/display
```


## The color server

**WORK IN PROGRESS**

The goal of this small application is to offer a simple and secure API to set all the LEDs to a single color from the long list of X11 colors [available here](https://en.wikipedia.org/wiki/X11_color_names).

As the main LED driver needs root priviledges it is not a good idea to open its connection to the World. Instead, we creates another server implementing an even simpler API to display one color.

### Start the server


### Stop the server


### Set the color


## The matrix game

**WORK IN PROGRESS**

This is the proper game engine.
The game will generate an initial pattern of colors and then will shuffle it using rotations of lines and collumns.
The goal is to recreate the original state using simple horizontal or vertical rotations.

## Open questions

+ How to control the game:
    - Web interface on a smartphone?
    - Accelerometer and buttons on the Pi itself?
    - Joypad on another device (PC, another Pi,...)?

