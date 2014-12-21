var assert  = require("assert");
var should  = require("should");
var Team = require("../team.js").Team;
var TeamFactoryJson = require("../teamFactoryJson.js").TeamFactoryJson;

describe('TeamFactoryJson', function(){
  describe('get', function(){
    it('should return the expected amount of teams', function(){
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

	var factory = new TeamFactoryJson();
	var teams = factory.get( json );
	teams.should.be.an.Array.with.lengthOf( 5 );
	teams.should.matchEach( function( team ) {
		team.should.be.instanceOf( Team );
		team.should.have.property( 'name' );
		team.should.have.property( 'strength' );
	});
    });
  });
});
