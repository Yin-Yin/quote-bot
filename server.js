/*
const express = require('express');

const app = express();

console.log("test");

// needed for Heroku (?)
// app.set('port', (process.env.PORT || 5000))
// app.use(express.static(__dirname + '/public'))

console.log("express", app)

app.get('/', function (req, res) {
    console.log("get req:", req);
    res.render('home', {sayHelloTo: 'world'});
    res.send('Hello World!')
})

// api.ai route
app.post('/intent', (req, res) => {
    res.send('Hello')
});
*/

var app = require('express').createServer();
app.get('/',function(req,res) {
	res.send("Hello World");
});

app.listen(process.env.PORT || 3000,function(){
	console.log("listening on 3000");
});