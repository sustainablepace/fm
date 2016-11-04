"use strict";
import moment from 'moment'

export default class Calendar {

    constructor(year) {
        this.startDate = moment(year + '-W28-1', 'YYYY-W-E');
        this.init();
    };

    init() {
        this.now = 0;
        this.events = {};
        this.endDate = moment(this.startDate).add(1, 'y').subtract(1, 'd');
        this.today = moment(this.startDate);
    };

    static index(date) {
        return date.format('YYYY-MM-DD');
    };

    getDate() {
        return this.today;
    };

    getYear() {
        return parseInt(this.getDate().format('YYYY'), 10);
    };

    getWeek() {
        return parseInt(this.getDate().format('W'), 10);
    };

    getSeason() {
        if (this.getWeek() >= 28) {
            return this.getYear() + '/' + (this.getYear() + 1);
        }
        return (this.getYear() - 1 ) + '/' + this.getYear();
    };

    getFormattedDate() {
        return this.getDate().format('MMM Do YYYY');
    };

    fastForward() {
        if (this.events[this.index(this.today)]) {
            return this;
        }
        this.today.add(1, 'd');
        return this.fastForward();
    };

    getEvents() {
        return this.events;
    };

    addEvent(date, event) {
        var index = this.index(date);
        if (!this.events[index]) {
            this.events[index] = [];
        }
        this.events[index].push(event);
    };

    schedule(tournament) {
        var dates = tournament.config.getCalendar().get();
        var date = moment(this.startDate);
        do {
            var index = 'W' + date.format('W-E');
            if (dates[index]) {
                this.addEvent(date, tournament.id)
            }
            date.add(1, 'd');
        } while (date.isBefore(this.endDate));
    };

}