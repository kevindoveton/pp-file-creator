/**
 * loading spinner
 * @example
 * (in global layout)
 * <kd-loader></kd-loader>
 * (in controller, inject kdLoader)
 * 1. kdLoader.toggleLoading(true) // shows loader
 * 2. kdLoader.toggleLoading(false) // hides loader
 * 3. kdLoader.toggleLoading // shows / hides loader - in this case shows
*/
angular.module('kdLoader', []).factory('kdLoader', ['$rootScope', function () {
  var spinner = undefined;

  return {
    register: function(api) {
      spinner = api;
    },
    
    toggleLoading: function(show?: boolean) {
      if (typeof(spinner) != 'undefined' && typeof(spinner.toggleLoading) != 'undefined') {
        spinner.toggleLoading(show);
      }
    }
  }

}]).directive('kdLoader', function() {
  return {
    template: [
      '<div class="overlay" ng-show="isLoading">',
        '<div id="floatingCirclesG">',
          '<div class="f_circleG" id="frotateG_01"></div>',
          '<div class="f_circleG" id="frotateG_02"></div>',
          '<div class="f_circleG" id="frotateG_03"></div>',
          '<div class="f_circleG" id="frotateG_04"></div>',
          '<div class="f_circleG" id="frotateG_05"></div>',
          '<div class="f_circleG" id="frotateG_06"></div>',
          '<div class="f_circleG" id="frotateG_07"></div>',
          '<div class="f_circleG" id="frotateG_08"></div>',
        '</div>',
      '</div>'].join(''),
    controller: function($scope, kdLoader) {
      $scope.isLoading = false;
      
      var api = {
        toggleLoading: function(show?: boolean) {
          if (typeof(show) != 'undefined') {
            return $scope.isLoading = show;
          } else {
            return $scope.isLoading = !$scope.isLoading;
          }
        }
      }
      
      kdLoader.register(api)
    }
  };
});
