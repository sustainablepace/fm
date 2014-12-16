(function(exports) {
	"use strict";
	var Result   = require("./result.js").Result;

	var Match = function( home, away ) {
		this.home   = home;
		this.away   = away;
		this.result = null;

		this.play = function() {
			if( this.home.strength > this.away.strength ) {
				this.result = new Result( 1, 0 );
			}
			else if( this.home.strength < this.away.strength ) {
				this.result = new Result( 0, 1 );
			}
			else {
				this.result = new Result( 0, 0 );
			}
		};
	};
	exports.Match = Match;
})(this);
