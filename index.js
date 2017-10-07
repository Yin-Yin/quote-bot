// ## express server ##
var bodyParser = require('body-parser')
var express = require('express');
var app = express();
var zodiacSignModule = require('./zodiac-sign/zodiac-sign.js')

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.send('Hi there, this is the webhook for the zodiac sign bot. For more info got to: <a href="https://github.com/Yin-Yin/zodiac-sign-bot/">Zodiac Sign Bot GitHub Page</a>');
});

app.post('/intent', function(req, res) {
  let parameters = req.body.result.parameters;
  let intentName = req.body.result.metadata.intentName;
  res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
  
  zodiacSignModule.getResponse(parameters,intentName).then((response) =>
  res.send(JSON.stringify({
    //"speech" is the spoken version of the response, "displayText" is the visual version
    "speech": response,
    "displayText": response
    ,
"messages": [
{
"type": 0,
"speech": "look at that image"
},
{
"type": 3,
"imageUrl": "https://farm2.staticflickr.com/1523/26246892485_fc796b57df_h.jpg"
}
]

  }))
  )
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
