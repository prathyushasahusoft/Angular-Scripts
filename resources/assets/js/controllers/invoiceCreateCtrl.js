angular.module('dashboardApp')
.controller('invoiceCreateCtrl', ['$scope', 'invoiceService','customerService', '$location', 'ngDialog',
	function($scope, $invoiceService, $customerService, $location, $ngDialog){
  $scope.selectedCustomer = { id: "", first_name : "select a customer"};
	$customerService.get()
		.then(function(response){
			console.log("success in invoiceCtrl");
			$scope.customerList = response.result;
      console.log("name");
      console.log($scope.customerList[0].first_name);
			//console.log(response);
		});
	$scope.setCustomer = function (id, first_name) {
    $scope.selectedCustomer.id = id;
    $scope.selectedCustomer.first_name = first_name;
    $scope.invoice.customer_id = id;    
    /*$applicationService.getSenders(id)
      .then(function(response){
        $scope.campaign.senders = response.result;
      }); */
  }
 
	$scope.invoice = $invoiceService.getInvoice();
  console.log("loading app form");
  console.log($scope.invoice);
  $scope.captureInvoice = function(){
    console.log($scope.invoice);
    if ($scope.invoice.action == 'Edit'){
      $invoiceService.update($scope.invoice)
        .success(function(response){
          $invoiceService.resetInvoice();
          $location.url("/invoice");  

        })
        .error(function(response){
          $scope.error = response;
        });
    }
    else{
      console.log($scope.invoice);
      $invoiceService.save($scope.invoice)
        .success(function(response){
          $location.url("/invoice");  
        })
        .error(function(response){
          $scope.error = response;
        });
    }
  }

  $scope.reset = function(){
    $scope.invoice = null;
    $scope.invoiceForm.$setPristine();
    console.log("empty the form");  
  }

  $scope.resetInvoice = function() {
    console.log("resetInvoice1");
    $invoiceService.resetInvoice();
  }

}]);