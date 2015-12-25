'use strict';

angular.module('virtualunitedApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('syllabus', {
        url: '/syllabus/:id',
        templateUrl: 'app/syllabus/syllabus.html',
        controller: 'SyllabusCtrl'
      });
  });
