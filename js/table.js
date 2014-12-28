(function(exports) {
	"use strict";
	var TableEntry = require("./tableEntry.js").TableEntry;
	
	var Table = function( tournament, rules ) {
		var self         = this;

		this.tournament  = tournament;
		this.entries     = {};
		this.ranking     = null;

		var handleRound = function( round ) {
			for( var j in round.fixtures ) {
				handleFixture( round.fixtures[ j ] );
			}
		};

		var handleFixture = function( match ) {
			var result = match.result;
			if( result !== null ) {
				self.entries[ match.home.id ].addGamesPlayed( 1 );
				self.entries[ match.away.id ].addGamesPlayed( 1 );
				self.entries[ match.home.id ].addGoalsFor( result.goalsHome );
				self.entries[ match.home.id ].addGoalsAgainst( result.goalsAway );
				self.entries[ match.away.id ].addGoalsFor( result.goalsAway );
				self.entries[ match.away.id ].addGoalsAgainst( result.goalsHome );
				if( rules.isHomeWin( result ) ) {
					self.entries[ match.home.id ].addPoints( rules.getPointsForWin() );
					self.entries[ match.away.id ].addPoints( rules.getPointsForLoss() );
					self.entries[ match.home.id ].addWin();
					self.entries[ match.away.id ].addLoss();
				}
				else if( rules.isHomeLoss( result ) ) {
					self.entries[ match.home.id ].addPoints( rules.getPointsForLoss() );
					self.entries[ match.away.id ].addPoints( rules.getPointsForWin() );
					self.entries[ match.home.id ].addLoss();
					self.entries[ match.away.id ].addWin();
				}
				else if( rules.isDraw( result ) ) {
					self.entries[ match.away.id ].addPoints( rules.getPointsForDraw() );
					self.entries[ match.home.id ].addPoints( rules.getPointsForDraw() );
					self.entries[ match.home.id ].addDraw();
					self.entries[ match.away.id ].addDraw();
				} else {
					throw "Undefined result, neither win, loss or draw.";
				}
			}
		};

		this.getRanking = function() {
			if( this.ranking === null ) {
				var ranking = [];
				for( var i in this.entries ) {
					ranking.push( this.entries[ i ] );
				}
				ranking.sort( rules.tableEntrySorter );
				this.ranking = ranking;
			}
			return this.ranking;
		};

		this.pick = function( pos ) {
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

		for( var i in this.tournament.teams ) {
			this.entries[ tournament.teams[ i ].id ] = new TableEntry( tournament.teams[ i ] );
		}

		for( var i in tournament.fixtures.rounds ) {
			handleRound( tournament.fixtures.rounds[ i ] );
		}
	};
	exports.Table = Table;
})(this);
