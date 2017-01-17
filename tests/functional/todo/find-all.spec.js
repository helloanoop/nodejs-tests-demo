var mockery = require('mockery');
var sinon = require("sinon");
var request = require('supertest');

describe('GET /todo', function(){
  var spies, stubs;

  beforeEach(function(){
    stubs = {
      todo : {
        find : function(options, callback){
          return callback(null, [{
            _id : 'bZOAcdMdYZyxl4it',
            description : 'Drink Milk',
            done : true
          }, {
            _id : 'gt6AcdMdYZyx78ut',
            description : 'Run 5 Rounds',
            done : true
          }]);
        }
      }
    };

    mockery.registerMock('./todo', stubs.todo);
  });

  it('should return a list of todos', function(done){
    var httpServer = require('../../../src/index');
    var app = httpServer.app;
      
    var expectedTodos = [{
      _id : 'bZOAcdMdYZyxl4it',
      description : 'Drink Milk',
      done : true
    }, {
      _id : 'gt6AcdMdYZyx78ut',
      description : 'Run 5 Rounds',
      done : true
    }];

    request(app)
    .get('/todo')
    .send()
    .expect(200, expectedTodos, done);
  });
});