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
  'angularFileUpload'
]).
config(function ($stateProvider, $urlRouterProvider, CacheFactoryProvider) {
  // ui router
  // register states
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

});
