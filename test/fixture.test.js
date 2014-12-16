var assert  = require("assert");
var should  = require("should");
var Fixture = require("../fixture.js").Fixture;
var Team    = require("../team.js").Team;
var Match   = require("../match.js").Match;
describe('Fixture', function(){
  describe('attr', function(){
    it('should have a match', function(){
		var match   = new Match( new Team(), new Team() );
		var fixture = new Fixture( match, 0, 1 );
		fixture.should.have.property( "match" );
		( fixture.match === match ).should.be.true;
    });
  });
});
