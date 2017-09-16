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
  let intentName = req.body.result.metadata.intentName;
  console.log("request: ", req.body);
  console.log("date: ", parameters.date);
  
  let response = 'this is doge';
  if (intentName == 'starsign.check') {
    response = "Your starsign is " + getZodiacSign(parameters.date);
  }else{
    response = "Hello, this is doge, you triggered the intent:  " + intentName + " parameters " + parameters;
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


function getZodiacSign(date) {
  let month = date.getMonth();
  let day = date.getDate();

  var zodiacSigns = {
    'capricorn':'capricorn',
    'aquarius':'aquarius',
    'pisces':'pisces',
    'aries':'aries',
    'taurus':'taurus',
    'gemini':'gemini',
    'cancer':'cancer',
    'leo':'leo',
    'virgo':'virgo',
    'libra':'libra',
    'scorpio':'scorpio',
    'sagittarius':'sagittarius'
  }

  if((month == 1 && day <= 20) || (month == 12 && day >=22)) {
    return zodiacSigns.capricorn;
  } else if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) {
    return zodiacSigns.aquarius;
  } else if((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
    return zodiacSigns.pisces;
  } else if((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
    return zodiacSigns.aries;
  } else if((month == 4 && day >= 21) || (month == 5 && day <= 20)) {
    return zodiacSigns.taurus;
  } else if((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
    return zodiacSigns.gemini;
  } else if((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
    return zodiacSigns.cancer;
  } else if((month == 7 && day >= 23) || (month == 8 && day <= 23)) {
    return zodiacSigns.leo;
  } else if((month == 8 && day >= 24) || (month == 9 && day <= 23)) {
    return zodiacSigns.virgo;
  } else if((month == 9 && day >= 24) || (month == 10 && day <= 23)) {
    return zodiacSigns.libra;
  } else if((month == 10 && day >= 24) || (month == 11 && day <= 22)) {
    return zodiacSigns.scorpio;
  } else if((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
    return zodiacSigns.sagittarius;
  }
}