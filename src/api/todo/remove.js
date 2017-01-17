'use strict';

var Todo = require('./todo');

module.exports = function(req, res, next){

  Todo.remove({_id:req.params.id}, {}, function (err, numRemoved) {
    if(err){
      return res.json({
        error : err
      });
    }
    
    return res.end();
  });
}