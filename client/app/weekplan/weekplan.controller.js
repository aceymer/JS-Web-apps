'use strict';

angular.module('virtualunitedApp')
  .controller('WeekplanCtrl', function ($scope, $state, $stateParams, $sce, $mdToast, Syllabus, syllabus, Auth) {
    $scope.isAdmin = Auth.isAdmin;

    $scope.isOwner = function(syllabus){
      return Auth.getCurrentUser()._id === syllabus.owner._id;
    }

    var initData = function(syllabus) {
      $scope.syllabus = syllabus;
      $scope.weekplan = syllabus.weekplans[0];
    };

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
        Syllabus.updateWeekplan({ id: $scope.syllabus._id, wid: $scope.weekplan._id },$scope.weekplan, function() {
          var toast = $mdToast.simple()
            .textContent('Weekplan updated')
            .action('OK')
            .highlightAction(false)
            .position('top');
          $mdToast.show(toast);
          $scope.editPage = !$scope.editPage;

        });

    };

    $scope.toTrusted = function(htmlCode) {
      return $sce.trustAsHtml(htmlCode);
    };

    initData(syllabus);

  });
