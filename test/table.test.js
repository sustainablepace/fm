var assert  = require("assert");
var should  = require("should");
var Table   = require("../table.js").Table;
var League  = require("../league.js").League;
var Team    = require("../team.js").Team;
var Match   = require("../match.js").Match;
var Fixture = require("../fixture.js").Fixture;
var Result  = require("../result.js").Result;

describe('Table', function(){
  describe('attr', function(){
    it('should have enough entries with same amount of games played', function(){
		var size = 18;
		var league = new League( size );
		league.play();
		var table = new Table( league );
		table.should.have.property( 'entries' );
		table.entries.should.be.an.Array.with.lengthOf( size );
		table.entries.should.matchEach( function( entry ) {
			entry.should.have.property( 'gamesPlayed' );
			entry.gamesPlayed.should.eql( 2 * ( size - 1 ) );
		});
    });
  });
});
