/**
 * New node file
 */
/**
 * 
 */

 var app = angular.module('userhistory', [/*'ui.router'*/]);

app.controller('userhistoryCtrl', function($scope, $http) {
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
	  $http({
	    method : "GET",
	    url : "/getUserHistory",
	    headers: {
	   'Content-Type': 'application/json'
	 	}
	 	
	  }).then(function mySucces(response) {
		  //alert(JSON.stringify(response.data));
		  $scope.userhistory = response.data;
		  
	    }, function myError(response) {
	     // $scope.myWelcome = response.statusText;
	  });
	
	  $scope.cartItems = [];
});