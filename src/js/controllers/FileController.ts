angular.module('ppfilecreator.controllers').controller('FileCtrl', function($scope, ModalService, HttpService, $window) {
  $scope.presentations = [];
  HttpService.GetDocuments().then(function(success) {
    $scope.presentations = success.data
    console.log(success.data);
  });

  $scope.download = function(id) {
    $window.location = '__API-URL__/api/v1/files/'+id
  }

});
