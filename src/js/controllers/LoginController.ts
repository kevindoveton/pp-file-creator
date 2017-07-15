angular.module('ppfilecreator.controllers').controller('LoginCtrl', function($scope, $state, ModalService, HttpService, localStorageService) {
  $scope.user = {
    username: '',
    password: '',
    submit: login
  }
  
  function login(data) {
    // TODO: check the data is good
    HttpService.login(data).then((d) => {
      console.log(d);
      $state.go('home');
    });
  }
  
  
});
