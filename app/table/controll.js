'use strict';

angular.module('myApp.table', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/table', {
            templateUrl: 'table/index.html',
            controller: 'ViewTableCtrl'
        });
    }])

    .controller('ViewTableCtrl', ['$scope', 'store', function ($scope, store) {
        $scope.login = store.getLogin();
        $scope.score = store.getScore();
    }])