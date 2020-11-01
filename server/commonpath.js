var express = require("express");
var app = express.Router();
var pool = require('./pool');
// token 
// { userID: userID, accountType: 'user', authenticated: true}


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


// *** This adds a new user to the database. ***
// "1 record inserted" will be printed for confirmation.
// 'Oh no! User already existed' will be printed if the username already exists.

//=============================================================================
// *** READ ME !!! !***
// paste 2 lines below to use (The first at the top, the second uses the function)

// var addUser = require('./adduser2')
// addUser(name,pass,email,d,m,y)

// ***DAY AND MONTH MUST HAVE TWO LETTERS (01,02,03,...)***
// ***EVERYTHING IN addUser MUST BE IN STRING***
//=============================================================================


// name,pass,email,d,m,y
app.post("/register", (req, res) =>{
    var name = req.body.name;
    var pass = req.body.pass;
    var email = req.body.email;
    var d = req.body.d;
    var y = req.body.y;
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!"); // Confirms that we connected to the server
        con.query(`SELECT * FROM CUSTOMER WHERE CUSTOMER_USERNAME = '${name}'`, function (err, result) {
          if (err) throw err;
          // User doesn't already exist
          if (result.length === 0){
            var bd = y+"-"+m+"-"+d;
            var sql = `INSERT INTO CUSTOMER (CUSTOMER_ID,CUSTOMER_USERNAME,CUSTOMER_PASSWORD,
              CUSTOMER_EMAIL,CUSTOMER_BIRTHDAY) VALUES (DEFAULT,'${name}','${pass}','${email}','${bd}')`;
              con.query(sql, function (err, result) {
                // call jwt here
                var jwt = require('jsonwebtoken');
                if (err) throw err;
                console.log(`1 record inserted (${name})`);
                var sql2 = `SELECT CUSTOMER_ID FROM CUSTOMER WHERE CUSTOMER_USERNAME = '${name}'`;
                con.query(sql2, (err, rows) => {
                    if(err) throw err;
                    var string=JSON.stringify(rows);
                    var json =  JSON.parse(string);
                    userID=json[0].CUSTOMER_ID;
                    var token = jwt.sign({ userID: userID, accountType: 'user', authenticated: true}, 'secret');
                    res.sent(token);
                });
            });
            }
            else{
              console.log(`The username "${name}" is already in use. Please try again.`);
            }
        });
    });
});
