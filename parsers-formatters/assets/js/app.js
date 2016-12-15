var Todo = angular.module('Todo', ['ui.bootstrap'])
  .controller('MainController', function ($scope) {
    $scope.inputVal2 = 'this is a test'
  })
  .directive('formatInput', function () {
    return {
      //Permet l'injection de ngModelController
      require: 'ngModel',
      link: function (scope, element, attrs, ngModelController) {
        //Update quand l'input est modifé par l'utilisateur
        ngModelController.$parsers.push(function (data) {
          if (data) {
            var up = data.toUpperCase()
            return up
          }
          return data
        })
      }
    }
  }).directive('formatFromCode', function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ngModelController) {
        //Update lorsque le model est modifié (via le code du controller)
        ngModelController.$formatters.push(function (data) {
          if (data) {
            var up = data.toUpperCase()
            return up
          }
          return data
        })
      }
    }
  })

/*            if (data) {
            var formatted = ''
            var authorized = '0123456789'
            for (var i = 0; i != data.length; ++i){
              if (authorized.indexOf(data[i]) != -1){
                formatted += data[i]
              }
            }
            ngModelController.$setViewValue(formatted)
            ngModelController.$render()
            return formatted
          }
          return data
*/