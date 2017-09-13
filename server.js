
const express = require('express');

const app = express();

console.log("test");

// api.ai route

app.post('/intent', (req, res) => { 
    // .. ... ...
    res.send('Hello')
});