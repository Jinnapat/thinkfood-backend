const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.end('Hello world')
});

app.listen(5000, () => {
    console.log("listen on port 5000");
});
