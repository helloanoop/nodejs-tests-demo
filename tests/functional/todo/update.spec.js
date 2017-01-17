var mockery = require('mockery');
var sinon = require("sinon");
var request = require('supertest');

describe('PUT /todo/:id', function(){
  var spies, stubs;

  beforeEach(function(){
    stubs = {
      todo : {
        update : function(query, update, options, callback){
          return callback(null, 1, {
            _id : query._id,
            description : update.$set.description,
            done : update.$set.done
          });
        }
      }
    };

    mockery.registerMock('./todo', stubs.todo);
  });

  it('should update a todo', function(done){
    var httpServer = require('../../../src/index');
    var app = httpServer.app;
      
    var expectedTodo = {
      _id : 'bZOAcdMdYZyxl4it',
      description : 'Go to Sleep Later',
      done : true
    };

    request(app)
    .put('/todo/bZOAcdMdYZyxl4it')
    .set('Content-Type', 'application/json')
    // .field('description', 'my awesome avatar')
    .send({
      description : 'Go to Sleep Later',
      done : true
    })
    .expect(200, expectedTodo, done);
  });
});