var assert  = require("assert");
var should  = require("should");
var Round   = require("../round.js").Round;
var Match   = require("../match.js").Match;
var TeamFactoryRandom = require("../teamFactoryRandom.js").TeamFactoryRandom;

describe('Round', function(){
  describe('addFixture', function(){
    it('should have fixtures', function(){
		var factory = new TeamFactoryRandom();
		var teams = factory.get( 2 );
		var fixture = new Match( teams[ 0 ], teams[ 1 ] );
		var round = new Round();
		
		round.should.have.property( 'fixtures' );
		round.fixtures.should.be.an.Array.with.lengthOf( 0 );

		round.addFixture( fixture );

		round.should.have.property( 'fixtures' );
		round.fixtures.should.be.an.Array.with.lengthOf( 1 );
    });
  });
});
