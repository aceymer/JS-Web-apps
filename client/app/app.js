'use strict';

angular.module('virtualunitedApp', [
    'virtualunitedApp.auth',
    'virtualunitedApp.admin',
    'virtualunitedApp.constants',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'btford.socket-io',
    'ui.router',
    'ui.bootstrap',
    'validation.match',
    'ngMaterial',
    'ngVideoPreview',
    'summernote',
    'ngAnimate'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
