# node-unicorn

Drive you Pimoroni Unicorn pHat in Node JS
The project is in two parts:

## The LED driver

This is a separate process that must run with root priviledges.
It is a simple Express JS application running locally only on the port 3000.
It is stateless so it is not possible to retrieve the state of a LED.

Made of simple routes:
    - `POST /display {leds: [<colors>]}`: display the array of colors.
    - `GET /clear`: reset the LEDs (fills with zeros)
    - `GET /stop`: will reset and stop the server.

To start the server you need to run the script located in `lib/server` using `sudo`:

```
sudo node ./lib/server/led-server.js &
```

You can stop the server using the `stop` script in the `examples` folder:

```
node ./examples/stop.js
```

## The matrix game

This is the proper game engine.
The game will generate an initial pattern of colors and then will shuffle it using rotations of lines and collumns.
The goal is to recreate the original state using simple horizontal or vertical rotations.



