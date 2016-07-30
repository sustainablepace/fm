"use strict";

window.$ = window.jQuery = require('jquery');
var bootstrap = require("bootstrap");

var AssociationFactory = require("./associationFactory.js").AssociationFactory;
var Season = require("./season.js").Season;
var Tournament = require("./tournament.js").Tournament;
var TournamentView = require("./Tournament/TournamentView.js").TournamentView;
var TeamFactoryBundesliga1 = require("./TeamFactory/TeamFactoryBundesliga1.js").TeamFactoryBundesliga1;
var TeamFactoryBundesliga2 = require("./TeamFactory/TeamFactoryBundesliga2.js").TeamFactoryBundesliga2;
var TeamFactoryBundesliga3 = require("./TeamFactory/TeamFactoryBundesliga3.js").TeamFactoryBundesliga3;
var TournamentCalendarBundesliga1 = require("./Tournament/TournamentCalendarBundesliga1.js").TournamentCalendarBundesliga1;
var TournamentCalendarBundesliga2 = require("./Tournament/TournamentCalendarBundesliga2.js").TournamentCalendarBundesliga2;
var TournamentCalendarBundesliga3 = require("./Tournament/TournamentCalendarBundesliga3.js").TournamentCalendarBundesliga3;

(function ($) {
    var calendar;
    var season;
    var year = 2014;
    var teams = {};
    var cals = {};
    var cal;
    var dfb;
    var viewBl1;
    var viewBl2;
    var viewBl3;

    var createSeason = function () {
        season = new Season(year, calendar, cal);
        dfb.schedule(season);

        viewBl1 = new TournamentView('#data', dfb.getTournament('BL1'));
        viewBl2 = new TournamentView('#data', dfb.getTournament('BL2'));
        viewBl3 = new TournamentView('#data', dfb.getTournament('BL3'));

        $('#season').text(year + '/' + ( year + 1 ));
    };

    var updateView = function () {
        $("#matchday").text(season.getDate().format('MMM Do YYYY'));
        viewBl1.render();
        viewBl2.render();
        viewBl3.render();
    };

    var nextMatchHandler = function () {
        season.next();
        updateView();
    };
    var endSeasonHandler = function () {
        while (!season.isFinished()) {
            season.next();
        }
        updateView();

        year++;
        createSeason();
    };

    var init = function () {
        cal = new Calendar(year);
        var associationFactory = new AssociationFactory();
        dfb = associationFactory.getAssociationGermany(teams, cals);

        createSeason();
        updateView();

        $("#next").on("click", nextMatchHandler);
        $("#end").on("click", endSeasonHandler);
    };

    var calendarLoaded = $.get("data/calendar.json").done(function (data) {
        calendar = JSON.stringify(data);
    });

    $.when(TeamFactoryBundesliga3.getPromise(),
        TeamFactoryBundesliga2.getPromise(),
        TeamFactoryBundesliga1.getPromise(),
        TournamentCalendarBundesliga1.getPromise(),
        TournamentCalendarBundesliga2.getPromise(),
        TournamentCalendarBundesliga3.getPromise(),
        calendarLoaded).done(function (data) {
        teams[TeamFactoryBundesliga1.getKey()] = TeamFactoryBundesliga1.get();
        teams[TeamFactoryBundesliga2.getKey()] = TeamFactoryBundesliga2.get();
        teams[TeamFactoryBundesliga3.getKey()] = TeamFactoryBundesliga3.get();
        cals[TeamFactoryBundesliga1.getKey()] = TournamentCalendarBundesliga1;
        cals[TeamFactoryBundesliga2.getKey()] = TournamentCalendarBundesliga2;
        cals[TeamFactoryBundesliga3.getKey()] = TournamentCalendarBundesliga3;
        init();
    }).fail(function () {
        throw "Could not load data.";
    });
}(jQuery));
