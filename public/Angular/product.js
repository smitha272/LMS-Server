/**
 * New node file
 */
/**
 * 
 */

 var app = angular.module('postad', [/*'ui.router'*/]);
// app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
//		$locationProvider.html5Mode(true);
//		$stateProvider.state('login', {	
//			url : '/',
//			views: {
//	            'header': {
//	                templateUrl : 'templates/header.html',
//	            },
//	            'content': {
//	                templateUrl : 'templates/login.html',
//	            },
//			}
//		})
//		$urlRouterProvider.otherwise('/');
//	});
 
    
	app.controller('postadCtrl', function($scope, $http) {
	    //alert("hi");
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
		  $scope.test = 2;
		  $scope.pricetag = 'price';
		  $scope.fixedprice = function(){
			  $scope.pricetag = 'price';
		  }
		  $scope.bid = function(){
			  $scope.pricetag = 'minimum base price';
		  }
	});