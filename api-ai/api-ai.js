const zodiacSignModule = require('../zodiac-sign/zodiac-sign.js')
var response = {}

module.exports = {
   // ## API.ai intents ##
  getResponse: function(parameters, intentName) {
    return new Promise((resolve, reject) => {

      switch (intentName) {

        // ## zodiac signs ##
        case 'zodiacsign.check':
          resolve(this.getZodiacSignCheckResponse(parameters.date))
          break;

        case 'zodiacsign.info':
          resolve(this.getZodiacSignInfoResponse(parameters.zodiacsign))
          break;

        case 'zodiacsign.info.context':
          resolve(this.getZodiacSignInfoResponse(parameters.zodiacsign))
          break;

        case 'zodiacsign.year':
          resolve(this.getZodiacSignYearResponse(parameters.age.amount))
          break;

        case 'zodiacsign.horoscope':
          this.getZodiacSignHoroscopeResponse(parameters.zodiacsign).
          then((response) => {
              resolve(response)
            })
          break;

        case 'zodiacsign.horoscope.context':
          this.getZodiacSignHoroscopeResponse(parameters.zodiacsign).
          then((response) => {
              resolve(response)
            })
          break;

        default:
          console.log("Something went wrong. The default switch case was triggered. This means there was a intent triggered from api.ai that is not yet implemented in the webhook You triggered the intent: " + intentName + ", with the parameters: " + parameters)
          reject("Something went wrong. Sorry about that.")
          break;
      }
    })
  },

  // ## build the responses for the intents ##
  // Here we construct the messages and buttons that go back to api.ai
  getZodiacSignCheckResponse: function(date) {
    console.log("Triggerd intent *zodiacSign.check with params, date: ", date);
    if (!date) {
      console.error("Intent: zodiacsign.check, Error: The date is missing.")
    }
    let zodiacSign = zodiacSignModule.getZodiacSign(date);

    // build the response
    response.speech = "Your zodiac sign is " + zodiacSign
    response.displayText = "Your zodiac sign is " + zodiacSign
    response.messages = [{
        "type": 0,
        "speech": "Your zodiac sign is " + zodiacSign
      },
      /*
      {
      "type": 3,
      "imageUrl": zodiacSignModule.getZodiacSignPicture(zodiacSign)
      }
      ,
      */
      {
      "type": 2,
      "title": "Want to know more?",
      "replies": ["horoscope", "info"]
    }]

    /*
    //toDo: Add context out and show button to get chinese zodiac sign
    // also get chinese zodiac sign if a date in the past is provided
    let parameterDate = new Date(date);
    let currentYear = new Date().getFullYear(); // I use this in another place as well => declare on top for whole module
    let dateYear = parameterDate.getFullYear();
    if (dateYear < currentYear) {
      console.log("Year is different: ", dateYear)
      console.log("CHinese Zodiac", this.getChineseZodiacSign(dateYear))
      response.messages.push({ "type": 0, "speech": "Your chinese zodiac sign is " + this.getChineseZodiacSign(dateYear) })
    }
    else {
      console.log("The date is from this year; ", dateYear);
    }
    response.messages.push()
    */
    
    response.contextOut = [{
      "name": "zodiac-sign",
      "parameters": {
        "zodiacsign": zodiacSign.toLowerCase()
      },
      "lifespan": 20
    }]
    return response;
  },

  getZodiacSignInfoResponse: function(zodiacSign) {
    console.log("Triggerd intent zodiacSign.info with params: ", zodiacSign);
    let zodiacInfo = zodiacSignModule.getZodiacSignInfo(zodiacSign);
    let zodiacSignPicture = zodiacSignModule.getZodiacSignPicture(zodiacSign); 
    let response = {}
    response.speech = zodiacInfo;
    response.displayText = zodiacInfo;
    response.messages = [{
        "type": 0,
        "speech": zodiacInfo
      },
      
      {
      "type": 3,
      "imageUrl": zodiacSignPicture
      }
      ,
      
      {
        "type": 2,
        "title": "Do you want to see the horoscope?",
        "replies": ["horoscope"]
      }
    ]
    return response;
  },

  getZodiacSignYearResponse: function(year) {
    console.log("Triggered intent zodiacSign.year with params: ", year);
    let chineseZodiacSign = zodiacSignModule.getChineseZodiacSign(year)
    let response = {}
    response.speech = "Your chinese zodiac sign is " + chineseZodiacSign;
    response.displayText = "Your chinese zodiac sign is " + chineseZodiacSign;;
    response.messages = [{
        "type": 0,
        "speech": "Your chinese zodiac sign is " + chineseZodiacSign
      },
      /*
      {
      "type": 3,
      "imageUrl": "https://farm2.staticflickr.com/1523/26246892485_fc796b57df_h.jpg"
      }
      ,

      {
      "type": 2,
      "title": "Want to know more?",
      "replies": ["Info Chinese Zodiac Sign"]
      }
      */
    ]
    return response;
  },

  getZodiacSignHoroscopeResponse: function(zodiacsign) {
    // toDo: we have three promises now. Only because of the asynchronous API call to the horoscope API. Is there a better way to tackle this?
    console.log("Triggerd intent zodiacSign.horoscope with params: ", zodiacsign);
    return new Promise((resolve, reject) => {
      let response = {}
      zodiacSignModule.getHoroscope(zodiacsign).then(
        (horoscope) => {
          response.speech = horoscope;
          response.displayText = horoscope;
          response.messages = [{
              "type": 0,
              "speech": horoscope
            },
            /*
            {
            "type": 3,
            "imageUrl": "https://farm2.staticflickr.com/1523/26246892485_fc796b57df_h.jpg"
            }
            ,
            {
            "type": 2,
            "title": "Get info about the zodiac sign?",
            "replies": ["info"]
            }
            */
          ]
          resolve(response)
        }
      )
    })
  }
}