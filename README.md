# node-unicorn

Drive you Pimoroni Unicorn pHat in Node JS
The project is in two parts:

## The LED driver

This is a separate process.
It is a simple Express JS application running locally only on the port 3000.
It is running with root access.
It is stateless so it is not possible to retrieve the state of a LED.

Made of simple routes:
    - `GET /clear`: reset the LEDs (fills with zeros)
    - `POST /display + parameters`: display the array of colors.


## The matrix game

This is the proper game engine.
The goal is to recreate the original state using simple horizontal or vertical rotations.
The engine will generate 

