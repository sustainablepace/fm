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
		tournamentBl3 = new Tournament( 'BL3', season, scheduler, resultCalculator );
		tournamentBl3.setTeams( teamsBl3 );
		tournamentBl2 = new Tournament( 'BL2', season, scheduler, resultCalculator );
		tournamentBl2.setTeams( teamsBl2 );
		tournamentBl1 = new Tournament( 'BL1', season, scheduler, resultCalculator );
		tournamentBl1.setTeams( teamsBl1 );
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
