'use strict';

describe('Controller: WeekplanCtrl', function () {

  // load the controller's module
  beforeEach(module('virtualunitedApp'));

  var WeekplanCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WeekplanCtrl = $controller('WeekplanCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
