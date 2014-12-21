(function(exports) {
	"use strict";
	var Fixture = require("./fixture.js").Fixture;
	
	var Round = function() {
		var self = this;

		this.fixtures = [];

		this.addFixture = function( fixture ) {
			if( fixture instanceof Fixture ) {
				this.fixtures.push( fixture );
			} else {
				throw "Argument is not a Fixture.";
			}
		};

		this.isFinished = function() {
			for( var i in this.fixtures ) {
				var fixture = this.fixtures[ i ];
				if( !fixture.match.isPlayed() ) {
					return false;
				}
			}
			return true;
		}
	
	};
	exports.Round = Round;
})(this);
