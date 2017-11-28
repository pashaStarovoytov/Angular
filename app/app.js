'use strict';

var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.authorization',
  'myApp.game',
  'myApp.table',
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/authorization'});
}]);
