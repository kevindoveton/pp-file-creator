'use strict';
/* Filters */
angular.module('ppfilecreator.filters', []).
  filter('trusted', function ($sce) {
    return function(html){
      return $sce.trustAsHtml(html)
    }
  });
