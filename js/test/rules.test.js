var assert  = require("assert");
var should  = require("should");
var Rules = require("../rules.js").Rules;
var TableEntry = require("../tableEntry.js").TableEntry;
var TeamFactoryRandom = require("../teamFactoryRandom.js").TeamFactoryRandom;

describe('Rules', function(){
  describe('tableEntrySorter', function(){
    it('should return 0, 1 or -1', function(){
		var factory = new TeamFactoryRandom();
		var teams = factory.get( 2 );
		var rules = new Rules();
		var tableEntry1 = new TableEntry( teams[ 0 ] );		
		var tableEntry2 = new TableEntry( teams[ 1 ] );		
		var sorter = rules.tableEntrySorter;
		sorter.should.be.a.Function;
		sorter( tableEntry1, tableEntry2 ).should.be.within(-1, 1);
		
    });
  });
});
