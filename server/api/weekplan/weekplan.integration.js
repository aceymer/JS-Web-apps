'use strict';

var app = require('../..');
import request from 'supertest';

var newWeekplan;

describe('Weekplan API:', function() {

  describe('GET /api/weekplans', function() {
    var weekplans;

    beforeEach(function(done) {
      request(app)
        .get('/api/weekplans')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          weekplans = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      weekplans.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/weekplans', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/weekplans')
        .send({
          name: 'New Weekplan',
          info: 'This is the brand new weekplan!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newWeekplan = res.body;
          done();
        });
    });

    it('should respond with the newly created weekplan', function() {
      newWeekplan.name.should.equal('New Weekplan');
      newWeekplan.info.should.equal('This is the brand new weekplan!!!');
    });

  });

  describe('GET /api/weekplans/:id', function() {
    var weekplan;

    beforeEach(function(done) {
      request(app)
        .get('/api/weekplans/' + newWeekplan._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          weekplan = res.body;
          done();
        });
    });

    afterEach(function() {
      weekplan = {};
    });

    it('should respond with the requested weekplan', function() {
      weekplan.name.should.equal('New Weekplan');
      weekplan.info.should.equal('This is the brand new weekplan!!!');
    });

  });

  describe('PUT /api/weekplans/:id', function() {
    var updatedWeekplan;

    beforeEach(function(done) {
      request(app)
        .put('/api/weekplans/' + newWeekplan._id)
        .send({
          name: 'Updated Weekplan',
          info: 'This is the updated weekplan!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedWeekplan = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedWeekplan = {};
    });

    it('should respond with the updated weekplan', function() {
      updatedWeekplan.name.should.equal('Updated Weekplan');
      updatedWeekplan.info.should.equal('This is the updated weekplan!!!');
    });

  });

  describe('DELETE /api/weekplans/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/weekplans/' + newWeekplan._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when weekplan does not exist', function(done) {
      request(app)
        .delete('/api/weekplans/' + newWeekplan._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
