'use strict';
/* Directives */
angular.module('ppfilecreator.directives', []).directive('customOnChange', function() {
  return {
    restrict: 'A',
    scope: {slide: '=changeData'},
    link: function (scope, element, attrs) {
      element.change(function(evt: any) {
        scope.slide.htmlContent = '<img src="'+URL.createObjectURL(evt.target.files[0])+'"/>';
        scope.$apply();
      });
    }
  };
});
