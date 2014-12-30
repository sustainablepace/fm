var assert  = require("assert");
var should  = require("should");

var Association = require("../association.js").Association;

var Tournament = require("../tournament.js").Tournament;
var TournamentConfig = require("../tournamentConfig.js").TournamentConfig;
var TournamentProxy = require("../tournamentProxy.js").TournamentProxy;
var TournamentProxyRule = require("../tournamentProxyRule.js").TournamentProxyRule;
var Season = require("../season.js").Season;
var Rules = require("../rules.js").Rules;
var ResultCalculatorDeterministic = require("../resultCalculatorDeterministic.js").ResultCalculatorDeterministic;
var FixtureSchedulerRoundRobinTwoLegs = require("../fixtureSchedulerRoundRobinTwoLegs.js").FixtureSchedulerRoundRobinTwoLegs;
var TeamFactoryRandom = require("../teamFactoryRandom.js").TeamFactoryRandom;
var Table = require("../table.js").Table;

describe('Association', function(){

  var sut = null;

  beforeEach( function() {
	sut = new Association();
  } );
  
  afterEach( function() {
	sut = null;
  } );
  
  describe('constructor', function() {
    it('should have correct attributes', function(){
		sut.should.have.property( 'associations' );
		sut.associations.should.be.an.Array.with.lengthOf( 0 );
		sut.should.have.property( 'tournaments' );
		sut.tournaments.should.be.an.Object;
    });
  });
  
  describe('addAssociation', function() {
    it('should have the correct associations', function(){
		var anotherAssoc = new Association();
		sut.addAssociation( anotherAssoc ).should.eql( sut );
		sut.associations.should.be.an.Array.with.lengthOf( 1 );
		sut.associations[ 0 ].should.eql( anotherAssoc );
    });
  });
  
  describe('addTournament', function() {
    it('should have the correct tournaments', function(){
		var tournament = new Tournament( 'TEST' );
		sut.addTournament( tournament ).should.eql( sut );
		sut.tournaments.should.be.an.Object;
		sut.tournaments.should.have.property( 'TEST' );
		sut.tournaments.TEST.should.eql( tournament );
    });
  });

  describe('getTournament', function() {
    it('should have the correct tournaments', function(){
		sut.addTournament( new Tournament( 'TEST' ) );
		var tournament = sut.getTournament( 'TEST' );
		tournament.should.eql( tournament );
    });
  });

  describe('proxy', function() {
	var sut = null;
	var proxy = null;

	beforeEach( function() {
		sut = new Association();
		proxy = new TournamentProxy();
		proxy.addRule( new TournamentProxyRule( [ 'BL1' ], [ 'BL1' ], [ 1, 2 ] ) );
		sut.setTournamentProxy( proxy );
		
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

		tournamentBl1 = new Tournament( 'BL1', new TournamentConfig( 
			new FixtureSchedulerRoundRobinTwoLegs(), 
			new ResultCalculatorDeterministic(), 
			new Rules() 
		) );

		var size = 4;
		var factory = new TeamFactoryRandom();
		var teams = factory.get( size );
		tournamentBl1.addTeams( teams );
		sut.addTournament( tournamentBl1 );
		sut.schedule( season );
		season.playAll();
	} );
  
	afterEach( function() {
		proxy = null;
	} );
    it('should have the correct tournament ids', function(){
		var sources = sut.getProxySources();
		sources.should.be.an.Object;
		sources.should.have.property( 'BL1' );
		sources.BL1.should.be.instanceOf( Tournament );
		sources.BL1.teams.should.be.an.Array.with.lengthOf( 4 );
    });
    it('should have the correct tournaments', function(){
		var table = new Table( sut.tournaments.BL1 );
		sut.should.be.an.instanceOf( Association );
		sut.proxy();
		sut.tournaments.should.be.an.Object;
		sut.tournaments.should.have.property( 'BL1' );
		sut.tournaments.BL1.should.be.instanceOf( Tournament );
		sut.tournaments.BL1.teams.should.be.an.Array.with.lengthOf( 2 );
    });
  });

});
