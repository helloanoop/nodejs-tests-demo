'use strict';

var Todo = require('./todo');

module.exports = function(req, res, next){

  Todo.insert({
    description: req.body.description,
    done : false
  }, function (err, todo) {
    if(err){
      return res.json({
        error : err
      });
    }
    
    return res.status(201).json(todo);
  });
}