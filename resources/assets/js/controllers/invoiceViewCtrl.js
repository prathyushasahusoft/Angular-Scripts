angular.module('dashboardApp')
.controller('invoiceViewCtrl', ['$scope', 'invoiceService', '$location', 'ngDialog',
function($scope, $invoiceService, $location, $ngDialog){
 	$scope.invoiceView = $invoiceService.getInvoice();
 	$invoiceService.view($scope.invoiceView)
		.then(function(response){
			console.log("success in invoiceCtrl");
			$scope.invoice = response.result;
			$scope.invoice.items = [];
            $scope.invoice.newItems = [];
			$scope.invoice.summary = [];
			console.log(response);
		});
	$invoiceService.getItems($scope.invoiceView)
		.then(function(response){
			console.log("success in invoiceCtrl");
			$scope.invoice.items = response.result;
			angular.forEach($scope.invoice.items, function(invoiceItem){
				invoiceItem.allowEdit = 1;			
			});
			$scope.invoice.summary = [];
			console.log(response);
		});

	$scope.addItem = function() {
        $scope.invoice.items.push({quantity:0, unitcost:0, description:"",allowEdit:0,invoice_id:$scope.invoice.id});    
        $scope.invoice.newItems.push({quantity:$scope.invoice.items.quantity,
                                     unitcost:$scope.invoice.items.quantity,
                                     description:$scope.invoice.items.quantity,
                                     item:$scope.invoice.items.quantity,
                                     allowEdit:0,
                                     invoice_id:$scope.invoice.id});   
        console.log("scope.invoice.newItems");
        console.log($scope.invoice.newItems);
    }
    $scope.removeItem = function(item) {
    	$invoiceService.removeItem(item);
        $scope.invoice.items.splice($scope.invoice.items.indexOf(item), 1);    
    }
    $scope.invoice_sub_total = function() {
        var total = 0.00;
        angular.forEach($scope.invoice.items, function(item, key){
          total += (item.quantity * item.unitcost);
        });
        $scope.invoice.sub_total = total;
        return total;
    }
    $scope.calculate_service_tax = function() {
        return (($scope.invoice.service_tax * $scope.invoice_sub_total())/100);
    }
    $scope.calculate_education_cess = function() {
        return (($scope.invoice.education_cess * $scope.invoice_sub_total())/100);
    }
    $scope.calculate_secondary_cess = function() {
        return (($scope.invoice.secondary_cess * $scope.invoice_sub_total())/100);
    }
    $scope.calculate_grand_total = function() {
        $grand_total = $scope.calculate_service_tax() + 
		        	   $scope.calculate_education_cess()+
		        	   $scope.calculate_secondary_cess()+
		        	   $scope.invoice_sub_total();
         return $grand_total;        	   
    } 
    $scope.captureItems = function() {
    	$scope.invoice.summary.push({invoice_id:$scope.invoice.id,
                                     sub_total:$scope.invoice.sub_total,
         							  service_tax:$scope.invoice.service_tax, 
         							  education_cess:$scope.invoice.education_cess, 
         							  secondary_cess:$scope.invoice.secondary_cess,
         							  grand_total: $grand_total});	
    	$invoiceService.saveItems($scope.invoice.newItems);
    	$invoiceService.saveSummary($scope.invoice.summary);
    }

}]);