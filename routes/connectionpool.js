var arrayOfConnection= [];

function createConnection()
{
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
		  host     : 'sql3.freemysqlhosting.net',
		  user     : 'sql3206988',
		  password : 'pibF18GTA7',
		  database : 'sql3206988'
	});
	return connection;
};
for(var i=0;i<10;i++){
	var connection=createConnection();
	arrayOfConnection.push(connection);
}
exports.getConnection = function(callback)
{
	var connection = arrayOfConnection.pop();
    //pop fails will create new connection
	if(connection == undefined)
		connection = createConnection();
	callback((connection == undefined)?true:false,connection);
	//return connection;
}
exports.getSQLConnection = function(){
	var connection = arrayOfConnection.pop();
    //pop fails will create new connection
	if(connection == undefined)
		connection = createConnection();
	return connection;
};
exports.releaseSQLConnection = function(connection){
	arrayOfConnection.push(connection);
	//connection.end();
};
