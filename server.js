
const express = require('express');

const app = express();

console.log("test");

app.get('/', function (req, res) {
  res.send('Hello World!')
})

// api.ai route

app.post('/intent', (req, res) => { 
    // .. ... ...
    res.send('Hello')
});