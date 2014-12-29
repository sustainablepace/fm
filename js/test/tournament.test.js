var assert = require("assert");
var should = require("should");

var Tournament = require("../tournament.js").Tournament;

var ResultCalculatorDeterministic = require("../resultCalculatorDeterministic.js").ResultCalculatorDeterministic;
var FixtureSchedulerRoundRobinTwoLegs = require("../fixtureSchedulerRoundRobinTwoLegs.js").FixtureSchedulerRoundRobinTwoLegs;
var Rules = require("../rules.js").Rules;
var TournamentConfig = require("../tournamentConfig.js").TournamentConfig;
var Season = require("../season.js").Season;
var TeamFactoryRandom = require("../teamFactoryRandom.js").TeamFactoryRandom;

describe('Tournament', function(){
  
  var sut = null;
  var teams = null;

  beforeEach( function() {
	var calculator = new ResultCalculatorDeterministic();
	var scheduler = new FixtureSchedulerRoundRobinTwoLegs();
	var rules = new Rules();
	var config = new TournamentConfig( scheduler, calculator, rules );
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
	
	var teamFactory = new TeamFactoryRandom();
	sut = new Tournament( 'BL1', season, config );
	teams = teamFactory.get( 4 );
  } );
  
  afterEach( function() {
	teams = null;
	sut = null;
  } );
  
  describe('constructor', function(){
    it('should have the correct keys', function(){
		sut.should.have.property( 'id' );
		sut.id.should.eql( 'BL1' );
		sut.should.have.property( 'config' );
		sut.config.should.instanceOf( TournamentConfig );
		sut.should.have.property( 'teams' );
		sut.teams.should.be.an.Array.with.lengthOf( 0 );
	});
  });
  describe( 'addTeams', function() {
    it('should add teams', function(){
		sut.addTeams( teams );
		sut.should.have.property( 'teams' );
		sut.teams.should.eql( teams );
	});
  });
});
