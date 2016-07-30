var assert      = require("assert");
var should      = require("should");
var moment      = require("moment");

var Season      = require("../season.js").Season;

var ResultCalculatorDeterministic = require("../resultCalculatorDeterministic.js").ResultCalculatorDeterministic;
var FixtureSchedulerRoundRobinTwoLegs = require("../fixtureSchedulerRoundRobinTwoLegs.js").FixtureSchedulerRoundRobinTwoLegs;
var Rules = require("../rules.js").Rules;
var TournamentConfig = require("../tournamentConfig.js").TournamentConfig;
var TournamentCalendar = require("../Tournament/TournamentCalendar.js").TournamentCalendar;
var Tournament = require("../tournament.js").Tournament;
var Calendar = require("../Calendar.js").Calendar;
var TeamFactoryRandom = require("../teamFactoryRandom.js").TeamFactoryRandom;

describe('Season', function(){
  var sut = null;
  var tournament = null;
  var teams = null;
  var config = null;
  var teamFactory = null;
	var calendar = null;

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
	  var calendar = new Calendar(2015);
	sut = new Season( 2015, json, calendar );
	
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
	config = new TournamentConfig( scheduler, calculator, rules, tournamentCalendar );
	tournament = new Tournament( 'BL1', config );

	teamFactory = new TeamFactoryRandom();
	teams = teamFactory.get( 4 );
	tournament.addTeams( teams );
	tournament.schedule( sut );
  } );
  
  afterEach( function() {
	sut = null;
	tournament = null;
	teams = null;
	config = null;
	teamFactory = null;
	  calendar = null;
  } );

  describe('constructor', function(){
    it('should have the correct keys', function(){
		sut.should.have.property( 'calendar' );
        sut.cal.should.be.instanceOf(Calendar);
		sut.calendar.should.be.an.Array.with.lengthOf( 365 );
		sut.calendar[ 156 ].should.eql( ['DFB'] );
		sut.calendar[ 159 ].should.eql( ['BL1'] );
		sut.calendar[ 208 ].should.eql( ['BL1'] );
	});
  });
  describe('getDate', function() {
    it('should return the current date', function(){
		sut.getDate().format( 'W-E' ).should.eql( '28-1' );
		sut.now++;
		sut.getDate().format( 'W-E' ).should.eql( '28-2' );
    });
  });
  describe('isFinished', function() {
    it('should be false for now, true later', function(){
		sut.isFinished().should.be.false;
		sut.now += 366;
		sut.isFinished().should.be.true;
    });
  });
  describe('isSchedulable', function(){
    it('should return true', function(){
		sut.isSchedulable( tournament ).should.be.true;
    });
  });
  describe('isRegisteredTournament', function(){
    it('should return false first, after registration true', function(){
		var tournament = new Tournament( 'BL2', config );
		sut.isRegisteredTournament( tournament ).should.be.false;
		tournament.addTeams( teamFactory.get( 2 ) );
		tournament.schedule( sut );
		sut.isRegisteredTournament( tournament ).should.be.true;
    });
  });
  describe('unregisterTournament', function(){
    it('should return true first, after unregistration false', function(){
		sut.isRegisteredTournament( tournament ).should.be.true;
		sut.unregisterTournament( tournament );
		sut.isRegisteredTournament( tournament ).should.be.false;
    });
  });
  describe('fastForward', function(){
    it('should have the correct now', function(){
		sut.fastForward().should.be.instanceOf( Season );
		sut.now.should.not.eql( 0 );
		sut.getDate().format( 'W-E' ).should.eql( '50-6' );
    });
  });
});
