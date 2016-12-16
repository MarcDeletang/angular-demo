//Dépendance bootstrap !
var Todo = angular.module('Todo', ['ui.bootstrap'])
	.provider('exempleService', function () {
		//Création d'un service "exemple" via un provider
		console.log('1: Le provider du service "exemple" est appelé lors de la première phase d\'initialisation, avant le config')
		this.message = 'This is the default message'

		this.$get = function ( /*injected*/ ) {
			var message = this.message
			console.log('3: Création du service exempleService')
				//injected.checkInit()
			return {
				getMessage: function () {
					//Yep
					console.log('Whoops', this.message)
					return "Hello, " + message + " !!!"
				}
			}
		}

	})
	//PAS IMPORTANT POUR LE MOMENT
	.factory('injected', function (/*injectedFail*/) {
		console.log('2.5 (smart angular) creation de mon service "injected"')
		return {
			checkInit: function () {
				console.log('injected.checkInit')
			}
		}
	})
	//A NE JAMAIS FAIRE
		.factory('injectedFail', function (injected) {
		console.log('2.4 ??? NEVER MADE IT TO THIS POINT')
		return {
			checkInit: function () {
				console.log('injected.checkInit')
			}
		}
	})
	.config(function (exempleServiceProvider) {
		console.log('2: Appel de configuration - exempleServiceProvider.message', exempleServiceProvider.message)
			//exempleServiceProvider.message = 'JOHNNY'
	})
	//Lorsque le service n'est jamais injecté dans l'application, il n'est PAS initialisé (le provider l'est en revanche dans tous les cas)
	.controller('MainController', function ($scope /*, exempleService*/) {
		$scope.newItem = 'New item'
		$scope.items = []
		$scope.opened = false
		$scope.dt = new Date()
		$scope.format = 'dd-MMMM-yyyy'
		$scope.showPage = false

		//console.log('MainController: apres la configuration de exempleService', exempleService.getMessage())

		$scope.submit = function () {
			if ($scope.newItem != '') {
				$scope.items.push({
					data: $scope.newItem,
					date: $scope.dt
				})
				$scope.newItem = ''
			}
		}

		$scope.customSearch = function (elem, index, elems) {
			if (!$scope.search)
				return elem
			if (elem.data == $scope.search)
				return elem
			return
		}

	})
	.directive('elemImportant', function () {
		return {
			template: '<td class="text-danger">{{ $index }}</td>\
							<td class="text-danger">{{ item.data }}</td>\
							<td class="text-danger">{{ item.date | date }}</td>'
		}
	})
	.directive('elemsIsolated', function () {
		return {
			restrict: 'A',
			scope: {
				items: '=source',
			},
			template: '<tr ng-repeat="item in items | orderBy:\'date\':true">\
							<td class="text-success">{{ $index }}</td>\
							<td class="text-success">{{ item.data }}</td>\
							<td class="text-success">{{ item.date | date:"dd/MM/yyyy \'à\' H:mm" }}</td>\
							</tr>'
		}
	})