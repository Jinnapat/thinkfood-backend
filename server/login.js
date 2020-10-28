/*{
     ...
     data : {
        user : customer or shop
        id : int
     }
     --->can i use '/profile/:user/:id' to get req.parms
     data required when user press profile button to enter to profile page
 }*/


//  var bodyParser = require('body-parser');
//  app.use(bodyParser.json()); // support json encoded bodies
//  app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// app.post('/api/users', function(req, res) {
//     var user_id = req.body.id;
//     var token = req.body.token;
//     var geo = req.body.geo;

//     res.send(user_id + ' ' + token + ' ' + geo);
// });

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
 
 //app.get("/profile/:user/:id", (req, res) => {
 app.get("/getprofile/", (req, res) => {
     user_data = ['init'];
     //var sqlcommand = 'select * from ${req.parms.user} where id = ${req.params.id};';
     var sqlcommand = 'select * from ${data.user} where id = ${data.id};';

     pool.getConnection((err, connection) => {
         if(err) throw err;
         console.log('connected as id ' + connection.threadId);
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
         customer_username
         customer_email
         customer_password
         customer_birthday
      }
      data required when customer press save button to update their profile
  }*/
 app.get("/updatecustomerprofile/:id", (req, res) => {
     user_data = ['init'];

     var sqlcommand = `update customer set customer_username=${customer_username}, 
     customer_email=${customer_email}, customer_password=${customer_password}, 
     customer_birthday=${customer_birthday} where customer_id = ${req.params.id};`;

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
         shop_name
         shop_username
         shop_password
      }
      data required when customer press save button to update their profile
  }*/
 
 app.get("/updateshopprofile/:id", (req, res) => {
     user_data = ['init'];
     var sqlcommand = `update shop set shop_name=${shop_name}, shop_username=${shop_username}, 
     shop_password=${shop_password} where shop_id = ${req.params.id};`;

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