'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var weekplanCtrlStub = {
  index: 'weekplanCtrl.index',
  show: 'weekplanCtrl.show',
  create: 'weekplanCtrl.create',
  update: 'weekplanCtrl.update',
  destroy: 'weekplanCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var weekplanIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './weekplan.controller': weekplanCtrlStub
});

describe('Weekplan API Router:', function() {

  it('should return an express router instance', function() {
    weekplanIndex.should.equal(routerStub);
  });

  describe('GET /api/weekplans', function() {

    it('should route to weekplan.controller.index', function() {
      routerStub.get
        .withArgs('/', 'weekplanCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/weekplans/:id', function() {

    it('should route to weekplan.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'weekplanCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/weekplans', function() {

    it('should route to weekplan.controller.create', function() {
      routerStub.post
        .withArgs('/', 'weekplanCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/weekplans/:id', function() {

    it('should route to weekplan.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'weekplanCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/weekplans/:id', function() {

    it('should route to weekplan.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'weekplanCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/weekplans/:id', function() {

    it('should route to weekplan.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'weekplanCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
