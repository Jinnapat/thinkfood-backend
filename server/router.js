var express = require("express");
var app = express();
// var http  = require('http').createServer(app);
var port = process.env.PORT || 5000;
// listen at port 5000


app.listen(port, function() {
   console.log('listening on port: 5000');
});

var mysql = require("mysql");
var pool = mysql.createPool({
    connectTimeout: 20*1000,
    canRetry: false,
    connectionLimit : 100,
    host     : 'db4free.net',
    port     :  3306,
    user     : 'da_think',
    password : '12345678',
    database : 'thickinc_gang',
});

// first page get all menu: 
// {
//     ...
//     data : {
//         all_menu = [
//             {
//                 menu_id(PK) : int,
//                 menu_name : varchar,
//                 menu_description : varchar,
//                 menu_price : numberic,
//                 menu_shop_id_fk : int
//             }
//         ]
//     }
// }

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

// PENDING
// Login API: get data from front, data received in form of 
// {
//     username: 
//     password: 
// }
// app.post('/')




// PENDING
// Register API: get data from front, data received in form of 
// {
//     username:
//     email:
//     password:
//     re-password:
//     birthDay:
//     birthMonth:
//     birthYear:
// }
// app.post('/')


// PENDING
