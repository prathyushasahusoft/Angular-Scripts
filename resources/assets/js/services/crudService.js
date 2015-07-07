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