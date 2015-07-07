angular.module('dashboardApp')
.service('apiService', ['$http', '$q', function($http, $q){

	this.post = function(url, data){
		console.log("the api service - post method");	
			
		return $http.post(url, data)
			.success(function(response){
				console.log("the api service -response");
				console.log(response);
				return "successful";	
			})
			.error(function(response){
				console.log("error in api post");
				console.log(response);
				return response;
			});
			
	}

	this.put = function(url, data){
		console.log("the api service - put method");	
			
		return $http.put(url, data)
			.success(function(response){
				console.log("the api service -response");
				console.log(response);
				return "successful";	
			})
			.error(function(response){
				console.log("error in api put");
				console.log(response);
				return response;
			});
			
	}

	this.get = function(url){
		console.log("the api service - get method");	
			
		return $http.get(url)
			.then(function(response) {
				console.log("success in apiService");
				console.log(response);
				return response.data;
	    	});

	}

	this.show = function(url){
		console.log("the api service - get method");	
			
		return $http.get(url)
			.then(function(response) {
				console.log("success in apiService");
				console.log(response);
				return response.data;
	    	});

	}
	
	this.delete = function(url){
		console.log("the api service - delete method");	
			
		// return $http.delete(url).then(function(response) {
		//  	console.log("success in apiService");
  //        	return response.data;
  //    	});

    	$http.delete(url)
			.success(function(response){
				console.log(response);
				return response;	
			})
			.error(function(response){
				console.log("error in api post");
				console.log(response);
				return response;
			});

	}

}]);
angular.module('dashboardApp')
.service('crudService', ['apiService', '$q', function(APIService, $q){
	var currentCrud = {action: "Create"};

	this.setCrud = function(crud){
		currentCrud = crud;
		currentCrud.action = "Edit";
		console.log(currentCrud);
	}

	this.resetCrud = function(){
		currentCrud = {action: "Create"};
		console.log(currentCrud);
	}

	this.getCrud = function(){
		return currentCrud;
	}

	this.save = function(data){
		console.log("the crud service - save crud details");	
		return APIService.post("/api/v1/crud", data)
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
		console.log("the crud service - update crud details");	
			
		//var response = APIService.post("api/v1/crud", data);
		return APIService.put("/api/v1/crud/" + data.id, data)
			.success(function(response){
				console.log(response);
				return response;
			})
			.error(function(response){
				console.log(response);
				return response;
			});
			
	}

	this.delete = function(data){
		console.log("the crud service - delete an crud");	
			
		var response = APIService.delete("/api/v1/crud/" + data);
		console.log(response);	
			
	}

	this.get = function(){
		console.log("the crud service - get crud details");	
		
		return APIService.get("/api/v1/crud")
			.then(function(response){
				console.log("success in crudService");
				return response;
				//console.log(response);
			}
		);
	}
}]);
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
angular.module('dashboardApp')
.service('userService', ['apiService', '$q', function(APIService, $q){
	var currentUser = {action: "Create"};

	this.setUser = function(user){
		currentUser = user;
		currentUser.action = 0;
		currentUser.active = "active";
		console.log(currentUser);		
	}

	this.resetUser = function(){
		currentUser = {action:0,active:"active"};
		console.log(currentUser);
	}

	this.getUser = function(){
		return currentUser;
	}

	this.save = function(data){
		console.log("the user service - save user details");	
		return APIService.post("/api/v1/user", data)
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
		console.log("the user service - update user details");	
		return APIService.put("/api/v1/manage-users/" + data.id, data)
			.success(function(response){
				console.log(response);
				return response;
			})
			.error(function(response){
				console.log("errors.message");
				return response;
			});
			
	}

	this.delete = function(data){
		console.log("the user service - delete an user");	
		var response = APIService.delete("/api/v1/manage-users/" + data);
		console.log(response);	
	}

	this.get = function(){
		console.log("the user service - get user details");	
		
		return APIService.get("/api/v1/manage-users")
			.then(function(response){
				console.log("success in userService");
				return response;
				console.log(response);	
			}
		);
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


	this.getSenders = function(id){
		console.log("the user service - get senders for user");	
		
		return APIService.get("api/v1/user/sender/" + id)
			.then(function(response){
				console.log("success in userService");
				return response;
			}
		);
	}
	
	this.addEmailAddress = function(email){
		console.log("save the emailaddress for the user");
		console.log(currentUser.id);
		console.log(email);
		$email = {email: email};
		APIService.put("api/v1/user/email/" + currentUser.id, $email)
			.success(function(response){
				console.log(response);
			})
			.error(function(response){
				console.log(response);
			});
	}

	this.editEmailContent = function(subject, message){
		currentUser.email_template = {subject: subject, message: message};
		return;
	}

	this.getEmailSubject = function(){
		return currentUser.email_template.subject;
	}

	this.getEmailContent = function(){
		return currentUser.email_template.message;
	}
}]);
//# sourceMappingURL=services.js.map