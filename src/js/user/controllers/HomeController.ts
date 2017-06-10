angular.module('ppfilecreator.controllers').controller('HomeCtrl', function($scope, ModalService, HttpService) {
  
  $scope.toolbar = {
    'toolbar': {
      'buttons': [
        'bold', 
        'italic', 
        'underline',
        'h1',
        'superscript',
        'orderedlist',
        'unorderedlist',
      ]
    }
  }
  
  $scope.slides = [
    {
      htmlContent: ''
    }
  ];
  
  $scope.submit = function() {
    console.log($scope.slides);
    
    HttpService.CreateNewDocument({
      slides: $scope.slides
    }).then(function() {
      alert('success');
    });
    
  }
  
  $scope.addSlide = function(position:number) {
    $scope.slides = insertToArray($scope.slides, position, {htmlContent:''})
  }
  
  $scope.removeSlide = function(position:number) {
    $scope.slides = removeFromArray($scope.slides, position)
  }
  
});

function insertToArray(arr:Array<object>, position:number, item:object) {
  if (typeof(position) !== 'undefined') {
    arr.splice(position, 0, item);
  } else {
    arr.push(item);
  }
  
  return arr;
}

function removeFromArray(arr:Array<object>, position:number) {
  arr.splice(position, 1);
  return arr;
}
