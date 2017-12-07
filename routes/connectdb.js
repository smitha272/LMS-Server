var mysql = require('mysql'),
    db = null;

module.exports = function () {
    if(!db) {
        db = mysql.createConnection({
            host:       "sql3.freemysqlhosting.net",
            port: "3306",
            user:       "sql3206988",
            password:   "pibF18GTA7",
            database:   "sql3206988"
        });
    };
    return db;
};

