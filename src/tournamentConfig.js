(function (exports) {
    "use strict";

    var FixtureScheduler = require("./fixtureScheduler.js").FixtureScheduler;
    var ResultCalculator = require("./resultCalculator.js").ResultCalculator;
    var Rules = require("./rules.js").Rules;

    var TournamentConfig = function (scheduler, resultCalculator, rules, calendar) {
        this.scheduler = scheduler;
        this.resultCalculator = resultCalculator;
        this.rules = rules;
        this.calendar = calendar;
    };

    TournamentConfig.prototype.getScheduler = function () {
        return this.scheduler;
    };

    TournamentConfig.prototype.getResultCalculator = function () {
        return this.resultCalculator;
    };

    TournamentConfig.prototype.getRules = function () {
        return this.rules;
    };

    TournamentConfig.prototype.getCalendar = function () {
        return this.calendar;
    };

    exports.TournamentConfig = TournamentConfig;
})(this);
