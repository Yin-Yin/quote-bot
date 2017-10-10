// ## express server ##
var bodyParser = require('body-parser')
var express = require('express');
var app = express();
var apiAiModule = require('./api-ai/api-ai.js')

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
  console.log("req.body",req.body)
  let intentName = req.body.result.metadata.intentName;
  let parameters = req.body.result.parameters;
  let contexts = req.body.result.contexts;
  console.log("contexts",contexts);
  console.log("parameters",parameters);
  //es.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
  
  apiAiModule.getResponse(intentName,parameters,contexts).then((response) =>
  res.send(JSON.stringify({
    //"speech" is the spoken version of the response, "displayText" is the visual version, "messages" are for the different messengers, "contextOut" is the context for api.ai
    "speech": response.speech,
    "displayText": response.displayText,
    "messages": response.messages,
    "contextOut": response.contextOut
  }))
  )
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
