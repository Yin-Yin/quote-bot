
const express = require('express');

const app = express();

console.log("test");

// api.ai route
app.route('intent').postMessage

  app.post('/intent', (req, res) => {
    // .. ... ...
    res.send('Hello')
  });