var assert = require("assert");
var should = require("should");
var Team   = require("../team.js").Team;
var Match  = require("../match.js").Match;
var Result = require("../result.js").Result;
var ResultCalculatorDeterministic = require("../resultCalculatorDeterministic.js").ResultCalculatorDeterministic;
describe('Match', function(){
  describe('attr', function(){
    it('should have a home and away team', function(){
		var home = new Team();
		var away = new Team();
		var match = new Match( home, away );
		match.should.have.property( 'home' );
        	match.home.should.eql( home );
		match.should.have.property( 'away' );
	        match.away.should.eql( away );
		match.should.have.property( 'result' );
        	(match.result === null).should.be.true;
    });
  });
  describe('play', function(){
    it('should lead to a result', function(){
		var home = new Team();
		var away = new Team();
		var match = new Match( home, away );
		var resultCalculator = new ResultCalculatorDeterministic();
		match.play( resultCalculator );
		match.should.have.property( 'result' );
        match.result.should.be.an.instanceOf( Result );
    });
  });
});
