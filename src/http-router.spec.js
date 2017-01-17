var assert = require("assert");
var chai = require('chai');
var should = chai.should();
var mockery = require('mockery');
var sinon = require("sinon");

describe('Http router', function(){
  var stubs, spies;

  beforeEach(function(done){
    stubs = {
      todoRouter: 'todo-router',
      app : { use: function(){} }
    };

    spies = {
      appUse : sinon.spy(stubs.app, "use"),
    };

    mockery.registerMock('./api/todo', stubs.todoRouter);
    done();
  });

  it('should register the routes', function(done){
    var HttpRouter = require("./http-router");
    var httpRouter = new HttpRouter({
      app : stubs.app
    });

    httpRouter.route();

    assert(spies.appUse.getCall(0).args[0].should.equal(stubs.todoRouter));
    done();
  });
});