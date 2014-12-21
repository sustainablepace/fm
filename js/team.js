(function(exports) {
	"use strict";
	var Team = function( data ) {
		if( data && data.name ) {
			this.name = data.name;		
		} else {
			this.name = "Team " + (1000000*Math.random());
		}
		if( data && data.strength ) {
			this.strength = data.strength;		
		} else {
			this.strength = Math.random();
		}
	};
	exports.Team = Team;
})(this);

