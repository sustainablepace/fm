var assert = require("assert");
var should = require("should");
var Team   = require("../team.js").Team;
var Round   = require("../round.js").Round;
var FixtureSchedulerRoundRobinTwoLegs = require("../fixtureSchedulerRoundRobinTwoLegs.js").FixtureSchedulerRoundRobinTwoLegs;
var TeamFactoryRandom = require("../teamFactoryRandom.js").TeamFactoryRandom;

describe('FixtureSchedulerRoundRobinTwoLegs', function(){
  describe('schedule', function(){
    it('returns fixtures in correct order', function(){
		var factory = new TeamFactoryRandom();
		var teams = factory.get( 4 );
		var scheduler = new FixtureSchedulerRoundRobinTwoLegs();
		var fixtures = scheduler.schedule( teams );
		fixtures.should.have.property( 'rounds' );
		fixtures.rounds.should.be.an.Array.with.lengthOf( 6 );
		fixtures.rounds.should.matchEach( function( it ) { it.should.be.instanceOf( Round ) } );

		// Round 1
		fixtures.rounds[ 0 ].fixtures.should.be.an.Array.with.lengthOf( 2 );
		var fixtures0 = fixtures.rounds[ 0 ].fixtures[ 0 ];
		fixtures0.home.should.eql( teams[ 0 ] );
		fixtures0.away.should.eql( teams[ 3 ] );
		var fixtures1 = fixtures.rounds[ 0 ].fixtures[ 1 ];
		fixtures1.home.should.eql( teams[ 1 ] );
		fixtures1.away.should.eql( teams[ 2 ] );

		// Round 2
		fixtures.rounds[ 1 ].fixtures.should.be.an.Array.with.lengthOf( 2 );
		var fixtures0 = fixtures.rounds[ 1 ].fixtures[ 0 ];
		fixtures0.home.should.eql( teams[ 0 ] );
		fixtures0.away.should.eql( teams[ 1 ] );
		var fixtures1 = fixtures.rounds[ 1 ].fixtures[ 1 ];
		fixtures1.home.should.eql( teams[ 2 ] );
		fixtures1.away.should.eql( teams[ 3 ] );

		// Round 3
		fixtures.rounds[ 2 ].fixtures.should.be.an.Array.with.lengthOf( 2 );
		var fixtures0 = fixtures.rounds[ 2 ].fixtures[ 0 ];
		fixtures0.home.should.eql( teams[ 0 ] );
		fixtures0.away.should.eql( teams[ 2 ] );
		var fixtures1 = fixtures.rounds[ 2 ].fixtures[ 1 ];
		fixtures1.home.should.eql( teams[ 3 ] );
		fixtures1.away.should.eql( teams[ 1 ] );

		// Round 4
		fixtures.rounds[ 3 ].fixtures.should.be.an.Array.with.lengthOf( 2 );
		var fixtures0 = fixtures.rounds[ 3 ].fixtures[ 0 ];
		fixtures0.home.should.eql( teams[ 3 ] );
		fixtures0.away.should.eql( teams[ 0 ] );
		var fixtures1 = fixtures.rounds[ 3 ].fixtures[ 1 ];
		fixtures1.home.should.eql( teams[ 2 ] );
		fixtures1.away.should.eql( teams[ 1 ] );

		// Round 5
		fixtures.rounds[ 4 ].fixtures.should.be.an.Array.with.lengthOf( 2 );
		var fixtures0 = fixtures.rounds[ 4 ].fixtures[ 0 ];
		fixtures0.home.should.eql( teams[ 1 ] );
		fixtures0.away.should.eql( teams[ 0 ] );
		var fixtures1 = fixtures.rounds[ 4 ].fixtures[ 1 ];
		fixtures1.home.should.eql( teams[ 3 ] );
		fixtures1.away.should.eql( teams[ 2 ] );

		// Round 6
		fixtures.rounds[ 5 ].fixtures.should.be.an.Array.with.lengthOf( 2 );
		var fixtures0 = fixtures.rounds[ 5 ].fixtures[ 0 ];
		fixtures0.home.should.eql( teams[ 2 ] );
		fixtures0.away.should.eql( teams[ 0 ] );
		var fixtures1 = fixtures.rounds[ 5 ].fixtures[ 1 ];
		fixtures1.home.should.eql( teams[ 1 ] );
		fixtures1.away.should.eql( teams[ 3 ] );
    });
  });
});
