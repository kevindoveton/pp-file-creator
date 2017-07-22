'use strict';
/* Directives */
angular.module('ppfilecreator.directives', []).directive('kdDnd', function() {
  return {
    restrict: 'A',
    scope: {
      kdDndResponse: "="
    },
    link: function ($scope, element, attrs) {
      element.on('drag dragstart dragend dragover dragenter dragleave drop', function(e: any) {
        e.preventDefault();
        e.stopPropagation();
      });
      
      element.on('dragover dragenter', function(e) {
        element.addClass('is-dragover')
      });
      
      element.on('dragleave dragend drop', function(e) {
        element.removeClass('is-dragover')
      });
      
      element.on('drop', function(evt: any) {
        var file = evt.originalEvent.dataTransfer.files[0];
        $scope.uploadFile(file, '__API-URL__/api/v1/s3').then(function(res) {
          console.log(res);
          $scope.kdDndResponse.image = res.data;
          $scope.kdDndResponse.htmlContent = $('<div class="image-slide"></div>').css({'background-image': 'url("'+URL.createObjectURL(file)+'")'}).prop('outerHTML');
        });
      })
    },
    controller: function($scope, $http, $q) {
      $scope.uploadFile = function(file, url) {
        return $q(function(resolve, reject) {
          var fd = new FormData();
          fd.append('file', file);
          $http.post(url, fd, {
              transformRequest: angular.identity,
              headers: {
                'Content-Type': undefined
              }
          })
          .then(function(res){
            resolve(res);
          })
          .catch(function(err){
            reject(err);
          });
        })
      }
    }
  };
}).directive('kdFileUpload', function() {
  return {
    restrict: 'A',
    scope: {
      kdFileResponse: '='
    },

    link: function ($scope, element, attrs) {
      element.on('change', function(evt: any) {
        var file = evt.target.files[0]
        $scope.uploadFile(file, '__API-URL__/api/v1/s3').then(function(res) {
          $scope.kdFileResponse.image = res.data;
          $scope.kdFileResponse.htmlContent = $('<div class="image-slide"></div>').css({'background-image': 'url("'+URL.createObjectURL(file)+'")'}).prop('outerHTML');
        });
      });
    },
    controller: function($scope, $http, $q) {

      $scope.uploadFile = function(file, url) {
        return $q(function(resolve, reject) {
          var fd = new FormData();
          fd.append('file', file);
          $http.post(url, fd, {
              transformRequest: angular.identity,
              headers: {
                'Content-Type': undefined
              }
          })
          .then(function(res){
            resolve(res);
          })
          .catch(function(err){
            reject(err);
          });
        })
      }
    }
  };
});
