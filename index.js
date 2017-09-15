var bodyParser = require('body-parser')
var express = require('express');
var app = express();



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


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
  let action = req.body.result.action;
  let actionIncomplete = req.body.result.actionIncomplete;
  let parameters = req.body.result.parameters;
  let intenName = req.body.result.intentName;
  console.log("request intenName: ", intenName);
  
  let response = 'this is doge';
  if (action === 'starsign.check') {
    response = "Your starsign is ...";
  }else{
    response = "Hello, this is doge, you triggered the intent:  " + intenName + " parameters " + parameters;
  }
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
  

  res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
  res.send(JSON.stringify({ "speech": response, "displayText": response 
  //"speech" is the spoken version of the response, "displayText" is the visual version
  })
    );
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
