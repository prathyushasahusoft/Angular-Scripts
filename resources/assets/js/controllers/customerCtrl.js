angular.module('dashboardApp')
.controller('customerCtrl', ['$scope', 'customerService', '$location', 'ngDialog',
	function($scope, $customerService, $location, $ngDialog){
	$customerService.get()
		.then(function(response){
			console.log("success in customerCtrl");
			$scope.customerList = response.result;
			console.log(response);
		});
	
	$scope.delete = function (customer) {
		console.log(customer.id);
		$customerService.delete(customer.id);
		var index = $scope.customerList.indexOf(customer);
		$scope.customerList.splice(index, 1);
		//$customerService.get();
  	};

  	$scope.editCustomer = function(customer){
  		$customerService.setCustomer(customer);
  		$location.url("/create-customer");  		 
  	}

  	$scope.viewCustomer = function(customer){
  		$location.url("/view-customer"); 
  		$customerService.view(customer); 		
  	}
  	
 	$scope.resetCustomer = function() {
  		console.log("resetCustomer1");
  		$customerService.resetCustomer();
  	}
  	$scope.search = function() {
  		console.log("resetCustomer1");
  		$customerService.resetCustomer();
  	}
}]);