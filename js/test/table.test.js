var assert  = require("assert");
var should  = require("should");
var Table   = require("../table.js").Table;
var League  = require("../league.js").League;
var Team    = require("../team.js").Team;
var Match   = require("../match.js").Match;
var Fixture = require("../fixture.js").Fixture;
var Result  = require("../result.js").Result;
var Rules   = require("../rules.js").Rules;
var TeamFactoryRandom = require("../teamFactoryRandom.js").TeamFactoryRandom;
var ResultCalculatorDeterministic = require("../resultCalculatorDeterministic.js").ResultCalculatorDeterministic;

describe('Table', function(){
  describe('attr', function(){
    it('should have enough entries with same amount of games played', function(){
		var resultCalculator = new ResultCalculatorDeterministic();
		var size = 18;
		var factory = new TeamFactoryRandom();
		var teams = factory.get( size );
		var rules = new Rules();
		var league = new League( rules );
		league.addSeason( teams );
		var season = league.getCurrentSeason();
		season.play( resultCalculator );
		var table = new Table( season, rules );
		table.should.have.property( 'entries' );
		table.entries.should.be.an.Array.with.lengthOf( size );
		table.entries.should.matchEach( function( entry ) {
			entry.should.have.property( 'gamesPlayed' );
			entry.gamesPlayed.should.eql( 2 * ( size - 1 ) );
		});
    });
  });
});
