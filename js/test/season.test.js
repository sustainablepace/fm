var assert      = require("assert");
var should      = require("should");
var Season      = require("../season.js").Season;
var Team        = require("../team.js").Team;
var TeamFactoryRandom = require("../teamFactoryRandom.js").TeamFactoryRandom;
var Match       = require("../match.js").Match;
var Round       = require("../round.js").Round;
var Fixture     = require("../fixture.js").Fixture;
var Result      = require("../result.js").Result;
var ResultCalculatorDeterministic = require("../resultCalculatorDeterministic.js").ResultCalculatorDeterministic;

describe('Season', function(){
  describe('attr', function(){
    it('should have enough teams', function(){
		var factory = new TeamFactoryRandom();
		var teams = factory.get( 18 );
		var season = new Season( teams );
		season.should.have.property( 'teams' );
		season.teams.should.be.an.Array.with.lengthOf( 18 );
		season.teams.should.matchEach( function( it ) { it.should.be.instanceOf( Team ) } );
    });
  });
  describe('fixtures', function(){
    it('should have complete fixtures', function(){
		var factory = new TeamFactoryRandom();
		var teams = factory.get( 18 );
		var season = new Season( teams );
		season.should.have.property( 'rounds' );
		season.rounds.should.be.an.Array.with.lengthOf( 34 );
		season.rounds.should.matchEach( function( round ) { 
			round.should.be.an.instanceOf( Round );
			round.should.have.property( 'fixtures' );
			round.fixtures.should.be.an.Array.with.lengthOf( 9 );
			round.fixtures.should.matchEach( function( fixture ) {
				fixture.should.be.instanceOf( Fixture );
				fixture.should.have.property( 'match' );
				fixture.match.should.be.instanceOf( Match );
				fixture.match.should.have.property( 'result' );
				(fixture.match.result === null).should.be.true;
			});
		});
    });
  });
  describe('play', function(){
    it('should have fixtures with result after play', function(){
		var factory = new TeamFactoryRandom();
		var teams = factory.get( 18 );
		var season = new Season( teams );
		var resultCalculator = new ResultCalculatorDeterministic();
		season.play( resultCalculator );
		season.should.have.property( 'rounds' );
		season.rounds.should.be.an.Array.with.lengthOf( 34 );
		season.rounds.should.matchEach( function( round ) { 
			round.should.be.an.instanceOf( Round );
			round.should.have.property( 'fixtures' );
			round.fixtures.should.be.an.Array.with.lengthOf( 9 );
			round.fixtures.should.matchEach( function( fixture ) {
				fixture.should.be.instanceOf( Fixture );
				fixture.should.have.property( 'match' );
				fixture.match.should.be.instanceOf( Match );
				fixture.match.should.have.property( 'result' );
				fixture.match.result.should.be.an.instanceOf( Result );
			});
		});
    });
  });
  describe('playNext', function(){
    it('should have fixtures with result after playNext', function(){
		var factory = new TeamFactoryRandom();
		var teams = factory.get( 18 );
		var season = new Season( teams );
		var resultCalculator = new ResultCalculatorDeterministic();
		season.playNext( resultCalculator );
		season.should.have.property( 'rounds' );
		season.rounds.should.be.an.Array.with.lengthOf( 34 );
		var i = 0;
		season.rounds.should.matchEach( function( round ) { 
			round.should.be.an.instanceOf( Round );
			round.should.have.property( 'fixtures' );
			round.fixtures.should.be.an.Array.with.lengthOf( 9 );
			round.fixtures.should.matchEach( function( fixture ) {
				fixture.should.be.instanceOf( Fixture );
				fixture.should.have.property( 'match' );
				fixture.match.should.be.instanceOf( Match );
				fixture.match.should.have.property( 'result' );
				if( i === 0 ) {
					fixture.match.result.should.be.an.instanceOf( Result );
				} else {
					(fixture.match.result === null).should.be.true;
				}
			});
			i++;
		});
    });
  });
  describe('playNext x2', function(){
    it('should have fixtures with result after playNext', function(){
		var factory = new TeamFactoryRandom();
		var teams = factory.get( 18 );
		var season = new Season( teams );
		var resultCalculator = new ResultCalculatorDeterministic();
		season.playNext( resultCalculator );
		season.playNext( resultCalculator );
		season.should.have.property( 'rounds' );
		season.rounds.should.be.an.Array.with.lengthOf( 34 );
		var i = 0;
		season.rounds.should.matchEach( function( round ) { 
			round.should.be.an.instanceOf( Round );
			round.should.have.property( 'fixtures' );
			round.fixtures.should.be.an.Array.with.lengthOf( 9 );
			round.fixtures.should.matchEach( function( fixture ) {
				fixture.should.be.instanceOf( Fixture );
				fixture.should.have.property( 'match' );
				fixture.match.should.be.instanceOf( Match );
				fixture.match.should.have.property( 'result' );
				if( i === 0 || i === 1 ) {
					fixture.match.result.should.be.an.instanceOf( Result );
				} else {
					(fixture.match.result === null).should.be.true;
				}
			});
			i++;
		});
    });
  });
});
