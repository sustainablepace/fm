(function(exports) {
	"use strict";

	var FixtureScheduler = require("./fixtureScheduler.js").FixtureScheduler;
	var ResultCalculator = require("./resultCalculator.js").ResultCalculator;
	var Rules = require("./rules.js").Rules;

	var TournamentConfig = function( scheduler, resultCalculator, rules ) {
		if( scheduler instanceof FixtureScheduler ) {
			this.scheduler = scheduler;
		} else {
			throw "Cannot set scheduler, scheduler is not a FixtureScheduler";
		}

		if( resultCalculator instanceof ResultCalculator ) {
			this.resultCalculator = resultCalculator;
		} else {
			throw "Cannot set resultCalculator, resultCalculator is not a ResultCalculator";
		}
		
		if( rules instanceof Rules ) {
			this.rules = rules;
		} else {
			throw "Cannot set rules, rules are not Rules";
		}
	};
	
	TournamentConfig.prototype.getScheduler = function() {
		return this.scheduler;
	};

	TournamentConfig.prototype.getResultCalculator = function() {
		return this.resultCalculator;
	};

	TournamentConfig.prototype.getRules = function() {
		return this.rules;
	};

	exports.TournamentConfig = TournamentConfig;
})(this);
