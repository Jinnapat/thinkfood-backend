// shop and user webSocket client
// must create a socket connection to https://localhost:4001
// using socket(client) = io.connect('https://localhost:4001');

import io from 'socket.io-client';
const server = "https://localhost:4001";
import queryString from 'query-string';

const values = queryString.parse(location.search);

// ?accountType={user/shop}&ID={userID}
// paste this when want shop to connect to shop NS
const shop = io(`${server}/server`, {
    query: {
        accountType: values.type,
        ID: values.ID, // get shopID
    }
});

shop.on("userOrderShop", (data) =>{
    // Update shop UI with the given data
    var orderMenu = data.orderMenu;
    var menuID = data.menuID;
    var userID = data.userID
});

shop.on('loged', (mass) =>{
    console.log(mass);
});


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
// menuList = selected.push({ shopID: shopID,
//     menuName: menuName,
//     menuID: menuID
// })


import queryString from 'query-string';

const values = queryString.parse(location.search);

const user = io(`${server}/server`, {
    query: {
        accountType: values.type,
        ID: values.ID,
    }
});


// when user press submit button
// paste this on user site

user.emit("userSubmitOrder", {
    menuList: this.state.menu,
    userID: values.ID,
});

user.on('loged', (mass) =>{
    console.log(mess);
});





