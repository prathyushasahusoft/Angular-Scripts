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
		.when('/customers', {
			templateUrl: '/views/customer/list.html',
			controller: 'customerCtrl'
		})
		.when('/create-customer', {
			templateUrl: '/views/customer/create.html',
			controller: 'createCustomerCtrl'
		})
		.when('/view-customer', {
			templateUrl: '/views/customer/view.html',
			controller: 'createCustomerCtrl'
		})
		.when('/invoices', {
			templateUrl: '/views/invoice/list.html',
			controller: 'invoiceCtrl'
		})
		.when('/create-invoices', {
			templateUrl: '/views/invoice/create.html',
			controller: 'invoiceCreateCtrl'
		})
		.when('/view-invoice', {
			templateUrl: '/views/invoice/view.html',
			controller: 'invoiceViewCtrl'
		})
		// .when('/crud-list', {
		// 	templateUrl: '/views/crud/list.html',
		// 	controller: 'crudCtrl'
		// })
		// .when('/crud-create', {
		// 	templateUrl: '/views/crud/create.html'
		// 	controller: 'createCrudcrudCtrl'
		// })
		// .otherwise({
		// 	redirectTo: '/'
		// })
	}

])
