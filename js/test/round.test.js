var assert  = require("assert");
var should  = require("should");

var Round   = require("../round.js").Round;

var Match = require("../match.js").Match;
var TeamFactoryRandom = require("../teamFactoryRandom.js").TeamFactoryRandom;

describe('Round', function(){

  var sut = null;
  var fixture = null;

  beforeEach( function() {
	sut = new Round();
	var factory = new TeamFactoryRandom();
	var teams = factory.get( 2 );
	fixture = new Match( teams[ 0 ], teams[ 1 ] );
  } );
  
  afterEach( function() {
	sut = null;
	fixture = null;
  } );
  
  describe('constructor', function(){
    it('should have correct attributes', function(){
		sut.should.have.property( 'fixtures' );
		sut.fixtures.should.be.an.Array.with.lengthOf( 0 );
    });
  });
  describe('addFixture', function(){
    it('should have fixtures', function(){
		sut.addFixture( fixture );
		sut.fixtures.should.be.an.Array.with.lengthOf( 1 );
    });
  });
});
