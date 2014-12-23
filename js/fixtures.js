(function(exports) {
	"use strict";
	
	var Fixtures = function() {
		this.rounds  = [];
		
		this.addRound = function( round ) {
			this.rounds.push( round );
		};
		
		this.isFinished = function() {
			for( var i in this.rounds ) {
				if( !this.rounds[ i ].isFinished() ) {
					return false;
				}
			}
			return true;
		};
		
		this.playNext = function( resultCalculator ) {
			for( var i in this.rounds ) {
				var round = this.rounds[ i ];
				if( round.isFinished() ) {
					continue;
				}
				for( var j in round.fixtures ) {
					var fixture = round.fixtures[ j ];
					if( !fixture.match.isPlayed() ) {
						fixture.match.play( resultCalculator );
					}
				}
				break;
			}
		};

		this.play = function( resultCalculator ) {
			for( var i in this.rounds ) {
				var round = this.rounds[ i ];
				for( var j in round.fixtures ) {
					var fixture = round.fixtures[ j ];
					if( !fixture.match.isPlayed() ) {
						fixture.match.play( resultCalculator );
					}
				}
			}
		};
	};
	exports.Fixtures = Fixtures;

})(this);
