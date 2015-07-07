angular.module('dashboardApp')
.controller('createCrudCtrl', ['$scope', 'crudService', '$q', '$location', 'ngDialog',
	function($scope, $crudService, $q, $location, $ngDialog){

	$scope.crud = $crudService.getCrud();
	console.log($scope.crud);

	$scope.captureCrud = function(){
		console.log($scope.crud);

		if ($scope.crud.action == 'Edit'){
			$crudService.update($scope.crud)
				.success(function(response){
					$crudService.resetCrud();
					$location.url("/crud-list");	

				})
				.error(function(response){
					$crudService.resetCrud();
					$scope.error = response;
				});
		}
		else{
			console.log($scope.crud);
			$crudService.save($scope.crud)
				.success(function(response){
					$location.url("/crud-list");	
				})
				.error(function(response){
					$scope.error = response;
					//console.log(response);
				});
				// .then(function(response){
				// 	$scope.error = response;
				// 	console.log(error);
				// 	console.log($scope.error)
				// });	
		}
		
		// console.log("save the crud details");	
	}

	$scope.reset = function(){
		$scope.crud = null;
		$scope.crudForm.$setPristine();
		console.log("empty the form");	
	}

	$scope.delete = function (email) {
		var index = $scope.crud.emailList.indexOf(email);
		$scope.crud.emailList.splice(index, 1);

		angular.forEach($scope.crud.sender, function(sender){
			if (sender.email == email.email){
				sender.status = '2';
			}
		});
  	};

  	$scope.resetCrud = function() {
  		$crudService.resetCrud();
  	}
}]);