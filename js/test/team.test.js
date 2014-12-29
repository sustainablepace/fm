var assert = require("assert");
var should = require("should");

var Team   = require("../team.js").Team;

describe('Team', function(){
  
  var sut = null;

  beforeEach( function() {
	sut = new Team();
  } );
  
  afterEach( function() {
	sut = null;
  } );  
  
  describe('constructor', function(){
    it('should have an id', function(){
		sut.should.have.property( 'id' );
		sut.id.should.be.a.Number;
    });
	
    it('should return a random name starting with Team', function(){
		sut.should.have.property( 'name' );
        assert.equal('Team', sut.name.substr(0,4));
    });
	
    it('should return a random strength value between 0 and 1', function(){
		sut.should.have.property( 'strength' );
		sut.strength.should.be.within( 0, 1 );
    });
	
    it('should have a unique id', function(){
		var team = new Team();
		sut.id.should.not.eql( team.id );
    });
  });
});
