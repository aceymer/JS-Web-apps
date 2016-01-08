'use strict';

angular.module('virtualunitedApp')
  .controller('WeekplanCtrl', function ($scope, $state, $stateParams, $sce, $mdToast,Syllabus) {
    Syllabus.getWeekplan({ id: $stateParams.sid, wid: $stateParams.wid }, function(syllabus){
      $scope.syllabus = syllabus;
      $scope.weekplan = syllabus.weekplans[0];
    });
    $scope.goBack = function(){
        $state.go('syllabus', {id:$scope.syllabus._id});
    };
    $scope.edit = function(){
        $scope.editTopics = $scope.weekplan.topics;
        $scope.editVideos = $scope.weekplan.videos;
        $scope.editLiterature = $scope.weekplan.literature;
        $scope.editAssignments = $scope.weekplan.assignments;
        $scope.editPage = !$scope.editPage;

    };

    $scope.undo = function(){
        $scope.editPage = !$scope.editPage;
    };

    $scope.save = function(){
        $scope.syllabus.weekplans[0].topics = $scope.editTopics;
        $scope.syllabus.weekplans[0].videos = $scope.editVideos;
        $scope.syllabus.weekplans[0].literature = $scope.editLiterature;
        $scope.syllabus.weekplans[0].assignments = $scope.editAssignments;
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
