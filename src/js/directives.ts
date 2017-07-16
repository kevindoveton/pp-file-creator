'use strict';
/* Directives */
angular.module('ppfilecreator.directives', []).directive('customOnChange', function() {
  return {
    restrict: 'A',
    scope: {slide: '=changeData'},
    link: function (scope, element, attrs) {
      element.change(function(evt: any) {
        scope.slide.htmlContent = '<img src="'+URL.createObjectURL(evt.target.files[0])+'"/>';
        scope.$apply();
      });
    }
  };
});

angular.module('ppfilecreator.directives', []).directive('kdFileUpload', function() {
  return {
    restrict: 'A',
    scope: {kdFileResponse: '='},
    // bindToController: true,
    link: function ($scope, element, attrs) {
      element.change(function(evt: any) {
        console.log($scope);
        $scope.uploadFile(evt.target.files[0], '__API-URL__/api/v1/s3').then(function(res) {
          $scope.kdFileResponse.path = res.data;
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
