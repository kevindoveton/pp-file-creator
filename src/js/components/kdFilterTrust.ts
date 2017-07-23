'use strict';

angular.module('kdFilterTrust', []).filter('trusted', function ($sce) {
  return function(html){
    return $sce.trustAsHtml(html)
  }
});
