'use strict';

(function() {

  angular.module('virtualunitedApp')
    .controller('MainController', function($scope, $state, $stateParams, $mdToast, $mdDialog, socket, syllabuses, Syllabus, Auth) {
      $scope.isAdmin = Auth.isAdmin;

      $scope.isOwner = function(syllabus){
        return Auth.getCurrentUser()._id === syllabus.owner._id;
      }


      var initData = function(syllabuses){
        $scope.syllabuses = syllabuses;
      };

      $scope.newSyllabus = {};
      $scope.goToCourse = function(syllabus) {
        $state.go('syllabus', {
          id: syllabus._id
        });
      };
      $scope.createSyllabus = function(form) {
        if (form.$valid) {
          $scope.newSyllabus.owner =  $scope.getCurrentUser();
          Syllabus.save($scope.newSyllabus, function(syllabus) {
            //data saved. do something here.
            var toast = $mdToast.simple()
              .textContent('Syllabus created')
              .action('OK')
              .highlightAction(false)
              .position('top right');
            $mdToast.show(toast);
            syllabus.owner = $scope.getCurrentUser();
            $scope.syllabuses.push(syllabus);
            $scope.addCourse = false;
            $scope.editCourse = false;
          });
        }
      };

      $scope.addSyllabus = function() {
        $scope.newSyllabus = {};
        $scope.addCourse = true;
        $scope.editCourse = false;
      };

      $scope.saveSyllabus = function() {
        $scope.addCourse = false;
        $scope.editCourse = false;
        Syllabus.update({ id: $scope.newSyllabus._id },$scope.newSyllabus, function() {
          var toast = $mdToast.simple()
            .textContent('Syllabus updated')
            .action('OK')
            .highlightAction(false)
            .position('top');
          $mdToast.show(toast);
        });
      };

      $scope.editSyllabus = function(syllabus) {
        $scope.newSyllabus = syllabus;
        $scope.addCourse = false;
        $scope.editCourse = true;
      };

      $scope.undoSyllabus = function() {
        $scope.newSyllabus = {};
        $scope.addCourse = false;
        $scope.editCourse = false;
      };

      $scope.deleteSyllabus = function(syllabus) {
        var confirm = $mdDialog.confirm()
          .title('Delete Syllabus')
          .textContent('Are you sure you want to delete the Syllabus')
          .ariaLabel('Delete')
          .targetEvent(event)
          .openFrom('#left')
          .ok('Please do it!')
          .cancel('No I changed my mind');
        $mdDialog.show(confirm).then(function() {
          syllabus.$delete({
              id: syllabus._id
            }, function success() {
              var toast = $mdToast.simple()
                .textContent('Syllabus Deleted')
                .action('OK')
                .highlightAction(false)
                .position('top right');
              $mdToast.show(toast);
              _.remove($scope.syllabuses, function(syllabusFound) {
                return syllabusFound._id === syllabus._id;
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

      $scope.options = {
        toolbar: [
                ['headline', ['style']],
                ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
                ['fontface', ['fontname']],
                ['textsize', ['fontsize']],
                ['fontclr', ['color']],
                ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
                ['view', ['fullscreen', 'codeview']],
                ['help', ['help']]
            ]
      };

      initData(syllabuses);
    });
})();
