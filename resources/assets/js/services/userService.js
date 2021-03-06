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