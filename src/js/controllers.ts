'use strict';

function toggleHeaderFooter(state: boolean, $scope: any) {
  return $scope.showHeader = $scope.showFooter = state;
}

/* Controllers */
angular.module('ppfilecreator.controllers', []).controller('AppCtrl', function ($scope, $rootScope, $http, $templateCache, $state, localStorageService, kdLoader) {
  var isLoggedIn = function() {
    return !!localStorageService.get('accessToken');
  }
  $scope.showMenu = false;

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    console.log(isLoggedIn())
    if (toState.name == 'login') {
      toggleHeaderFooter(false, $scope);
    } else {
      if (!isLoggedIn()) {
        $state.go('login');
      }
      toggleHeaderFooter(true, $scope);
    }
    kdLoader.toggleLoading(true);
  })
  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){ 
    kdLoader.toggleLoading(false);
  });
  
  $scope.toggleMenu = function(show) {
    if (typeof(show) != 'undefined') {
      $scope.showMenu = show;
    } else {
      $scope.showMenu = !$scope.showMenu;
    }
    
    return $scope.showMenu;
  }
  
});
