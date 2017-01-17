var assert = require("assert");
var chai = require('chai');
var should = chai.should();
var mockery = require('mockery');
var sinon = require("sinon");
var expect = chai.expect;

describe('Log helper', function(){
  var spies, stubs;

  beforeEach(function(){
    stubs = {
      winston : {info : function(){}}
    };

    spies = {
      winstonLogSpy : sinon.spy(stubs.winston, "info")
    };

    mockery.registerMock('winston', stubs.winston);
  });

  it('should log the request', function(done){
    var logHelper =  require("./log-helper");
    var next = function(){};

    spies.callbackSpy = sinon.spy(next);

    logHelper.log({path : '/todo'}, {}, spies.callbackSpy);

    assert(spies.winstonLogSpy.calledOnce);
    assert(spies.callbackSpy.calledOnce);
    done();
  });
});