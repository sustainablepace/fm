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

(function ($) {
    var calendar;
    var season;
    var year = 2014;
    var teams = {};
    var dfb;
    var viewBl1;
    var viewBl2;
    var viewBl3;

    var createSeason = function () {
        season = new Season(year, calendar);
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
        var associationFactory = new AssociationFactory();
        dfb = associationFactory.getAssociationGermany(teams);

        createSeason();
        updateView();

        $("#next").on("click", nextMatchHandler);
        $("#end").on("click", endSeasonHandler);
    };

    var calendarLoaded = $.get("data/calendar.json").done(function (data) {
        calendar = JSON.stringify(data);
    });

    $.when(TeamFactoryBundesliga3.getPromise(), TeamFactoryBundesliga2.getPromise(), TeamFactoryBundesliga1.getPromise(), calendarLoaded).done(function (data) {
        teams[TeamFactoryBundesliga1.getKey()] = TeamFactoryBundesliga1.get();
        teams[TeamFactoryBundesliga2.getKey()] = TeamFactoryBundesliga2.get();
        teams[TeamFactoryBundesliga3.getKey()] = TeamFactoryBundesliga3.get();
        init();
    }).fail(function () {
        throw "Could not load data.";
    });
}(jQuery));
