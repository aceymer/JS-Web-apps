'use strict';

var express = require('express');
var controller = require('./syllabus.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/:sid/:wid', controller.getWeekplan);
router.get('/:id', controller.show);
router.get('/', controller.index);
router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:sid/:wid', auth.hasRole('admin'), controller.updateWeekplan);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/:id', auth.hasRole('admin'), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

export default router;
