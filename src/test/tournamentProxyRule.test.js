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
  var tournamentBl1 = null;
  var tournamentBl2 = null;
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

		tournamentBl1 = new Tournament( 'BL1', config );

		var size = 4;
		var factory = new TeamFactoryRandom();
		var teams = factory.get( size );
		tournamentBl1.addTeams( teams );
		tournamentBl1.schedule( season );
		season.playAll();
		tournamentPrevTable = new Table( tournamentBl1 );

		var season = new Season( 2016, json );
		tournamentBl2 = new Tournament( 'BL2', config );
		
		sut = new TournamentProxyRule( [ 'BL1' ], [ 'BL2' ], [ -1, -2 ] );
  } );
  
  afterEach( function() {
	sut = null;
	tournamentBl1 = null;
	tournamentBl2 = null;
	tournamentPrevTable = null;
  } );
  
  describe('proxy', function(){
    it('should relegate the last two teams in the league', function(){
		var tournamentBl1Next = tournamentBl1.clone();
		var tournamentBl2Next = tournamentBl2.clone();
		sut.proxy({
			'BL1': tournamentBl1,
			'BL2': tournamentBl2
		}, {
			'BL1': tournamentBl1Next,
			'BL2': tournamentBl2Next
		});
		tournamentBl2Next.teams.should.be.an.Array.with.lengthOf( 2 );
		tournamentBl2Next.teams[ 0 ].should.eql( tournamentPrevTable.pick( -1 ) );
		tournamentBl2Next.teams[ 1 ].should.eql( tournamentPrevTable.pick( -2 ) );

	});
  });
});
