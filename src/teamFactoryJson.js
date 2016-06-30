(function(exports) {
	"use strict";
	var Team        = require("./team.js").Team;
	var TeamFactory = require("./teamFactory.js").TeamFactory;
	
	var TeamFactoryJson = function() {
	};

	TeamFactoryJson.prototype = new TeamFactory();
	TeamFactoryJson.prototype.parent = TeamFactory.prototype;
	
	TeamFactoryJson.prototype.get = function( json ) {
		var teams = [];
		var data = eval('(' + json + ')');
		for( var i = 0; i < data.length; i++ ) {
			teams.push( new Team( data[ i ] ) );
		}
		return teams;
	}
	
	exports.TeamFactoryJson = TeamFactoryJson;
})(this);
