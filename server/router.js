const express = require("express");
var app = express();
// listen at port 5000
var port = process.env.PORT || 5000;


app.listen(port, () => console.log("Backend server live on " + port));

// GET method from /get_menu
// Scheama fetched from MENU Database

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
    menu_db = [];

    var mysql = require('mysql');
    
    var con = mysql.createConnection({
        host: "db4free.net",
        user: "da_think",
        password: "12345678",
        dbname: "thinkinc_gang"
    });
  
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected to menu DB");
        var sql = 'SELECT * FROM menu';
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Result fetched");
            menu_db = result;
        });
    });

    res.send({ all_menu: menu_db});
});