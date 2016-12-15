var Todo = angular.module('Todo', ['ui.bootstrap'])

angular.module('Todo').controller('GoodCtrl', function () {
})

angular.module('Todo').controller('BadCtrl', function ($scope) {
})

angular.module('Todo').controller('ParentCtrl', function ($scope) {
	$scope.message = 'Hello'
	$scope.items = []
	var found = []
	for (var i = 0; i != 100; ++i) {
		$scope.items.push(i)
	}

	$scope.itemFilter = function (elem, index, elems) {
		console.log('filtered !')
		if (elem == $scope.search || found.indexOf(elem) != -1){
			found.push(elem)
			return elem
		}
	}
})

angular.module('Todo').controller('WTFCtrl', function () {
	var that = this
	that.message = 'Hello'
	that.items = []
	var found = []
	for (var i = 0; i != 100; ++i) {
		that.items.push(i)
	}

	that.itemFilter = function (elem, index, elems) {
		console.log('filtered !')
		if (elem == that.search || found.indexOf(elem) != -1){
			found.push(elem)
			return elem
		}
	}
})


