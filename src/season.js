(function(exports) {
	"use strict";
	var moment = require('moment');
	var Tournament = require("./tournament.js").Tournament;

	var Season = function( year, calendarJson, calendar ) {
		this.year = year;
		this.calendarJson = calendarJson;
		this.cal = calendar;

		this.init();
	};

	Season.prototype.init = function() {
		this.now = 0;
		this.calendar = [];
		this.tournaments = null;

		this.startDate = moment( this.year + '-W28-1' );
		this.endDate = moment( this.startDate ).add( 1, 'y' ).subtract( 1, 'd' );

//        this.cal.addEvents(eval('(' + this.calendarJson + ')'));
		this.createCalendar( this.calendarJson );
	};
	
	Season.prototype.createCalendar = function( json ) {
		this.calendar = [];
		var cal  = eval('(' + json + ')');
		var date = moment( this.startDate );
		do {
			var event = null;
			var index = 'W' + date.format( 'W-E' );
			if( cal[ index ] ) {
				event = cal[ index ];
			}
			this.calendar.push( event );		
			date.add( 1, 'd' );
		} while( date.isBefore( this.endDate ) );
	};

	Season.prototype.isSchedulable = function( tournament ) {
		if( tournament.fixtures && tournament.fixtures.rounds ) {
			return tournament.fixtures.rounds.length === this.getNumberOfTournamentEvents( tournament );
		}
		throw "Cannot schedule tournament, no fixtures available.";
	};
	
	Season.prototype.getNumberOfTournamentEvents = function( tournament ) {
		var num = 0;
		for( var i in this.calendar ) {
			if( this.calendar[ i ] !== null && ~this.calendar[ i ].indexOf( tournament.id ) ) {
				num++;
			}
		}
		return num;
	};
	
	Season.prototype.registerTournament = function( tournament ) {
		if( this.isSchedulable( tournament ) ) {
			if( this.tournaments === null ) {
				this.tournaments = {};
			}
			this.tournaments[ tournament.id ] = tournament;
            this.cal.schedule(tournament);
		}
	};
	
	Season.prototype.unregisterTournament = function( tournament ) {
		if( this.isRegisteredTournament( tournament ) ) {
			delete this.tournaments[ tournament.id ];
		}
	};
	
	Season.prototype.isFinished = function() {
		return this.now > this.calendar.length - 1;
	};

	Season.prototype.isRegisteredTournament = function( tournament ) {
		return this.tournaments !== null && this.tournaments[ tournament.id ] instanceof Tournament;
	};

	Season.prototype.fastForward = function() {
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

	Season.prototype.getDate = function() {
		return moment( this.startDate ).add( this.now, 'd' );
	};

	Season.prototype.next = function() {
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
	
	Season.prototype.playAll = function() {
		while( !this.isFinished() ) {
			this.next();
		}
	};
		
	exports.Season = Season;
})(this);
