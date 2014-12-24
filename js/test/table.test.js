var assert  = require("assert");
var should  = require("should");
var Table   = require("../table.js").Table;
var Team    = require("../team.js").Team;
var Match   = require("../match.js").Match;
var Fixture = require("../fixture.js").Fixture;
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
		tournament.setTeams( teams );
		tournament.fixtures.play( calculator );

		tournament.fixtures.should.have.property( 'rounds' );

		var rules = new Rules();
		var table = new Table( tournament, rules );
		table.should.have.property( 'entries' );
		table.entries.should.be.an.Array.with.lengthOf( size );
		table.entries.should.matchEach( function( entry ) {
			entry.should.have.property( 'gamesPlayed' );
			entry.gamesPlayed.should.eql( 2 * ( size - 1 ) );
		});
    });
  });
});
