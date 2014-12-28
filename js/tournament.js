(function(exports) {
	"use strict";

	var Fixtures = require("./fixtures.js").Fixtures;
	
	var Tournament = function( id, season, scheduler, resultCalculator ) {
		var self = this;

		this.id = id;
		this.scheduler = scheduler;
		this.resultCalculator = resultCalculator;
		this.season = season;
		
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
		this.fixtures = this.scheduler.schedule( this.teams );
		this.season.registerTournament( this, this.playNext );
	};

	Tournament.prototype.playNext = function() {
		this.fixtures.playNext( this.resultCalculator );
	};

	Tournament.prototype.isFinished = function() {
		return this.fixtures instanceof Fixtures && this.fixtures.isFinished();
	};

	exports.Tournament = Tournament;
})(this);
