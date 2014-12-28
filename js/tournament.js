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

		this.addTeams = function( teams ) {
			this.teams = this.teams.concat( teams );
			return this;
		};

		this.addStage = function( tournament ) {
			if( tournament instanceof Tournament ) {
				this.stages.push( tournament );
			} else {
				throw "Cannot add stage, is not a Tournament.";
			}
		};

		this.schedule = function() {
			this.season.unregisterTournament( this );
			this.fixtures = this.scheduler.schedule( this.teams );
			this.season.registerTournament( this, this.playNext );
		};

		this.playNext = function() {
			this.fixtures.playNext( this.resultCalculator );
		};

		this.isFinished = function() {
			return this.fixtures instanceof Fixtures && this.fixtures.isFinished();
		};
	};
	exports.Tournament = Tournament;
})(this);
