var Todo = angular.module('Todo', ['ui.router', 'ui.bootstrap', 'ngResource'])
	.config(function ($stateProvider, $locationProvider, $urlRouterProvider, $qProvider, $resourceProvider) {
		$urlRouterProvider.otherwise('/error')
		$locationProvider.html5Mode(true)
		$qProvider.errorOnUnhandledRejections(false)

		$resourceProvider.defaults.stripTrailingSlashes = false
		$stateProvider
			.state('dashboard', {
				url: '/',
				controller: 'MainController',
				templateUrl: 'templates/dashboard.html',
				resolve: {
					isConnected: function ($q) {
						return $q.resolve('ok')
					},
				}
			})
			.state('error', {
				url: '/error',
				templateUrl: 'templates/error.html',
			})
	})
	.run(function ($rootScope, $state, $stateParams) {
		$rootScope.$state = $state
		$rootScope.$stateParams = $stateParams
		$rootScope.go = function (path) {
			$location.path(path)
		}

		$rootScope.$on('$stateChangeError', function (error) {
			$rootScope.$state.go('error')
		})

	})
	.controller('MainController', function ($scope, requestService) {
		$scope.items = requestService.query()
		$scope.newItem = 'New item'
		$scope.opened = false
		$scope.dt = new Date()

		$scope.dateOptions = {
			formatYear: 'yy',
			maxDate: new Date(2020, 5, 22),
			minDate: new Date(),
			startingDay: 1
		}
		$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate']
		$scope.format = $scope.formats[0]
		$scope.altInputFormats = ['M!/d!/yyyy']

		$scope.remove = function () {
			var elem = $scope.items[0]
			if (elem != null && elem.id != null) {
				console.log('remove elem', elem)
				elem.$remove({
					idItem: elem.id
				}).then(function (result) {
					console.log('result remove', result)
					_.remove($scope.items, function (item) {
						if (item.id == elem.id)
							return true
						return false
					})
				})
			}
		}


		$scope.submit = function () {
			$scope.items.push(requestService.save({
				data: $scope.newItem,
				date: $scope.dt
			}))
		}
		$scope.open = function () {
			$scope.opened = true
		}

		requestService.exemple(function (result) {
				console.log('test result', result)
			})

	}).factory('requestService', function ($resource) {
		return $resource('/item/:idItem', {}, {
			exemple: {
				method: 'PUT',
				url: '/test'
			}
		})
	})