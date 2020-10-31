var express = require("express");
var app = express.Router();

app.post("/getprofile", (req, res) => {
    const userType = req.session.userType;
    const id = req.session.userID;
    // EDIT: in case userType change, use condition to select table to be queried
    var sqlcommand =`select * from ${userType} where id = ${id};`;

    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('connection ID:' + connection.threadId);
        connection.query(sqlcommand, (err, rows) => {
            if(err) throw err;
            console.log('The data from users table are: \n', rows);
            res.send({ user_data: rows});
        });
    });
});


 app.post("/updateshopprofile", (req, res) => {
    // request.session.loggedin = true;
    const shop_username = req.body.shop_username;
    const id = req.session.userID;
    const shop_name = req.body.shop_name;
    const shop_password = req.body.shop_password;
    var sqlcommand = `update shop set shop_name=${shop_name}, shop_username=${shop_username}, 
    shop_password=${shop_password} where shop_id = ${id};`;

    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('connected as id ' + connection.threadId);
        connection.query(sqlcommand, (err, rows) => {
            if(err) throw err;
            console.log(rows);
            res.send('Profile updated...');
        });
    });
});


module.exports = app;




