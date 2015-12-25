'use strict';

angular.module('virtualunitedApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('weekplan', {
        url: '/weekplan/:id',
        templateUrl: 'app/weekplan/weekplan.html',
        controller: 'WeekplanCtrl'
      });
  });
