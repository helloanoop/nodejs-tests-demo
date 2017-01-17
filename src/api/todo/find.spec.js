var assert = require("assert");
var chai = require('chai');
var should = chai.should();
var mockery = require('mockery');
var sinon = require("sinon");

describe('api/todo/find', function(){
  var stubs, spies, instances;

  beforeEach(function(done){
    instances = {
      todo : {
        _id : 'bZOAcdMdYZyxl4it',
        description : 'Drink Milk',
        done : true
      }
    }

    stubs = {
      todo: { 
        find: function(options, callback){
          return callback(null, instances.todo);
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

  it('should find a todo by id', function(done){
    var find = require('./find');

    find({params:{id:1}}, stubs.res, spies.nextSpy);
    
    assert(stubs.res.json.calledOnce);
    assert(stubs.res.json.getCall(0).args[0].should.eql(instances.todo));
    done();
  });

  it('should return error if an error occured while accessing db', function(done){
    stubs.todo.find = function(options, callback){ return callback({errCode : 52}, null); };

    var find = require('./find');

    find({params:{id:1}}, stubs.res, spies.nextSpy);
    
    assert(stubs.res.json.calledOnce);
    assert(stubs.res.json.getCall(0).args[0].should.eql({error:{errCode : 52}}));
    done();
  });
});