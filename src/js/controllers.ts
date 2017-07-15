'use strict';

function toggleHeaderFooter(state: boolean, $scope: any) {
  return $scope.showHeader = $scope.showFooter = state;
}

/* Controllers */
angular.module('ppfilecreator.controllers', []).controller('AppCtrl', function ($scope, $rootScope, $http, $templateCache, $state, localStorageService) {

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    if (toState.name == 'login') {
      toggleHeaderFooter(false, $scope);
    } else {
      // show this normally
      toggleHeaderFooter(true, $scope);
    }
    $scope.loading = true;
  })
  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){ 
    $scope.loading = false;
  });
});
