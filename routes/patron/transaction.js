var express = require('express');

var router = express.Router(),
    db         = require('../connectdb')(),
    fs         = require('fs-extra'),
    path       = require('path');

router.post('/borrow',function (req, res, next) {
    var title = req.body.title,
        bookid = req.body.bookId;

    db.query('update books set isBorrowed = 0 where title = ? AND bookid = ? ', [title, bookid], function(err, result) {
        if (err) throw err;

        console.log(rows);

        if (rows.affectedRows > 0) {
            res.json({success: "1", message: "Changed isBorrow field"});
            
        }else {
            res.json({success: "0", message: "Change Failed"});
        }
    });
});

router.get('/check', function(req, res){
    res.json({message: "successful setup"});
});

module.exports = router;