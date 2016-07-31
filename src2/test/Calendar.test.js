var assert  = require("assert");
var should  = require("should");
var moment  = require("moment");

var Calendar = require("../js/Calendar.js").Calendar;

describe('Calendar', function(){
    var sut = null;
    var tournament = null;

    beforeEach( function() {
        sut = new Calendar();
     //    var tournamentCalendarJson = "{\
	// 	'W50-6': true,\
	// 	'W4-6': true,\
	// 	'W5-6': true,\
	// 	'W6-6': true,\
	// 	'W7-6': true,\
	// 	'W8-6': true\
	// }";
     //    var tournamentCalendar = new TournamentCalendar();
     //    tournamentCalendar.calendar = eval('('+tournamentCalendarJson+')');
     //    config = new TournamentConfig( null, null, null, tournamentCalendar );
     //    tournament = new Tournament( 'BL1', config );
    //
    } );

    afterEach( function() {
        sut = null;
        // torunament = null;
    } );

    describe('getDate', function() {
        it('should have the correct date', function(){
            sut = new Calendar(2016);
            sut.getDate().should.be.instanceOf(moment);
        });
    });

    describe('getYear', function() {
        it('should have the correct year', function(){
            sut = new Calendar(2016);
            sut.getYear().should.eql(2016);
        });
    });

    describe('getWeek', function() {
        it('should have the correct week', function(){
            sut = new Calendar(2016);
            sut.getWeek().should.eql(28);
        });
    });

    describe('getSeason', function() {
        it('should have the correct season', function(){
            sut = new Calendar(2016);
            sut.getSeason().should.eql('2016/2017');
            sut.today.add(6, 'M');
            sut.getSeason().should.eql('2016/2017');
            sut.today.add(6, 'M');
            sut.getSeason().should.eql('2017/2018');
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

    describe('schedule', function() {
        xit('should schedule a tournament correctly', function() {
            sut = new Calendar(2016);
            sut.schedule(tournament);
            sut.getEvents().should.eql({
                '2016-12-17': [ 'BL1' ],
                '2017-01-28': [ 'BL1' ],
                '2017-02-04': [ 'BL1' ],
                '2017-02-11': [ 'BL1' ],
                '2017-02-18': [ 'BL1' ],
                '2017-02-25': [ 'BL1' ]
            });
        });
    });

    describe('fast forward', function() {
        xit('should fast forward to the next date', function() {
            sut = new Calendar(2016);
            sut.schedule(tournament);
            sut.getFormattedDate().should.eql("Jul 11th 2016");
            sut.fastForward();
            sut.getFormattedDate().should.eql("Dec 17th 2016");
            sut.fastForward();
            sut.getFormattedDate().should.eql("Dec 17th 2016");
            sut.today.add(1, 'd');
            sut.fastForward();
            sut.getFormattedDate().should.eql("Jan 28th 2017");
        });
    });
});
