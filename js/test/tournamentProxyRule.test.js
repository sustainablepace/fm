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
var TournamentProxyRule = require("../tournamentProxyRule.js").TournamentProxyRule;
var Rules   = require("../rules.js").Rules;
var Table   = require("../table.js").Table;


describe('TournamentProxyRule', function(){
  describe('proxy', function(){
    it('should relegate the last two teams in the league', function(){
		var json = "{\
			'W50-3': ['DFB'],\
			'W50-6': ['BL1'],\
			'W50-7': ['BL2','BL3'],\
			'W4-6': ['BL1'],\
			'W5-6': ['BL1'],\
			'W6-6': ['BL1'],\
			'W6-7': ['BL2','BL3'],\
		}";
		var rules = new Rules();
		var season = new Season( 2015, json );
		var calculator = new ResultCalculatorDeterministic();
		var scheduler = new FixtureSchedulerRoundRobinTwoLegs();


		var tournament = new Tournament( 'BL1', season, scheduler, calculator );

		var size = 4;
		var factory = new TeamFactoryRandom();
		var teams = factory.get( size );
		tournament.addTeams( teams );
		tournament.schedule();
		season.playAll();

		var season = new Season( 2016, json );
		var tournamentNext = new Tournament( 'BL2', season, scheduler, calculator );

		var proxyRule = new TournamentProxyRule( [ tournament ], [ tournamentNext ], [ -1, -2 ], rules );
		proxyRule.proxy();
		tournamentNext.teams.should.be.an.Array.with.lengthOf( 2 );

		var table = new Table( tournament, rules );
		
		tournamentNext.teams[ 0 ].should.eql( table.pick( -1 ) );
		tournamentNext.teams[ 1 ].should.eql( table.pick( -2 ) );

	});
  });
});
