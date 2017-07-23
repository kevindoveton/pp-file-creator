angular.module('ppfilecreator.controllers').controller('LoginCtrl', function($scope, $state, $rootScope, ModalService, HttpService, localStorageService, kdLoader) {
  $scope.user = {
    username: '',
    password: '',
    submit: login,
    facebook: facebookLogin
  }
  
  $scope.newUser = newUser;
  
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
    // // TODO: check the data is good
    kdLoader.toggleLoading(true);
    HttpService.login(data).then((d) => {
      kdLoader.toggleLoading(false);
      if (typeof(d.data.success) != 'undefined' && d.data.success == true) {
        $state.go('home');
      } else {
        alert(d.data.message);
      }
    });
  }
  
  function newUser() {
      ModalService.showModal({
        templateUrl: "/modals/newUser.html",
        controller: "NewUserModalCtrl"
      }).then(function(modal) {
        modal.close.then(function(result) {
          
        });
      });
  }
  
});


angular.module('ppfilecreator.controllers').controller('NewUserModalCtrl', function($scope, $state, close, HttpService) {
  $scope.close = close;
  
  $scope.user = {
    username: '',
    password: ''
  }
  
  $scope.submit = function() {
    HttpService.CreateUser({
      username: $scope.user.username,
      password: $scope.user.password
    }).then(function(success) {
      if (success.status == 201) {
        close();
      } else {
        alert('error')
      }
    })
  }
  
});
