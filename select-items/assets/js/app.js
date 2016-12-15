var Todo = angular.module('Todo', ['ui.bootstrap'])
.controller('MainController', function ($scope) {
	$scope.newItem = 'New item'
	$scope.items = []
	$scope.opened = false
	$scope.dt = new Date()
	$scope.format = 'dd-MMMM-yyyy'
	$scope.showPage = true
	$scope.itemsSelected = []

	$scope.submit = function () {
		if ($scope.newItem != '') {
			$scope.items.push({
				data: $scope.newItem,
				date: $scope.dt
			})
			$scope.newItem = ''
		}
	}

	$scope.removeElems = function () {
		for (var i = 0; i != $scope.itemsSelected.length; ++i) {
			var item = $scope.itemsSelected[i]
			if ($scope.items.indexOf(item) != -1)
				$scope.items.splice($scope.items.indexOf(item), 1)
		}
		$scope.itemsSelected = []
	}

	$scope.customSearch = function (elem, index, elems) {
		if (!$scope.search)
			return elem
		if (elem.data == $scope.search)
			return elem
		return
	}

	$scope.selectItem = function (item) {
		if ($scope.itemsSelected.indexOf(item) == -1)
			$scope.itemsSelected.push(item)
		else
			$scope.itemsSelected.splice($scope.itemsSelected.indexOf(item), 1)
	}

	$scope.getItemClass = function (item) {
		if ($scope.itemsSelected.indexOf(item) != -1)
			return 'text-success'
	}

})