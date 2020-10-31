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




 /*{
      ...
      data : {
         userID
         customer_username
         customer_email
         customer_password
         customer_birthday
      }
      data required when customer press save button to update their profile
  }*/

app.post("/updatecustomerprofile", (req, res) => {
    const customer_username = req.body.customer_username;
    const id = req.session.userID;
    const customer_email = req.body.customer_email;
    const customer_password = req.body.customer_password;
    const customer_birthday = req.body.customer_birthday;

    var sqlcommand = `update customer set customer_username=${customer_username}, 
    customer_email=${customer_email}, customer_password=${customer_password}, 
    customer_birthday=${customer_birthday} where customer_id = ${id};`;

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