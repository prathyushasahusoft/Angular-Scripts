angular.module('dashboardApp')
.service('customerService', ['apiService', '$q', function(APIService, $q){
	var currentCustomer = {action: "Create"};

	this.setCustomer = function(customer){
		currentCustomer = customer;
		currentCustomer.action = "Edit";
		currentCustomer.allowEdit = false;
		console.log(currentCustomer);
	}

	this.resetCustomer = function(){
		console.log("resetCustomer2");
		currentCustomer = {action: "Create"};
		console.log(currentCustomer);
	}

	this.getCustomer = function(){
		return currentCustomer;
	}

	this.save = function(data){
		console.log("the customer service - save customer details");	
		return APIService.post("/api/v1/customer", data)
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
		console.log("the customer service - update customer details");	
			
		//var response = APIService.post("api/v1/customer", data);
		return APIService.put("/api/v1/customer/" + data.id, data)
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
		return APIService.show("/api/v1/manage-users/" + data.id)
			.then(function(response){
				console.log("success in userService");
				return response;
				console.log(response);	
			}
		);
	}

	this.delete = function(data){
		console.log("the customer service - delete an customer");	
			
		var response = APIService.delete("/api/v1/customer/" + data);
		console.log(response);	
			
	}

	this.get = function(){
		console.log("the customer service - get customer details");	
		
		return APIService.get("/api/v1/customer")
			.then(function(response){
				console.log("success in customerService");
				return response;
			}
		);
	}
}]);