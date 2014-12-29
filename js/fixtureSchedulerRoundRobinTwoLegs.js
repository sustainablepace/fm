(function(exports) {
	"use strict";
	
	var Match = require("./match.js").Match;
	var Fixtures = require("./fixtures.js").Fixtures;
	var Round = require("./round.js").Round;	
	var FixtureScheduler = require("./fixtureScheduler.js").FixtureScheduler;

	var FixtureSchedulerRoundRobinTwoLegs = function() {
	};

	FixtureSchedulerRoundRobinTwoLegs.prototype = new FixtureScheduler();
	FixtureSchedulerRoundRobinTwoLegs.prototype.parent = FixtureScheduler.prototype;
	
	FixtureSchedulerRoundRobinTwoLegs.prototype.schedule = function( teams ) {
		var pool   = [];
		var rounds = [];
		for( var i = 0; i < teams.length; i++ ) {
			pool.push( i );
		}
		for( var j = 0; j < teams.length - 1 ; j++ ) {
			var roundFirstHalf  = new Round();		
			var roundSecondHalf = new Round();		
			for( var k = 0; k < teams.length / 2; k++ ) {
				var home = pool[ k                    ];
				var away = pool[ teams.length - k - 1 ];
				roundFirstHalf.addFixture(  new Match( teams[ home ], teams[ away ] ) );
				roundSecondHalf.addFixture( new Match( teams[ away ], teams[ home ] ) );
			}
			rounds[ j                    ] = roundFirstHalf;		
			rounds[ j + teams.length - 1 ] = roundSecondHalf;		

			// See http://en.wikipedia.org/wiki/Round-robin_tournament#Scheduling_algorithm
			var pivot = pool.shift();
			var first = pool.shift();
			pool.push( first );
			pool.unshift( pivot );
		}
		var fixtures = new Fixtures();
		for( var i in rounds ) {
			fixtures.addRound( rounds[ i ] );
		}
		return fixtures;
	};
	
	exports.FixtureSchedulerRoundRobinTwoLegs = FixtureSchedulerRoundRobinTwoLegs;

})(this);
