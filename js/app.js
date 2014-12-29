"use strict";

window.$ = window.jQuery = require('jquery');
var bootstrap = require("bootstrap");

var Team = require("./team.js").Team;
var Match = require("./match.js").Match;
var Result = require("./result.js").Result;
var Rules = require("./rules.js").Rules;
var Season = require("./season.js").Season;
var Round = require("./round.js").Round;
var Tournament = require("./tournament.js").Tournament;
var TournamentConfig = require("./tournamentConfig.js").TournamentConfig;
var TournamentProxy = require("./tournamentProxy.js").TournamentProxy;
var TournamentProxyRule = require("./tournamentProxyRule.js").TournamentProxyRule;
var Table = require("./table.js").Table;
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
	var config = new TournamentConfig( scheduler, resultCalculator, rules );

	var tableTemplate = '<table class="table">\
		<thead>\
			<th>Pos</th>\
			<th>Name</th>\
			<th>Games played</th>\
			<th>Wins</th>\
			<th>Draws</th>\
			<th>Losses</th>\
			<th>Goals for</th>\
			<th>Goals against</th>\
			<th>Points</th>\
		</thead>\
		<tbody>\
		</tbody>\
	</table>';

	var roundTemplate = '<table class="table">\
		<tbody>\
		</tbody>\
	</table>';

	var tabsTemplate = '<div class="panel panel-default">\
		<div class="panel-heading"></div>\
		<div class="panel-body">\
			<div role="tabpanel">\
			<ul class="nav nav-tabs" role="tablist">\
				<li class="active" role="presentation"><a href="#" aria-controls="settings" role="tab" data-toggle="tab">Last match</a></li>\
				<li role="presentation"><a href="#" aria-controls="settings" role="tab" data-toggle="tab">Next match</a></li>\
				<li role="presentation"><a href="#" aria-controls="settings" role="tab" data-toggle="tab">Table</a></li>\
			</ul>\
			<div class="tab-content">\
				<div role="tabpanel" class="tab-pane active"></div>\
				<div role="tabpanel" class="tab-pane"></div>\
				<div role="tabpanel" class="tab-pane"></div>\
			</div>\
		</div>\
	  </div>\
	</div>';


	var createSeason = function() {
		season = new Season( year, calendar );
		if( tournamentBl3 instanceof Tournament && tournamentBl2 instanceof Tournament && tournamentBl1 instanceof Tournament ) {
			var proxy = new TournamentProxy();
			var nextBl3 = new Tournament( 'BL3', season, config );
			var nextBl2 = new Tournament( 'BL2', season, config );
			var nextBl1 = new Tournament( 'BL1', season, config );

			proxy.addRule( new TournamentProxyRule( [ tournamentBl1 ], [ nextBl1 ], [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ] ) );
			proxy.addRule( new TournamentProxyRule( [ tournamentBl1 ], [ nextBl2 ], [ -1, -2, -3 ] ) );
			proxy.addRule( new TournamentProxyRule( [ tournamentBl2 ], [ nextBl1 ], [ 1, 2, 3 ] ) );
			proxy.addRule( new TournamentProxyRule( [ tournamentBl2 ], [ nextBl2 ], [ 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ] ) );
			proxy.addRule( new TournamentProxyRule( [ tournamentBl2 ], [ nextBl3 ], [ -1, -2, -3 ] ) );
			proxy.addRule( new TournamentProxyRule( [ tournamentBl3 ], [ nextBl2 ], [ 1, 2, 3 ] ) );
			proxy.addRule( new TournamentProxyRule( [ tournamentBl3 ], [ nextBl3 ], [ 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ] ) );
			proxy.proxy();
			
			tournamentBl1 = nextBl1;
			tournamentBl2 = nextBl2;
			tournamentBl3 = nextBl3;
			tournamentBl1.schedule();
			tournamentBl2.schedule();
			tournamentBl3.schedule();
		} else {
			tournamentBl3 = new Tournament( 'BL3', season, config );
			tournamentBl3.addTeams( teamsBl3 ).schedule();
			tournamentBl2 = new Tournament( 'BL2', season, config );
			tournamentBl2.addTeams( teamsBl2 ).schedule();
			tournamentBl1 = new Tournament( 'BL1', season, config );
			tournamentBl1.addTeams( teamsBl1 ).schedule();
		}
		createView( tournamentBl1 );
		createView( tournamentBl2 );
		createView( tournamentBl3 );
		$( '#season' ).text( year + '/' + ( year + 1 ) );
	};

	var createView = function( tournament ) {
		var container = $( '#data' );
		var id = tournament.id.toLowerCase();
		if( container.find( '#' + id ).size() === 0 ) {
			var tabs = $( tabsTemplate ).attr( 'id', id ) ;
			tabs.find( '.panel-heading' ).text( tournament.id );
			tabs.find( 'a' ).eq( 0 ).attr( 'href', '#' + id + '-last' );
			tabs.find( 'a' ).eq( 1 ).attr( 'href', '#' + id + '-next' );
			tabs.find( 'a' ).eq( 2 ).attr( 'href', '#' + id + '-table' );
			tabs.find( '.tab-pane' ).eq( 0 ).attr( 'id', id + '-last' );
			tabs.find( '.tab-pane' ).eq( 1 ).attr( 'id', id + '-next' );
			tabs.find( '.tab-pane' ).eq( 2 ).attr( 'id', id + '-table' );
			container.append( tabs );
		}
	};

	var updateView = function() {
		updateTable( tournamentBl3 );
		updateTable( tournamentBl2 );
		updateTable( tournamentBl1 );
		updateLastRound( tournamentBl3 );
		updateLastRound( tournamentBl2 );
		updateLastRound( tournamentBl1 );
		updateNextRound( tournamentBl3 );
		updateNextRound( tournamentBl2 );
		updateNextRound( tournamentBl1 );
	};

	var createHandler = function() {
		createSeason();
		updateView();
	};
	var nextMatchHandler = function() {
		if( !(season instanceof Season) ) {
			throw "Create a season first.";
		}
		season.next();
		updateView();
	};
	var endSeasonHandler = function() {
		if( !(season instanceof Season) ) {
			throw "Create a season first.";
		}
		while( !season.isFinished() ) {
			season.next();
		}
		updateView();

		year++;
		createSeason();
	};
	var updateTable = function( tournament ) {
		$( "#matchday" ).text( season.getDate().format( 'MMM Do YYYY' ) );

		var table = new Table( tournament );
		var el = $( "#" + tournament.id.toLowerCase() + "-table" );
		var tableEl = $( tableTemplate );
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
			tableEl.find( 'tbody' ).append( row );
		}
		el.empty().append( tableEl );
	};

	var updateRound = function( tournament, round, type ) {
		var el = $( "#" + tournament.id.toLowerCase() + "-" + type );
		if( round === null ) {
			el.text( 'No matches.' );
			return;
		}
		var roundEl = $( roundTemplate );
		for( var i in round.fixtures ) {
			var match = round.fixtures[ i ];
			var row = $( "<tr></tr>" );
			row.append( $( '<td></td>' ).text( match.home.name + ' - ' + match.away.name ) );
			var result = match.result ? ( match.result.goalsHome + ':' + match.result.goalsAway ) : '-:-';
			row.append( $( '<td></td>' ).text( result ) );
			roundEl.find( 'tbody' ).append( row );
		}
		el.empty().append( roundEl );
	};

	var updateLastRound = function( tournament ) {
		var round = tournament.getLastRound();
		updateRound( tournament, round, 'last' );
	};

	var updateNextRound = function( tournament ) {
		var round = tournament.getNextRound();
		updateRound( tournament, round, 'next' );
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
