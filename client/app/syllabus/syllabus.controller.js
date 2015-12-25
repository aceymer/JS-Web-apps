'use strict';

angular.module('virtualunitedApp')
  .controller('SyllabusCtrl', function ($scope, $state, $stateParams, $mdDialog, Syllabus) {
    $scope.syllabus = Syllabus.get({ id: $stateParams.id });
    $scope.goBack = function(){
        $state.go('main');
    };
    $scope.goToWeekPlan = function(weekplan, event){
      $state.go('weekplan', {id: weekplan._id});
    };
    $scope.addWeekplan = function(){
      $state.go('weekplan', {id: weekplan._id});
    };

    $scope.deleteWeekPlan = function(weekplan, event){
      var confirm = $mdDialog.confirm()
          .title('Delete Weekplan')
          .textContent('Are you sure you want to delete the Weekplan')
          .ariaLabel('Delete')
          .targetEvent(event)
          .openFrom('#left')
          .ok('Please do it!')
          .cancel('No I changed my mind');
      $mdDialog.show(confirm).then(function() {
        $scope.status = 'You decided to get rid of your debt.';
      }, function() {
        $scope.status = 'You decided to keep your debt.';
      });
    };

  });
