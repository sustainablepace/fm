(function(exports) {
	"use strict";
	var TableEntry = require("./tableEntry.js").TableEntry;
	
	var Table = function( tournament ) {
		this.tournament = tournament;
		
		this.init();
	};

	Table.prototype.init = function() {
		this.ranking = null;
		
		this.calculate();
	};
	
	Table.prototype.calculate = function() {
		this.entries = {};
		for( var i in this.tournament.teams ) {
			this.entries[ this.tournament.teams[ i ].id ] = new TableEntry( this.tournament.teams[ i ] );
		}

		for( var i in this.tournament.fixtures.rounds ) {
			var round = this.tournament.fixtures.rounds[ i ];
			for( var j in round.fixtures ) {
				var match = round.fixtures[ j ];
				this.entries[ match.home.id ].update( match.result, this.tournament.config.getRules(), true );
				this.entries[ match.away.id ].update( match.result, this.tournament.config.getRules(), false );
			}
		}
	};
	
	Table.prototype.pick = function( pos ) {
		var ranking = this.getRanking();
		if( pos > 0 && pos <= ranking.length ) {
			var entry = ranking[ pos - 1 ];
			return entry.team;
		}
		else if( pos < 0 && pos >= -1 * ranking.length ) {
			var entry = ranking[ ranking.length + pos ];
			return entry.team;
		}
		throw "Cannot pick team at position " + pos + ". The table has " + ranking.length + " entries.";
	};

	Table.prototype.getRanking = function() {
		if( this.ranking === null ) {
			var ranking = [];
			for( var i in this.entries ) {
				ranking.push( this.entries[ i ] );
			}
			ranking.sort( this.tournament.config.getRules().tableEntrySorter );
			this.ranking = ranking;
		}
		return this.ranking;
	};

	exports.Table = Table;
})(this);
