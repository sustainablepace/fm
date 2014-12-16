var assert  = require("assert");
var should  = require("should");
var League  = require("../league.js").League;
var Team    = require("../team.js").Team;
var Match   = require("../match.js").Match;
var Fixture = require("../fixture.js").Fixture;
var Result  = require("../result.js").Result;

describe('League', function(){
  describe('attr', function(){
    it('should have enough teams', function(){
		var league = new League( 18 );
		league.should.have.property( 'teams' );
		league.teams.should.be.an.Array.with.lengthOf( 18 );
		league.teams.should.matchEach( function( it ) { it.should.be.instanceOf( Team ) } );
    });
  });
  describe('fixtures', function(){
    it('should have complete fixtures', function(){
		var league = new League( 18 );
		league.should.have.property( 'fixtures' );
		league.fixtures.should.be.an.Array.with.lengthOf( 34 );
		league.fixtures.should.matchEach( function( fixtures ) { 
			fixtures.should.be.an.Array.with.lengthOf( 9 );
			fixtures.should.matchEach( function( fixture ) {
				fixture.should.be.instanceOf( Fixture );
				fixture.should.have.property( 'match' );
				fixture.match.should.be.instanceOf( Match );
				fixture.match.should.have.property( 'result' );
				(fixture.match.result === null).should.be.true;
			});
		});
    });
  });
  describe('play', function(){
    it('should have fixtures with result after play', function(){
		var league = new League( 18 );
		league.play();
		league.should.have.property( 'fixtures' );
		league.fixtures.should.be.an.Array.with.lengthOf( 34 );
		league.fixtures.should.matchEach( function( fixtures ) { 
			fixtures.should.be.an.Array.with.lengthOf( 9 );
			fixtures.should.matchEach( function( fixture ) {
				fixture.should.be.instanceOf( Fixture );
				fixture.should.have.property( 'match' );
				fixture.match.should.be.instanceOf( Match );
				fixture.match.should.have.property( 'result' );
				fixture.match.result.should.be.an.instanceOf( Result );
			});
		});
    });
  });
});
