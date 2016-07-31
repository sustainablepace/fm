"use strict";

window.$ = window.jQuery = require('jquery');
var bootstrap = require("bootstrap");

var Calendar = require("./Calendar.js").Calendar;

(function ($) {
    var calendar = new Calendar(2016);

    var updateSeason = function(season) {
        $('#season').text(season);
    };

    var updateDate = function(date) {
        $('#matchday').text(date);
    };

    var updateView = function() {
        updateDate(calendar.getFormattedDate());
        updateSeason(calendar.getSeason());
    };

    var init = function () {
        updateView();
        $("#end").on("click", function() {
            calendar.today.add(1, 'y');
            updateView();
        });
        $("#month").on("click", function() {
            calendar.today.add(1, 'M');
            updateView();
        });
        $("#week").on("click", function() {
            calendar.today.add(1, 'w');
            updateView();
        });
        $("#day").on("click", function() {
            calendar.today.add(1, 'd');
            updateView();
        });
    };

    $(function() {
        init();
    });
}(jQuery));
