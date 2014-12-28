var assert      = require("assert");
var should      = require("should");
var moment      = require("moment");
var Season      = require("../season.js").Season;
var Team        = require("../team.js").Team;
var TeamFactoryRandom = require("../teamFactoryRandom.js").TeamFactoryRandom;
var Match       = require("../match.js").Match;
var Round       = require("../round.js").Round;
var Result      = require("../result.js").Result;
var ResultCalculatorDeterministic = require("../resultCalculatorDeterministic.js").ResultCalculatorDeterministic;
var FixtureSchedulerRoundRobinTwoLegs = require("../fixtureSchedulerRoundRobinTwoLegs.js").FixtureSchedulerRoundRobinTwoLegs;
var Tournament  = require("../tournament.js").Tournament;

var json = "{\
	'W50-3': ['DFB'],\
	'W50-6': ['BL1'],\
	'W50-7': ['BL2','BL3'],\
	'W4-6': ['BL1'],\
	'W5-6': ['BL1'],\
	'W6-6': ['BL1'],\
	'W6-7': ['BL2','BL3'],\
	'W7-6': ['BL1'],\
	'W8-6': ['BL1']\
}";

describe('Season', function(){
  describe('constructor', function(){
    it('should have the correct keys', function(){
		var season = new Season( 2015, json );
		season.should.have.property( 'calendar' );
		season.calendar.should.be.an.Array.with.lengthOf( 365 );
		season.calendar[ 156 ].should.eql( ['DFB'] );
		season.calendar[ 159 ].should.eql( ['BL1'] );
		season.calendar[ 208 ].should.eql( ['BL1'] );
	});
  });
  describe('getDate', function() {
    it('should return the current date', function(){
		var season = new Season( 2015, json );
		season.getDate().format( 'W-E' ).should.eql( '28-1' );
		season.now++;
		season.getDate().format( 'W-E' ).should.eql( '28-2' );
    });
  });
  describe('isFinished', function() {
    it('should be false for now, true later', function(){
		var season = new Season( 2015, json );
		season.isFinished().should.be.false;
		season.now += 366;
		season.isFinished().should.be.true;
    });
  });
  describe('isSchedulable', function(){
    it('should return true', function(){
		var season = new Season( 2015, json );
		var calculator = new ResultCalculatorDeterministic();
		var scheduler = new FixtureSchedulerRoundRobinTwoLegs();
		var tournament = new Tournament( 'BL1', season, scheduler, calculator );
		var teamFactory = new TeamFactoryRandom();
		var teams = teamFactory.get( 4 );
		tournament.addTeams( teams );
		tournament.schedule();
		season.isSchedulable( tournament ).should.be.true;
    });
  });
  describe('isRegisteredTournament', function(){
    it('should return false first, after registration true', function(){
		var season = new Season( 2015, json );
		var calculator = new ResultCalculatorDeterministic();
		var scheduler = new FixtureSchedulerRoundRobinTwoLegs();
		var tournament = new Tournament( 'BL1', season, scheduler, calculator );
		season.isRegisteredTournament( tournament ).should.be.false;
		var teamFactory = new TeamFactoryRandom();
		var teams = teamFactory.get( 4 );
		tournament.addTeams( teams );
		tournament.schedule();
		season.isRegisteredTournament( tournament ).should.be.true;
    });
  });
  describe('fastForward', function(){
    it('should have the correct now', function(){
		var season = new Season( 2015, json );
		var calculator = new ResultCalculatorDeterministic();
		var scheduler = new FixtureSchedulerRoundRobinTwoLegs();
		var tournament = new Tournament( 'BL1', season, scheduler, calculator );
		var teamFactory = new TeamFactoryRandom();
		var teams = teamFactory.get( 4 );
		tournament.addTeams( teams );
		tournament.schedule();
		season.fastForward().should.be.instanceOf( Season );
		season.now.should.not.eql( 0 );
		season.getDate().format( 'W-E' ).should.eql( '50-6' );
    });
  });
});
