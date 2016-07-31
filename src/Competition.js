(function(exports) {
    "use strict";


    var Competition = function( id, scheduler, resultCalculator, rules, calendar ) {
        this.id = id;
        this.scheduler = scheduler;
        this.resultCalculator = resultCalculator;
        this.rules = rules;
        this.calendar = calendar;
    };

    Competition.prototype.getScheduler = function () {
        return this.scheduler;
    };

    Competition.prototype.getResultCalculator = function () {
        return this.resultCalculator;
    };

    Competition.prototype.getRules = function () {
        return this.rules;
    };

    Competition.prototype.getCalendar = function () {
        return this.calendar;
    };

    Competition.prototype.createTournament = function () {
        return this.calendar;
    };

    exports.Competition = Competition;
})(this);
