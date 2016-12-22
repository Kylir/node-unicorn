#!/bin/bash

sudo node ./lib/server/led-server.js &
node ./lib/colors/index.js &
