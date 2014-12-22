(function(exports) {
	"use strict";
	
	var TournamentRules = function( scheduler ) {
		
		this.createFixtures = function( teams ) {
			return scheduler.schedule( teams );
		};
		
		this.getRelegated = function() {
		};
		this.getEliminated = function() {
		};
		this.getPromoted = function() {
		};
	};
	exports.TournamentRules = TournamentRules;
})(this);
