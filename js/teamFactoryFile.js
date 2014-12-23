(function(exports) {
	"use strict";
	var Tournament = require("./tournament.js").Tournament;
	var TournamentFactory = require("./tournamentFactory.js").TournamentFactory;
	
	var TournamentFactoryBundesliga = function() {
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
