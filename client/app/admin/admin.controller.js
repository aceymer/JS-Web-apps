'use strict';

(function() {

  angular.module('virtualunitedApp')
    .controller('AdminController', function($scope, $state, $mdToast, $mdDialog, Auth, User) {
      $scope.isAdmin = Auth.isAdmin;
      $scope.users = User.query();
      $scope.newUser = {};

      $scope.delete = function(user) {
        var confirm = $mdDialog.confirm()
          .title('Delete User')
          .textContent('Are you sure you want to delete the user')
          .ariaLabel('Delete')
          .targetEvent(event)
          .openFrom('#left')
          .ok('Please do it!')
          .cancel('No I changed my mind');
        $mdDialog.show(confirm).then(function() {
          user.$delete(function() {
            $scope.users.splice($scope.users.indexOf(user), 1);
            var toast = $mdToast.simple()
              .textContent('User Deleted')
              .action('OK')
              .highlightAction(false)
              .position('top right');
            $mdToast.show(toast);
          });

        });
      };

      $scope.addUser = function(form) {
        $scope.submitted = true;
        if (form.$valid) {
          Auth.createUser({
            name: $scope.newUser.name,
            email: $scope.newUser.email,
            password: '123qwe',
            role: 'admin'
          })
          .then(() => {
            var toast = $mdToast.simple()
              .textContent('User created')
              .action('OK')
              .highlightAction(false)
              .position('top right');
            $mdToast.show(toast);
            $state.go($state.current, {}, {reload: true});
          })
          .catch(err => {
            err = err.data;
            $scope.errors = {};

            // Update validity of form fields that match the mongoose errors
            angular.forEach(err.errors, (error, field) => {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.message;
            });
          });
        }
    };
  })
})();
