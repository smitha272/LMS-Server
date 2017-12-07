var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');

var router = express.Router();

router.post('/send', callThis()); // handle the route at yourdomain.com/sayHello
function callThis() {
    console.log("here");
    sendWelcomeEmail('Smitha','smith.muth@gmail.com','https://www.w3schools.com/html/html_paragraphs.asp');
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
        html: '<p>Hello</p> + userName + <p>, </p> + <br> + <p>Welcome to our library reservation system. Click this link to confirm your email address and complete setup for your library account.</p> + <ahref>verificationLink</ahref> + <p>Thank you, Library Team</p>' // You can choose to send an HTML body instead
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

module.exports = router;



