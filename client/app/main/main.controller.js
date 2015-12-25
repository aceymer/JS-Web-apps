'use strict';

(function() {

  angular.module('virtualunitedApp')
    .controller('MainController', function ($scope, $state, $stateParams, socket, Syllabus) {
      $scope.syllabuses  = Syllabus.query();
      $scope.goToCourse = function(syllabus, event){
          $state.go('syllabus', {id:syllabus._id});
    };
    });

})();
