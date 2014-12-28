(function(exports) {
	"use strict";
	var moment = require('moment');
	var Tournament  = require("./tournament.js").Tournament;

	var Season = function( year, calendarJson ) {
		var self = this;

		this.startDate = moment( year + '-W28-1' );
		this.endDate   = moment( this.startDate ).add( 1, 'y' ).subtract( 1, 'd' );

		this.tournaments    = null;
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
			for( var i in this.calendar ) {
				if( this.calendar[ i ] !== null && ~this.calendar[ i ].indexOf( tournament.id ) ) {
					num++;
				}
			}
			return num;
		};
		
		this.registerTournament = function( tournament ) {
			if( this.isSchedulable( tournament ) ) {
				if( this.tournaments === null ) {
					this.tournaments = {};
				}
				this.tournaments[ tournament.id ] = tournament;
			}
		};
		
		this.unregisterTournament = function( tournament ) {
			if( this.isRegisteredTournament( tournament ) ) {
				delete this.tournaments[ tournament.id ];
			}
		};
		
		this.isFinished = function() {
			return this.now > this.calendar.length - 1;
		};

		this.isRegisteredTournament = function( tournament ) {
			return this.tournaments !== null && this.tournaments[ tournament.id ] instanceof Tournament;
		};

		this.fastForward = function() {
			while( !this.isFinished() ) {
				var events = this.calendar[ this.now ];
				if( events ) {
					for( var i in events ) {
						if( this.tournaments !== null && this.tournaments[ events[ i ] ] ) {
							return this;
						}
					}
				}			
				this.now++;
			}
			return this;
		};

		this.getDate = function() {
			return moment( this.startDate ).add( this.now, 'd' );
		};

		this.next = function() {
			if( !this.isFinished() ) {
				this.fastForward();
				var events = this.calendar[ this.now ];
				if( events ) {
					for( var i in events ) {
						if( this.tournaments !== null && this.tournaments[ events[ i ] ] ) {
							this.tournaments[ events[ i ] ].playNext.apply( this.tournaments[ events[ i ] ], [] );
						}
					}
				}			
				this.now++;
			}
		};
		
		this.playAll = function() {
			while( !this.isFinished() ) {
				this.next();
			}
		};
		
	};

	exports.Season = Season;
})(this);
