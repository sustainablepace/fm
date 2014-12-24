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
var Table      = require("./table.js").Table;
var TableEntry = require("./tableEntry.js").TableEntry;
var TeamFactoryJson = require("./teamFactoryJson.js").TeamFactoryJson;
var ResultCalculatorStrengthPlusRandom = require("./resultCalculatorStrengthPlusRandom.js").ResultCalculatorStrengthPlusRandom;

(function($){
	var league;
	var rules = new Rules();
	var resultCalculator = new ResultCalculatorStrengthPlusRandom();

	var createHandler = function( teams ) {
		league = new League();
		league.addSeason( teams );
		var season = league.getCurrentSeason();
		var table = season.calculateTable( rules );
		updateTable( table );
		$( "#matchday" ).text( "" );
	};
	var nextMatchHandler = function() {
		if( !(league instanceof League) ) {
			throw "Create a league first.";
		}
		var season = league.getCurrentSeason();
		if( !(season instanceof Season) ) {
			throw "Create a season first.";
		}
		season.playNext( resultCalculator );
		updateTable( season.calculateTable( rules ) );
		
	};
	var endSeasonHandler = function() {
		if( !(league instanceof League) ) {
			throw "Create a league first.";
		}
		var season = league.getCurrentSeason();
		if( !(season instanceof Season) ) {
			throw "Create a season first.";
		}
		season.play( resultCalculator );
		updateTable( season.calculateTable( rules ) );
		league.addSeason( season.teams );
		
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
	var init = function( teams ) {
		$( "#create" ).on( "click", function() {
			createHandler( teams );
		});
		$( "#next" ).on( "click", nextMatchHandler );
		$( "#end" ).on( "click", endSeasonHandler );
	};
	$.get( "data/teams.json" ).done( function( data ) {
		var teamFactory = new TeamFactoryJson();
		var teams = teamFactory.get( JSON.stringify( data ) );
		init( teams );
	} ).fail( function() {
		throw "Could not load data.";
	});
}(jQuery));
