'use strict';
/* Controllers */
angular.module('inventoryApp.controllers', []).controller('AppCtrl', function ($scope, $rootScope, $http, $templateCache, $state, localStorageService) {
		
	$scope.menu = function() {
		alert('menu');
		console.debug('menu');
	}
	
	// show this normally
	$scope.showHeader = true;
	$scope.showFooter = true;
	
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
		var accessTokenAvailable = localStorageService.get('accessToken') !== null;
		
		if (fromState.name == "" && accessTokenAvailable) {
			// TODO: redirect when there is an access token
			// $state.go('fulfillOrder', {orderId: '1'})
		}
		
		// hide header and footer on login page
		// otherwise show it
		if (toState.name == 'login' || toState.name == 'label') {
			$scope.showHeader = false;
			$scope.showFooter = false;
			
		} else {
			$scope.showHeader = true;
			$scope.showFooter = true;
		}
	})
});
