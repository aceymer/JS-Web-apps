'use strict';

angular.module('virtualunitedApp')
  .controller('WeekplanCtrl', function ($scope, $state, $stateParams, $sce, $mdToast,Syllabus) {
    Syllabus.getWeekplan({ id: $stateParams.sid, wid: $stateParams.wid }, function(syllabus){
      $scope.syllabus = syllabus;
      $scope.weekplan = syllabus.weekplans[0];
    });
    $scope.goBack = function(){
        $state.go('syllabus', {id:$scope.weekplan.syllabus._id});
    };
    $scope.edit = function(){
        $scope.editTopics = $scope.weekplan.topics;
        $scope.editPage = !$scope.editPage;

    };

    $scope.undo = function(){
        $scope.editPage = !$scope.editPage;
    };

    $scope.save = function(){
        $scope.syllabus.weekplans[0].topics = $scope.editTopics;
        Syllabus.update({ id: $scope.syllabus._id },$scope.syllabus, function(syllabus) {
          $scope.syllabus = syllabus
          $scope.weekplan = syllabus.weekplans[0];
          var toast = $mdToast.simple()
            .textContent('Weekplan updated')
            .action('OK')
            .highlightAction(false)
            .position('top');
          $mdToast.show(toast);
        });
        $scope.editPage = !$scope.editPage;
    };

    $scope.toTrusted = function(html_code) {
      return $sce.trustAsHtml(html_code);
    }

    $scope.anotherGoodOne = 'https://www.youtube.com/watch?v=18-xvIjH8T4';

  });
