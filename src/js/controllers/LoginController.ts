angular.module('ppfilecreator.controllers').controller('LoginCtrl', function($scope, $state, ModalService, HttpService, localStorageService) {
  $scope.user = {
    username: '',
    password: '',
    submit: login,
    facebook: facebookLogin
  }
  
  /**
   * login using facebook
  */
  function facebookLogin() {
    // HttpService.LoginFacebook().then((d) => {
    //   console.log(d);
    // });
    window.location.href = "/api/v1/auth/facebook"
  }
  
  /**
   * login to the app
   * @param data {Object} - object containing a username and password
   * @returns {Null}
  */
  function login(data: object) {
    // TODO: check the data is good
    HttpService.login(data).then((d) => {
      console.log(d);
      if (typeof(d.data.success) != 'undefined' && d.data.success == true) {
        $state.go('home');
      } else {
        alert(d.data.message);
      }
    });
  }
  
  
});
