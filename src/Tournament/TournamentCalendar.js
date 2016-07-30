(function (exports) {
    "use strict";

    var Tournament = require("./../tournament.js").Tournament;
    var jQuery = require('jquery');

    var TournamentCalendar = function (filename) {
        this.promise = null;
        this.calendar = null;
        this.init(filename);
    };

    TournamentCalendar.prototype.init = function (filename) {
        if(filename) {
            this.promise = jQuery.get(filename).done(this.handler.bind(this));
        }
    };

    TournamentCalendar.prototype.handler = function (data) {
        this.calendar = data;
    };

    TournamentCalendar.prototype.get = function () {
        return this.calendar;
    };

    TournamentCalendar.prototype.getPromise = function () {
        return this.promise;
    };

    exports.TournamentCalendar = TournamentCalendar;
})(this);
