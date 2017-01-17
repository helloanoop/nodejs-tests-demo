'use strict';

var Todo = require('./todo');

module.exports = function(req, res, next){

  Todo.find({}, function (err, todos) {
    if(err){
      return res.json({
        error : err
      });
    }
    
    return res.json(todos);
  });
}