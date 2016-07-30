var assert  = require("assert");
var should  = require("should");

var Table   = require("../table.js").Table;

var Season = require("../season.js").Season;
var ResultCalculatorDeterministic = require("../resultCalculatorDeterministic.js").ResultCalculatorDeterministic;
var FixtureSchedulerRoundRobinTwoLegs = require("../fixtureSchedulerRoundRobinTwoLegs.js").FixtureSchedulerRoundRobinTwoLegs;
var Rules = require("../rules.js").Rules;
var TournamentConfig = require("../tournamentConfig.js").TournamentConfig;
var TournamentCalendar = require("../Tournament/TournamentCalendar.js").TournamentCalendar;
var Tournament = require("../tournament.js").Tournament;
var TeamFactoryRandom = require("../teamFactoryRandom.js").TeamFactoryRandom;
var Team = require("../team.js").Team;
var Calendar = require("../Calendar.js").Calendar;

describe('Table', function(){
  var sut = null;
  var teams = null;

  beforeEach( function() {
	var json = "{\
		'W50-6': ['BL1'],\
		'W50-7': ['BL1'],\
		'W4-6': ['BL1'],\
		'W5-6': ['BL1'],\
		'W6-6': ['BL1'],\
		'W6-7': ['BL1'],\
	}";
	  var calendar = new Calendar(2015);

	  var season = new Season( 2015, json, calendar );
	var calculator = new ResultCalculatorDeterministic();
	var scheduler = new FixtureSchedulerRoundRobinTwoLegs();
	var rules = new Rules();
	  var tournamentCalendarJson = "{\
		'W50-6': true,\
		'W4-6': true,\
		'W5-6': true,\
		'W6-6': true,\
		'W7-6': true,\
		'W8-6': true\
	}";
	  var tournamentCalendar = new TournamentCalendar();
	  tournamentCalendar.calendar = eval('('+tournamentCalendarJson+')');
	var config = new TournamentConfig( scheduler, calculator, rules, tournamentCalendar );
	var tournament = new Tournament( 'BL1', config );
	var teamFactory = new TeamFactoryRandom();
	teams = teamFactory.get( 4 );
	tournament.addTeams( teams );
	tournament.schedule( season );
	tournament.fixtures.play( config.getResultCalculator() );
	
	sut = new Table( tournament );

  } );
  
  afterEach( function() {
	sut = null;
	teams = null;
  } );

  describe('constructor', function(){
    it('should have enough entries with same amount of games played', function(){
		sut.should.have.property( 'entries' );
		sut.entries.should.be.an.Object;
    });
  });
  describe('getRanking', function(){
    it('should give the correct number of teams and games played', function(){
		var ranking = sut.getRanking();
		var size = 4;
		ranking.should.be.an.Array.with.lengthOf( size );
		ranking.should.matchEach( function( entry ) {
			entry.should.have.property( 'gamesPlayed' );
			entry.gamesPlayed.should.eql( 2 * ( size - 1 ) );
		});
    });
  });
  describe('pick', function(){
    it('should return the appropriate teams at their positions', function(){
		teams.sort( function( a, b ) {
			return a.strength > b.strength ? -1 : 1;
		});

		(function() { sut.pick( 0 ); }).should.throw();
		sut.pick( 1 ).should.be.instanceOf( Team ).and.eql( teams[ 0 ] );
		sut.pick( 2 ).should.be.instanceOf( Team ).and.eql( teams[ 1 ] );
		sut.pick( 3 ).should.be.instanceOf( Team ).and.eql( teams[ 2 ] );
		sut.pick( 4 ).should.be.instanceOf( Team ).and.eql( teams[ 3 ] );
		sut.pick( -1 ).should.be.instanceOf( Team ).and.eql( teams[ 3 ] );
		sut.pick( -2 ).should.be.instanceOf( Team ).and.eql( teams[ 2 ] );
		sut.pick( -3 ).should.be.instanceOf( Team ).and.eql( teams[ 1 ] );
		sut.pick( -4 ).should.be.instanceOf( Team ).and.eql( teams[ 0 ] );
		(function() { sut.pick( 5 ); }).should.throw();
    });
  });
});
