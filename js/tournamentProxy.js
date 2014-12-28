(function(exports) {
	"use strict";

	var TournamentProxyRule = require("./tournamentProxyRule.js").TournamentProxyRule;

	var TournamentProxy = function() {
		var self = this;

		this.rules = [];

		this.addRule = function( rule ) {
			if( rule instanceof TournamentProxyRule ) {
				this.rules.push( rule );
			} else {
				throw "Cannot add rule, is not a TournamentProxyRule.";
			}
		};

		this.proxy = function() {
			for( var i in this.rules ) {
				this.rules[ i ].proxy();
			}
		};

	};
	exports.TournamentProxy = TournamentProxy;
})(this);


