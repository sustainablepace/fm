var assert  = require("assert");
var should  = require("should");
var moment  = require("moment");
var Calendar = require("../calendar.js").Calendar;
var Tournament = require("../tournament.js").Tournament;

describe('Calendar', function(){
  describe('constructor', function(){
    it('should have the correct keys', function(){
		var json = "{\
			'W28-7': ['BL3'],\
			'W29-7': ['BL2','BL3'],\
			'W30-3': ['BL3'],\
			'W30-7': ['BL2','BL3'],\
			'W31-6': ['BL1'],\
			'W31-7': ['BL2','BL3'],\
			'W32-6': ['DFB'],\
			'W33-6': ['BL1']\
		}";
		var calendar = new Calendar( json, 2015 );
		calendar.should.have.property( 'events' );
		calendar.events.should.be.an.Object;
		calendar.events.should.have.property( '2015-07-12' );
		calendar.events[ '2015-07-12' ].should.eql( ["BL3"] );
	});
  });
  describe('getNumberOfTournamentEvents', function(){
    it('should have the correct numbers', function(){
		var json = "{\
			'W28-7': ['BL3'],\
			'W29-7': ['BL2','BL3'],\
			'W30-3': ['BL3'],\
			'W30-7': ['BL2','BL3'],\
			'W31-6': ['BL1'],\
			'W31-7': ['BL2','BL3'],\
			'W32-6': ['DFB'],\
			'W33-6': ['BL1']\
		}";
		var calendar = new Calendar( json, 2015 );
		var bl3 = new Tournament( 'BL3' );
		calendar.getNumberOfTournamentEvents( bl3 ).should.eql( 5 );
		var bl2 = new Tournament( 'BL2' );
		calendar.getNumberOfTournamentEvents( bl2 ).should.eql( 3 );
		var bl1 = new Tournament( 'BL1' );
		calendar.getNumberOfTournamentEvents( bl1 ).should.eql( 2 );
		var dfb = new Tournament( 'DFB' );
		calendar.getNumberOfTournamentEvents( dfb ).should.eql( 1 );
	});
  });
});

