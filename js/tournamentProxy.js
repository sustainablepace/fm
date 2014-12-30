(function(exports) {
	"use strict";

	var TournamentProxyRule = require("./tournamentProxyRule.js").TournamentProxyRule;

	var TournamentProxy = function() {
		this.init();
	};
	
	TournamentProxy.prototype.init = function() {
		this.rules = [];
	};
	
	TournamentProxy.prototype.addRule = function( rule ) {
		if( rule instanceof TournamentProxyRule ) {
			this.rules.push( rule );
		} else {
			throw "Cannot add rule, is not a TournamentProxyRule.";
		}
	};

	TournamentProxy.prototype.getSourceTournamentIds = function() {
		return this.getTournamentIds( true );
	};

	TournamentProxy.prototype.getSinkTournamentIds = function() {
		return this.getTournamentIds( false );
	};

	TournamentProxy.prototype.getTournamentIds = function( isSource ) {
		var pool = [];
		for( var i in this.rules ) {
			var ids = isSource ? this.rules[ i ].sourceTournamentIds : this.rules[ i ].sinkTournamentIds;
			for( var j in ids ) {
				if( !~pool.indexOf( ids[ j ] ) ) {
					pool.push( ids[ j ] );
				}
			}
		}
		return pool;
	};
	
	TournamentProxy.prototype.proxy = function( sourceTournaments, sinkTournaments ) {
		for( var i in this.rules ) {
			this.rules[ i ].proxy( sourceTournaments, sinkTournaments );
		}
	};

	exports.TournamentProxy = TournamentProxy;
})(this);


