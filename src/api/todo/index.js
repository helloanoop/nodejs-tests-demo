'use strict';

var express = require('express');
var router = express.Router();

var all = require('./find-all');
var find = require('./find');
var create = require('./create');
var update = require('./update');
var remove = require('./remove');

router.get('/todo', all);
router.get('/todo/:id', find);
router.post('/todo', create);
router.put('/todo/:id', update);
router.delete('/todo/:id', remove);

module.exports = router;