const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;

const app = express();

const server = http.createServer(app);

const io = socketIo(server);

io.on('connection', socket =>{
    console.log("a client connected ID:",socket.id);







    
    socket.on('disconnect', function () {
        console.log('A user disconnected');
     });
})