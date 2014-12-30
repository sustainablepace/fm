(function(exports) {
	"use strict";

	var Tournament = require("./tournament.js").Tournament;

	var Association = function() {
		this.init();
	};
	
	Association.prototype.init = function() {
		this.associations = [];
		this.tournaments = {};
		this.tournamentProxy = null;
		this.firstSeason = true;
	};

	Association.prototype.addAssociation = function( association ) {
		this.associations.push( association );
		return this;
	};

	Association.prototype.addTournament = function( tournament ) {
		this.tournaments[ tournament.id ] = tournament;
		return this;
	};

	Association.prototype.getTournament = function( id ) {
		if( this.tournaments[ id ] instanceof Tournament ) {
			return this.tournaments[ id ];
		}
		throw "Cannot get tournament " + id + ", it is not registered.";
	};

	Association.prototype.schedule = function( season ) {
		if( !this.firstSeason ) {
			this.proxy();
		}
		for( var id in this.tournaments ) {
			this.tournaments[ id ].schedule( season );
		}
		for( var i in this.associations ) {
			this.associations[ i ].schedule( season );
		}
		this.firstSeason = false;
	};
	
	Association.prototype.setTournamentProxy = function( proxy ) {
		this.tournamentProxy = proxy;
	};
	
	Association.prototype.getProxySources = function() {
		return this.getProxyTournaments( this.tournamentProxy.getSourceTournamentIds(), false );
	};
	
	Association.prototype.getProxySinks = function() {
		return this.getProxyTournaments( this.tournamentProxy.getSinkTournamentIds(), true );
	};
	
	Association.prototype.getProxyTournaments = function( ids, isClone ) {
		var tournaments = {};
		for( var i in ids ) {
			var id = ids[ i ];
			if( this.tournaments[ id ] ) {
				tournaments[ id ] = isClone ? this.tournaments[ id ].clone() : this.tournaments[ id ];
			} else {
				throw "Invalid tournament, " + id + " is not registered with association.";
			}
		}
		return tournaments;
	};
	
	Association.prototype.proxy = function() {
		var sinks = this.getProxySinks();
		this.tournamentProxy.proxy( this.getProxySources(), sinks );
		this.tournaments = sinks;
	};
	
	exports.Association = Association;
})(this);
