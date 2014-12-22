var assert  = require("assert");
var should  = require("should");
var Fixtures = require("../fixtures.js").Fixtures;
var Round    = require("../round.js").Round;
describe('Fixtures', function(){
  describe('constructor', function(){
    it('should have an array of rounds', function(){
		var fixtures = new Fixtures();
		fixtures.should.have.property( "rounds" );
		fixtures.rounds.should.be.an.Array.with.lengthOf( 0 );
		var round = new Round();
		fixtures.addRound( round );
		fixtures.rounds.should.be.an.Array.with.lengthOf( 1 );
    });
  });
});
