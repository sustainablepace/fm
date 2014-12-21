(function(exports) {
	"use strict";
	var Result = require("./result.js").Result;

	var Match = function( home, away ) {
		this.home   = home;
		this.away   = away;
		this.result = null;

	};
	Match.prototype.play = function( resultCalculator ) {
		this.result = resultCalculator.play( this );
		return this.result;
	};
	Match.prototype.isPlayed = function() {
		return this.result instanceof Result;
	};
	exports.Match = Match;
})(this);
