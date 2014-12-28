var assert      = require("assert");
var should      = require("should");
var moment      = require("moment");
var Season      = require("../season.js").Season;
var Team        = require("../team.js").Team;
var Tournament  = require("../tournament.js").Tournament;
var TeamFactoryRandom = require("../teamFactoryRandom.js").TeamFactoryRandom;
var ResultCalculatorDeterministic = require("../resultCalculatorDeterministic.js").ResultCalculatorDeterministic;
var FixtureSchedulerRoundRobinTwoLegs = require("../fixtureSchedulerRoundRobinTwoLegs.js").FixtureSchedulerRoundRobinTwoLegs;
var TeamFactoryRandom = require("../teamFactoryRandom.js").TeamFactoryRandom;

describe('Tournament', function(){
  describe('constructor', function(){
    it('should have the correct keys', function(){
		var json = "{\
			'W50-3': ['DFB'],\
			'W50-6': ['BL1'],\
			'W50-7': ['BL2','BL3'],\
			'W4-6': ['BL1'],\
			'W5-6': ['BL1'],\
			'W6-6': ['BL1'],\
			'W6-7': ['BL2','BL3'],\
		}";
		var season = new Season( 2015, json );
		var calculator = new ResultCalculatorDeterministic();
		var scheduler = new FixtureSchedulerRoundRobinTwoLegs();

		var tournament = new Tournament( 'BL1', season, scheduler, calculator );

		tournament.should.have.property( 'id' );
		tournament.id.should.eql( 'BL1' );

		tournament.should.have.property( 'scheduler' );
		tournament.scheduler.should.eql( scheduler );

		tournament.should.have.property( 'resultCalculator' );
		tournament.resultCalculator.should.eql( calculator );

		tournament.should.have.property( 'teams' );
		tournament.teams.should.be.an.Array.with.lengthOf( 0 );
	});
  });
  describe('setTeams', function() {
    it('should create fixtures and register at season', function(){
		var json = "{\
			'W50-3': ['BL1'],\
			'W50-6': ['BL1'],\
			'W50-7': ['BL1','BL3'],\
			'W4-6': ['BL1'],\
			'W5-6': ['BL1'],\
			'W6-6': ['BL1'],\
			'W6-7': ['BL2','BL3'],\
		}";
		var season = new Season( 2015, json );
		var calculator = new ResultCalculatorDeterministic();
		var scheduler = new FixtureSchedulerRoundRobinTwoLegs();

		var tournament = new Tournament( 'BL1', season, scheduler, calculator );
		var teamFactory = new TeamFactoryRandom();
		var teams = teamFactory.get( 4 );
		tournament.addTeams( teams );

		tournament.should.have.property( 'teams' );
		tournament.teams.should.eql( teams );

	});
  });
});
