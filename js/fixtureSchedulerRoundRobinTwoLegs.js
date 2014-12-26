(function(exports) {
	"use strict";
	
	var Match   = require("./match.js").Match;
	var Fixtures = require("./fixtures.js").Fixtures;
	var Round   = require("./round.js").Round;	
	var FixtureScheduler = require("./fixtureScheduler.js").FixtureScheduler;

	var FixtureSchedulerRoundRobinTwoLegs = function() {
		var createFixture = function( teams, home, away ) {
			return new Match( teams[ home ], teams[ away ] );
		};

		var createFixtures = function( rounds ) {
			var fixtures = new Fixtures();
			for( var i in rounds ) {
				fixtures.addRound( rounds[ i ] );
			}
			return fixtures;
		};
		
		this.schedule = function( teams ) {
			var pool   = [];
			var rounds = [];
			for( var i = 0; i < teams.length; i++ ) {
				pool.push( i );
			}
			for( var j = 0; j < teams.length - 1 ; j++ ) {
				var roundFirstHalf  = new Round();		
				var roundSecondHalf = new Round();		
				for( var k = 0; k < teams.length / 2; k++ ) {
					var team1 = pool[ k                    ];
					var team2 = pool[ teams.length - k - 1 ];
					roundFirstHalf.addFixture(  createFixture( teams, team1, team2 ) );
					roundSecondHalf.addFixture( createFixture( teams, team2, team1 ) );
				}
				rounds[ j                    ] = roundFirstHalf;		
				rounds[ j + teams.length - 1 ] = roundSecondHalf;		

				// See http://en.wikipedia.org/wiki/Round-robin_tournament#Scheduling_algorithm
				var pivot = pool.shift();
				var first = pool.shift();
				pool.push( first );
				pool.unshift( pivot );
			}
			return createFixtures( rounds );
		};
	};
	FixtureSchedulerRoundRobinTwoLegs.prototype = new FixtureScheduler();
	
	exports.FixtureSchedulerRoundRobinTwoLegs = FixtureSchedulerRoundRobinTwoLegs;

})(this);
