
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));


// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
  //response.render('pages/index');
  res.send("Hello World");
});

app.post('/intent', function(req, res){
  console.log("request: ", req.body);
  /*
  res.set('Content-type', 'application/json')
  res.send(
    {
"speech": "Barack Hussein Obama II was the 44th and current President of the United States.",
"displayText": "Barack Hussein Obama II was the 44th and current President of the United States, and the first African American to hold the office. Born in Honolulu, Hawaii, Obama is a graduate of Columbia University   and Harvard Law School, where ",
"data": 'data',
"contextOut": 'context out',
"source": "DuckDuckGo"
}
*/
  let response = "This is a sample response from your webhook!" //Default response from the webhook to show it's working

  res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
  res.send(JSON.stringify({ "speech": response, "displayText": response 
  //"speech" is the spoken version of the response, "displayText" is the visual version
  })
    );
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
