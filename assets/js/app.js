var module = angular.module('Exemple', []).config(function () {
}).config(function () {
}).factory('myService', function () {
	var stringTest = 'this is a log message'
	return {
		getMessage: function () {
			return stringTest
		}
	}
}).run(function (myService) {
	//wow
	console.log(myService.getMessage())
}).controller('MainController',function (myService) {
})

var module2 = angular.module('Exemple2', []).factory('myService', function () {
	var stringTest = 'I ERASED YOU'
	return {
		getMessage: function () {
			return stringTest
		}
	}
})

///

var Todo = angular.module('Todo', ['ui.bootstrap', 'Exemple', 'Exemple2'])

.service('testService', function(){
	var message = 'Hello'

	this.getMessage = function(){
		return message
	}
})
angular.module('Todo').controller('ButtonsCtrl', function ($scope, myService, testService) {
	$scope.singleModel = 1
	console.log('hi')
	console.log(testService.getMessage())

	$scope.radioModel = 'Middle'

	$scope.checkModel = {
		left: false,
		middle: true,
		right: false
	}

	$scope.checkResults = []

	$scope.$watchCollection('checkModel', function () {
		$scope.checkResults = []
		angular.forEach($scope.checkModel, function (value, key) {
			if (value) {
				$scope.checkResults.push(key)
			}
		})
	})

})



/*
angular.module('Exemple').controller('MainController', function ($scope) {
})*/