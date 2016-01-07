angular.module('virtualunitedApp')
  .factory('Syllabus', function($resource) {
    return $resource('/api/syllabuses/:id/:wid',{
        id: '@id',
        wId: '@wid'
      },
      {
        getWeekplan: {
          method:'GET'
        },
        getAll: {
          method:'GET'
        },
        update: {
          method:'PUT'
        }
      }); // Note the full endpoint address
});
