var assert      = require("assert");
var should      = require("should");
var moment      = require("moment");

var TournamentProxyRule = require("../tournamentProxyRule.js").TournamentProxyRule;

var Season = require("../season.js").Season;
var Rules = require("../rules.js").Rules;
var ResultCalculatorDeterministic = require("../resultCalculatorDeterministic.js").ResultCalculatorDeterministic;
var FixtureSchedulerRoundRobinTwoLegs = require("../fixtureSchedulerRoundRobinTwoLegs.js").FixtureSchedulerRoundRobinTwoLegs;
var TournamentConfig = require("../tournamentConfig.js").TournamentConfig;
var Tournament = require("../tournament.js").Tournament;
var TeamFactoryRandom = require("../teamFactoryRandom.js").TeamFactoryRandom;
var Table = require("../table.js").Table;

describe('TournamentProxyRule', function(){
  var sut = null;
  var tournamentNext = null;
  var tournamentPrevTable = null;

  beforeEach( function() {
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
		var season = new Season( 2015, json );

		var scheduler = new FixtureSchedulerRoundRobinTwoLegs();
		var calculator = new ResultCalculatorDeterministic();
		var rules = new Rules();
		var config = new TournamentConfig( scheduler, calculator, rules );

		var tournament = new Tournament( 'BL1', season, config );

		var size = 4;
		var factory = new TeamFactoryRandom();
		var teams = factory.get( size );
		tournament.addTeams( teams );
		tournament.schedule();
		season.playAll();
		tournamentPrevTable = new Table( tournament );

		var season = new Season( 2016, json );
		tournamentNext = new Tournament( 'BL2', season, config );
		
		sut = new TournamentProxyRule( [ tournament ], [ tournamentNext ], [ -1, -2 ], rules );
  } );
  
  afterEach( function() {
	sut = null;
	tournamentNext = null;
	tournamentPrevTable = null;
  } );
  
  describe('proxy', function(){
    it('should relegate the last two teams in the league', function(){
		sut.proxy();
		tournamentNext.teams.should.be.an.Array.with.lengthOf( 2 );
		tournamentNext.teams[ 0 ].should.eql( tournamentPrevTable.pick( -1 ) );
		tournamentNext.teams[ 1 ].should.eql( tournamentPrevTable.pick( -2 ) );

	});
  });
});
