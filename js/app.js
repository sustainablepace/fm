"use strict";

window.$ = window.jQuery = require('jquery');
var bootstrap  = require("bootstrap");
var Team       = require("./team.js").Team;
var Match      = require("./match.js").Match;
var Result     = require("./result.js").Result;
var Rules      = require("./rules.js").Rules;
var Season     = require("./season.js").Season;
var Round     = require("./round.js").Round;
var Tournament = require("./tournament.js").Tournament;
var TournamentProxy = require("./tournamentProxy.js").TournamentProxy;
var TournamentProxyRule = require("./tournamentProxyRule.js").TournamentProxyRule;
var Table      = require("./table.js").Table;
var TableEntry = require("./tableEntry.js").TableEntry;
var TeamFactoryJson = require("./teamFactoryJson.js").TeamFactoryJson;
var ResultCalculatorStrengthPlusRandom = require("./resultCalculatorStrengthPlusRandom.js").ResultCalculatorStrengthPlusRandom;
var FixtureSchedulerRoundRobinTwoLegs = require("./fixtureSchedulerRoundRobinTwoLegs.js").FixtureSchedulerRoundRobinTwoLegs;

(function($){
	var calendar;
	var season;
	var year = 2014;
	var rules = new Rules();
	var resultCalculator = new ResultCalculatorStrengthPlusRandom();
	var scheduler = new FixtureSchedulerRoundRobinTwoLegs();
	var teamsBl3 = [];
	var teamsBl2 = [];
	var teamsBl1 = [];
	var tournamentBl3;
	var tournamentBl2;
	var tournamentBl1;

	var createSeason = function() {
		season = new Season( year, calendar );
		if( tournamentBl3 instanceof Tournament && tournamentBl2 instanceof Tournament && tournamentBl1 instanceof Tournament ) {
			var proxy = new TournamentProxy();
			var nextBl3 = new Tournament( 'BL3', season, scheduler, resultCalculator );
			var nextBl2 = new Tournament( 'BL2', season, scheduler, resultCalculator );
			var nextBl1 = new Tournament( 'BL1', season, scheduler, resultCalculator );

			proxy.addRule( new TournamentProxyRule( [ tournamentBl1 ], [ nextBl1 ], [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ], rules ) );
			proxy.addRule( new TournamentProxyRule( [ tournamentBl1 ], [ nextBl2 ], [ -1, -2, -3 ], rules ) );
			proxy.addRule( new TournamentProxyRule( [ tournamentBl2 ], [ nextBl1 ], [ 1, 2, 3 ], rules ) );
			proxy.addRule( new TournamentProxyRule( [ tournamentBl2 ], [ nextBl2 ], [ 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ], rules ) );
			proxy.addRule( new TournamentProxyRule( [ tournamentBl2 ], [ nextBl3 ], [ -1, -2, -3 ], rules ) );
			proxy.addRule( new TournamentProxyRule( [ tournamentBl3 ], [ nextBl2 ], [ 1, 2, 3 ], rules ) );
			proxy.addRule( new TournamentProxyRule( [ tournamentBl3 ], [ nextBl3 ], [ 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ], rules ) );
			proxy.proxy();
			
			tournamentBl1 = nextBl1;
			tournamentBl2 = nextBl2;
			tournamentBl3 = nextBl3;
			tournamentBl1.schedule();
			tournamentBl2.schedule();
			tournamentBl3.schedule();
		} else {
			tournamentBl3 = new Tournament( 'BL3', season, scheduler, resultCalculator );
			tournamentBl3.addTeams( teamsBl3 ).schedule();
			tournamentBl2 = new Tournament( 'BL2', season, scheduler, resultCalculator );
			tournamentBl2.addTeams( teamsBl2 ).schedule();
			tournamentBl1 = new Tournament( 'BL1', season, scheduler, resultCalculator );
			tournamentBl1.addTeams( teamsBl1 ).schedule();
		}
	};

	var createHandler = function() {
		createSeason();
		updateTable( tournamentBl3 );
		updateTable( tournamentBl2 );
		updateTable( tournamentBl1 );
	};
	var nextMatchHandler = function() {
		if( !(season instanceof Season) ) {
			throw "Create a season first.";
		}
		season.next();
		updateTable( tournamentBl3 );
		updateTable( tournamentBl2 );
		updateTable( tournamentBl1 );
	};
	var endSeasonHandler = function() {
		if( !(season instanceof Season) ) {
			throw "Create a season first.";
		}
		while( !season.isFinished() ) {
			season.next();
		}
		updateTable( tournamentBl3 );
		updateTable( tournamentBl2 );
		updateTable( tournamentBl1 );

		year++;
		createSeason();
	};
	var updateTable = function( tournament ) {
		$( "#matchday" ).text( season.getDate().format( 'MMM Do YYYY' ) );

		var table = new Table( tournament, rules );
		var el = $( "#table-" + tournament.id.toLowerCase() + " tbody" );
		el.empty();
		var ranking = table.getRanking();
		for( var i = 0; i < ranking.length; i++ ) {
			var row = $( "<tr></tr>" );
			row.append( $( "<td></td>" ).text( i + 1 ) );
			row.append( $( "<td></td>" ).text( ranking[ i ].team.name ) );
			row.append( $( "<td></td>" ).text( ranking[ i ].gamesPlayed ) );
			row.append( $( "<td></td>" ).text( ranking[ i ].wins ) );
			row.append( $( "<td></td>" ).text( ranking[ i ].draws ) );
			row.append( $( "<td></td>" ).text( ranking[ i ].losses ) );
			row.append( $( "<td></td>" ).text( ranking[ i ].goalsFor ) );
			row.append( $( "<td></td>" ).text( ranking[ i ].goalsAgainst ) );
			row.append( $( "<td></td>" ).text( ranking[ i ].points ) );
			el.append( row );
		}
	};
	var init = function() {
		$( "#create" ).on( "click", createHandler );
		$( "#next" ).on( "click", nextMatchHandler );
		$( "#end" ).on( "click", endSeasonHandler );
	};
	var teamsLoadedBl3 = $.get( "data/bl3.json" ).done( function( data ) {
		var teamFactory = new TeamFactoryJson();
		teamsBl3 = teamFactory.get( JSON.stringify( data ) );
	} );
	var teamsLoadedBl2 = $.get( "data/bl2.json" ).done( function( data ) {
		var teamFactory = new TeamFactoryJson();
		teamsBl2 = teamFactory.get( JSON.stringify( data ) );
	} );
	var teamsLoadedBl1 = $.get( "data/bl1.json" ).done( function( data ) {
		var teamFactory = new TeamFactoryJson();
		teamsBl1 = teamFactory.get( JSON.stringify( data ) );
	} );
	var calendarLoaded = $.get( "data/calendar.json" ).done( function( data ) {
		calendar = JSON.stringify( data );
	} );
	$.when( teamsLoadedBl3, teamsLoadedBl2, teamsLoadedBl1, calendarLoaded ).done( function( data ) {
		init();
	} ).fail( function() {
		throw "Could not load data.";
	});
}(jQuery));
