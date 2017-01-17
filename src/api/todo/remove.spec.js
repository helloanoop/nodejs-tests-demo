var assert = require("assert");
var chai = require('chai');
var should = chai.should();
var mockery = require('mockery');
var sinon = require("sinon");

describe('api/todo/remove', function(){
  var stubs, spies;

  beforeEach(function(done){
    stubs = {
      todo: { 
        remove: function(query, options, callback){
          return callback(null);
        }
      },
      res : {
        json : sinon.spy(),
        end : sinon.spy()
      }
    };

    spies = {
      nextSpy : sinon.spy()
    };

    mockery.registerMock('./todo', stubs.todo);
    done();
  });

  it('should remove a todo by id', function(done){
    var remove = require('./remove');

    remove({params:{id:1}}, stubs.res, spies.nextSpy);
    
    assert(stubs.res.end.calledOnce);
    done();
  });

  it('should return error if an error occured while accessing db', function(done){
    stubs.todo.remove = function(query, options, callback){ return callback({errCode : 52}, null); };

    var remove = require('./remove');

    remove({params:{id:1}}, stubs.res, spies.nextSpy);
    
    assert(stubs.res.json.calledOnce);
    assert(stubs.res.json.getCall(0).args[0].should.eql({error:{errCode : 52}}));
    done();
  });
});