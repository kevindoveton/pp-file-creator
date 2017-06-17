angular.module('ppfilecreator.controllers').controller('FileCtrl', function($scope, ModalService, HttpService, FileSaver, Blob) {
  $scope.presentations = [];
  HttpService.GetDocuments(function(success) {
    $scope.presentations = success.data
  });
  
  $scope.download = function(index) {
    var blob = new Blob([$scope.presentations[index].slide], {type: 'text/xml;charset=utf-8'});
    FileSaver.saveAs(blob, 'file.pro5');
  }
  
});
