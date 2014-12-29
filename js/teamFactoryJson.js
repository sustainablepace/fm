(function(exports) {
	"use strict";
	var Team        = require("./team.js").Team;
	var TeamFactory = require("./teamFactory.js").TeamFactory;
	
	var TeamFactoryJson = function() {
		this.init();
	};

	TeamFactoryJson.prototype = new TeamFactory();
	TeamFactoryJson.prototype.parent = TeamFactory.prototype;
	
	TeamFactoryJson.prototype.init = function() {
		this.teams = [];
	};
	
	TeamFactoryJson.prototype.get = function( json ) {
		var data = eval('(' + json + ')');
		for( var i = 0; i < data.length; i++ ) {
			this.teams.push( new Team( data[ i ] ) );
		}
		return this.teams;
	}
	
	exports.TeamFactoryJson = TeamFactoryJson;
})(this);
