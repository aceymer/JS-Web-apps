'use strict';

var express = require('express');
var controller = require('./syllabus.controller');

var router = express.Router();

router.get('/:sid/:wid', controller.getWeekplan);
router.get('/:id', controller.show);
router.get('/', controller.index);
router.post('/', controller.create);
router.put('/:sid/:wid', controller.updateWeekplan);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

export default router;
