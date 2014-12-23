(function(exports) {
	"use strict";
	var TournamentFactory = function() {
		this.createBundesligaFirst = function( teams ) {
			var scheduler = new fixtureSchedulerRoundRobinTwoLegs();
			var tournament = new Tournament( teams, scheduler );
		};
		this.createBundesligaSecond = function( teams ) {
			var scheduler = new fixtureSchedulerRoundRobinTwoLegs();
			var tournament = new Tournament( teams, scheduler );
		};
	};

	exports.TournamentFactory = TournamentFactory;
})(this);
