(function(exports) {
	"use strict";
	var Tournament = require("./tournament.js").Tournament;
	var TeamFactory = require("./teamFactory.js").TeamFactory;
	
	var TeamFactoryFile = function() {
		this.init();

	};
	TeamFactoryFile.prototype = new TeamFactory();
	TeamFactoryFile.prototype.parent = TeamFactory.prototype;

	TeamFactoryFile.prototype.init = function() {
		this.teams = [];
	};
	
	TeamFactoryFile.prototype.get = function( numTeams ) {
		this.teams = [];
		for( var i = 0; i < numTeams; i++ ) {
			this.teams.push( new Team() );
		}
		return this.teams;
	};
	
	exports.TeamFactoryFile = TeamFactoryFile;
})(this);
