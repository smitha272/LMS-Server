var express = require('express');

var router = express.Router(),
    db         = require('../connectdb')(),
    fs         = require('fs-extra'),
    path       = require('path');

router.post('/add',function (req, res, next) {
    var title = req.body.title,
        author    = req.body.author,
        callNum = req.body.callNumber,
        publisher = req.body.publisher,
        yearofPublication = req.body.yearOfPub,
        bookLocation = req.body.bookLocation,
        keywords = req.body.keywords,
        numofCopies = req.body.numOfCopies;


    console.log("title: ",title);
    console.log("author: ",author);
    console.log("callNum: ",callNum);
    console.log("publisher: ",publisher);
    console.log("yearofPublication: ",yearofPublication);
    console.log("bookLocation: ",bookLocation);
    console.log("numofCopies: ",numofCopies);
    console.log("Keywords: ",keywords);

    db.query('INSERT INTO books VALUES(?,?,?,?,?,?,?,?,?,?,?,?)', [0,author,title,callNum,publisher,parseInt(yearofPublication),bookLocation,parseInt(numofCopies),"AVAILABLE",keywords,"",0], function(err, result) {
        if (err) throw err;
        res.json({success: "1", message: "book added successfully"});
        console.log(JSON.stringify(result));
    });
});

router.get('/search', function (req,res) {
   var searchTerm = req.query.searchTerm;

    db.query('select * from books where title = ?',[searchTerm], function (err, rows, field) {
        if (err) throw err;

        if (rows.length > 0) {
            res.send({success: "1", books: rows, message: "Found matching results"});

        }
        else {
            res.json({success: "0", message: "No matches found"});
        }
    });
});

router.get('/delete', function (req,res) {
    var bookId = parseInt(req.query.bookId);

    db.query('DELETE FROM books where bookid=? AND isBorrowed=0',[bookId], function (err, rows, field) {
        if (err) throw err;

        if (rows.affectedRows > 0) {
            console.log(rows);
            res.json({success: "1", message: "Deleted the record successfully"});

        }
        else {
            res.json({success: "0", message: "Delete failed"});
        }
    });
});

router.post('/update',function (req, res, next) {
    var updateBookId = req.body.bookId,
        updateTitle = req.body.title,
        updateAuthor    = req.body.author,
        updateCallNum = req.body.callNumber,
        updatePublisher = req.body.publisher,
        updateYearofPublication = req.body.yearOfPub,
        updateBookLocation = req.body.bookLocation,
        updateKeywords = req.body.bookKeywords,
        updateNumofCopies = req.body.numOfCopies;

    console.log("update bookid: ",updateBookId);
    console.log("update title: ",updateTitle);
    console.log("update author: ",updateAuthor);
    console.log("update callNum: ",updateCallNum);
    console.log("update publisher: ",updatePublisher);
    console.log("update yearofPublication: ",updateYearofPublication);
    console.log("update bookLocation: ",updateBookLocation);
    console.log("update Keywords: ",updateKeywords);
    console.log("update Num of copies: ",updateNumofCopies);

    db.query('update books set call_number = ?, publisher = ?, year_of_pub = ?, location = ?, no_of_copies = ?,  keywords = ? where title = ? AND bookid = ? ', [updateCallNum, updatePublisher, parseInt(updateYearofPublication), updateBookLocation,parseInt(updateNumofCopies),updateKeywords,updateTitle,parseInt(updateBookId)], function (err, rows, fields) {
        if (err) throw err;

        console.log(rows);

        if (rows.affectedRows > 0) {
            res.json({success: "1", message: "Update Successful"});

        }else {
            res.json({success: "0", message: "Update Failed"});
        }
    })
});

router.get('/check', function(req, res){
    res.json({message: "successful setup"});
});


module.exports = router;


