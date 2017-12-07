var connectionpool = require('./connectionpool');
var nodemailer = require('nodemailer');

exports.signin = function(req, res){
	console.log(req.body);
	connectionpool.getConnection(function(err,connection){
	  if(err){
	    connectionpool.releaseSQLConnection(connection);
	    console.log('Error connecting to Db');
	    return;
	  }
	  console.log('Connection established with connection pool' );
	  connection.query('SELECT * from userdetails where email = \'' + req.body.inputEmail+'\'', function(err, rows, fields) {
		  if (!err  && rows.length != 0)
		  {
		     console.log('The solution is: '+ rows.length + ' ' + JSON.stringify(rows[0]));
		     var bcrypt = require('bcryptjs');
		     bcrypt.compare(req.body.inputPassword, rows[0].password, function(err, condition) {
				 console.log(condition);
		    	 if(condition == false)
		    	 {
		    		 res.send('invalid password');
		    		 connectionpool.releaseSQLConnection(connection);
		    	 }		    		 
		    	 else
		    	 {
					 if(rows[0].verified == 'false'){
						res.send('user not verified...')
						return;
					 }
					 console.log('password are similar');
			    	 req.session.email = req.body.inputEmail;		    	 
			    	 req.session.name  = rows[0].name ;
			    	 req.session.id  = rows[0].userid;
			    	 req.session.sjsuid = rows[0].sjsuid;
					 req.session.type = rows[0].type;
					 res.send('login successful,'+rows[0].userid);					 			    	 
		    	 }	    	
		    	});
		    	
		  }
		  else
		  {
			  res.send('login not successful');
		  }
			  
		});
	 
	});
};
exports.signup = function(req, res){
	console.log(req.body);
	connectionpool.getConnection(function(err,connection){
		  if(err){
		    console.log('Error connecting to Db');
		    connectionpool.releaseSQLConnection(connection);
		    return;
		  }
		  console.log('Connection established new' + err);
		  var bcrypt = require('bcryptjs');
		  const saltRounds = 10;
		  bcrypt.genSalt(saltRounds, function(err, salt) {
			    bcrypt.hash(req.body.password, salt, function(err, hash) {
			    	//--
			    	 var post  = {name: req.body.name, type: req.body.type,verified:req.body.verified,email:req.body.email,password:hash, sjsuid:req.body.sjsuid};
					 
					  var query = connection.query('INSERT INTO userdetails SET ?', post, function(err, result) {
					    // Neat!
					  if(err)
					  {
						    console.log(err);
						    connectionpool.releaseSQLConnection(connection);
							 res.send('not able to signup');
						    return;
					  }
					  connectionpool.releaseSQLConnection(connection);
					  var name = req.body.name;
					  var email = req.body.email;
					  var sjsuid = req.body.sjsuid;
					  
					  res.send('Account created successfully');
					  //send mail from here
					  sendWelcomeEmail(name,email,'http://localhost:3000/activateUser?id=' + sjsuid);
					  
					});
			    	//--
			    });
			});		
	});
};

exports.activateUser = function(req,res){
	console.log(JSON.stringify(req.query));
	connectionpool.getConnection(function(err,connection){
	  if(err){
	    connectionpool.releaseSQLConnection(connection);
	    console.log('Error connecting to Db');
	    return;
	  }
	   connection.query(
		  'UPDATE userdetails SET verified = ? Where sjsuid = ?',
		  ['true', req.query.id],
		  function (err, result) {
			if (err) {
				res.send('Invalid Link');
			};
			connectionpool.releaseSQLConnection(connection); 
			res.send('Thank you for verifying your account');
			console.log('Changed ' + result.changedRows + ' rows');
		  }
		);
	});
}

function sendWelcomeEmail (userName, userEmail, verificationLink) {
    // var toEmail = req.body.userid;
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'donotreplylibrarian@gmail.com', // Your email id
            pass: 'lib12345' // Your password
        }
    });

    var mailOptions = {
        from: 'donotreplylibrarian@gmail.com', // sender address
        to: userEmail, // list of receivers
        subject: 'Email Sample', // Subject line
        // text: text //, // plaintext body
        html: '<p>Hello</p>' + userName + '<p>, </p><br><p>Welcome to our library reservation system. Click this link to confirm your email address and complete setup for your library account.</p> <ahref>'+verificationLink+'</ahref> <br><p>Thank you, Library Team</p>' // You can choose to send an HTML body instead
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.json({yo: 'error'});
        }else{
            console.log('Message sent: ' + info.response);
            res.json({yo: info.response});
        };
    });
}

//Logout the user - invalidate the session
exports.logout = function(req,res)
{	
	req.session.destroy();
   	res.send('logout successful');
	/*connectionpool.getConnection(function(err,connection){
		  if(err){
			connectionpool.releaseSQLConnection(connection);  
		    console.log('Error connecting to Db');
		    return;
		  }
		  connection.query(
	   			  'UPDATE userdetails SET logouttime = ? Where email = ?',
	   			  [new Date().toISOString(), req.session.email],
   			  function (err, result) {
   			    if (err) 
   			    {
   			    	connectionpool.releaseSQLConnection(connection);
   			    	throw err;
   			    }

   			    console.log('Changed ' + result.changedRows + ' rows');
   			    connectionpool.releaseSQLConnection(connection);
   				req.session.destroy();
   				res.send('logout successful');
   			  }
   			);
	});*/
};

