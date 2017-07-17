angular.module('ppfilecreator.controllers').controller('FileCtrl', function($scope, ModalService, HttpService, $window) {
  $scope.presentations = [];
  HttpService.GetDocuments().then(function(success) {
    $scope.presentations = success.data
    console.log(success.data);
  });

  $scope.download = function(id) {
    // var blob = new Blob([$scope.presentations[index].slide], {type: 'text/xml;charset=utf-8'});
    // FileSaver.saveAs(blob, $scope.presentations[index].title + '.pro5');
    $window.location = '__API-URL__/api/v1/files/'+id
  }

});
