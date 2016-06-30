(function(exports) {
	"use strict";
	
	var Result = function( goalsHome, goalsAway) {
		this.goalsHome = goalsHome;
		this.goalsAway = goalsAway;
	};
	
	Result.prototype.reverse = function() {
		return new Result( this.goalsAway, this.goalsHome );
	};
	
	exports.Result = Result;
	
})(this);
