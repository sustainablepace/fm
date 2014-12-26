(function(exports) {
	"use strict";
	var Match = require("./match.js").Match;
	
	var Round = function() {
		var self = this;

		this.fixtures = [];

		this.addFixture = function( fixture ) {
			if( fixture instanceof Match ) {
				this.fixtures.push( fixture );
			} else {
				throw "Argument is not a Match.";
			}
		};

		this.isFinished = function() {
			for( var i in this.fixtures ) {
				var match = this.fixtures[ i ];
				if( !match.isPlayed() ) {
					return false;
				}
			}
			return true;
		}
	
	};
	exports.Round = Round;
})(this);
