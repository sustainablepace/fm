(function(exports) {
	"use strict";

	var Table = require("./table.js").Table;

	var TournamentProxyRule = function( previousTournaments, nextTournaments, positions ) {
		this.previousTournaments = previousTournaments;
		this.nextTournaments = nextTournaments;
		this.positions = positions;
	};

	TournamentProxyRule.prototype.pick = function() {
		var teams = [];
		for( var i in this.positions ) {
			var pos = this.positions[ i ];
			for( var j in this.previousTournaments ) {
				var tournament = this.previousTournaments[ j ];
				var table = new Table( tournament );
				teams.push( table.pick( pos ) );
			}
		}
		return teams;
	};

	TournamentProxyRule.prototype.proxy = function() {
		var teams = this.pick();			
		for( var k in this.nextTournaments ) {
			var nextTournament = this.nextTournaments[ k ];
			nextTournament.addTeams( teams );
		}
	};

	exports.TournamentProxyRule = TournamentProxyRule;
})(this);


