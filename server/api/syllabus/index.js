'use strict';

var express = require('express');
var controller = require('./syllabus.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:sid/:wid', controller.getWeekplan);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.put('/:sid/:wid', controller.updateWeekplan);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
