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
  
  $scope.slides = [
    {
      id: 1,
      htmlContent: ''
    }
  ];
  
  $scope.submit = function() {
    console.log($scope.slides);
  }
  
  $scope.addSlide = function(_id) {
    
  }
  
  $scope.removeSlide = function(_id) {
    
  }
  
});
