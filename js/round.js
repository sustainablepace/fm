(function(exports) {
	"use strict";
	var Match = require("./match.js").Match;
	
	var Round = function() {
		this.init();
	};

	Round.prototype.init = function() {
		this.fixtures = [];
	};
	
	Round.prototype.addFixture = function( fixture ) {
		if( fixture instanceof Match ) {
			this.fixtures.push( fixture );
		} else {
			throw "Argument is not a Match.";
		}
	};

	Round.prototype.isFinished = function() {
		for( var i in this.fixtures ) {
			var match = this.fixtures[ i ];
			if( !match.isPlayed() ) {
				return false;
			}
		}
		return true;
	}
	
	exports.Round = Round;
})(this);
