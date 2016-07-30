(function(exports) {
	"use strict";

	var Association = require("./association.js").Association;
	var Rules = require("./rules.js").Rules;
	var ResultCalculatorStrengthPlusRandom = require("./resultCalculatorStrengthPlusRandom.js").ResultCalculatorStrengthPlusRandom;
	var FixtureSchedulerRoundRobinTwoLegs = require("./fixtureSchedulerRoundRobinTwoLegs.js").FixtureSchedulerRoundRobinTwoLegs;
	var Tournament = require("./tournament.js").Tournament;
	var TournamentConfig = require("./tournamentConfig.js").TournamentConfig;
	var TournamentProxy = require("./tournamentProxy.js").TournamentProxy;
	var TournamentProxyRule = require("./tournamentProxyRule.js").TournamentProxyRule;
	var TeamFactoryJson = require("./teamFactoryJson.js").TeamFactoryJson;


	var AssociationFactory = function() {
		this.init();
	};
	
	AssociationFactory.prototype.init = function() {
	};

	AssociationFactory.prototype.getAssociationGermany = function( teamObj, calObj ) {
		var assoc = new Association();

		var configBl1 = new TournamentConfig(
			new FixtureSchedulerRoundRobinTwoLegs(),
			new ResultCalculatorStrengthPlusRandom(),
			new Rules(),
			calObj[ 'BL1' ]
		);

		var configBl2 = new TournamentConfig(
			new FixtureSchedulerRoundRobinTwoLegs(),
			new ResultCalculatorStrengthPlusRandom(),
			new Rules(),
			calObj[ 'BL2' ]
		);

		var configBl3 = new TournamentConfig(
			new FixtureSchedulerRoundRobinTwoLegs(),
			new ResultCalculatorStrengthPlusRandom(),
			new Rules(),
			calObj[ 'BL3' ]
		);

		assoc.addTournament( new Tournament( 'BL3', configBl3 ) )
			.addTournament( new Tournament( 'BL2', configBl2 ) )
			.addTournament( new Tournament( 'BL1', configBl1 ) );
			
		var teamFactory = new TeamFactoryJson();
		
		assoc.getTournament( 'BL3' ).addTeams( teamFactory.get( JSON.stringify( teamObj[ 'BL3' ] ) ) );
		assoc.getTournament( 'BL2' ).addTeams( teamFactory.get( JSON.stringify( teamObj[ 'BL2' ] ) ) );
		assoc.getTournament( 'BL1' ).addTeams( teamFactory.get( JSON.stringify( teamObj[ 'BL1' ] ) ) );

		var proxy = new TournamentProxy();
		proxy.addRule( new TournamentProxyRule( [ 'BL1' ], [ 'BL1' ], [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ] ) );
		proxy.addRule( new TournamentProxyRule( [ 'BL1' ], [ 'BL2' ], [ -1, -2, -3 ] ) );
		proxy.addRule( new TournamentProxyRule( [ 'BL2' ], [ 'BL1' ], [ 1, 2, 3 ] ) );
		proxy.addRule( new TournamentProxyRule( [ 'BL2' ], [ 'BL2' ], [ 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ] ) );
		proxy.addRule( new TournamentProxyRule( [ 'BL2' ], [ 'BL3' ], [ -1, -2, -3 ] ) );
		proxy.addRule( new TournamentProxyRule( [ 'BL3' ], [ 'BL2' ], [ 1, 2, 3 ] ) );
		proxy.addRule( new TournamentProxyRule( [ 'BL3' ], [ 'BL3' ], [ 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ] ) );
		
		assoc.setTournamentProxy( proxy );
		return assoc;
	};
	
	exports.AssociationFactory = AssociationFactory;
})(this);
