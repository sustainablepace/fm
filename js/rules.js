(function(exports) {
	"use strict";

	var Rules = function() {
		this.init();
	};
	
	Rules.prototype.init = function() {
		this.POINTS_WIN  = 3;
		this.POINTS_DRAW = 1;
		this.POINTS_LOSS = 0;
	};
	
	Rules.prototype.tableEntrySorter = function(tableEntry1, tableEntry2){ 
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

	Rules.prototype.getPointsForWin = function() {
		return this.POINTS_WIN;
	};

	Rules.prototype.getPointsForDraw = function() {
		return this.POINTS_DRAW;
	};
	
	Rules.prototype.getPointsForLoss = function() {
		return this.POINTS_LOSS;
	};
	
	Rules.prototype.isHomeWin = function( result ) {
		return result.goalsHome > result.goalsAway;
	};

	Rules.prototype.isHomeLoss = function( result ) {
		return result.goalsHome < result.goalsAway;
	};

	Rules.prototype.isDraw = function( result ) {
		return result.goalsHome === result.goalsAway;
	};

	exports.Rules = Rules;
})(this);
