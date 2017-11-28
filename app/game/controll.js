'use strict';

angular.module('myApp.game', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/game', {
      templateUrl: 'game/index.html',
      controller: 'ViewGameCtrl'
    });
  }])

  .controller('ViewGameCtrl', ['$scope', 'store', function ($scope, store) {
    $scope.question = store.getLogin();
  }])

  .controller('timerController', ['$scope', function ($scope) {
    var timer = function () {
      var UnlockRemindPass = moment().add(2, 'minutes').valueOf();

      console.log("object");

      function functionTimer() {
        var DateTime = moment().valueOf();
        var d = UnlockRemindPass - DateTime;
        document.querySelector("h5").innerHTML = moment(d).utc().format('HH:mm:ss');
        d > 0 && window.setTimeout(functionTimer, 300);
      }

      functionTimer();
    }

    $scope.timer = timer();
  }])

  .controller('questionController', ['$scope', '$location', '$http', 'store', function questionController($scope, $location, $http, store) {
    $scope.currentQuestionId = 0;
    $scope.fail = 0;
    $scope.score = 0;

    var questionMass = function (cities) {
      var questions = [];
      cities.forEach(function (city, index) {
        var buttons = [];
        var buttonsIndex = [];

        buttonsIndex.push(index);

        buttons.push({
          value: city.name,
          isTrue: true
        });

        for (var i = 0; i < 3; i++) {
          var id = random(buttonsIndex, cities.length);

          buttonsIndex.push(id);

          buttons.push({
            value: cities[id].name
          })
        }

        function compareRandom(a, b) {
          return Math.random() - 0.5;
        }
        buttons.sort(compareRandom);

        questions.push({
          desc: city.desc,
          name: city.name,
          img: city.img,
          buttons
        });
      });

      $scope.questions = questions;
    }

    var random = function (indexes, sizeOfArray) {
      var rand = Math.floor(Math.random() * (sizeOfArray));

      if (indexes.includes(rand)) {
        return random(indexes, sizeOfArray);
      } else {
        return rand;
      }
    }

    $http({ method: 'GET', url: 'cities.json' }).
      then(function success(response) {
        $scope.cities = response.data.cities;
        questionMass($scope.cities);
      })

    $scope.nextQuestion = function (answer) {
      $scope.currentQuestionId++;
      if (!answer) {
        $scope.fail++;
        $scope.score = $scope.score - 5;
        store.setScore($scope.score);

        if ($scope.score < 5) {
          $scope.score = 0;
          store.setScore($scope.score);
        }
      } else {
        $scope.score = $scope.score + 10;
        store.setScore($scope.score);
      }

      if ($scope.fail == 3) {
        $location.path('table');
      }

      $scope.answerScore = store.getScore();
      console.log($scope.answerScore);
    };
  }]);