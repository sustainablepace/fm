var assert      = require("assert");
var should      = require("should");
var League      = require("../league.js").League;
var Season      = require("../season.js").Season;
var TeamFactoryRandom = require("../teamFactoryRandom.js").TeamFactoryRandom;

describe('League', function(){
  describe('addSeason', function(){
    it('should have a season', function(){
		var factory = new TeamFactoryRandom();
		var teams = factory.get( 18 );
		var league = new League();
		league.addSeason( teams );
		league.should.have.property( 'seasons' );
		league.seasons.should.be.an.Array.with.lengthOf( 1 );
		league.seasons.should.matchEach( function( it ) { it.should.be.instanceOf( Season ) } );
    });
  });
  describe('getCurrentSeason', function(){
    it('should return current season', function(){
		var factory = new TeamFactoryRandom();
		var teams = factory.get( 18 );
		var league = new League();
		league.addSeason( teams );
		var season = league.getCurrentSeason();
		season.should.be.instanceOf( Season );
    });
  });
});
