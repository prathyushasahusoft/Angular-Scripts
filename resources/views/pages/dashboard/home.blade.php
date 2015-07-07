@extends('layouts.dashboard')

@section('body')

	<nav class="navbar navbar-default">
	  <div class="container-fluid">
	    <div class="navbar-header pull-left">
		      <a class="navbar-brand" href="#">
		      	Dashboard
		      </a>
	    </div>
	    <div class="navbar-header pull-right">
		    	<a tooltip-placement="top" tooltip="dashboard" class="pull-left m-t m-r">
					<i class="fa fa-user" ></i>
				 </a>
				 <a tooltip-placement="top" tooltip="dashboard" class="pull-left m-t m-r">
					<i class="fa fa-envelope" ></i>
				 </a>
				 <a href="/auth/logout" tooltip-placement="top" tooltip="dashboard" class="pull-left m-t m-r">
					<i class="fa fa-lock" ></i>
				 </a>
		 </div>
	  </div>
	  <div class="col-md-1 sidebar-black" role="navigation">
	  	<ul class="nav nav-sidebar row">	
		  	<li class="active"><a><i class="fa fa-dashboard"></a></i>
		  	<li><a><i class="fa fa-user"></i></a></li>
		  	<li><a><i class="fa fa-key"></i></a></li> 
		  	<li><a><i class="fa fa-file-o"></i></a></li>
		  	<!-- <li><a><i class="fa fa-key"></i></a></li> -->
		 </ul>
	  </div>
	  <div class="col-md-2 sidebar" role="navigation">
			<ul class="nav nav-sidebar row">	
				<li class="active"><a href="#/">Home</a></li>
				<li><a href="#/manage-users"> Manage Users</a></li>
				<li><a href="#/change-password">Change Password</a></li>
				<li><a href="#/customers">Manage Customers</a></li>
				<li><a href="#/invoices">Manage Invoices</a></li>
				<!-- <li><a href="#/manage-campaigns"> Manage Campaign</a></li>
				<li><a href="#/manage-email">Manage Email</a></li> -->
			</ul>
      </div>
	</nav>
	<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main m-t">
		<div >
	        <div ng-app="dashboardApp">
	        	<div ng-view=""></div>
	        </div>
   		 </div>
    </div>
	
    
@stop

@section('js')
	<script type="text/javascript" src="/js/angular-bundle.js"></script>
	<script type="text/javascript" src="/js/dashboard.js"></script>
	<script type="text/javascript" src="/js/controllers.js"></script>
	<script type="text/javascript" src="/js/ngDialog.js"></script>
	<script type="text/javascript" src="/js/services.js"></script>
	<script type="text/javascript" src="/js/directives/ngConfirmClick.js"></script>
@endsection