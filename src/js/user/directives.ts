'use strict';
/* Directives */
angular.module('inventoryApp.directives', []).directive('appVersion', function (version) {
	return function(scope, elm, attrs) {
		elm.text(version);
	};
});
