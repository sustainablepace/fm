(function(exports) {
	"use strict";
	var AssociationGermany = function() {
		this.tournaments = [];

		this.createTournaments = function( calendar ) {
			var scheduler = new fixtureSchedulerRoundRobinTwoLegs();
			var bundesliga = new Tournament( scheduler );
			var bundesliga2 = new Tournament( scheduler );
			var bundesliga3 = new Tournament( scheduler );
			var schedulerRelegation = new fixtureSchedulerEliminationTwoLegs();
			var relegation12 = new Tournament( schedulerRelegation );
			var relegation23 = new Tournament( schedulerRelegation );
		};
	};

	exports.Association = Association;
})(this);
