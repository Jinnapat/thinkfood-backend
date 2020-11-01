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

module.exports = pool;