#!/usr/bin/env bash

cd web
npm install && bower install && dtsm install
gulp build

cd ../api
sh test.sh
