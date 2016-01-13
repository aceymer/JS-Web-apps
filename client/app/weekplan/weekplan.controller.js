'use strict';

angular.module('virtualunitedApp')
  .controller('WeekplanCtrl', function ($scope, $state, $stateParams, $sce, $mdToast, Syllabus, Auth) {
    $scope.isAdmin = Auth.isAdmin;

    Syllabus.getWeekplan({ id: $stateParams.sid, wid: $stateParams.wid }, function(syllabus){
      $scope.syllabus = syllabus;
      $scope.weekplan = syllabus.weekplans[0];
    });
    $scope.goBack = function(){
      window.history.back();
    };
    $scope.edit = function(){
        $scope.editTopics = $scope.weekplan.topics;
        $scope.editVideos = $scope.weekplan.videos;
        $scope.editLiterature = $scope.weekplan.literature;
        $scope.editAssignments = $scope.weekplan.assignments;
        $scope.editSummary = $scope.weekplan.summary;
        $scope.editPage = !$scope.editPage;

    };

    $scope.undo = function(){
        $scope.editPage = !$scope.editPage;
    };

    $scope.save = function(){
        $scope.weekplan.topics = $scope.editTopics;
        $scope.weekplan.videos = $scope.editVideos;
        $scope.weekplan.literature = $scope.editLiterature;
        $scope.weekplan.assignments = $scope.editAssignments;
        $scope.weekplan.summary = $scope.editSummary;
        Syllabus.updateWeekplan({ id: $scope.syllabus._id, wid: $scope.weekplan._id },$scope.weekplan, function(weekplan) {
          var toast = $mdToast.simple()
            .textContent('Weekplan updated')
            .action('OK')
            .highlightAction(false)
            .position('top');
          $mdToast.show(toast);
          $scope.editPage = !$scope.editPage;

        });

    };

    $scope.toTrusted = function(html_code) {
      return $sce.trustAsHtml(html_code);
    }

    $scope.anotherGoodOne = 'https://www.youtube.com/watch?v=18-xvIjH8T4';

  });
