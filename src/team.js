(function(exports) {
	"use strict";
	var Team = function( data ) {
		this.name = ( data && data.name ) ? data.name : "Team " + ( 1000000 * Math.random() );		
		this.strength = ( data && data.strength ) ? data.strength : Math.random();
		
		this.init();
	};

	Team.prototype.init = function() {
		this.id = Team.prototype.nextId;
		Team.prototype.nextId++;
	};
	
	Team.prototype.nextId = 1;

	exports.Team = Team;
})(this);

