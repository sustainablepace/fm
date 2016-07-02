var assert  = require("assert");
var should  = require("should");

var AssociationFactory = require("../associationFactory.js").AssociationFactory;

var Association = require("../association.js").Association;
var TournamentCalendar = require("./../Tournament/TournamentCalendar.js").TournamentCalendar;

describe('Association', function(){

  var sut = null;

  beforeEach( function() {
	sut = new AssociationFactory();
  } );
  
  afterEach( function() {
	sut = null;
  } );
  
  describe('getAssociationGermany', function() {
    it('should have correct attributes', function() {
		var assoc = sut.getAssociationGermany( {'BL1':[],'BL2':[],'BL3':[]},{'BL1':null,'BL2':null,'BL3':null} );
		assoc.should.be.instanceOf( Association );
    });
  });
  
});
