(function (exports) {
    "use strict";
    var TeamFactory = require("./TeamFactory.js").TeamFactory;
    var jQuery = require('jquery');


    var TeamFactoryFile = function (key, filename) {
        this.init(key, filename);
    };

    TeamFactoryFile.prototype = new TeamFactory();
    TeamFactoryFile.prototype.parent = TeamFactory.prototype;

    TeamFactoryFile.prototype.init = function (key, filename) {
        this.key = key;
        this.teams = [];
        this.promise = null;
        this.promise = jQuery.get(filename).done(this.handler.bind(this));
    };

    TeamFactoryFile.prototype.handler = function (data) {
        this.teams = data;
    };

    TeamFactoryFile.prototype.getKey = function () {
        return this.key;
    };

    TeamFactoryFile.prototype.get = function () {
        return this.teams;
    };

    TeamFactoryFile.prototype.getPromise = function () {
        return this.promise;
    };

    exports.TeamFactoryFile = TeamFactoryFile;
})(this);
