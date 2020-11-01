// var express = require('express')
// var router = express.Router()
var express = require("express");
var app = express();
var port = process.env.PORT || 5000;


app.listen(port, function() {
   console.log('listening on port: 5000');
});

var userpath = require('./userpath')
var shoppath = require('./shoppath')
var commonpath = require('./commonpath')

app.use('/user', userpath)
app.use('/shop', shoppath)
app.use('/common', commonpath)