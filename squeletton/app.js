var Todo = angular.module('Todo', ['ui.bootstrap']).factory('myService', function () {
	var stringTest = ' John !'
	return {
		getMessage: function () {
			return stringTest
		}
	}
})

angular.module('Todo').controller('MainCtrl', function (myService) {
	this.message = 'Hi'
	this.serviceMessage = myService.getMessage()
})

angular.module('Todo').controller('ScopeCtrl', function ($scope, myService) {
	$scope.message = 'Hello'
	$scope.serviceMessage = myService.getMessage()
})