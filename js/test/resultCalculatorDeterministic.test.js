var assert = require("assert");
var should = require("should");
var Team   = require("../team.js").Team;
var Match  = require("../match.js").Match;
var Result = require("../result.js").Result;
var Rules = require("../rules.js").Rules;
var ResultCalculatorDeterministic = require("../resultCalculatorDeterministic.js").ResultCalculatorDeterministic;
describe('ResultCalculatorDeterministic', function(){
  describe('play', function(){
    it('stronger home team always wins', function(){
		var home = new Team({strength:1});
		var away = new Team({strength:0});
		var match = new Match( home, away );
		var resultCalculator = new ResultCalculatorDeterministic();
		var result = match.play( resultCalculator );
		var rules = new Rules();
		rules.isHomeWin( result ).should.be.true;
    });
  });
  describe('play', function(){
    it('stronger away team always wins', function(){
		var home = new Team({strength:0});
		var away = new Team({strength:1});
		var match = new Match( home, away );
		var resultCalculator = new ResultCalculatorDeterministic();
		var result = match.play( resultCalculator );
		var rules = new Rules();
		rules.isHomeLoss( result ).should.be.true;
    });
  });
  describe('play', function(){
    it('equally strong teams always draw', function(){
		var home = new Team({strength:1});
		var away = new Team({strength:1});
		var match = new Match( home, away );
		var resultCalculator = new ResultCalculatorDeterministic();
		var result = match.play( resultCalculator );
		var rules = new Rules();
		rules.isDraw( result ).should.be.true;
    });
  });
});
