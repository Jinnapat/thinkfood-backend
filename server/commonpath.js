var express = require("express");
var app = express.Router();



app.get("/get_menu", (req, res) => {
    var sql = 'SHOW tables;';
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('connected as id ' + connection.threadId);
        connection.query(sql, (err, rows) => {
            if(err) throw err;
            console.log('The data from users table are: \n', rows);
            res.send({ all_menu: rows});
        });
    });
});

module.exports = app;