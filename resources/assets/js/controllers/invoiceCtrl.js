angular.module('dashboardApp')
.controller('invoiceCtrl', ['$scope', 'invoiceService', '$location', 'ngDialog',
	function($scope, $invoiceService, $location, $ngDialog){
  $scope.action="edit";
	$invoiceService.get()
		.then(function(response){
			console.log("success in invoiceCtrl");
			$scope.invoiceList = response.result;
			console.log(response);
		});
	
	$scope.delete = function (invoice) {
		console.log(invoice.id);
		$invoiceService.delete(invoice.id);
		var index = $scope.invoiceList.indexOf(invoice);
		$scope.invoiceList.splice(index, 1);
		//$invoiceService.get();
  	};

	$scope.editInvoice = function(invoice){
    console.log("invoice1");
    console.log(invoice);
		$invoiceService.setInvoice(invoice);
		$location.url("/create-invoices");  		 
	}

	$scope.viewInvoice = function(invoice){
		$location.url("/view-invoice"); 
		$invoiceService.setViewInvoice(invoice); 		
	}
  	
 	$scope.resetInvoice = function() {
  		console.log("resetInvoice1");
  		$invoiceService.resetInvoice();
  	}
}]);