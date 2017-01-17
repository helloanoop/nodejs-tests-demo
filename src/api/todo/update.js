'use strict';

var Todo = require('./todo');

module.exports = function(req, res, next){

  Todo.update({
    _id : req.params.id
  }, {
    $set: {
      description: req.body.description,
      done: req.body.done
    }
  },  { 
    multi: true,
    returnUpdatedDocs : true
  }, function (err, numAffected, affectedDocuments) {
    if(err){
      return res.json({
        error : err
      });
    }
    
    return res.json(affectedDocuments);
  });
}