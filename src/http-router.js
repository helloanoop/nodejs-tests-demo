"use strict";

var todoRouter = require('./api/todo');

var HttpRouter = function(options){
  this.options = options;
};

HttpRouter.prototype.route = function(){
  var app = this.options.app;

  app.use(todoRouter);

  app.use(function(req, res, next){
    res.status(404).send('The resource you were looking was not found');
  });
}

module.exports = HttpRouter;