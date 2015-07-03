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