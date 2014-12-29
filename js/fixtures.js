(function(exports) {
	"use strict";
	
	var Match = require("./match.js").Match;

	var Fixtures = function() {
		this.init();
	};
	
	Fixtures.prototype.init = function() {
		this.nextRound = 0;
		this.rounds  = [];
	};
	
	Fixtures.prototype.addRound = function( round ) {
		this.rounds.push( round );
	};
	
	Fixtures.prototype.isFinished = function() {
		for( var i in this.rounds ) {
			if( !this.rounds[ i ].isFinished() ) {
				return false;
			}
		}
		return true;
	};

	Fixtures.prototype.getNextRoundNumber = function() {
		return this.nextRound;
	};

	Fixtures.prototype.getRound = function( i ) {
		if( i >= 0 && i < this.rounds.length ) {
			return this.rounds[ i ];
		}
		return null;
	};
	
	Fixtures.prototype.playNext = function( resultCalculator ) {
		var round = this.getRound( this.getNextRoundNumber() );
		if( round === null ) {
			return null;
		}
		for( var j in round.fixtures ) {
			var match = round.fixtures[ j ];
			if( match instanceof Match && !match.isPlayed() ) {
				match.play( resultCalculator );
			}
		}
		this.nextRound++;
	};

	Fixtures.prototype.play = function( resultCalculator ) {
		while( !this.isFinished() ) {
			this.playNext( resultCalculator );
		}
	};

	exports.Fixtures = Fixtures;

})(this);
