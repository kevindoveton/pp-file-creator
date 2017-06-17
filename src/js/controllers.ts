'use strict';
/* Controllers */
angular.module('ppfilecreator.controllers', []).controller('AppCtrl', function ($scope, $rootScope, $http, $templateCache, $state, localStorageService) {
  
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 		
		$scope.loading = true;
	})
	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){ 
		$scope.loading = false;
	});
  // show this normally
  $scope.showHeader = true;
  $scope.showFooter = true;
});
