var assert  = require("assert");
var should  = require("should");

var Fixtures = require("../fixtures.js").Fixtures;
var Round    = require("../round.js").Round;

describe('Fixtures', function(){
  var sut = null;

  beforeEach( function() {
		sut = new Fixtures();
  } );
  
  afterEach( function() {
	sut = null;
  } );
  
  describe('constructor', function(){
    it('should have an array of rounds', function(){
		sut.should.have.property( "rounds" );
		sut.rounds.should.be.an.Array.with.lengthOf( 0 );
    });
  });

  describe('addRound', function(){
    it('should have an array of rounds', function(){
		sut.addRound( new Round() );
		sut.rounds.should.be.an.Array.with.lengthOf( 1 );
    });
  });

});
