var assert = require("assert");
var chai = require('chai');
var should = chai.should();
var mockery = require('mockery');
var sinon = require("sinon");

describe('api/todo/find-all', function(){
  var stubs, spies, instances;

  beforeEach(function(done){
    instances = {
      todos : [{
        _id : 'bZOAcdMdYZyxl4it',
        description : 'Drink Milk',
        done : true
      }, {
        _id : 'gt6AcdMdYZyx78ut',
        description : 'Run 5 Rounds',
        done : true
      }]
    }

    stubs = {
      todo: { 
        find: function(options, callback){
          return callback(null, instances.todos);
        }
      },
      res : {
        json : sinon.spy()
      }
    };

    spies = {
      nextSpy : sinon.spy()
    };

    mockery.registerMock('./todo', stubs.todo);
    done();
  });

  it('should find all the todos', function(done){
    var all = require('./find-all');

    all({}, stubs.res, spies.nextSpy);
    
    assert(stubs.res.json.calledOnce);
    assert(stubs.res.json.getCall(0).args[0].should.eql(instances.todos));
    done();
  });

  it('should return error if an error occured while accessing db', function(done){
    stubs.todo.find = function(options, callback){ return callback({errCode : 52}, null); };

    var all = require('./find-all');

    all({}, stubs.res, spies.nextSpy);
    
    assert(stubs.res.json.calledOnce);
    assert(stubs.res.json.getCall(0).args[0].should.eql({error:{errCode : 52}}));
    done();
  });
});