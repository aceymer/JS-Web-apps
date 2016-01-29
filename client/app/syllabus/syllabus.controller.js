'use strict';

angular.module('virtualunitedApp')
  .controller('SyllabusCtrl', function($scope, $state, $stateParams, $mdDialog, $mdMedia, $mdToast, $sce, syllabus, Syllabus, Auth) {
    $scope.isAdmin = Auth.isAdmin;

    $scope.isOwner = function(syllabus){
      return Auth.getCurrentUser()._id === syllabus.owner._id;
    }

    var initData = function(syllabus) {
      $scope.syllabus = syllabus;
      setWeekNums();
    };

    $scope.goBack = function() {
      window.history.back();
    };

    $scope.toogleEnabled = function(weekplan){
      var weekplanFound = _.find($scope.syllabus.weekplans, function(plan) {
        return plan._id === weekplan._id;
      });
      if(weekplanFound){
        weekplanFound.enabled = !weekplanFound.enabled;
        Syllabus.update({
          id: $scope.syllabus._id
        }, $scope.syllabus, function(syllabus) {
          $scope.syllabus = syllabus;
          setWeekNums();
          var toast = $mdToast.simple()
            .textContent('Weekplan updated')
            .action('OK')
            .highlightAction(false)
            .position('top right');
          $mdToast.show(toast);
        });
      } else{
        var toast = $mdToast.simple()
          .textContent('Error finding weekplan')
          .action('Bad')
          .highlightAction(false)
          .position('top right');
        $mdToast.show(toast);
      }

    };

    $scope.editWeekPlan = function(weekplan){
      $scope.editingWeekplan = weekplan;
    };

    $scope.saveWeekplanEdit = function(form){
      if (form.$valid) {
        var weekplanFound = _.find($scope.syllabus.weekplans, function(plan) {
          return plan._id === $scope.editingWeekplan._id;
        });
        weekplanFound.week = $scope.editingWeekplan.week;
        weekplanFound.teaser = $scope.editingWeekplan.teaser;
        weekplanFound.enabled = $scope.editingWeekplan.enabled;

        Syllabus.update({
          id: $scope.syllabus._id
        }, $scope.syllabus, function(syllabus) {
          $scope.syllabus = syllabus;
          setWeekNums();
          form.$setPristine();
          form.$setUntouched();
          var toast = $mdToast.simple()
            .textContent('Weekplan updated')
            .action('OK')
            .highlightAction(false)
            .position('top');
          $mdToast.show(toast);
        });
        $scope.editingWeekplan = undefined;
      }
    }

    $scope.undoWeekplanEdit = function(){
      $scope.editingWeekplan = undefined;
    }

    $scope.goToWeekPlan = function(weekplan) {
      $state.go('weekplan', {
        sid: $scope.syllabus._id,
        wid: weekplan._id
      });
    };

    $scope.addWeekplan = function(form) {
      if (form.$valid) {
        $scope.newWeekplan.enabled = true;
        $scope.syllabus.weekplans.push($scope.newWeekplan);
        Syllabus.update({
          id: $scope.syllabus._id
        }, $scope.syllabus, function(syllabus) {
          $scope.syllabus = syllabus;
          setWeekNums();
          form.$setPristine();
          form.$setUntouched();
          var toast = $mdToast.simple()
            .textContent('Weekplan created')
            .action('OK')
            .highlightAction(false)
            .position('top');
          $mdToast.show(toast);
        });
      }
    };

    var setWeekNums = function() {
      var startDate = moment('01-01-' + $scope.syllabus.year, 'MM-DD-YYYY');
      $scope.weeks = [];
      var weeksInYear = startDate.isoWeeksInYear();

      for (var i = 1; i < weeksInYear + 1; i++) {
        $scope.weeks.push(i);
      }
      if($scope.syllabus.weekplans && $scope.syllabus.weekplans.length > 0){
        $scope.syllabus.weekplans.forEach(function(weekplan) {
          _.remove($scope.weeks, function(week) {
            if(weekplan){
              return week === weekplan.week;
            }
          });
        });
        $scope.currentWeek = moment().week();
      }
      $scope.newWeekplan = {};

    };

    $scope.toTrusted = function(htmlCode) {
      return $sce.trustAsHtml(htmlCode);
    };

    $scope.deleteWeekPlan = function(event) {
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
          return plan._id === $scope.editingWeekplan._id;
        });

        Syllabus.update({
          id: $scope.syllabus._id
        }, $scope.syllabus, function(syllabus) {
          $scope.syllabus = syllabus;
          setWeekNums();
          var toast = $mdToast.simple()
            .textContent('Weekplan Deleted')
            .action('OK')
            .highlightAction(false)
            .position('top');
          $mdToast.show(toast);
          $scope.editingWeekplan = undefined;
        });
      });
    };

    initData(syllabus);


  });
