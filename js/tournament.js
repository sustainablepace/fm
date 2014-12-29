(function(exports) {
	"use strict";

	var Fixtures = require("./fixtures.js").Fixtures;
	
	var Tournament = function( id, season, tournamentConfig ) {
		this.id = id;
		this.season = season;
		this.config = tournamentConfig;
		
		this.init();
	};
	
	Tournament.prototype.init = function() {
		this.stages = [];
		this.teams = [];
		this.fixtures = null;
	};
	
	Tournament.prototype.addTeams = function( teams ) {
		this.teams = this.teams.concat( teams );
		return this;
	};

	Tournament.prototype.addStage = function( tournament ) {
		if( tournament instanceof Tournament ) {
			this.stages.push( tournament );
		} else {
			throw "Cannot add stage, is not a Tournament.";
		}
	};

	Tournament.prototype.schedule = function() {
		this.season.unregisterTournament( this );
		this.fixtures = this.config.getScheduler().schedule( this.teams );
		this.season.registerTournament( this, this.playNext );
	};

	Tournament.prototype.playNext = function() {
		this.fixtures.playNext( this.config.getResultCalculator() );
	};

	Tournament.prototype.getNextRound = function() {
		var id = this.fixtures.getNextRoundNumber();
		if( id === null ) {
			return null;
		}
		return this.fixtures.getRound( id );
	};

	Tournament.prototype.getLastRound = function() {
		var id = this.fixtures.getNextRoundNumber();
		if( id === null ) {
			return null;
		}
		return this.fixtures.getRound( id - 1 );
	};

	Tournament.prototype.isFinished = function() {
		return this.fixtures instanceof Fixtures && this.fixtures.isFinished();
	};

	exports.Tournament = Tournament;
})(this);
