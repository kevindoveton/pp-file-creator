'use strict';
// Declare app level module which depends on filters, and services

angular.module('ppfilecreator', [
  'ppfilecreator.controllers',
  'ppfilecreator.filters',
  'ppfilecreator.services',
  'ppfilecreator.directives',
  'ngAnimate',
  'ngSanitize',
  'angularModalService',
  'ui.router',
  'angular-cache',
  'LocalStorageModule',
  'angular-medium-editor',
  'ngFileSaver',
  'angularFileUpload',
]).
config(function ($stateProvider, $urlRouterProvider, $locationProvider, CacheFactoryProvider, localStorageServiceProvider) {
  // ui router
  // register states
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: '/templates/login.html',
    controller: 'LoginCtrl'
  });
  
  $stateProvider.state('home', {
    url: '/home',
    templateUrl: '/templates/home.html',
    controller: 'HomeCtrl'
  });
  
  $stateProvider.state('files', {
    url: '/file',
    templateUrl: '/templates/file.html',
    controller: 'FileCtrl'
  });
  
  $stateProvider.state('templates', {
    url: '/template',
    templateUrl: '/templates/template.html',
    controller: 'TemplateCtrl'
  });
  
  // default route
  $urlRouterProvider.otherwise('/home'); 
  $locationProvider.html5Mode(true)
  
  // local storage storage
  localStorageServiceProvider.setPrefix('pfc');
});
