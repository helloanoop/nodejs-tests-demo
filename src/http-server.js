"use strict";

var express = require('express'),
    config = require('config'),
    winston = require('winston'),
    bodyParser = require('body-parser'),
    logHelper = require('./helpers/log-helper');


var HttpServer = function () {
  this.app = new express();

  this.app.use(logHelper.log);
  this.app.use(bodyParser.json());
  this.app.use(bodyParser.urlencoded({extended: true}));
};

/* Listen for Http Requests */
HttpServer.prototype.start = function start(){
	this.app.listen(config.server.port, function(){
		winston.info('Listening for Http Requests on Port : ' + config.server.port);
	});
};

module.exports = HttpServer;