var assert  = require("assert");
var should  = require("should");

var Rules = require("../rules.js").Rules;

var TableEntry = require("../tableEntry.js").TableEntry;
var TeamFactoryRandom = require("../teamFactoryRandom.js").TeamFactoryRandom;
var Result = require("../result.js").Result;

describe('Rules', function(){
  var sut = null;
  var tableEntries = null;

  beforeEach( function() {
	sut = new Rules();
	var factory = new TeamFactoryRandom();
	var teams = factory.get( 2 );
	tableEntries = [ new TableEntry( teams[ 0 ] ), new TableEntry( teams[ 1 ] ) ];
  } );
  
  afterEach( function() {
	sut = null;
	tableEntries = null;
  } );

  describe('tableEntrySorter', function(){
    it('should return 0, 1 or -1', function(){
		sut.tableEntrySorter.should.be.a.Function;
		sut.tableEntrySorter( tableEntries[ 0 ], tableEntries[ 1 ] ).should.be.within(-1, 1);
    });
  });

  describe('isHomeWin', function(){
    it('should return true for a home win', function(){
		sut.isHomeWin( new Result( 1, 0 ) ).should.be.true;
		sut.isHomeWin( new Result( 1, 1 ) ).should.be.false;
		sut.isHomeWin( new Result( 0, 1 ) ).should.be.false;
    });
  });

  describe('isHomeLoss', function(){
    it('should return true for a home loss', function(){
		sut.isHomeLoss( new Result( 1, 0 ) ).should.be.false;
		sut.isHomeLoss( new Result( 1, 1 ) ).should.be.false;
		sut.isHomeLoss( new Result( 0, 1 ) ).should.be.true;
    });
  });

  describe('isDraw', function(){
    it('should return true for a draw', function(){
		sut.isDraw( new Result( 1, 0 ) ).should.be.false;
		sut.isDraw( new Result( 1, 1 ) ).should.be.true;
		sut.isDraw( new Result( 0, 1 ) ).should.be.false;
    });
  });

  describe('getPointsForWin', function(){
    it('should return a number', function(){
		sut.getPointsForWin().should.be.a.Number;
    });
  });

  describe('getPointsForDraw', function(){
    it('should return a number', function(){
		sut.getPointsForDraw().should.be.a.Number;
    });
  });

  describe('getPointsForLoss', function(){
    it('should return a number', function(){
		sut.getPointsForLoss().should.be.a.Number;
    });
  });
});
