'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose')),
    Schema = mongoose.Schema;

var WeekplanSchema = new mongoose.Schema({
  week: Date,
  topics: [{
    title: String,
    description: String
  }],
  literature: [{
    title: String,
    url: String
  }],
  syllabus: {
    type: Schema.ObjectId,
    ref: 'Syllabus'
  }
});

export default mongoose.model('Weekplan', WeekplanSchema);
