var assert = require("assert");
var should = require("should");

var TournamentProxy = require("../tournamentProxy.js").TournamentProxy;

var TournamentProxyRule = require("../tournamentProxyRule.js").TournamentProxyRule;

describe('TournamentProxy', function(){
  var sut = null;

  beforeEach( function() {
		sut = new TournamentProxy();
  } );
  
  afterEach( function() {
	sut = null;
  } );
  
  describe('constructor', function() {
    it('should have correct attributes', function(){
		sut.should.have.property( 'rules' );
		sut.rules.should.be.an.Array.with.lengthOf( 0 );
    });
  });

  describe('addRule', function() {
    it('should have correct attribute rules with length and content', function(){
		var rule = new TournamentProxyRule( [ 'BL1' ], [ 'BL2' ], [ -1, -2 ] );
		sut.addRule( rule );
		sut.rules.should.be.an.Array.with.lengthOf( 1 );
		sut.rules[ 0 ].should.eql( rule );
    });
  });

  describe('getSourceTournamentIds', function() {
    it('should return the correct indices', function(){
		sut.addRule( new TournamentProxyRule( [ 'BL1' ], [ 'BL2' ], [ -1, -2 ] ) );
		sut.addRule( new TournamentProxyRule( [ 'BL2' ], [ 'BL3' ], [ -1, -2 ] ) );
		var ids = sut.getSourceTournamentIds();
		ids.should.be.an.Array.with.lengthOf( 2 );
		ids.should.eql( ['BL1', 'BL2'] );
    });
  });

  describe('getSinkTournamentIds', function() {
    it('should return the correct indices', function(){
		sut.addRule( new TournamentProxyRule( [ 'BL1' ], [ 'BL2' ], [ -1, -2 ] ) );
		sut.addRule( new TournamentProxyRule( [ 'BL2' ], [ 'BL3' ], [ -1, -2 ] ) );
		var ids = sut.getSinkTournamentIds();
		ids.should.be.an.Array.with.lengthOf( 2 );
		ids.should.eql( ['BL2', 'BL3'] );
    });
  });

});
