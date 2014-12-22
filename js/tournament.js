(function(exports) {
	"use strict";
	
	var Tournament = function( teams, tournamentRules, nextStage, relegationRules ) {
		var self = this;
		
		this.nextStage = function() {
			if( fixtures.isFinished() ) {
				
			}
		};
		
		this.fixtures = tournamentRules.createFixtures( teams );
	};
	exports.Tournament = Tournament;
})(this);