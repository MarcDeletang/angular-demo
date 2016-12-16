var Todo = angular.module('Todo', ['ui.router', 'ui.bootstrap', 'ngResource'])
	.config(function ($stateProvider, $locationProvider, $urlRouterProvider, $qProvider, $resourceProvider, $httpProvider) {
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
		$httpProvider.interceptors.push('testInterceptor')
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
	.controller('MainController', function ($scope, requestService, $cacheFactory) {
		requestService.getItems().then(function (result) {
			if (result && result.data)
				$scope.items = result.data
		})
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
				requestService.removeItem(elem.id).then(function (result) {
					_.remove($scope.items, function (item) {
						if (item.id == elem.id)
							return true
						return false
					})
				})
			}
		}

		$scope.submit = function () {
			requestService.createItem({
				data: $scope.newItem,
				date: $scope.dt
			}).then(function (result) {
				console.log('Cache', $cacheFactory.info().test)
				if (result && result.data)
					$scope.items.push(result.data)
			})
		}

		$scope.open = function () {
			$scope.opened = true
		}

	}).factory('requestService', function ($http, $cacheFactory) {
		var url = ''

		var cache = $cacheFactory('myCache')
		cache.put('test', 'data')
		cache.put('test2', { data:  'data2' })
		console.log(cache.get('test'))
		console.log('cacheinfo', cache.info())

		function getItems() {
			return $http({
				method: 'GET',
				url: '/item'
			})
		}

		function createItem(data) {
			return $http({
				method: 'POST',
				url: '/item',
				data: data,
				withCredentials: false
			})
		}

		function removeItem(id) {
			return $http({
				method: 'DELETE',
				url: '/item/' + id
			})
		}

		return {
			getItems: getItems,
			createItem: createItem,
			removeItem: removeItem
		}

	}).factory('testInterceptor', function ($q) {
		return {
			// optional method
			'request': function (config) {
				// do something on success
				return config
			},

			// optional method
			'requestError': function (rejection) {
				// do something on error
				console.log('reason request fail', rejection)
				return $q.reject(rejection)
			},

			// optional method
			'response': function (response) {
				// do something on success
				return response
			},

			// optional method
			'responseError': function (rejection) {
				// do something on error
				console.log('reason response fail', rejection)
				return $q.reject(rejection)
			}
		}
	})