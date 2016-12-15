var Todo = angular.module('Todo', ['ui.router', 'ui.bootstrap'])
	.config(function ($stateProvider, $locationProvider, $urlRouterProvider, $qProvider) {
		$urlRouterProvider.otherwise('/error')
		$locationProvider.html5Mode(true)
		$qProvider.errorOnUnhandledRejections(false)

		$stateProvider
			.state('dashboard', {
				url: '/',
				controller: 'MainController',
				templateUrl: 'templates/dashboard.html',
				resolve: {
					isConnected: function ($q) {
						return $q.resolve('ok')
							//return $q.reject('error')
					},
				}
			})
			.state('foo', {
				url: '/foo',
				controller: 'FooController',
				templateUrl: 'templates/foo.html',
			})
			.state('impossible', {
				url: '/admin',
				controller: 'FooController',
				templateUrl: 'templates/foo.html',
				resolve: {
					isConnected: function ($q) {
						//return $q.resolve('ok')
						return $q.reject('error')
					},
				}
			})
			.state('error', {
				url: '/error',
				templateUrl: 'templates/error.html',
			})
	})
	.run(function ($rootScope, $state, $stateParams, $location) {
		$rootScope.$state = $state
		$rootScope.$stateParams = $stateParams
		$rootScope.go = function (path) {
			$location.path(path)
		}

		$rootScope.$on('$stateChangeError', function (error) {
			$rootScope.$state.go('error')
		})

	})
	.controller('MainController', function ($scope) {
		$scope.message = 'This dashboard is empty'
	})
	.controller('FooController', function ($scope) {
		$scope.message = 'Dang this is worse:s'
	})