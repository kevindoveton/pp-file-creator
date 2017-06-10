angular.module('inventoryApp.controllers').controller('HomeCtrl', function($scope, ModalService, HttpService) {
	
	var openAddToProduct = function() {
		ModalService.showModal({
			templateUrl: "partials/modals/addToProduct",
			controller: "AddToProductCtrl"
		}).then(function(modal) {
			modal.close.then(function(result) {
			
			});
		});
	};

	$scope.openAddToProduct = openAddToProduct;
});


// add to products control
angular.module('inventoryApp.controllers').controller('AddToProductCtrl', function($scope, HttpService, $state, close) {
	$scope.close = close;
	
	HttpService.getProductList().then(function(success){
		$scope.items = success.data;
	});

	$scope.renderResult = function(objSuggestion) {
		return objSuggestion.itemName;
	}
	
	$scope.updateUid = function(objSuggestion, d) {
		d.uid = objSuggestion.uid;
		return;
	}
	
	$scope.submit = function() {
		var fail = false;
		
		if(typeof($scope.d.uid) == 'undefined') {
			$scope.d.warn = true;
			fail = true;
		} else {
			$scope.d.warn = false;
		}
		
		if (!fail) {
			HttpService.addBatch($scope.d).then(function(success) {
				console.log(success.data)
				$state.go('home', {data: success.data});
				alert('Item: ' + success.data.itemName + '\n' + 'Batch: ' + success.data.uid);
			})
		}
	}
	
});