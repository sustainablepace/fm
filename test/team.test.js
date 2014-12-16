var assert = require("assert");
var should = require("should");
var Team   = require("../team.js").Team;
describe('Team', function(){
  describe('attr', function(){
    it('should return a random name starting with Team', function(){
		var team = new Team();
		team.should.have.property( 'name' );
        assert.equal('Team', team.name.substr(0,4));
    });
    it('should return a random strength value between 0 and 1', function(){
		var team = new Team();
		team.should.have.property( 'strength' );
		team.strength.should.be.within(0,1);
    });
  });
});
