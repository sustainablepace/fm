(function (exports) {
    "use strict";
    var moment = require('moment');
    var Tournament = require("./tournament.js").Tournament;

    var Calendar = function (year) {
        this.startDate = moment(year + '-W28-1');
        this.init();
    };

    Calendar.prototype.init = function () {
        this.now = 0;
        this.events = {};
        this.endDate = moment(this.startDate).add(1, 'y').subtract(1, 'd');
        this.today = moment(this.startDate);
    };

    Calendar.prototype.index = function ( date ) {
        return date.format('YYYY-MM-DD');
    };

    Calendar.prototype.getDate = function () {
        return this.today;
    };

    Calendar.prototype.getFormattedDate = function () {
        return this.getDate().format('MMM Do YYYY');
    };

    Calendar.prototype.fastForward = function () {
        if(this.events[this.index(this.today)]) {
            return this;
        }
        this.today.add(1, 'd');
        return this.fastForward();
    };

    Calendar.prototype.getEvents = function() {
        return this.events;
    };

    Calendar.prototype.addEvent = function(date, event) {
        var index = this.index(date);
        if(!this.events[index]) {
            this.events[index] = [];
        }
        this.events[index].push( event );
    };

    Calendar.prototype.schedule = function(tournament) {
        var dates = tournament.config.getCalendar().get();
        var date = moment( this.startDate );
        do {
            var index = 'W' + date.format( 'W-E' );
            if( dates[ index ] ) {
                this.addEvent(date, tournament.id)
            }
            date.add( 1, 'd' );
        } while( date.isBefore( this.endDate ) );
    };
    exports.Calendar = Calendar;
})(this);

