angular.module('ppfilecreator.controllers').controller('FileCtrl', function($scope, ModalService, HttpService, $window, localStorageService) {
  $scope.presentations = [];
  HttpService.GetDocuments().then(function(success) {
    $scope.presentations = success.data

    HttpService.GetTemplates().then(function(success) {
      reloadTemplates(success.data);
    });
  });

  $scope.download = function(id) {
    $window.location = '__API-URL__/api/v1/files/'+id+'?token='+localStorageService.get('accessToken')
  }

  function reloadTemplates(templates) {
    for (var i = 0; i < templates.length; i++) {
      for (var j = 0; j < $scope.presentations.length; j++) {
        if (templates[i]['_id'] == $scope.presentations[j]['template']) {
          $scope.presentations[j]['template'] = templates[i];
        }
      }
    }
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
