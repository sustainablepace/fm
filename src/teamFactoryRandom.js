(function(exports) {
	"use strict";
	var Team        = require("./team.js").Team;
	var TeamFactory = require("./TeamFactory/TeamFactory.js").TeamFactory;
	
	var TeamFactoryRandom = function() {
		this.init();
	};
	
	TeamFactoryRandom.prototype = new TeamFactory();
	TeamFactoryRandom.prototype.parent = TeamFactory.prototype;
	
	TeamFactoryRandom.prototype.init = function() {
		this.teams = [];
	};
	
	TeamFactoryRandom.prototype.get = function( numTeams ) {
		this.teams = [];
		for( var i = 0; i < numTeams; i++ ) {
			this.teams.push( new Team() );
		}
		return this.teams;
	}

	exports.TeamFactoryRandom = TeamFactoryRandom;
})(this);
