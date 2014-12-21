(function(exports) {
	"use strict";
	var Result           = require("./result.js").Result;
	var ResultCalculator = require("./resultCalculator.js").ResultCalculator;

	var ResultCalculatorStrengthPlusRandom = function() {
		this.play = function( match ) {
			if( match.home.strength + 3 * Math.random() > match.away.strength + 3 * Math.random() ) {
				return new Result( 1, 0 );
			}
			else if( match.home.strength  + 3 * Math.random() < match.away.strength  + 3 * Math.random() ) {
				return new Result( 0, 1 );
			}
			return new Result( 0, 0 );
		}

	};

	ResultCalculatorStrengthPlusRandom.prototype = new ResultCalculator();

	exports.ResultCalculatorStrengthPlusRandom = ResultCalculatorStrengthPlusRandom;
})(this);
