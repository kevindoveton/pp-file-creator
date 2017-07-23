// adapted from
// https://stackoverflow.com/a/29662137/4616652

/**
 * bind an event to a click outside of main div - such as closing modal
 * @example
 * will close if overlay is clicked
 * .overlay
 *   .modal(kd-click-outside="close()")
 *      p content
*/
angular.module('kdClickOutside', []).directive('kdClickOutside', function ($document) {
  return {
    restrict: 'A',
    scope: {
      kdClickOutside: '&'
    },
    link: function (scope, el, attr) {
      setTimeout(function() {
        $document.on('click', kdClickOutsideFunc);
      }, 500)
      
      
      scope.$on('$destroy', function() {
        $document.off('click', kdClickOutsideFunc);
      });
      
      function kdClickOutsideFunc(e) {
        if (el !== e.target && !el[0].contains(e.target)) {
          scope.$apply(function () {
            scope.$eval(scope.kdClickOutside);
          });
        }
      }
    }
  }
});
