(function (exports) {
    "use strict";

    var Tournament = require("./../tournament.js").Tournament;
    var Table = require("./../table.js").Table;
    var jQuery = require('jquery');

    var TournamentView = function (container, tournament) {
        this.init(container, tournament);
    };

    var tabsTemplate = '<div class="panel panel-default">\
	<div class="panel-heading"></div>\
	<div class="panel-body">\
		<div role="tabpanel">\
		<ul class="nav nav-tabs" role="tablist">\
			<li class="active" role="presentation"><a href="#" aria-controls="settings" role="tab" data-toggle="tab">Last match</a></li>\
			<li role="presentation"><a href="#" aria-controls="settings" role="tab" data-toggle="tab">Next match</a></li>\
			<li role="presentation"><a href="#" aria-controls="settings" role="tab" data-toggle="tab">Table</a></li>\
		</ul>\
		<div class="tab-content">\
			<div role="tabpanel" class="tab-pane active"></div>\
			<div role="tabpanel" class="tab-pane"></div>\
			<div role="tabpanel" class="tab-pane"></div>\
		</div>\
	</div>\
  </div>\
</div>';


    var tableTemplate = '<table class="table">\
	<thead>\
		<th>Pos</th>\
		<th>Name</th>\
		<th>Games played</th>\
		<th>Wins</th>\
		<th>Draws</th>\
		<th>Losses</th>\
		<th>Goals for</th>\
		<th>Goals against</th>\
		<th>Points</th>\
	</thead>\
	<tbody>\
	</tbody>\
</table>';

    var roundTemplate = '<table class="table">\
	<tbody>\
	</tbody>\
</table>';


    TournamentView.prototype.init = function (el, tournament) {
        this.tournament = tournament;
        var container = $(el);
        var id = this.tournament.id.toLowerCase();
        if (container.find('#' + id).size() === 0) {
            var tabs = $(tabsTemplate).attr('id', id);
            tabs.find('.panel-heading').text(this.tournament.id);
            tabs.find('a').eq(0).attr('href', '#' + id + '-last');
            tabs.find('a').eq(1).attr('href', '#' + id + '-next');
            tabs.find('a').eq(2).attr('href', '#' + id + '-table');
            tabs.find('.tab-pane').eq(0).attr('id', id + '-last');
            tabs.find('.tab-pane').eq(1).attr('id', id + '-next');
            tabs.find('.tab-pane').eq(2).attr('id', id + '-table');
            container.append(tabs);
        }
    };

    TournamentView.prototype.updateTable = function () {
        var table = new Table(this.tournament);
        var el = jQuery("#" + this.tournament.id.toLowerCase() + "-table");
        var tableEl = jQuery(tableTemplate);
        var ranking = table.getRanking();
        for (var i = 0; i < ranking.length; i++) {
            var row = jQuery("<tr></tr>");
            row.append(jQuery("<td></td>").text(i + 1));
            row.append(jQuery("<td></td>").text(ranking[i].team.name));
            row.append(jQuery("<td></td>").text(ranking[i].gamesPlayed));
            row.append(jQuery("<td></td>").text(ranking[i].wins));
            row.append(jQuery("<td></td>").text(ranking[i].draws));
            row.append(jQuery("<td></td>").text(ranking[i].losses));
            row.append(jQuery("<td></td>").text(ranking[i].goalsFor));
            row.append(jQuery("<td></td>").text(ranking[i].goalsAgainst));
            row.append(jQuery("<td></td>").text(ranking[i].points));
            tableEl.find('tbody').append(row);
        }
        el.empty().append(tableEl);
        return this;
    };


    TournamentView.prototype.updateRound = function (round, type) {
        var el = $("#" + this.tournament.id.toLowerCase() + "-" + type);
        if (round === null) {
            el.text('No matches.');
            return this;
        }
        var roundEl = jQuery(roundTemplate);
        for (var i in round.fixtures) {
            var match = round.fixtures[i];
            var row = jQuery("<tr></tr>");
            row.append(jQuery('<td></td>').text(match.home.name + ' - ' + match.away.name));
            var result = match.result ? ( match.result.goalsHome + ':' + match.result.goalsAway ) : '-:-';
            row.append(jQuery('<td></td>').text(result));
            roundEl.find('tbody').append(row);
        }
        el.empty().append(roundEl);
        return this;
    };

    TournamentView.prototype.updateLastRound = function () {
        var round = this.tournament.getLastRound();
        return this.updateRound(round, 'last');
    };

    TournamentView.prototype.updateNextRound = function () {
        var round = this.tournament.getNextRound();
        return this.updateRound(round, 'next');
    };

    TournamentView.prototype.render = function() {
        return this.updateTable().updateLastRound().updateNextRound();
    };
    exports.TournamentView = TournamentView;
})(this);
