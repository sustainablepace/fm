(function(exports) {
	"use strict";
	var TableEntry = function( team ) {
		this.team         = team;
		this.points       = 0;
		this.goalsFor     = 0;
		this.goalsAgainst = 0;
		this.gamesPlayed  = 0;

		this.addPoints = function( points ) {
			this.points += points; 
		};
		this.addGoalsFor = function( goals ) {
			this.goalsFor += goals; 
		};
		this.addGoalsAgainst = function( goals ) {
			this.goalsAgainst += goals; 
		};
		this.addGamesPlayed = function( gamesPlayed ) {
			this.gamesPlayed += gamesPlayed;
		};
	};
	exports.TableEntry = TableEntry;
})(this);
