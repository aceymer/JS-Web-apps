'use strict';

angular.module('virtualunitedApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main',
        resolve: {
          syllabuses: function(Syllabus) {
            return Syllabus.query().$promise;
          }
        }
      });
  });
