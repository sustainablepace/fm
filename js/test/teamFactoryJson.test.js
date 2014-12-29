var assert  = require("assert");
var should  = require("should");

var TeamFactoryJson = require("../teamFactoryJson.js").TeamFactoryJson;

var Team = require("../team.js").Team;

describe('TeamFactoryJson', function(){
  
  var sut = null;
  var json = '[{\
		name: "Arminia Bielefeld"\
	},\
	{\
		name: "Dynamo Dresden"\
	},\
	{\
		name: "Energie Cottbus"\
	},\
	{\
		name: "Jahn Regensburg"\
	},\
	{\
		name: "MSV Duisburg"\
	}]';

  beforeEach( function() {
	sut = new TeamFactoryJson();
  } );
  
  afterEach( function() {
	sut = null;
  } );  

  describe('get', function(){
    it('should return the expected amount of teams', function(){
		var teams = sut.get( json );
		teams.should.be.an.Array.with.lengthOf( 5 );
		teams.should.matchEach( function( team ) {
			team.should.be.instanceOf( Team );
			team.should.have.property( 'name' );
			team.should.have.property( 'strength' );
		});
    });
  });
});
