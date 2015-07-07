angular.module('dashboardApp')
.controller('invoiceViewCtrl', ['$scope', 'invoiceService', '$location', 'ngDialog',
function($scope, $invoiceService, $location, $ngDialog){
 	$scope.invoiceView = $invoiceService.getInvoice();
 	$invoiceService.view($scope.invoiceView)
		.then(function(response){
			console.log("success in invoiceCtrl");
			$scope.invoice = response.result;
			$scope.invoice.items = [{item:"Gadget",  description:'Gadget', qty:10, cost:9.95}];
			console.log(response);
		});

	$scope.addItem = function() {
        $scope.invoice.items.push({qty:0, cost:0, description:""});    
    }
    $scope.removeItem = function(item) {
        $scope.invoice.items.splice($scope.invoice.items.indexOf(item), 1);    
    }
    $scope.invoice_sub_total = function() {
        var total = 0.00;
        angular.forEach($scope.invoice.items, function(item, key){
          total += (item.qty * item.cost);
        });
        return total;
    }
    $scope.calculate_tax = function() {
        return (($scope.invoice.tax * $scope.invoice_sub_total())/100);
    }
    $scope.calculate_eduation_cess = function() {
        return (($scope.invoice.eduation_cess * $scope.invoice_sub_total())/100);
    }
    $scope.calculate_secondry_cess = function() {
        return (($scope.invoice.secondry_cess * $scope.invoice_sub_total())/100);
    }
    $scope.calculate_grand_total = function() {
        return $scope.calculate_tax() + 
        	   $scope.calculate_eduation_cess()+
        	   $scope.calculate_secondry_cess()+
        	   $scope.invoice_sub_total();
    } 


}]);