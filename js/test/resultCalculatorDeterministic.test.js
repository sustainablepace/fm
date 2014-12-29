var assert = require("assert");
var should = require("should");

var ResultCalculatorDeterministic = require("../resultCalculatorDeterministic.js").ResultCalculatorDeterministic;

var Team = require("../team.js").Team;
var Match = require("../match.js").Match;
var Result = require("../result.js").Result;
var Rules = require("../rules.js").Rules;

describe('ResultCalculatorDeterministic', function(){
  
  var strongTeam = null;
  var weakTeam = null;
  var sut = null;
  var rules = null;

  beforeEach( function() {
	strongTeam = new Team({strength:1});
	weakTeam = new Team({strength:0});
	sut = new ResultCalculatorDeterministic();
    rules = new Rules();
  } );
  
  afterEach( function() {
	strongTeam = null;
	weakTeam = null;
	sut = null;
    rules = null;
  } );
  
  describe('play', function(){
    it('stronger home team always wins', function(){
		var match = new Match( strongTeam, weakTeam );
		var result = match.play( sut );
		result.should.be.instanceOf( Result );
		rules.isHomeWin( result ).should.be.true;
    });
  });
  describe('play', function(){
    it('stronger away team always wins', function(){
		var match = new Match( weakTeam, strongTeam );
		var result = match.play( sut );
		result.should.be.instanceOf( Result );
		rules.isHomeLoss( result ).should.be.true;
    });
  });
  describe('play', function(){
    it('equally strong teams always draw', function(){
		var match = new Match( strongTeam, strongTeam );
		var result = match.play( sut );
		result.should.be.instanceOf( Result );
		rules.isDraw( result ).should.be.true;
    });
  });
});
