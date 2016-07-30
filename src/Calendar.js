(function (exports) {
    "use strict";
    var moment = require('moment');
    var Tournament = require("./tournament.js").Tournament;

    var Calendar = function (year) {
        this.now = 0;
        this.startDate = moment(year + '-W28-1');
        this.endDate = moment(this.startDate).add(1, 'y').subtract(1, 'd');
        this.events = [];
        this.init();
    };

    Calendar.prototype.init = function () {
        var date = moment( this.startDate );
        do {
            this.events.push( null );
            date.add( 1, 'd' );
        } while( date.isBefore( this.endDate ) );
    };

    Calendar.prototype.getDate = function () {
        return moment(this.startDate).add(this.now, 'd');
    };

    Calendar.prototype.getFormattedDate = function () {
        return this.getDate().format('MMM Do YYYY');
    };

    Calendar.prototype.fastForward = function () {
        if (this.events.length == 0) {
            return this;
        }
        var events = this.events[this.now];
        if (events) {
            return this;
        }
        this.now++;
        return this.fastForward();
    };

    Calendar.prototype.schedule = function(tournament) {
        var dates = tournament.config.getCalendar().get();
    };
    exports.Calendar = Calendar;
})(this);

