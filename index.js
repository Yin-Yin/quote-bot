
// ## express part ##
var bodyParser = require('body-parser')
var express = require('express');
var app = express();


var zodiacSignModule = require('./zodiac-sign/zodiac-sign.js')


var expressAPI = require('./api/express-api.js');
console.log("expressAPI", expressAPI)

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
  res.send('Hi there, this is the webhook for the zodiac sign bot. For more info got to: <a href="https://github.com/Yin-Yin/zodiac-sign-bot/">Zodiac Sign Bot GitHub Page</a>');
});

app.post('/intent', function(req, res) {
  let parameters = req.body.result.parameters;
  let intentName = req.body.result.metadata.intentName;

  let response = getResponse(parameters,intentName);

  res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
  res.send(JSON.stringify({
    //"speech" is the spoken version of the response, "displayText" is the visual version
    "speech": response,
    "displayText": response
  }));
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// ## zodiac sign part ##

function getResponse(parameters,intentName) {
  switch (intentName) {
    
    case 'zodiacsign.check':
      if (parameters.date === '') {
        return "The date is not correct."
      }
      let parameterDate = new Date(parameters.date);
      console.log("parameterDate: ", parameterDate);
      return "Your zodiac sign is " + zodiacSignModule.getZodiacSign(parameterDate); 
      
    case 'zodiacsign.info':
      return zodiacSignModule.getZodiacSignInfo(parameters.zodiacsign);
      
    default:
      return "Something went wrong. Sorry about that."
      // for debugging: return "Something went wrong. You triggered the intent: " + intentName + ", with the parameters: " + parameters;
  }
}
