(function(exports) {
	"use strict";
	var Result           = require("./result.js").Result;
	var ResultCalculator = require("./resultCalculator.js").ResultCalculator;

	var ResultCalculatorDeterministic = function() {
	};

	ResultCalculatorDeterministic.prototype = new ResultCalculator();
	ResultCalculatorDeterministic.prototype.parent = ResultCalculator.prototype;

	ResultCalculatorDeterministic.prototype.play = function( match ) {
		if( match.home.strength > match.away.strength ) {
			return new Result( 1, 0 );
		}
		else if( match.home.strength < match.away.strength ) {
			return new Result( 0, 1 );
		}
		return new Result( 0, 0 );
	};

	exports.ResultCalculatorDeterministic = ResultCalculatorDeterministic;
})(this);
