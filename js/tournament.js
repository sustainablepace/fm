(function(exports) {
	"use strict";
	
	var Tournament = function( scheduler ) {
		var self = this;
		this.teams = null;
		this.fixtures = null;
		this.scheduler = scheduler;

		this.setTeams = function( teams ) {
			this.teams    = teams;
			this.fixtures = this.scheduler.createFixtures( teams );
		};
	};
	exports.Tournament = Tournament;
})(this);
