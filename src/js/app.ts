'use strict';
// Declare app level module which depends on filters, and services

angular.module('ppfilecreator', [
  'ppfilecreator.controllers',
  'ppfilecreator.filters',
  'ppfilecreator.services',
  'ppfilecreator.directives',
  'ngAnimate',
  'angularModalService',
  'ui.router',
  'angular-cache',
  'LocalStorageModule',
  'angular-medium-editor',
  'ngFileSaver',
]).
config(function ($stateProvider, $urlRouterProvider, CacheFactoryProvider) {
  // ui router
  var homeState = {
    name: 'home',
    url: '/home',
    templateUrl: '/templates/home.html',
    controller: 'HomeCtrl'
  }
  
  // register states
  $stateProvider.state(homeState);
  
  // default route
  $urlRouterProvider.otherwise('/home'); 

});
