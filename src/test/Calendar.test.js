var assert  = require("assert");
var should  = require("should");
var moment  = require("moment");

var Calendar = require("../Calendar.js").Calendar;

describe('Calendar', function(){
    var sut = null;

    beforeEach( function() {
        sut = new Calendar();
    } );

    afterEach( function() {
        sut = null;
    } );

    describe('getDate', function() {
        it('should have the correct date', function(){
            sut = new Calendar(2016);
            sut.getDate().should.be.instanceOf(moment);
        });
    });

    describe('getFormattedDate', function() {
        it('should have the correct formatted date', function(){
            sut = new Calendar(2016);
            sut.getFormattedDate().should.eql("Jul 11th 2016");
        });
    });

    describe('fastForward', function() {
        it('should have the correct formatted date', function(){
            sut = new Calendar(2016);
            sut.getFormattedDate().should.eql("Jul 11th 2016");
        });
    });

});
