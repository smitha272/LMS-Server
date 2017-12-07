/**
 * New node file
 */
var request = require('request')
, express = require('express')
,assert = require("assert")
,http = require("http");

describe('ebay test', function(){

	it('shoud return the login page', function(done){
		http.get('http://localhost:3000/', function(res) {
			assert.equal(200, res.statusCode);
			done();
		})
	});

	it('should return info about user with the specified ebay handle ', function(done){
		http.get('http://localhost:3000/smitha_vrr', function(res) {
			assert.equal(200, res.statusCode);
			done();
		})
	});
	it('it should return error status ', function(done){
		http.get('http://localhost:3000/fsdfsf', function(res) {
			assert.equal(200, res.statusCode);
			done();
		})
	});
	
	it('should signup the user', function(done) {
		request.post(
			    'http://localhost:3000/signup',
			    { form: { firstname: 'cmpe',lastname:'273',email:'cmp273@gmail.com',password:'oilfoods' } },
			    function (error, response, body) {
			    	assert.equal(200, response.statusCode);
			    	done();
			    }
			);
	  });
	it('should signup the user', function(done) {
		request.post(
			    'http://localhost:3000/login',
			    { form: { inputEmail:'venki1092@gmail.com',inputPassword:'oilfoods' } },
			    function (error, response, body) {
			    	assert.equal(200, response.statusCode);
			    	done();
			    }
			);
	  });
});