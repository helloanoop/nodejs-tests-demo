"use strict";

var config = require('config')
var HttpServer = require('./http-server');
var HttpRouter = require('./http-router');

var httpServer = new HttpServer();
var httpRouter = new HttpRouter({
  app : httpServer.app
});

httpRouter.route();

if(config.env !== 'test'){
  httpServer.start();
}

module.exports = httpServer;