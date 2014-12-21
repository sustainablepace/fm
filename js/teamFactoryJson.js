(function(exports) {
	"use strict";
	var Team        = require("./team.js").Team;
	var TeamFactory = require("./teamFactory.js").TeamFactory;
	
	var TeamFactoryJson = function() {
		var self = this;
		this.teams = [];

		this.get = function( json ) {
			var data = eval('(' + json + ')');
			for( var i = 0; i < data.length; i++ ) {
				this.teams.push( new Team( data[ i ] ) );
			}
			return this.teams;
		}
	};
	TeamFactoryJson.prototype = new TeamFactory();

	exports.TeamFactoryJson = TeamFactoryJson;
})(this);
