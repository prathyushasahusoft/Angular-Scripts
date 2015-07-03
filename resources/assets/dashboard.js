angular
.module('dashboardApp', ['ngSanitize', 'ui.bootstrap', 'ngRoute', 'ngDialog'])

.config([
	'$routeProvider',
	function($routeProvider) {
		$routeProvider
		.when('/', {
			templateUrl: '/views/test.html',
			controller: 'testCtrl'
		})
		.when('/manage-users', {
			templateUrl: '/views/users/list.html',
			controller: 'userCtrl'
		})
		.when('/change-password', {
			templateUrl: '/views/change-password/index.html'
		})
		.otherwise({
			redirectTo: '/'
		})
	}

])
