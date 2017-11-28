'use strict';

angular.module('myApp.authorization', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/authorization', {
      templateUrl: 'authorization/index.html',
      controller: 'ViewAuthCtrl'
    });
  }])

  .controller('ViewAuthCtrl', ['$scope', '$location', 'store', function ($scope, $location, store) {
    $scope.clickHandler = function () {

      store.setLogin($scope.login);

      const isValid = validate(store.getLogin());
      
      if (isValid) {
        $location.path('game')
      } else {
        $scope.isHintShow = true;
      }
    };
  }]);

const validate = function (value) {
  console.log(value)
  for (var i = 0; i < 10; i++) {
    var regexp = /[0-9]/;
    var regexp1 = /[а-яА-ЯёЁ]/;
    if (value[0].search(regexp) != -1 || value.search(regexp1) != -1) {
      value = "";
      return false;
    } else {
      return true;
    }
  }
}