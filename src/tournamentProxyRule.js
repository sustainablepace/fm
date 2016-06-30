(function(exports) {
	"use strict";

	var Table = require("./table.js").Table;

	var TournamentProxyRule = function( sourceTournamentIds, sinkTournamentIds, positions ) {
		this.sourceTournamentIds = sourceTournamentIds;
		this.sinkTournamentIds = sinkTournamentIds;
		this.positions = positions;
	};

	TournamentProxyRule.prototype.pick = function( sourceTournaments, sinkTournaments ) {
		var teams = [];
		for( var i in this.sourceTournamentIds ) {
			var id = this.sourceTournamentIds[ i ];
			if( sourceTournaments && sourceTournaments[ id ] ) {
				var tournament = sourceTournaments[ id ];
				var table = new Table( tournament );
				for( var j in this.positions ) {
					var pos = this.positions[ j ];
					teams.push( table.pick( pos ) );
				}
			} else {
				throw "Cannot pick teams, source tournament " + id + " is missing.";
			}
		}
		return teams;
	};

	TournamentProxyRule.prototype.proxy = function( sourceTournaments, sinkTournaments ) {
		var teams = this.pick( sourceTournaments, sinkTournaments );			
		for( var k in this.sinkTournamentIds ) {
			var id = this.sinkTournamentIds[ k ];
			if( sinkTournaments && sinkTournaments[ id ] ) {
				var sinkTournament = sinkTournaments[ id ];
				sinkTournament.addTeams( teams );
			} else {
				throw "Cannot execute rule, sink tournament " + id + " is missing.";
			}
		}
	};

	exports.TournamentProxyRule = TournamentProxyRule;
})(this);


