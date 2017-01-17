"use strict";

var winston = require('winston');

exports.log = function (req, res, next) {
  var date = new Date();
  winston.info('Incoming request : ' + date.toString() + ' : ' + req.method + ' ' + req.path);
  next();
};