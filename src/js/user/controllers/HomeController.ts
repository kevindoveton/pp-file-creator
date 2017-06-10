angular.module('ppfilecreator.controllers').controller('HomeCtrl', function($scope, ModalService, HttpService) {
  
  $scope.toolbar = {
    'toolbar': {
      'buttons': [
        'bold', 
        'italic', 
        'underline'
      ]
    }
  }
  
});
