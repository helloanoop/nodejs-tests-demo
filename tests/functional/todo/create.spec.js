var mockery = require('mockery');
var sinon = require("sinon");
var request = require('supertest');

describe('POST /todo', function(){
  var spies, stubs;

  beforeEach(function(){
    stubs = {
      todo : {
        insert : function(todo, callback){
          return callback(null, {
            _id : 'bZOAcdMdYZyxl4it',
            description : todo.description,
            done : false
          });
        }
      }
    };

    mockery.registerMock('./todo', stubs.todo);
  });

  it('should create a todo', function(done){
    var httpServer = require('../../../src/index');
    var app = httpServer.app;
      
    var expectedTodo = {
      _id : 'bZOAcdMdYZyxl4it',
      description : 'Go to Sleep',
      done : false
    };

    request(app)
    .post('/todo')
    .send({
      description : 'Go to Sleep'
    })
    .expect(201, expectedTodo, done);
  });
});