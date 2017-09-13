
const express = require('express');

const app = express();

console.log("test");

// needed for Heroku (?)
// app.set('port', (process.env.PORT || 5000))
// app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
    console.log("get req:", req);
    res.send('Hello World!')
})

// api.ai route
app.post('/intent', (req, res) => {
    res.send('Hello')
});