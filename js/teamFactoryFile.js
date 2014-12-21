(function(exports) {
	"use strict";
	var Team        = require("./team.js").Team;
	var TeamFactory = require("./teamFactory.js").TeamFactory;
	
	var TeamFactoryRandom = function() {
		var self = this;
		this.teams = [];

		this.get = function( numTeams ) {
			this.teams = [];
			for( var i = 0; i < numTeams; i++ ) {
				this.teams.push( new Team() );
			}
			return this.teams;
		}
	};
	TeamFactoryRandom.prototype = new TeamFactory();

	exports.TeamFactoryRandom = TeamFactoryRandom;
})(this);
