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
    week: Number,
    summary: String,
    topics: String,
    literature: String,
    videos: String,
    assignments: String,
    teaser: String
  }],
  year: Number
});

export default mongoose.model('Syllabus', SyllabusSchema);
