'use strict';

angular.module('virtualunitedApp')
  .controller('NavbarController', function ($scope, $timeout, Auth) {
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.isCollapsed = true;

    $scope.menu = [{
      'title': 'Home',
      'state': 'main'
    }];

    $scope.hidden = false;
    $scope.isOpen = false;
    $scope.hover = false;

    // On opening, add a delayed property which shows tooltips after the speed dial has opened
    // so that they have the proper position; if closing, immediately hide the tooltips
    $scope.$watch('isOpen', function(isOpen) {
      if (isOpen) {
        $timeout(function() {
          $scope.tooltipVisible = self.isOpen;
        }, 600);
      } else {
        $scope.tooltipVisible = self.isOpen;
      }
    });
    $scope.items = [{
      name: "Change password",
      icon: "fa fa-unlock-alt",
      direction: "bottom",
      action: ''
    }, {
      name: "Users",
      icon: "fa fa-users",
      direction: "top",
      action: ''
    }, {
      name: "Log out",
      icon: "fa fa-sign-out",
      direction: "bottom",
      action: ''
    }];
  });
