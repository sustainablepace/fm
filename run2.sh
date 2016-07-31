#!/bin/bash
mocha src2/test/*.js
browserify src2/js/*.js -o js/bundle2.js
