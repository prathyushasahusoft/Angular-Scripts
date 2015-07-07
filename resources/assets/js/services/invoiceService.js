angular.module('dashboardApp')
.service('invoiceService', ['apiService', '$q', function(APIService, $q){
	var currentInvoice = {action: "Create"};

	this.setInvoice = function(invoice){
		currentInvoice = invoice;	
		currentInvoice.action = "Edit";	
		console.log(currentInvoice);
	}

	this.setViewInvoice = function(invoice){
		console.log("invoice");
		console.log(invoice);
		currentInvoice = invoice;	
		currentInvoice.action = "view";	
		console.log(currentInvoice);
	}

	this.resetInvoice = function(){ 
		console.log("resetInvoice2");
		currentInvoice = {action: "Create"};
		console.log(currentInvoice);
	}

	this.getInvoice = function(){
		return currentInvoice;
	}

	this.save = function(data){
		console.log("the invoice service - save invoice details");	
		return APIService.post("/api/v1/invoice", data)
			.success(function(response){
				console.log("returning from app service");
				console.log(response);
				return "successful";
			})
			.error(function(response){
				console.log("error in returning from app service");
				console.log(response);
				return response;
			});		
	}

	this.update = function(data){
		console.log("the invoice service - update invoice details");	
			
		//var response = APIService.post("api/v1/invoice", data);
		return APIService.put("/api/v1/invoice/" + data.id, data)
			.success(function(response){
				console.log(response);
				return response;
			})
			.error(function(response){
				console.log(response);
				return response;
			});
			
	}

	this.view = function(data){
		console.log("the user service - get user details");	
		return APIService.show("/api/v1/invoice/" + data.id)
			.then(function(response){
				console.log("success in userService");
				return response;
				console.log(response);	
			}
		);
	}

	this.delete = function(data){
		console.log("the invoice service - delete an invoice");	
			
		var response = APIService.delete("/api/v1/invoice/" + data);
		console.log(response);	
			
	}

	this.get = function(){
		console.log("the invoice service - get invoice details");	
		
		return APIService.get("/api/v1/invoice")
			.then(function(response){
				console.log("success in invoiceService");
				return response;
			}
		);
	}
}]);