var mockery = require('mockery');
var sinon = require("sinon");
var request = require('supertest');

describe('GET /todo/:id', function(){
  var spies, stubs;

  beforeEach(function(){
    stubs = {
      todo : {
        find : function(options, callback){
          return callback(null, {
            _id : 'bZOAcdMdYZyxl4it',
            description : 'Go to Sleep',
            done : true
          });
        }
      }
    };

    mockery.registerMock('./todo', stubs.todo);
  });

  it('should return a todo', function(done){
    var httpServer = require('../../../src/index');
    var app = httpServer.app;
      
    var expectedTodo = {
      _id : 'bZOAcdMdYZyxl4it',
      description : 'Go to Sleep',
      done : true
    };

    request(app)
    .get('/todo/bZOAcdMdYZyxl4it')
    .send()
    .expect(200, expectedTodo, done);
  });
});