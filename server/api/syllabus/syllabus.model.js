'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose')),
    Schema = mongoose.Schema;

var SyllabusSchema = new mongoose.Schema({
  iconurl: String,
  title: String,
  subtitle: String,
  education: String,
  course: String,
  class: String,
  lecturer: String,
  academy: String,
  weekplans: [{
    type: Schema.ObjectId,
    ref: 'Weekplan'
  }]
});

export default mongoose.model('Syllabus', SyllabusSchema);
