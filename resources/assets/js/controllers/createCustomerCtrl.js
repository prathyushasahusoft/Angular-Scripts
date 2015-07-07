angular.module('dashboardApp')
.controller('createCustomerCtrl', ['$scope', 'customerService', '$q', '$location', 'ngDialog',
	function($scope, $customerService, $q, $location, $ngDialog){

	$scope.customer = $customerService.getCustomer();
	console.log("loading app form");
	console.log($scope.customer);
	$scope.captureCustomer = function(){
		console.log($scope.customer);

		if ($scope.customer.action == 'Edit'){
			$customerService.update($scope.customer)
				.success(function(response){
					$customerService.resetCustomer();
					$location.url("/customers");	

				})
				.error(function(response){
					$scope.error = response;
				});
		}
		else{
			console.log($scope.customer);
			$customerService.save($scope.customer)
				.success(function(response){
					$location.url("/customers");	
				})
				.error(function(response){
					$scope.error = response;
				});
		}
	}

	$scope.reset = function(){
		$scope.customer = null;
		$scope.customerForm.$setPristine();
		console.log("empty the form");	
	}
	$scope.pushNewEmail = function() {
		$scope.customer.emailList.push({email: $scope.newEmail, status: 0});
		$scope.newEmail = '';
	}

	$scope.delete = function (email) {
		var index = $scope.customer.emailList.indexOf(email);
		$scope.customer.emailList.splice(index, 1);

		angular.forEach($scope.customer.sender, function(sender){
			if (sender.email == email.email){
				sender.status = '2';
			}
		});
  	};

  	$scope.resetCustomer = function() {
  		console.log("resetCustomer1");
  		$customerService.resetCustomer();
  	}

  	$scope.editEmail = function(customer){
  		$ngDialog.open({ templateUrl: '/views/customer/editEmail.html', 
  						controller: 'addEmailToCustomerCtrl',
  						className: 'ngdialog-theme-default' });
  		$ngDialog.close();
  		$scope.customer = $customerService.getCustomer();
  		console.log($scope.customer);
  	}
}]);