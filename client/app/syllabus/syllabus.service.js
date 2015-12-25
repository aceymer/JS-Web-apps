angular.module('virtualunitedApp')
  .factory('Syllabus', function($resource) {
    return $resource('/api/syllabuses/:id'); // Note the full endpoint address
});
