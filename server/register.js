var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var con = mysql.createConnection({
  host     : 'db4free.net',
  port     :  '3306',
  user     : 'da_think',
  password : '12345678',
  database : 'thickinc_gang',
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

function addUser (name,pass,email,d,m,y) {
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!"); // Confirms that we connected to the server
  con.query(`SELECT * FROM CUSTOMER WHERE CUSTOMER_USERNAME = '${name}'`, function (err, result) {
    if (err) throw err;
    //console.log(result); << IGNORE THIS
    if (result.length === 0) // User doesn't already exists
    {
      var bd = y+"-"+m+"-"+d;
      var sql = `INSERT INTO CUSTOMER (CUSTOMER_ID,CUSTOMER_USERNAME,CUSTOMER_PASSWORD,
        CUSTOMER_EMAIL,CUSTOMER_BIRTHDAY) VALUES (DEFAULT,'${name}','${pass}','${email}','${bd}')`;
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(`1 record inserted (${name})`);

        // need userID
        // var token = jwt.sign({ userID: }, 'shhhhh');
        });

    }
    else
    {
        console.log(`The username "${name}" is already in use. Please try again.`);
    }
})})};

//addUser('usertest','somepass','someemail','30','09','2001'); << IGNORE; used for testing

module.exports = addUser;

