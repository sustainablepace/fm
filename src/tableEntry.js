(function(exports) {
	"use strict";

	var Result = require("./result.js").Result;
	
	var TableEntry = function( team ) {
		this.team = team;
		
		this.init();
	};
	
	TableEntry.prototype.init = function() {
		this.points       = 0;
		this.wins         = 0;
		this.draws        = 0;
		this.losses       = 0;
		this.goalsFor     = 0;
		this.goalsAgainst = 0;
		this.gamesPlayed  = 0;
	};
	
	TableEntry.prototype.update = function( result, rules, isHome ) {
		if( result instanceof Result ) {
			var res = isHome ? result: result.reverse();
			
			this.addGamesPlayed( 1 );
			this.addGoalsFor( res.goalsHome );
			this.addGoalsAgainst( res.goalsAway );
			if( rules.isHomeWin( res ) ) {
				this.addPoints( rules.getPointsForWin() );
				this.addWin();
			}
			else if( rules.isHomeLoss( res ) ) {
				this.addPoints( rules.getPointsForLoss() );
				this.addLoss();
			}
			else if( rules.isDraw( res ) ) {
				this.addPoints( rules.getPointsForDraw() );
				this.addDraw();
			} else {
				throw "Undefined result, neither win, loss or draw.";
			}
			return this;
		}
		throw "Undefined result, cannot update.";
	};
	
	TableEntry.prototype.addPoints = function( points ) {
		this.points += points; 
	};
	
	TableEntry.prototype.addGoalsFor = function( goals ) {
		this.goalsFor += goals; 
	};
	
	TableEntry.prototype.addGoalsAgainst = function( goals ) {
		this.goalsAgainst += goals; 
	};
	
	TableEntry.prototype.addGamesPlayed = function( gamesPlayed ) {
		this.gamesPlayed += gamesPlayed;
	};
	
	TableEntry.prototype.addWin = function() {
		this.wins++;
	};
	
	TableEntry.prototype.addLoss = function() {
		this.losses++;
	};
	
	TableEntry.prototype.addDraw = function() {
		this.draws++;
	};	

	exports.TableEntry = TableEntry;
})(this);
