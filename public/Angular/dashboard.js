/**
 * 
 */

 var app = angular.module('dashboard', [/*'ui.router'*/]);
    
    app.filter('range', function() {
		  return function(input, min, max) {
		    min = parseInt(min);
		    max = parseInt(max);
		    for (var i=min; i<=max; i++)
		      input.push(i);
		    return input;
		  };
		})
	app.controller('dashboardCtrl', function($scope, $http) {
	    //alert("hi");
		$http({
		    method : "GET",
		    url : "/getUserName",
		    headers: {
		   'Content-Type': 'application/json'
		 	}
		 	
		  }).then(function mySucces(response) {
				
			 //alert("hello"); 
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
		  $http({
		    method : "GET",
		    url : "/getad",
		    headers: {
		   'Content-Type': 'application/json'
		 	}
		 	
		  }).then(function mySucces(response) {
			  //alert(JSON.stringify(response.data));
			  $scope.advertisements = response.data;
		    }, function myError(response) {
		     // $scope.myWelcome = response.statusText;
		  });
		  $scope.searchval = "";
		 // $scope.cartvolume = 0;
		  $scope.searchItem = function(){
			var obj = new Object();
			obj.searchphrase = $scope.searchval ;
			
			$http({
			    method : "POST",
			    url : "/searchad",
			    headers: {
			   'Content-Type': 'application/json'
			 	},
			 	data: obj
			  }).then(function mySucces(response) {
				  
				  $scope.advertisements = response.data;
				  
			  }, function myError(response) {
			     // $scope.myWelcome = response.statusText;
			  });	
			  //alert();
			}
		  $scope.Range = function(start, end) {
			  alert(end);
			    var result = [];
			    for (var i = start; i <= end; i++) {
			        result.push(i);
			    }
			    return result;
			};
		  $scope.advertisements = [];
		  $scope.curSelection = 1;
	});