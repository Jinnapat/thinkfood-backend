var express = require("express");
var app = express();
// listen at port 5000
var port = process.env.PORT || 5000;


app.listen(port, () => console.log("Backend server live on " + port));

// GET method from /get_menu
// Scheama fetched from MENU Database
// MySQL 8.0 Server/thickinc_gang/MENU/
// https://www.db4free.net/phpMyAdmin/tbl_sql.php?db=thickinc_gang&table=MENU


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

var mysql = require("mysql");
var pool = mysql.createPool({
    canRetry: false,
    connectionLimit : 100,
    host     : 'db4free.net',
    port     :  3306,
    user     : 'da_think',
    password : '12345678',
    database : 'thickinc_gang',
});
app.get("/get_menu", (req, res) => {
    menu_db = ['init'];
    var sql = 'SHOW tables;';

    // async function queryIt (pool, sql){
    //     try{
    //         console.log("Just start queryIt");
    //         var connection = await pool.getConnection();
    //         var result = await connection.query(sql);
    //         console.log("Result fetched");
    //         console.log(result);
    //         return result;
    //     } catch (e){
    //         console.log(e);
    //     }
    // }
    // var sql = 'SHOW tables;';
    // menu_db = queryIt(pool, sql);
    // console.log("End");
    
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


// app.post('/')