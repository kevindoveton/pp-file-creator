angular.module('ppfilecreator.controllers').controller('TemplateCtrl', function($scope, ModalService, HttpService, FileUploader) {
  $scope.templates = [];
  updateTemplates();
  
  // remove a template
  $scope.remove = function(t: any) {
    HttpService.RemoveTemplate(t._id).then(function() {
      updateTemplates(true);
    });
  }
  
  // upload a template
  $scope.uploader = new FileUploader({
    url: '__API-URL__'+'/api/v1/templates',
    alias: 'template'
  });
  
  function updateTemplates(force?: boolean) {
    HttpService.GetTemplates(force).then(function(d) {
      $scope.templates = d.data;
    });
  }
});
