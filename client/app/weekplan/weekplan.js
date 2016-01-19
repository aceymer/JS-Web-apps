'use strict';

angular.module('virtualunitedApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('weekplan', {
        url: '/weekplan/:sid/:wid',
        templateUrl: 'app/weekplan/weekplan.html',
        controller: 'WeekplanCtrl',
        resolve: {
          syllabus: function($stateParams, Syllabus) {
            return Syllabus.getWeekplan({
              id: $stateParams.sid,
              wid: $stateParams.wid
            }).$promise;
          }
        }
      });
  });
