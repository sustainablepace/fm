(function(exports) {
	"use strict";
	var Match = require("./match.js").Match;
	var Round = require("./round.js").Round;
	
	var FixtureScheduler = function() {
		this.schedule = function( teams ) {
			return new Fixtures();
		};
	};
	
	exports.FixtureScheduler = FixtureScheduler;
})(this);
