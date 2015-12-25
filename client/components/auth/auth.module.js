'use strict';

angular.module('virtualunitedApp.auth', [
  'virtualunitedApp.constants',
  'virtualunitedApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
