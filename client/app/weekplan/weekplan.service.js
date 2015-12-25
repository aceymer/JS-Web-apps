angular.module('virtualunitedApp')
  .factory('Weekplan', function($resource) {
    return $resource('/api/weekplans/:id'); // Note the full endpoint address
});
