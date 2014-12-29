(function(exports) {
	"use strict";
	
	var Fixtures = function() {
		this.init();
	};
	
	Fixtures.prototype.init = function() {
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
	
	Fixtures.prototype.playNext = function( resultCalculator ) {
		for( var i in this.rounds ) {
			var round = this.rounds[ i ];
			if( round.isFinished() ) {
				continue;
			}
			for( var j in round.fixtures ) {
				var match = round.fixtures[ j ];
				if( !match.isPlayed() ) {
					match.play( resultCalculator );
				}
			}
			break;
		}
	};

	Fixtures.prototype.play = function( resultCalculator ) {
		for( var i in this.rounds ) {
			var round = this.rounds[ i ];
			for( var j in round.fixtures ) {
				var match = round.fixtures[ j ];
				if( !match.isPlayed() ) {
					match.play( resultCalculator );
				}
			}
		}
	};

	exports.Fixtures = Fixtures;

})(this);
