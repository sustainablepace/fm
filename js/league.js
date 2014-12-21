(function(exports) {
	"use strict";
	var Season = require("./season.js").Season;
	
	var League = function( rules ) {
		var self  = this;

		this.seasons = [];
		this.rules   = rules;

		this.addSeason = function( teams ) {
			this.seasons.push( new Season( teams ) );
		}

		this.getCurrentSeason = function() {
			if( this.seasons.length === 0 ) {
				return null;
			}
			return this.seasons[ this.seasons.length - 1 ];
		}

	};
	exports.League = League;
})(this);
