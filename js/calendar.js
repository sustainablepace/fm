(function(exports) {
	"use strict";
	var moment = require('moment');

	var Calendar = function( json, year ) {
		var self = this;
		var data = eval('(' + json + ')');
		
		var startOfSeason = moment( year + '-W28-1' );
		this.eventsPast     = {};
		this.eventsUpcoming = {};
		this.tournaments    = {};
		
		for( var i in data ) {
			var date = moment( year + '-' + i );
			if( this.now.isBefore( date ) ) {
				this.eventsUpcoming[ date.format( 'YYYY-MM-DD' ) ] = data[ i ];
			} else {
				this.eventsPast[ date.format( 'YYYY-MM-DD' ) ] = data[ i ];
			}
		}
		
		this.isSchedulable = function( tournament ) {
			if( tournament.fixtures && tournament.fixtures.rounds ) {
				return tournament.fixtures.rounds.length === this.getNumberOfTournamentEvents( tournament );
			}
			throw "Cannot schedule tournament, no fixtures available.";
		};
		
		this.getNumberOfTournamentEvents = function( tournament ) {
			var num = 0;
			for( var i in this.events ) {
				if( ~this.eventsUpcoming[ i ].indexOf( tournament.id ) ) {
					num++;
				}
			}
			return num;
		};
		
		this.registerTournament = function( tournament ) {
			if( this.isSchedulable( tournament ) ) {
				this.tournaments[ tournament.id ] = tournament;
			}
		};
		
		this.next = function() {
			if( this.upcomingEvents ) {
			}
			this.now.add( 1, 'd' );
			
		}
		
		this.trigger = function() {
			
		}
	};

	exports.Calendar = Calendar;
})(this);
