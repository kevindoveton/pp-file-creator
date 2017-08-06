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
  
  /**
   * bind the resize function to window.resize
   * @requires jQuery
  */
  $(function() {
    // page resize
    $(window).bind('resize', function() {
      let container = {
        width: $('.preview-container').width(),
        height: $('.preview-container').height()
      }
      
      let preview = {
        width: $('.preview').width(),
        height: $('.preview').height()
      }
      
      let scaleX = container.width / preview.width;
      let scaleY = container.height / preview.height;
      let scale = (scaleX > scaleY) ? scaleY : scaleX;
      $('.preview').css({transform: 'scale('+scale+')'});
    });
    
    $(window).trigger('resize');
  })
});
