(function(exports) {
	"use strict";

	var Rules = function() {
		var self = this;

		var POINTS_WIN  = 3;
		var POINTS_DRAW = 1;
		var POINTS_LOSS = 0;

		this.tableEntrySorter = function(tableEntry1, tableEntry2){ 
			if (tableEntry1.points < tableEntry2.points) {
				return 1;
			} else if (tableEntry1.points > tableEntry2.points) {
				return -1;
			}
			if (tableEntry1.gf - tableEntry1.ga < tableEntry2.gf - tableEntry2.ga ) {
				return 1;
			} else if (tableEntry1.gf - tableEntry1.ga > tableEntry2.gf - tableEntry2.ga ) {
				return -1;
			}
			if (tableEntry1.gf < tableEntry2.gf ) {
				return 1;
			} else if (tableEntry1.gf > tableEntry2.ga ) {
				return -1;
			}
			return 0;
		};

		this.getPointsForWin = function() {
			return POINTS_WIN;
		};

		this.getPointsForDraw = function() {
			return POINTS_DRAW;
		};
		
		this.getPointsForLoss = function() {
			return POINTS_LOSS;
		};
		
		this.isHomeWin = function( result ) {
			return result.goalsHome > result.goalsAway;
		};

		this.isHomeLoss = function( result ) {
			return result.goalsHome < result.goalsAway;
		};

		this.isDraw = function( result ) {
			return result.goalsHome === result.goalsAway;
		};
	};
	exports.Rules = Rules;
})(this);
