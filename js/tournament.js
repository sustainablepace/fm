(function(exports) {
	"use strict";
	
	var Tournament = function( id, season, scheduler, resultCalculator ) {
		var self = this;

		this.id = id;
		this.scheduler = scheduler;
		this.resultCalculator = resultCalculator;
		this.season = season;

		this.teams = null;
		this.fixtures = null;

		this.setTeams = function( teams ) {
			if( this.teams !== null ) {
				season.unregisterTournament( this );
			}
			this.teams    = teams;
			this.fixtures = this.scheduler.schedule( teams );
			season.registerTournament( this, this.playNext );
		};

		this.playNext = function() {
			this.fixtures.playNext( this.resultCalculator );
		};
	};
	exports.Tournament = Tournament;
})(this);
