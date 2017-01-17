'use strict';

var Datastore = require('nedb');

var todo = new Datastore({
  filename: __dirname + '/../../../db/todo.db',
  autoload: true
});

module.exports = todo;
