'use strict';

angular.module('virtualunitedApp')
  .controller('WeekplanCtrl', function ($scope, $state, $stateParams, Weekplan) {
    $scope.weekplan = Weekplan.get({ id: $stateParams.id });
    $scope.goBack = function(){
        $state.go('syllabus', {id:$scope.weekplan.syllabus._id});
    };
    $scope.anotherGoodOne = 'https://www.youtube.com/watch?v=18-xvIjH8T4';

  });
