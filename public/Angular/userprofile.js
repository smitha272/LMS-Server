/**
 * New node file
 */
/**
 * 
 */

 var app = angular.module('userprofile', [/*'ui.router'*/]);

	app.controller('userprofileCtrl', function($scope, $http) {
	    //alert("hi");
		$http({
		    method : "GET",
		    url : "/getUserName",
		    headers: {
		   'Content-Type': 'application/json'
		 	}
		 	
		  }).then(function mySucces(response) {
				
			  $scope.welcome = response.data.firstname;
			     $scope.logintime = response.data.logintime;
		    }, function myError(response) {
		     // $scope.myWelcome = response.statusText;
		  });
		$http({
		    method : "GET",
		    url : "/getUserInfo",
		    headers: {
		   'Content-Type': 'application/json'
		 	}
		 	
		  }).then(function mySucces(response) {
				
			 //alert("hello"); 
		     $scope.userinfo = response.data;
		    }, function myError(response) {
		     // $scope.myWelcome = response.statusText;
		  });
		 $http({
			    method : "GET",
			    url : "/getcartvolume",
			    headers: {
			   'Content-Type': 'application/json'
			 	}
			 	
			  }).then(function mySucces(response) {
				 
				  $scope.cartvolume = response.data[0].cartcount;
			    }, function myError(response) {
			     // $scope.myWelcome = response.statusText;
			  });
		 $scope.cartvolume = 0;
		  $scope.address = false;
		  $scope.phoneno = false;
		  $scope.birthday = false;
		  $scope.ebayhandle = false;
		  $scope.addresstext = 'address';
		  $scope.phonenotext = 'phonenumber';
		  $scope.birthdaytext = 'birthdate';
		  $scope.ebayhandletext = 'ebayhandle';
		  $scope.addressclick = function()
		  {
			  $scope.address = true;
		  }
		  $scope.phonenoclick = function()
		  {
			  $scope.phoneno = true;
		  }
		  $scope.birthdayclick = function()
		  {
			  $scope.birthday = true;
		  }
		  $scope.ebayhandleclick = function()
		  {
			  $scope.ebayhandle = true;
		  }
		  $scope.updateinfo = function(data,value)
		  {
			  if(data == 'ebayhandle')
				  $scope.ebayhandle = false;
			  else if(data == 'birthdate')
				  $scope.birthday = false;
			  else if(data == 'phonenumber')
				  $scope.phoneno = false;
			  else if(data == 'address')
				  $scope.address = false;
			  
			  scopeoperator = false;
			  var obj = new Object();
			  obj.data = data; 
			  obj.value = value;
			  $http({
				    method : "POST",
				    url : "/updateSingleUserVal",
				    headers: {
				   'Content-Type': 'application/json'
				 	},
				 	data:obj
				  }).then(function mySucces(response) {
						
					 //alert("hello"); 
				     $scope.userinfo = response.data;
				    }, function myError(response) {
				     // $scope.myWelcome = response.statusText;
				  });
			 // 	  alert(data);
			 // $scope.ebayhandle = true;
		  }
	});