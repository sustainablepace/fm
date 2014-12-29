var assert = require("assert");
var should = require("should");

var Match = require("../match.js").Match;

var Team = require("../team.js").Team;
var Result = require("../result.js").Result;
var ResultCalculatorDeterministic = require("../resultCalculatorDeterministic.js").ResultCalculatorDeterministic;

describe('Match', function(){

  var sut = null;
  var home = null;
  var away = null;
  var resultCalculator = null;

  beforeEach( function() {
	home = new Team();
	away = new Team();
	sut = new Match( home, away );
	resultCalculator = new ResultCalculatorDeterministic();
  } );
  
  afterEach( function() {
	sut = null;
	home = null;
	away = null;
	resultCalculator = null;
  } );
  
  describe('constructor', function(){
    it('should have a home and away team', function(){
		sut.should.have.property( 'home' );
        sut.home.should.eql( home );
		sut.should.have.property( 'away' );
	    sut.away.should.eql( away );
		sut.should.have.property( 'result' );
        (sut.result === null).should.be.true;
    });
  });
  describe('play', function(){
    it('should lead to a result', function(){
		sut.play( resultCalculator );
		sut.should.have.property( 'result' );
        sut.result.should.be.an.instanceOf( Result );
    });
  });
});
