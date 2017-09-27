var bodyParser = require
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
  res.send("Hi there, this is the serve for the zodiac sign bot. For more info got to: https://github.com/Yin-Yin/zodiac-sign-bot/ (Zodiac Sign Bot GitHub Page)");
});

app.post('/intent', function(req, res) {
  let action = req.body.result.action;
  let actionIncomplete = req.body.result.actionIncomplete;
  let parameters = req.body.result.parameters;
  let intentName = req.body.result.metadata.intentName;
  //console.log("request: ", req.body);
  //console.log("date: ", parameters.date);
  let parameterDate = new Date(parameters.date);
  //console.log("parameterDate: ", parameterDate);

  let response = 'this is doge';
  if (intentName == 'zodiacsign.check') {
    if (parameters.date === '') {
      response = "The date is not correct."
    }
    else {
      response = "The zodiac sign for that date is " + getZodiacSign(parameterDate);
    }
  }
  else if (intentName == 'zodiacsign.info') {
    console.log("parameters.zodiacsign ", parameters.zodiacsign)
    response = getZodiacSignInfo(parameters.zodiacsign);
  }
  else {
    response = "Hello, this is doge, you triggered the intent: " + intentName + " parameters " + parameters;
  }

/*
// example: 
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
  res.send(JSON.stringify({
    "speech": response,
    "displayText": response
    //"speech" is the spoken version of the response, "displayText" is the visual version
  }));
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


function getZodiacSign(date) {
  let month = date.getMonth() + 1;
  let day = date.getDate();

  // returns the zodiac sign according to day and month ( thanks to http://coursesweb.net/ for this elegant solution )
  var zodiac = ['', 'Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn'];
  var last_day = ['', 19, 18, 20, 19, 20, 20, 22, 22, 22, 22, 21, 21, 19];
  return (day > last_day[month]) ? zodiac[month * 1 + 1] : zodiac[month];
}


function getZodiacSignInfo(zodiacsign) {
  switch (zodiacsign) {
    case 'Capricorn':
      return 'Capricorn\nDates: December 22 – January 19 \nThey are really cool animals! They can climb like badasses and are very cheeky';
    
    case 'Aquarius':
      return 'Aquarius\nDates: January 20 – February 18\nAs the name suggests, they like water a lot. Their best abilities lie in watering plants as they have so much. ';
    
    case 'Pisces':
      return 'Pisces\nDates: February 19 – March 20\nPisces are fishes. Living in the water is a cool thing.';
    
    case 'Aries':
      return 'Aries\nDates: March 21 – April 19\nAries are animals that have a very strong will, as they have two horns to ram everyone. Harharhar.';
    
    case 'Taurus':
      return 'Taurus\nDates: April 20 – May 20\nThese animals are very big and strong. Altough most of the time they are very peaceful and just graze.';
    
    case 'Gemini':
      return 'Gemini\nDates: May 21 – June 20\nGemini is cool, because it means sth. like siblings and to have a sibling is a wonderful thing. Even if you may be not have a sibling, with your star sign you do! :)';
    
    case 'Cancer':
      return 'Cancer\nDates: June 21 – July 22\nCancer have two scissors on their hands, which is pretty badass!';
    
    case 'Leo':
      return 'Leo\nDates: July 23 – August 22\nLions are so cool! They are like the kings of animal kingdom!';
    
    case 'Virgo':
      return 'Virgo\nDates: August 23 – September 22\nVirgos are very intelligent! And beautiful! Your are great!';
    
    case 'Libra':
      return 'Libra\nDates: September 23 – October 22\nLibra means sth. like a scale. So they are very harmonious.';
    
    case 'Scorpio':
      return 'Scorpio\nDates: October 23 – November 21\nScorpions are so cool! They have a tail with a sting and two scissor hands!!! Wow! ...';
    
    case 'Sagittarius':
      return 'Sagittarius\nDates: November 22 – December 21\nSagittarius is like bow and arrow. So they know whre to aim.';
    
    default:
      return 'Your zodiac sign sign is the best. Go team ' + zodiacsign;
  }
};