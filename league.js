(function(exports) {
	"use strict";
	var Team    = require("./team.js").Team;
	var Match   = require("./match.js").Match;
	var Fixture = require("./fixture.js").Fixture;
	
	var League = function( numTeams ) {
		var self = this;

		this.teams    = [];
		for( var i = 0; i < numTeams; i++ ) {
			this.teams.push( new Team() );
		}
		
		var createFixtures = function( teams ) {
			var pool      = [];
			var numTeams  = teams.length;
			self.fixtures = [];
			
			for( var i = 0; i < numTeams; i++ ) {
				pool.push( i );
			}
			
			for( var j = 0; j < numTeams - 1 ; j++ ) {
				self.fixtures[ j                ] = [];		
				self.fixtures[ j + numTeams - 1 ] = [];		
				
				for( var k = 0; k < numTeams / 2; k++ ) {
					var team1 = pool[ k ];
					var team2 = pool[ numTeams - k - 1 ];
					self.fixtures[ j ].push( 
						new Fixture( new Match( self.teams[ team1 ], self.teams[ team2 ] ), team1, team2 )
					);
					self.fixtures[ j + numTeams - 1 ].push( 
						new Fixture( new Match( self.teams[ team2 ], self.teams[ team1 ] ), team2, team1 ) 
					);
				}
				var pivot = pool.shift();
				var first = pool.shift();
				pool.push( first );
				pool.unshift( pivot );
			}
		};
		
		this.play = function() {
			for( var i in this.fixtures ) {
				var matchday = this.fixtures[ i ];
				for( var j in matchday ) {
					var fixture = matchday[ j ];
					fixture.match.play();
				}
			}
		};

		this.calculateTable = function() {
			return new Table( this );
		};
		
		this.fixtures = null;
		createFixtures( this.teams );
	};
	exports.League = League;
})(this);