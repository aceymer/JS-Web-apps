'use strict';

angular.module('virtualunitedApp')
  .controller('WeekplanCtrl', function ($scope, $state, $stateParams, Syllabus) {
    Syllabus.getWeekplan({ id: $stateParams.sid, wid: $stateParams.wid }, function(syllabus){
      $scope.weekplan = syllabus.weekplans[0];
      $scope.weekplan.syllabus = syllabus;
    });
    $scope.goBack = function(){
        $state.go('syllabus', {id:$scope.weekplan.syllabus._id});
    };
    $scope.edit = function(){
        $scope.editPage = !$scope.editPage;
    };

    $scope.undo = function(){
        $scope.editPage = !$scope.editPage;
    };

    $scope.save = function(){
        $scope.editPage = !$scope.editPage;
    };

    $scope.anotherGoodOne = 'https://www.youtube.com/watch?v=18-xvIjH8T4';

  });
