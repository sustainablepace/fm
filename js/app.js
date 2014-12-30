"use strict";

window.$ = window.jQuery = require('jquery');
var bootstrap = require("bootstrap");

var AssociationFactory = require("./associationFactory.js").AssociationFactory;
var Association = require("./association.js").Association;
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



(function($){
	var calendar;
	var season;
	var year = 2014;
	var teams = {};
	var dfb;

	var createSeason = function() {
		season = new Season( year, calendar );
		dfb.schedule( season );
		
		createView( dfb.getTournament( 'BL1' ) );
		createView( dfb.getTournament( 'BL2' ) );
		createView( dfb.getTournament( 'BL3' ) );

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
		updateTable( dfb.getTournament( 'BL1' ) );
		updateTable( dfb.getTournament( 'BL2' ) );
		updateTable( dfb.getTournament( 'BL3' ) );
		updateLastRound( dfb.getTournament( 'BL1' ) );
		updateLastRound( dfb.getTournament( 'BL2' ) );
		updateLastRound( dfb.getTournament( 'BL3' ) );
		updateNextRound( dfb.getTournament( 'BL1' ) );
		updateNextRound( dfb.getTournament( 'BL2' ) );
		updateNextRound( dfb.getTournament( 'BL3' ) );
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
		var associationFactory = new AssociationFactory();
		dfb = associationFactory.getAssociationGermany( teams );
		
		$( "#create" ).on( "click", createHandler );
		$( "#next" ).on( "click", nextMatchHandler );
		$( "#end" ).on( "click", endSeasonHandler );
	};
	var teamsLoadedBl3 = $.get( "data/bl3.json" ).done( function( data ) {
		teams[ 'BL3' ] = data;
	} );
	var teamsLoadedBl2 = $.get( "data/bl2.json" ).done( function( data ) {
		teams[ 'BL2' ] = data;
	} );
	var teamsLoadedBl1 = $.get( "data/bl1.json" ).done( function( data ) {
		teams[ 'BL1' ] = data;
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
