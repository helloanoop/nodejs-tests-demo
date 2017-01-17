var assert = require("assert");
var chai = require('chai');
var should = chai.should();
var mockery = require('mockery');
var sinon = require("sinon");

describe('Http server', function(){
  var stubs, spies, instances;

  beforeEach(function(done){
    instances = {
      express: { use: function(){}, listen: function(){} }
    };

    stubs = {
      express: function(){ return instances.express; },

      logHelper : {
        log : "logger"
      },

      config : {
        server : {
          port : 8888
        }
      },

      bodyParser : {
        json : function(){ return "body-parser-json"},
        urlencoded : function(){ return "body-parser-url-encoded"}
      }
    };

    spies = {
      express: sinon.spy(stubs, "express"),

      appUse : sinon.spy(instances.express, "use"),
      appListen : sinon.spy(instances.express, "listen")
    };

    mockery.registerMock('express', stubs.express);
    mockery.registerMock('config', stubs.config);
    mockery.registerMock('body-parser', stubs.bodyParser);
    mockery.registerMock('./helpers/log-helper', stubs.logHelper);
    done();
  });

  it('should instantiate an instance of express', function(done){
    var HttpServer = require("./http-server");
    var httpServer = new HttpServer();

    assert(spies.express.calledWithNew());
    done();
  });

  it('should use logger as a middleware', function(done){
    var HttpServer = require("./http-server");
    var httpServer = new HttpServer();

    spies.appUse.getCall(0).args[0].should.equal(stubs.logHelper.log);
    done();
  });

  it('should use bodyParser json as a middleware', function(done){
    var HttpServer = require("./http-server");
    var httpServer = new HttpServer();

    spies.appUse.getCall(1).args[0].should.equal(stubs.bodyParser.json());
    done();
  });

  it('should use bodyParser json as a middleware', function(done){
    var HttpServer = require("./http-server");
    var httpServer = new HttpServer();

    spies.appUse.getCall(2).args[0].should.equal(stubs.bodyParser.urlencoded());
    done();
  });

  it('should listen for requests', function(done){
    var HttpServer = require("./http-server");
    var httpServer = new HttpServer();

    httpServer.start();
    assert(spies.appListen.called);
    done();
  });
});