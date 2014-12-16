(function(exports) {
	"use strict";
	var Team = function() {
	    this.strength = Math.random();
	    this.name = "Team " + (1000000*Math.random());
	};
	exports.Team = Team;
})(this);

