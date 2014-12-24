(function(exports) {
	"use strict";
	var moment = require('moment');

	var Season = function( year, calendarJson ) {
		var self = this;

		this.startDate = moment( year + '-W28-1' );
		this.endDate   = moment( this.startDate ).add( 1, 'y' ).subtract( 1, 'd' );

		this.tournaments    = {};
		this.year           = year;
		this.calendar       = [];
		this.now            = 0;	

		var createCalendar = function( json ) {
			var cal  = eval('(' + json + ')');
			var date = moment( self.startDate );
			var endOfYear = moment( self.startDate ).endOf( 'year' );
			do {
				var event = null;
				var index = 'W' + date.format( 'W-E' );
				if( cal[ index ] ) {
					event = cal[ index ];
				}
				self.calendar.push( event );		
				date.add( 1, 'd' );
			} while( date.isBefore( self.endDate ) );
		}

		createCalendar( calendarJson );

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
		
		this.unregisterTournament = function( tournament ) {
			if( this.tournaments[ tournament.id ] ) {
				delete this.tournaments[ tournament.id ];
			}
		};
		
		this.next = function() {
			var events = this.calendar[ this.now ];
			if( events ) {
				for( var i in events ) {
					if( this.tournaments[ events[ i ] ] ) {
						this.tournaments[ events[ i ] ].playNext();
					}
				}
				this.now++;
			}			
			
		}
		
		this.trigger = function() {
			for( var i in this.tournaments ) {
				if( this.tournaments[ i ] instanceof Tournament ) {
					this.tournaments[ i ].playNext.apply( this.tournaments[ i ], [] );
				}
			}
		}
	};

	exports.Season = Season;
})(this);
