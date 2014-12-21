(function(exports) {
	"use strict";
	var Team    = require("./team.js").Team;
	var Match   = require("./match.js").Match;
	var Fixture = require("./fixture.js").Fixture;
	var Round   = require("./round.js").Round;
	var Table   = require("./table.js").Table;
	
	var Season = function( teams ) {
		var self = this;

		this.teams = teams;
		
		var createFixtures = function( teams ) {
			var pool     = [];
			var numTeams = teams.length;
			self.rounds  = [];
			
			for( var i = 0; i < numTeams; i++ ) {
				pool.push( i );
			}
			
			for( var j = 0; j < numTeams - 1 ; j++ ) {
				var roundFirstHalf  = new Round();		
				var roundSecondHalf = new Round();		
				
				for( var k = 0; k < numTeams / 2; k++ ) {
					var team1 = pool[ k                ];
					var team2 = pool[ numTeams - k - 1 ];
					
					roundFirstHalf.addFixture( 
						new Fixture( 
							new Match( 
								self.teams[ team1 ], 
								self.teams[ team2 ] 
							), 
							team1, 
							team2 
						)
					);
					roundSecondHalf.addFixture( 
						new Fixture( 
							new Match( 
								self.teams[ team2 ], 
								self.teams[ team1 ] 
							), 
							team2, 
							team1 
						)
					);
				}
				self.rounds[ j                ] = roundFirstHalf;		
				self.rounds[ j + numTeams - 1 ] = roundSecondHalf;		

				// See http://en.wikipedia.org/wiki/Round-robin_tournament#Scheduling_algorithm
				var pivot = pool.shift();
				var first = pool.shift();
				pool.push( first );
				pool.unshift( pivot );
			}
		};
		
		this.playNext = function( resultCalculator ) {
			for( var i in this.rounds ) {
				var round = this.rounds[ i ];
				if( round.isFinished() ) {
					continue;
				}
				for( var j in round.fixtures ) {
					var fixture = round.fixtures[ j ];
					if( !fixture.match.isPlayed() ) {
						fixture.match.play( resultCalculator );
					}
				}
				break;
			}
		};

		this.play = function( resultCalculator ) {
			for( var i in this.rounds ) {
				var round = this.rounds[ i ];
				for( var j in round.fixtures ) {
					var fixture = round.fixtures[ j ];
					if( !fixture.match.isPlayed() ) {
						fixture.match.play( resultCalculator );
					}
				}
			}
		};

		this.calculateTable = function( rules ) {
			return new Table( this, rules );
		};
		
		this.fixtures = null;
		createFixtures( this.teams );
	};
	exports.Season = Season;
})(this);
