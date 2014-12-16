(function(exports) {
	"use strict";
	var Fixture = function( match, i, j ) {
		this.home = i;
		this.away = j;
		this.match = match;
	};
	exports.Fixture = Fixture;
})(this);