var assert      = require("assert");
var should      = require("should");
var moment      = require("moment");
var Season      = require("../season.js").Season;
var Team        = require("../team.js").Team;
var TeamFactoryRandom = require("../teamFactoryRandom.js").TeamFactoryRandom;
var Match       = require("../match.js").Match;
var Round       = require("../round.js").Round;
var Fixture     = require("../fixture.js").Fixture;
var Result      = require("../result.js").Result;
var ResultCalculatorDeterministic = require("../resultCalculatorDeterministic.js").ResultCalculatorDeterministic;

describe('Season', function(){
  describe('constructor', function(){
    it('should have the correct keys', function(){
		var json = "{\
			'W50-3': ['DFB'],\
			'W50-6': ['BL1'],\
			'W50-7': ['BL2','BL3'],\
			'W4-6': ['BL1'],\
			'W5-6': ['BL1'],\
			'W6-6': ['BL1'],\
			'W6-7': ['BL2','BL3'],\
		}";
		var season = new Season( 2015, json );
		season.should.have.property( 'calendar' );
		season.calendar.should.be.an.Array.with.lengthOf( 365 );
		season.calendar[ 156 ].should.eql( ['DFB'] );
		season.calendar[ 159 ].should.eql( ['BL1'] );
		season.calendar[ 208 ].should.eql( ['BL1'] );
	});
  });
});
