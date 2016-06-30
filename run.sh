#!/bin/bash
mocha src/test/*.js
browserify src/*.js -o js/bundle.js 
