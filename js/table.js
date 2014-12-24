(function(exports) {
	"use strict";
	var TableEntry = require("./tableEntry.js").TableEntry;
	
	var Table = function( tournament, rules ) {
		var self         = this;

		this.tournament  = tournament;
		this.entries     = [];

		var handleRound = function( round ) {
			for( var j in round.fixtures ) {
				handleFixture( round.fixtures[ j ] );
			}
		};

		var handleFixture = function( fixture ) {
			var result = fixture.match.result;
			if( result !== null ) {
				self.entries[ fixture.home ].addGamesPlayed( 1 );
				self.entries[ fixture.away ].addGamesPlayed( 1 );
				self.entries[ fixture.home ].addGoalsFor( result.goalsHome );
				self.entries[ fixture.home ].addGoalsAgainst( result.goalsAway );
				self.entries[ fixture.away ].addGoalsFor( result.goalsAway );
				self.entries[ fixture.away ].addGoalsAgainst( result.goalsHome );
				if( rules.isHomeWin( result ) ) {
					self.entries[ fixture.home ].addPoints( rules.getPointsForWin() );
					self.entries[ fixture.away ].addPoints( rules.getPointsForLoss() );
				}
				else if( rules.isHomeLoss( result ) ) {
					self.entries[ fixture.home ].addPoints( rules.getPointsForLoss() );
					self.entries[ fixture.away ].addPoints( rules.getPointsForWin() );
				}
				else if( rules.isDraw( result ) ) {
					self.entries[ fixture.away ].addPoints( rules.getPointsForDraw() );
					self.entries[ fixture.home ].addPoints( rules.getPointsForDraw() );
				} else {
					throw "Undefined result, neither win, loss or draw.";
				}
			}
		};

		for( var i in this.tournament.teams ) {
			this.entries.push( new TableEntry( tournament.teams[ i ] ) );
		}

		for( var i in tournament.fixtures.rounds ) {
			handleRound( tournament.fixtures.rounds[ i ] );
		}
		this.entries.sort( rules.tableEntrySorter );
	};
	exports.Table = Table;
})(this);
