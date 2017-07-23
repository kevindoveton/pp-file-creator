'use strict';


/**
 * allows using inline styles in ng-bind-html etc
 * @example
 * ng-bind-html="htmlString | trusted"
*/
angular.module('kdFilterTrust', []).filter('trusted', function ($sce) {
  return function(html){
    return $sce.trustAsHtml(html)
  }
});
