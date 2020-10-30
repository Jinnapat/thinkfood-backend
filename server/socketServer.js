const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;

const app = express();

const server = http.createServer(app)
server.listen(port);

const io = socketIo(server);

// shop account join shop+shopID room
serverNS = io.of('/server');
serverNS.on('connection', socket =>{
    console.log("a client connected to serverNS:");
    const ID = socket.handshake.query.ID;
    const accountType = socket.handshake.query.type;

    socket.join(`${accountType}${ID}`);

    socket.emit('loged', `u just login accountType:${accountType}, ID:${ID} 
            and joined ${Object.keys(socket.rooms)}`);

    // user submit orders, server sent notification to the according shops
    // emit is in from 
    // client.emit("userSubmitOrder", {
    //  userID:
    //  menuList = [{
    //      shopID:
    //      menuName:
    //      menuID:
    //  },{
    //      shopID:
    //      menuName:
    //      menuID:
    // }]
    // });

    // Recieved and forward to shops: RF
    socket.on("userSubmitOrder", (data)=>{
        var orderStatus = 'RF'; // up to DB later
        // sent notification to shops
        data.menuList.forEach(menu => {
            serverNS.to(`shop${menu.shopID}`).emit("userOrderShop",{
                orderMenu : menu.menuName,
                menuID : menu.menuID,
                userID: data.userID
            });
            console.log('send order to',menu.shopID);
        });
    });

    socket.on('disconnect', function () {
        console.log('A client disconnected');
    });
});