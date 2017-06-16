angular.module('ppfilecreator.controllers').controller('TemplateCtrl', function($scope, ModalService, HttpService, FileUploader) {
  $scope.templates = [];
  HttpService.GetTemplates().then(function(d) {
    $scope.templates = d.data;
  });
  
  $scope.uploader = new FileUploader({
    url: '__API-URL__'+'/api/v1/templates',
    alias: 'template'
  });
});
