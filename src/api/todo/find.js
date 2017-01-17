'use strict';

var Todo = require('./todo');

module.exports = function(req, res, next){

  Todo.find({_id:req.params.id}, function (err, todo) {
    if(err){
      return res.json({
        error : err
      });
    }
    
    return res.json(todo);
  });
}