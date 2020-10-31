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
 
    //  data : {
    //     userID
    //     userType
    //  }
 app.post("/getprofile", (req, res) => {
     const userType = req.body.userType;
     const id = req.body.userID;
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
     const id = req.body.userID;
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

 
 /*{
      ...
      data : {
         shopID
         shop_name
         shop_username
         shop_password
      }
      data required when customer press save button to update their profile
  }*/
 
 app.post("/updateshopprofile", (req, res) => {
     // request.session.loggedin = true;
     const shop_username = req.body.shop_username;
     const id = req.body.userID;
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
 
 // app.post('/')