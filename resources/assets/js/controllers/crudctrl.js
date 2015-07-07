angular.module('dashboardApp')
.controller('crudCtrl', ['$scope', 'crudService', '$location', 'ngDialog',
	function($scope, $crudService, $location, $ngDialog){

	$crudService.get()
		.then(function(response){
			console.log("success in crudCtrl");
			$scope.crudList = response.result;

			angular.forEach($scope.crudList, function(crud){
				//$crudService.getSenders(crud.id)
				//	.then(function(response){
				//		var senders = response;
				var twitter_handles = "";
				angular.forEach(crud.sender, function(sender){
					console.log(sender.twitter_handle);
					twitter_handles = twitter_handles + " " + sender.twitter_handle;
				});
				crud.twitter_handlers = twitter_handles;
				
			}); 

			console.log(response);
		});
	
	$scope.delete = function (crud) {
		console.log(crud.id);
		$crudService.delete(crud.id);
		var index = $scope.crudList.indexOf(crud);
		$scope.crudList.splice(index, 1);
  	};

  	$scope.editCrud = function(crud){
  		$crudService.setCrud(crud);
  		$location.url("/create-crud");  		 
  	}

  	$scope.viewCrud = function(crud){
  		$crudService.setCrud(crud);
  		$location.url("/view-crud");  		
  	}

  	$scope.addEmail = function(crud){
  		$crudService.setCrud(crud);
  		$ngDialog.open({ templateUrl: '/views/crud/captureEmail.html', 
  						controller: 'addEmailToCrudCtrl',
  						className: 'ngdialog-theme-default' });
  	}
  	
  	$scope.resetCrud = function() {
  		$crudService.resetCrud();
  	}
}]);