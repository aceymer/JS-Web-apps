'use strict';

angular.module('virtualunitedApp')
  .controller('SyllabusCtrl', function($scope, $state, $stateParams, $mdDialog, $mdMedia, $mdToast, $sce, Syllabus, Auth) {
    $scope.isAdmin = Auth.isAdmin;

    Syllabus.getAll({
      id: $stateParams.id
    }, function(syllabus) {
      $scope.syllabus = syllabus;
      setWeekNums();
    });
    $scope.goBack = function(){
      window.history.back();
    };
    $scope.goToWeekPlan = function(weekplan) {
      $state.go('weekplan', {
        sid: $scope.syllabus._id,
        wid: weekplan._id
      });
    };

    $scope.addWeekplan = function() {
      $scope.newWeekplan = {
        week: $scope.newWeek
      };
      $scope.syllabus.weekplans.push($scope.newWeekplan);
      Syllabus.update({
        id: $scope.syllabus._id
      }, $scope.syllabus, function(syllabus) {
        $scope.syllabus = syllabus;
        setWeekNums();
        var toast = $mdToast.simple()
          .textContent('Weekplan created')
          .action('OK')
          .highlightAction(false)
          .position('top');
        $mdToast.show(toast);
      });
    };

    var setWeekNums = function() {
      var startDate = moment('01-01-' + $scope.syllabus.year, 'MM-DD-YYYY');
      $scope.weeks = [];
      var weeksInYear = startDate.isoWeeksInYear();

      for (var i = 1; i < weeksInYear + 1; i++) {
        $scope.weeks.push(i);
      }
      $scope.syllabus.weekplans.forEach(function(weekplan) {
        _.remove($scope.weeks, function(week) {
          return week === weekplan.week;
        });
      });
      $scope.newWeek = moment().week();
    };

    $scope.toTrusted = function(htmlCode) {
      return $sce.trustAsHtml(htmlCode);
    };

    $scope.deleteWeekPlan = function(weekplan, event) {
      var confirm = $mdDialog.confirm()
        .title('Delete Weekplan')
        .textContent('Are you sure you want to delete the Weekplan')
        .ariaLabel('Delete')
        .targetEvent(event)
        .openFrom('#left')
        .ok('Please do it!')
        .cancel('No I changed my mind');
      $mdDialog.show(confirm).then(function() {
        _.remove($scope.syllabus.weekplans, function(plan) {
          return plan._id === weekplan._id;
        });

        Syllabus.update({
          id: $scope.syllabus._id
        }, $scope.syllabus, function(syllabus) {
          $scope.syllabus = syllabus;
          setWeekNums();
          var toast = $mdToast.simple()
            .textContent('Weekplan updated')
            .action('OK')
            .highlightAction(false)
            .position('top');
          $mdToast.show(toast);
        });
      });
    };
  });
