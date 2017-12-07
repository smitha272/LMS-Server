/**
 * 
 */

 var app = angular.module('cart', [/*'ui.router'*/]);
 app.filter('range', function() {
	  return function(input, min, max) {
	    min = parseInt(min);
	    max = parseInt(max);
	    for (var i=min; i<=max; i++)
	      input.push(i);
	    return input;
	  };
	})
app.controller('cartCtrl', function($scope, $http) {
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
	    url : "/getCart",
	    headers: {
	   'Content-Type': 'application/json'
	 	}
	 	
	  }).then(function mySucces(response) {
		  //alert(JSON.stringify(response.data));
		  $scope.cartItems = response.data.cartItems;
		  $scope.carttotal = response.data.carttotal;
		  $scope.bidItems = response.data.bidItems;
		  if($scope.carttotal == 0)
			  $scope.cartempty = true;
		  else
			  $scope.cartempty = false;
		  if($scope.bidItems == 0)
			  $scope.bidempty = true;
		  else
			  $scope.bidempty = false;
	    }, function myError(response) {
	     // $scope.myWelcome = response.statusText;
	  });
	  $scope.searchval = "";
	  $scope.searchItem = function(){
		  alert($scope.searchval);
	  }
	  $scope.removeItem = function(itemno) {
		  	var obj = new Object();
		  	obj.itemno = itemno;
		  	$http({
			    method : "POST",
			    url : "/removeFromCart",
			    headers: {
			   'Content-Type': 'application/json'
			 	},
			 	data: obj
			  }).then(function mySucces(response) {
				  
				  $scope.cartItems = response.data.cartItems;
				  $scope.carttotal = response.data.carttotal;
				  $scope.bidItems = response.data.bidItems;
				  if($scope.carttotal == 0)
					  $scope.cartempty = true;
				  else
					  $scope.cartempty = false;
			  }, function myError(response) {
			     // $scope.myWelcome = response.statusText;
			  });
	    };
	    $scope.cartempty = false;
	    $scope.bidempty = false;
	  $scope.changeQuantity = function(changedQuantity,cartNo){
		  //alert("quantity changed");
		  var obj = new Object();
		  	obj.changedQuantity = changedQuantity;
		  	obj.cartNo = cartNo;
		  	$http({
			    method : "POST",
			    url : "/changeCartQuantity",
			    headers: {
			   'Content-Type': 'application/json'
			 	},
			 	data: obj
			  }).then(function mySucces(response) {
				  
				  $scope.carttotal = response.data.carttotal;				  
				  if($scope.carttotal == 0)
					  $scope.cartempty = true;
				  else
					  $scope.cartempty = false;
			  }, function myError(response) {
			     // $scope.myWelcome = response.statusText;
			  })
	  };
	  $scope.cartItems = [];
	  $scope.bidItems = [];
});