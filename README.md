# 🦄 Node Unicorn pHAT

A small NodeJS Express server that can drive your Pimoroni Unicorn pHat.

## Endpoints

### Solid colors:

`POST /display/<color>/<brightness>`

- Accepts words or hex colours
- 100 = brightest, 0 = darkest

```
curl -X POST http://<RPI_IP>:3000/display/green/100
curl -X POST http://<RPI_IP>:3000/display/FF0000/25
```

### Turn off display:

`POST /display/off`

```
curl -X POST http://<RPI_IP>:3000/display/off
```

### Set individual colours:

`POST /display { leds: [<hex color values>], brightness: <0-100> }`

- hex only, `0` for black/no-light
- `100` = brightest, `0` = darkest

```
curl -H "Content-Type: application/json" -X POST -d "{\"leds\":[ \
    FF0000,0,0,0,\
    FF0000,0,0,0,\
    FF0000,0,0,0,\
    FF0000,0,0,0,\
    FF0000,0,0,0,\
    FF0000,0,0,0,\
    FF0000,0,0,0,\
    FF0000,0,0,0,\
],\"brightness\":75}" http://<RPI_IP>:3000/display
```

### Get State 

`GET /state` 

- view what was last sent to the driver to display
- returns a json blob with the leds array in hex
- includes an extra ledsInRGBnum key for seeing what was actually sent to driver

```
curl -X GET http://<RPI_IP>:3000/state
```

Returns json blob:

```
{
  "leds": [
    ...
  ],
  "ledsInRGBnum": [
    ...
  ],
  "brightness": 50
}
```

## Set-up

- Install NodeJS on your Raspberry Pi
- Clone this Git repository in a folder on your Raspberry Pi
- Install the dependencies with a `npm install`
- Setup a `/variables.env` file with:

```
PORT=3001
NUMBER_OF_LEDS=32
```

If attempting to use this repo outside of a RPI, `rpi-ws281x-native` needs to be removed.

**WARNING**: The low level module used to talk to the Unicorn needs to run with root priviledges. Use at your own risk, and be aware of it. Note that the official Python API from Pimoroni needs the same. See for instance the examples [here using sudo](https://github.com/pimoroni/unicorn-hat/tree/master/examples#unified-unicorn-hat-and-phat-examples).


## Credit 

All the low level magic is handle by a nice and simple module called `rpi-ws281x-native`. You can find more info about this module on its npm page [here](https://www.npmjs.com/package/rpi-ws281x-native).

Props to https://github.com/Kylir/node-unicorn, from which this repo is forked from.
