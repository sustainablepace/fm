"use strict";

window.$ = window.jQuery = require('jquery');
var bootstrap  = require("bootstrap");
var Team       = require("./team.js").Team;
var Match      = require("./match.js").Match;
var Fixture    = require("./fixture.js").Fixture;
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
	var teams = [];
	var tournament;

	var createHandler = function() {
		season = new Season( year, calendar );
		tournament = new Tournament( 'BL3', season, scheduler, resultCalculator );
		tournament.setTeams( teams );
		season.registerTournament( tournament );
		var table = new Table( tournament, rules );
		updateTable( table );
//		$( "#matchday" ).text( season.now.format( 'MMM Do YYYY' ) );
	};
	var nextMatchHandler = function() {
		if( !(season instanceof Season) ) {
			throw "Create a season first.";
		}
		season.next();
		updateTable( new Table( tournament, rules ) );
//		$( "#matchday" ).text( season.now.format( 'MMM Do YYYY' ) );
		
	};
	var endSeasonHandler = function() {
		var season = league.getCurrentSeason();
		if( !(season instanceof Season) ) {
			throw "Create a season first.";
		}
		season.next();
		updateTable( new Table( tournament, rules ) );
		
	};
	var updateTable = function( table ) {
		var el = $( "#table tbody" );
		el.empty();
		for( var i = 0; i < table.entries.length; i++ ) {
			var row = $( "<tr></tr>" );
			row.append( $( "<td></td>" ).text( i + 1 ) );
			row.append( $( "<td></td>" ).text( table.entries[ i ].team.name ) );
			row.append( $( "<td></td>" ).text( table.entries[ i ].gamesPlayed ) );
			row.append( $( "<td></td>" ).text( table.entries[ i ].goalsFor ) );
			row.append( $( "<td></td>" ).text( table.entries[ i ].goalsAgainst ) );
			row.append( $( "<td></td>" ).text( table.entries[ i ].points ) );
			el.append( row );
		}
	};
	var init = function() {
		$( "#create" ).on( "click", createHandler );
		$( "#next" ).on( "click", nextMatchHandler );
		$( "#end" ).on( "click", endSeasonHandler );
	};
	var teamsLoaded = $.get( "data/teams.json" ).done( function( data ) {
		var teamFactory = new TeamFactoryJson();
		teams = teamFactory.get( JSON.stringify( data ) );
	} );
	var calendarLoaded = $.get( "data/calendar.json" ).done( function( data ) {
		calendar = JSON.stringify( data );
	} );
	$.when( teamsLoaded, calendarLoaded ).done( function( data ) {
		init();
	} ).fail( function() {
		throw "Could not load data.";
	});
}(jQuery));
