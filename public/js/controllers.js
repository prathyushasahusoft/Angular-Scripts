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
angular.module('dashboardApp')
.controller('createCustomerCtrl', ['$scope', 'customerService', '$q', '$location', 'ngDialog',
	function($scope, $customerService, $q, $location, $ngDialog){

	$scope.customer = $customerService.getCustomer();
	console.log("loading app form");
	console.log($scope.customer);
	$scope.captureCustomer = function(){
		console.log($scope.customer);

		if ($scope.customer.action == 'Edit'){
			$customerService.update($scope.customer)
				.success(function(response){
					$customerService.resetCustomer();
					$location.url("/customers");	

				})
				.error(function(response){
					$scope.error = response;
				});
		}
		else{
			console.log($scope.customer);
			$customerService.save($scope.customer)
				.success(function(response){
					$location.url("/customers");	
				})
				.error(function(response){
					$scope.error = response;
				});
		}
	}

	$scope.reset = function(){
		$scope.customer = null;
		$scope.customerForm.$setPristine();
		console.log("empty the form");	
	}
	$scope.pushNewEmail = function() {
		$scope.customer.emailList.push({email: $scope.newEmail, status: 0});
		$scope.newEmail = '';
	}

	$scope.delete = function (email) {
		var index = $scope.customer.emailList.indexOf(email);
		$scope.customer.emailList.splice(index, 1);

		angular.forEach($scope.customer.sender, function(sender){
			if (sender.email == email.email){
				sender.status = '2';
			}
		});
  	};

  	$scope.resetCustomer = function() {
  		console.log("resetCustomer1");
  		$customerService.resetCustomer();
  	}

  	$scope.editEmail = function(customer){
  		$ngDialog.open({ templateUrl: '/views/customer/editEmail.html', 
  						controller: 'addEmailToCustomerCtrl',
  						className: 'ngdialog-theme-default' });
  		$ngDialog.close();
  		$scope.customer = $customerService.getCustomer();
  		console.log($scope.customer);
  	}
}]);
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
angular.module('dashboardApp')
.controller('customerCtrl', ['$scope', 'customerService', '$location', 'ngDialog',
	function($scope, $customerService, $location, $ngDialog){
	$customerService.get()
		.then(function(response){
			console.log("success in customerCtrl");
			$scope.customerList = response.result;
			console.log(response);
		});
	
	$scope.delete = function (customer) {
		console.log(customer.id);
		$customerService.delete(customer.id);
		var index = $scope.customerList.indexOf(customer);
		$scope.customerList.splice(index, 1);
		//$customerService.get();
  	};

  	$scope.editCustomer = function(customer){
  		$customerService.setCustomer(customer);
  		$location.url("/create-customer");  		 
  	}

  	$scope.viewCustomer = function(customer){
  		$location.url("/view-customer"); 
  		$customerService.view(customer); 		
  	}
  	
 	$scope.resetCustomer = function() {
  		console.log("resetCustomer1");
  		$customerService.resetCustomer();
  	}
  	$scope.search = function() {
  		console.log("resetCustomer1");
  		$customerService.resetCustomer();
  	}
}]);
angular.module('dashboardApp')
.controller('invoiceCreateCtrl', ['$scope', 'invoiceService','customerService', '$location', 'ngDialog',
	function($scope, $invoiceService, $customerService, $location, $ngDialog){
  $scope.selectedCustomer = { id: "", first_name : "select a customer"};
	$customerService.get()
		.then(function(response){
			console.log("success in invoiceCtrl");
			$scope.customerList = response.result;
      console.log("name");
      console.log($scope.customerList[0].first_name);
			//console.log(response);
		});
	$scope.setCustomer = function (id, first_name) {
    $scope.selectedCustomer.id = id;
    $scope.selectedCustomer.first_name = first_name;
    $scope.invoice.customer_id = id;    
    /*$applicationService.getSenders(id)
      .then(function(response){
        $scope.campaign.senders = response.result;
      }); */
  }
 
	$scope.invoice = $invoiceService.getInvoice();
  console.log("loading app form");
  console.log($scope.invoice);
  $scope.captureInvoice = function(){
    console.log($scope.invoice);
    if ($scope.invoice.action == 'Edit'){
      $invoiceService.update($scope.invoice)
        .success(function(response){
          $invoiceService.resetInvoice();
          $location.url("/invoice");  

        })
        .error(function(response){
          $scope.error = response;
        });
    }
    else{
      console.log($scope.invoice);
      $invoiceService.save($scope.invoice)
        .success(function(response){
          $location.url("/invoice");  
        })
        .error(function(response){
          $scope.error = response;
        });
    }
  }

  $scope.reset = function(){
    $scope.invoice = null;
    $scope.invoiceForm.$setPristine();
    console.log("empty the form");  
  }

  $scope.resetInvoice = function() {
    console.log("resetInvoice1");
    $invoiceService.resetInvoice();
  }

}]);
angular.module('dashboardApp')
.controller('invoiceCtrl', ['$scope', 'invoiceService', '$location', 'ngDialog',
	function($scope, $invoiceService, $location, $ngDialog){
  $scope.action="edit";
	$invoiceService.get()
		.then(function(response){
			console.log("success in invoiceCtrl");
			$scope.invoiceList = response.result;
			console.log(response);
		});
	
	$scope.delete = function (invoice) {
		console.log(invoice.id);
		$invoiceService.delete(invoice.id);
		var index = $scope.invoiceList.indexOf(invoice);
		$scope.invoiceList.splice(index, 1);
		//$invoiceService.get();
  	};

	$scope.editInvoice = function(invoice){
    console.log("invoice1");
    console.log(invoice);
		$invoiceService.setInvoice(invoice);
		$location.url("/create-invoices");  		 
	}

	$scope.viewInvoice = function(invoice){
		$location.url("/view-invoice"); 
		$invoiceService.setViewInvoice(invoice); 		
	}
  	
 	$scope.resetInvoice = function() {
  		console.log("resetInvoice1");
  		$invoiceService.resetInvoice();
  	}
}]);
angular.module('dashboardApp')
.controller('invoiceViewCtrl', ['$scope', 'invoiceService', '$location', 'ngDialog',
function($scope, $invoiceService, $location, $ngDialog){
 	$scope.invoiceView = $invoiceService.getInvoice();
 	$invoiceService.view($scope.invoiceView)
		.then(function(response){
			console.log("success in invoiceCtrl");
			$scope.invoice = response.result;
			$scope.invoice.items = [];
            $scope.invoice.newItems = [];
			$scope.invoice.summary = [];
			console.log(response);
		});
	$invoiceService.getItems($scope.invoiceView)
		.then(function(response){
			console.log("success in invoiceCtrl");
			$scope.invoice.items = response.result;
			angular.forEach($scope.invoice.items, function(invoiceItem){
				invoiceItem.allowEdit = 1;			
			});
			$scope.invoice.summary = [];
			console.log(response);
		});

	$scope.addItem = function() {
        $scope.invoice.items.push({quantity:0, unitcost:0, description:"",allowEdit:0,invoice_id:$scope.invoice.id});    
        $scope.invoice.newItems.push({quantity:$scope.invoice.items.quantity,
                                     unitcost:$scope.invoice.items.quantity,
                                     description:$scope.invoice.items.quantity,
                                     item:$scope.invoice.items.quantity,
                                     allowEdit:0,
                                     invoice_id:$scope.invoice.id});   
        console.log("scope.invoice.newItems");
        console.log($scope.invoice.newItems);
    }
    $scope.removeItem = function(item) {
    	$invoiceService.removeItem(item);
        $scope.invoice.items.splice($scope.invoice.items.indexOf(item), 1);    
    }
    $scope.invoice_sub_total = function() {
        var total = 0.00;
        angular.forEach($scope.invoice.items, function(item, key){
          total += (item.quantity * item.unitcost);
        });
        $scope.invoice.sub_total = total;
        return total;
    }
    $scope.calculate_service_tax = function() {
        return (($scope.invoice.service_tax * $scope.invoice_sub_total())/100);
    }
    $scope.calculate_education_cess = function() {
        return (($scope.invoice.education_cess * $scope.invoice_sub_total())/100);
    }
    $scope.calculate_secondary_cess = function() {
        return (($scope.invoice.secondary_cess * $scope.invoice_sub_total())/100);
    }
    $scope.calculate_grand_total = function() {
        $grand_total = $scope.calculate_service_tax() + 
		        	   $scope.calculate_education_cess()+
		        	   $scope.calculate_secondary_cess()+
		        	   $scope.invoice_sub_total();
         return $grand_total;        	   
    } 
    $scope.captureItems = function() {
    	$scope.invoice.summary.push({invoice_id:$scope.invoice.id,
                                     sub_total:$scope.invoice.sub_total,
         							  service_tax:$scope.invoice.service_tax, 
         							  education_cess:$scope.invoice.education_cess, 
         							  secondary_cess:$scope.invoice.secondary_cess,
         							  grand_total: $grand_total});	
    	$invoiceService.saveItems($scope.invoice.newItems);
    	$invoiceService.saveSummary($scope.invoice.summary);
    }

}]);
angular.module('dashboardApp')
.controller('testCtrl', ['$scope', function($scope){
	console.log("hello");
}]);
angular.module('dashboardApp')
.controller('userCtrl', ['$scope', 'userService', '$location', 'ngDialog',
	function($scope, $userService, $location, $ngDialog){
	$scope.btn = "Edit";
	$scope.error = "";
	$scope.result = "";
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
		$scope.result = "";
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
  		$scope.error = "";	
		$scope.result = "";
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
//# sourceMappingURL=controllers.js.map