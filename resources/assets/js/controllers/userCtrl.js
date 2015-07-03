angular.module('dashboardApp')
.controller('userCtrl', ['$scope', 'userService', '$location', 'ngDialog',
	function($scope, $userService, $location, $ngDialog){
	$scope.btn = "Edit";

	$userService.get()
		.then(function(response){
			console.log("success in userCtrl");
			$scope.userList = response.result;
			angular.forEach($scope.userList, function(user){
				user.active = "inactive";
				user.action = 1;			
			});
			$scope.userList[0].active = "active";
			$scope.userDetails($scope.userList[0]);
			console.log($scope.userList[0]);
		});
	$scope.userDetails = function (currentUser) {	
		console.log(currentUser.id);
		$scope.error = "";	
		$scope.userdetails = currentUser;
		currentUser.active = "active";
		angular.forEach($scope.userList, function(user){
				if(user.id != currentUser.id)	{
					user.active = "inactive";	
				}
			});
		/*$userService.view(currentUser)
		.then(function(response){
			$scope.userdetails = response.result;	
			$scope.userdetails.action = 1;
			$scope.userdetails.active = "active";
			console.log(response);
		});
		angular.forEach($scope.userList, function(user){
				if(user.id != currentUser.id)	{
					user.active = "inactive";	
				}
			})*/
  	};
	$scope.delete = function (currentUser) {
		console.log(currentUser.id);
		$userService.delete(currentUser.id);
		$scope.userDetails(currentUser);
		currentUser.active = "active";
		$userService.get()
		.then(function(response){
			console.log("success in userCtrl");
			$scope.userList = response.result;
			angular.forEach($scope.userList, function(user){
				if(user.id == currentUser.id)	
					user.active = "active";
				else
					user.active = "inactive";			
			}); 

			console.log(response);
		});
		$location.url("/manage-users");
  	};

  	$scope.editUser = function(user){
  		//$userService.setUser(user);
  		if($scope.btn == "Edit"){
	  		user.action = 0; 
	  		$scope.btn = "view";
	  	}
	  	else{
	  		$userService.view(user)
			.then(function(response){
				console.log("success in userCtrl");
				$scope.userdetails = response.result;	
				$scope.userdetails.action = 1;
				console.log(response);
			});
	  		user.action = 1; 
	  		$scope.btn = "Edit";
	  	}
  		console.log(user); 		 
  	}
  	$scope.edit = function(user){
  		/*if(user.name.length == 0){
	  			$scope.error.name = 1;
	  			return;
	  		}*/
  		$userService.update(user)
  			.success(function(response){
					console.log("sucesss in userCtrl");
					$scope.result = response;
				})
				.error(function(response){
					$scope.error = response;
				}); 		 
  	}

  	$scope.viewUser = function(user){
  		$userService.setUser(user);
  		$location.url("/view-user");  		
  	}

  	$scope.addEmail = function(user){
  		$userService.setUser(user);
  		$ngDialog.open({ templateUrl: '/views/user/captureEmail.html', 
  						controller: 'addEmailToUserCtrl',
  						className: 'ngdialog-theme-default' });
  	}
  	
  	$scope.resetUser = function() {
  		$userService.resetUser();
  	}
}]);