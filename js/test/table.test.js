var assert  = require("assert");
var should  = require("should");
var Table   = require("../table.js").Table;
var Team    = require("../team.js").Team;
var Match   = require("../match.js").Match;
var Result  = require("../result.js").Result;
var Rules   = require("../rules.js").Rules;
var Season  = require("../season.js").Season;
var Tournament = require("../tournament.js").Tournament;
var TeamFactoryRandom = require("../teamFactoryRandom.js").TeamFactoryRandom;
var FixtureSchedulerRoundRobinTwoLegs = require("../fixtureSchedulerRoundRobinTwoLegs.js").FixtureSchedulerRoundRobinTwoLegs;
var ResultCalculatorDeterministic = require("../resultCalculatorDeterministic.js").ResultCalculatorDeterministic;

describe('Table', function(){
  describe('attr', function(){
    it('should have enough entries with same amount of games played', function(){
		var json = "{\
			'W50-6': ['BL1'],\
			'W50-7': ['BL1'],\
			'W4-6': ['BL1'],\
			'W5-6': ['BL1'],\
			'W6-6': ['BL1'],\
			'W6-7': ['BL1'],\
		}";		
		var season = new Season( 2015, json );
		var scheduler = new FixtureSchedulerRoundRobinTwoLegs();
		var calculator = new ResultCalculatorDeterministic();
		var tournament = new Tournament( 'BL1', season, scheduler, calculator );


		var size = 4;
		var factory = new TeamFactoryRandom();
		var teams = factory.get( size );
		tournament.addTeams( teams );
		tournament.schedule();
		tournament.fixtures.play( calculator );

		tournament.fixtures.should.have.property( 'rounds' );

		var rules = new Rules();
		var table = new Table( tournament, rules );
		table.should.have.property( 'entries' );
		table.entries.should.be.an.Object;

		var ranking = table.getRanking();
		ranking.should.be.an.Array.with.lengthOf( 4 );
		ranking.should.matchEach( function( entry ) {
			entry.should.have.property( 'gamesPlayed' );
			entry.gamesPlayed.should.eql( 2 * ( size - 1 ) );
		});
    });
  });
  describe('pick', function(){
    it('should return the appropriate teams at their positions', function(){
		var json = "{\
			'W50-6': ['BL1'],\
			'W50-7': ['BL1'],\
			'W4-6': ['BL1'],\
			'W5-6': ['BL1'],\
			'W6-6': ['BL1'],\
			'W6-7': ['BL1'],\
		}";		
		var season = new Season( 2015, json );
		var scheduler = new FixtureSchedulerRoundRobinTwoLegs();
		var calculator = new ResultCalculatorDeterministic();
		var tournament = new Tournament( 'BL1', season, scheduler, calculator );


		var size = 4;
		var factory = new TeamFactoryRandom();
		var teams = factory.get( size );
		tournament.addTeams( teams );
		tournament.schedule();
		tournament.fixtures.play( calculator );

		var rules = new Rules();
		var table = new Table( tournament, rules );

		teams.sort( function( a, b ) {
			return a.strength > b.strength ? -1 : 1;
		});

		(function() { table.pick( 0 ); }).should.throw();
		table.pick( 1 ).should.be.instanceOf( Team ).and.eql( teams[ 0 ] );
		table.pick( 2 ).should.be.instanceOf( Team ).and.eql( teams[ 1 ] );
		table.pick( 3 ).should.be.instanceOf( Team ).and.eql( teams[ 2 ] );
		table.pick( 4 ).should.be.instanceOf( Team ).and.eql( teams[ 3 ] );
		table.pick( -1 ).should.be.instanceOf( Team ).and.eql( teams[ 3 ] );
		table.pick( -2 ).should.be.instanceOf( Team ).and.eql( teams[ 2 ] );
		table.pick( -3 ).should.be.instanceOf( Team ).and.eql( teams[ 1 ] );
		table.pick( -4 ).should.be.instanceOf( Team ).and.eql( teams[ 0 ] );
		(function() { table.pick( 5 ); }).should.throw();
		
    });
  });
});
