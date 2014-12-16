(function(exports) {
	"use strict";
	var TableEntry = require("./tableEntry.js").TableEntry;
	
	var Table = function( league ) {
		this.league = league;
		this.entries = [];

		for( var i in league.teams ) {
			this.entries.push( new TableEntry( league.teams[ i ] ) );
		}
		for( var i in league.fixtures ) {
			var matchday = league.fixtures[ i ];
			for( var j in matchday ) {
				var fixture = matchday[ j ];
				var result  = fixture.match.result;
				if( result !== null ) {
					this.entries[ fixture.home ].addGamesPlayed( 1 );
					this.entries[ fixture.away ].addGamesPlayed( 1 );
					this.entries[ fixture.home ].addGoalsFor( result.goalsHome );
					this.entries[ fixture.home ].addGoalsAgainst( result.goalsAway );
					this.entries[ fixture.away ].addGoalsFor( result.goalsAway );
					this.entries[ fixture.away ].addGoalsAgainst( result.goalsHome );
					if( result.goalsHome > result.goalsAway ) {
						this.entries[ fixture.home ].addPoints( 3 );
					}
					else if( result.goalsHome < result.goalsAway ) {
						this.entries[ fixture.away ].addPoints( 3 );
					}
					else {
						this.entries[ fixture.away ].addPoints( 1 );
						this.entries[ fixture.home ].addPoints( 1 );
					}
				}
				
			}
		}
		var tableSorter = function(x, y){ 
			if (x.points < y.points) {
				return 1;
			} else if (x.points > y.points) {
				return -1;
			}
			if (x.gf - x.ga < y.gf - y.ga ) {
				return 1;
			} else if (x.gf - x.ga > y.gf - y.ga ) {
				return -1;
			}
			if (x.gf < y.gf ) {
				return 1;
			} else if (x.gf > y.ga ) {
				return -1;
			}
			return 0;
		};
		
		this.entries.sort( tableSorter );
	};
	exports.Table = Table;
})(this);
