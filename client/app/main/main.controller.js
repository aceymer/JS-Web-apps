'use strict';

(function() {

  angular.module('virtualunitedApp')
    .controller('MainController', function($scope, $state, $stateParams, $mdToast, $mdDialog, socket, Syllabus, Auth) {
      $scope.isAdmin = Auth.isAdmin;

      $scope.syllabuses = Syllabus.query();
      $scope.newSyllabus = {};
      $scope.goToCourse = function(syllabus, event) {
        $state.go('syllabus', {
          id: syllabus._id
        });
      };
      $scope.createSyllabus = function(form) {
        if (form.$valid) {
          Syllabus.save($scope.newSyllabus, function(syllabus) {
            //data saved. do something here.
            var toast = $mdToast.simple()
              .textContent('Syllabus created')
              .action('OK')
              .highlightAction(false)
              .position('top right');
            $mdToast.show(toast);
            $scope.syllabuses.push(syllabus);
            $scope.addCourse = false;
            $scope.editCourse = false;
          });
        }
      }

      $scope.addSyllabus = function(courseForm) {
        $scope.newSyllabus = {};
        $scope.addCourse = true;
        $scope.editCourse = false;
      }

      $scope.saveSyllabus = function() {
        $scope.addCourse = false;
        $scope.editCourse = false;
        Syllabus.update({ id: $scope.newSyllabus._id },$scope.newSyllabus, function(syllabus) {
          var toast = $mdToast.simple()
            .textContent('Syllabus updated')
            .action('OK')
            .highlightAction(false)
            .position('top');
          $mdToast.show(toast);
        });
      }

      $scope.editSyllabus = function(syllabus) {
        $scope.newSyllabus = syllabus;
        $scope.addCourse = false;
        $scope.editCourse = true;
      }

      $scope.undoSyllabus = function() {
        $scope.newSyllabus = {};
        $scope.addCourse = false;
        $scope.editCourse = false;
      }

      $scope.deleteSyllabus = function(syllabus) {
        $scope.deleteSyllabus = syllabus;
        var confirm = $mdDialog.confirm()
          .title('Delete Syllabus')
          .textContent('Are you sure you want to delete the Syllabus')
          .ariaLabel('Delete')
          .targetEvent(event)
          .openFrom('#left')
          .ok('Please do it!')
          .cancel('No I changed my mind');
        $mdDialog.show(confirm).then(function() {
          $scope.deleteSyllabus.$delete({
              id: $scope.deleteSyllabus._id
            }, function success() {
              var toast = $mdToast.simple()
                .textContent('Syllabus Deleted')
                .action('OK')
                .highlightAction(false)
                .position('top right');
              $mdToast.show(toast);
              _.remove($scope.syllabuses, function(syllabus) {
                return syllabus._id === $scope.deleteSyllabus._id;
              });
            },
            function failure() {
              var toast = $mdToast.simple()
                .textContent('Something bad happened')
                .action('OK')
                .highlightAction(false)
                .position('top right');
              $mdToast.show(toast);
            });

        });
      };
    });
})();
