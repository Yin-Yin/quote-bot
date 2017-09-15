
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

/*
// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
*/

app.get('/', function(req, res) {
  //response.render('pages/index');
  res.send("Hello World");
});

app.post('/intent', function(req, res){
  console.log("request: ", req);
  res.send("Hello this is doge!");
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
