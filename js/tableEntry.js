(function(exports) {
	"use strict";
	var TableEntry = function( team ) {
		this.team         = team;
		this.points       = 0;
		this.wins         = 0;
		this.draws        = 0;
		this.losses       = 0;
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
		this.addWin = function() {
			this.wins++;
		};
		this.addLoss = function() {
			this.losses++;
		};
		this.addDraw = function() {
			this.draws++;
		};
	};
	exports.TableEntry = TableEntry;
})(this);
