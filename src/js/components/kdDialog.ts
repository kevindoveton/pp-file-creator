angular.module('kdDialog', []).directive('kdDialog', function() {
  return {
    scope: {
      kdDialogClick: '&',
      kdDialogText: '@',
      kdDialogButton: '@',
      kdDialogButtonStyles: '@',
      kdDialogSubText: '@',
      kdDialogBtnConfirm: '@',
      kdDialogBtnDecline: '@',
      kdDialogShow: '@'
    },
    
    transclude: true,
    
    template: [
      '<div class="kd-dialog">',
      '  <button class="kdd btn" ng-class="kdDialogButtonStyles" ng-click="showDialog()" ng-bind="kdDialogButton"></button>',
      '  <div class="kdd dialog" ng-show="kdDialogShow">',
      '    <div class="text">',
      '      <h2 ng-bind="confirmText"></h2>',
      '      <p ng-bind="confirmSubText"></p>',
      '    </div>',
      '    <div class="buttons">',
      '      <button class="btn kdDialog btn--confirm" ng-bind="buttonConfirmText" ng-click="yes()"></button>',
      '      <button class="btn kdDialog btn--decline" ng-bind="buttonDeclineText" ng-click="no()"></button>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join(''),
    
    link: function(scope, element, attrs) {
    },
    
    controller: function($scope) {
      $scope.kdDialogShow = $scope.kdDialogShow || false;
      $scope.kdDialogButton = $scope.kdDialogButton || '';
      $scope.kdDialogButtonStyles = $scope.kdDialogButtonStyles || '';
      $scope.confirmText = $scope.kdDialogText || 'Are you sure?';
      $scope.confirmSubText = $scope.kdDialogSubText || '';
      $scope.buttonConfirmText = $scope.kdDialogBtnConfirm || 'Yes';
      $scope.buttonDeclineText = $scope.kdDialogBtnDecline || 'No';

      $scope.yes = function() {
        $scope.kdDialogShow = false;
        $scope.kdDialogClick()
      };
      
      $scope.no = function() {
        $scope.kdDialogShow = false;
      }
      
      $scope.showDialog = function() {
        $scope.kdDialogShow = true;
      }
    }
  };
});
