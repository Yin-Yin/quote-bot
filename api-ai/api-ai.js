const zodiacSignModule = require('../zodiac-sign/zodiac-sign.js')
var response = {}

module.exports = {
   // ## API.ai intents ##
  getResponse: function(intentName, parameters, contexts) {
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
          
          
        case 'zodiacsign.year.context':
          resolve(this.getZodiacSignYearContextResponse(contexts))
          break;
          
        case 'zodiacsign.list':
          resolve(this.getZodiacSignList())
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
    
    //toDo: Add context out and show button to get chinese zodiac sign
    // also get chinese zodiac sign if a date in the past is provided
    let parameterDate = new Date(date);
    let currentYear = new Date().getFullYear(); // I use this in another place as well => declare on top for whole module
    let dateYear = parameterDate.getFullYear();
    if (dateYear < currentYear) {
      // onsole.log("Year is different: ", dateYear)
      // console.log("Chinese Zodiac", zodiacSignModule.getChineseZodiacSign(dateYear))
      //response.messages.push({ "type": 0, "speech": "Your chinese zodiac sign is " + this.getChineseZodiacSign(dateYear) })
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
      "replies": ["Horoscope", "Info", "Chinese zodiac"]
    }]
        response.contextOut = [{
      "name": "zodiac-sign",
      "parameters": {
        "zodiacsign": zodiacSign
      },
      "lifespan": 250
    },
    {
      "name": "year",
      "parameters": {
        "age": {"amount":dateYear}
      },
      "lifespan": 30
    }]
    }
    else {
      console.log("The date is from this year; ", dateYear);
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
      "replies": ["Horoscope", "Info"]
    }]
        response.contextOut = [{
      "name": "zodiac-sign",
      "parameters": {
        "zodiacsign": zodiacSign
      },
      "lifespan": 250
    }]
    }

    return response;
  },

  getZodiacSignInfoResponse: function(zodiacSign) {
    console.log("Triggerd intent zodiacSign.info with params: ", zodiacSign);
    let zodiacInfo = zodiacSignModule.getZodiacSignInfo(zodiacSign);
    let zodiacSignPicture = zodiacSignModule.getZodiacSignPicture(zodiacSign); 
    let response = {}
    response.speech = zodiacInfo;
    response.displayText = zodiacInfo;
    response.messages = [
      {
      "type": 3,
      "imageUrl": zodiacSignPicture
      },
      {
        "type": 0,
        "speech": zodiacInfo
      },
      {
        "type": 2,
        "title": "Do you want to see the horoscope?",
        "replies": ["Horoscope"]
      }
    ]
    return response;
  },

  getZodiacSignYearResponse: function(year) {
    console.log("Triggered intent zodiacSign.year with params: ", year);
    let chineseZodiacSign = zodiacSignModule.getChineseZodiacSign(year);
    let chineseZodiacPicture = zodiacSignModule.getChineseZodiacSignPicture(year);
    console.log("chineseZodiacSign", chineseZodiacSign);
    console.log("chineseZodiacPicture", chineseZodiacPicture);
    let response = {}
    response.speech = "Your chinese zodiac sign is " + chineseZodiacSign;
    response.displayText = "Your chinese zodiac sign is " + chineseZodiacSign;;
    response.messages = [
      {
      "type": 3,
      "imageUrl": chineseZodiacPicture
      }
      ,
      {
        "type": 0,
        "speech": "Your chinese zodiac sign is " + chineseZodiacSign + "."
      },
      /*
      {
      "type": 2,
      "title": "Want to know more?",
      "replies": ["Info Chinese Zodiac Sign"]
      }
      */
    ]
    return response;
  },
  
  getZodiacSignYearContextResponse: function(contexts) {
    let providedYear = '';
    let zodiacSign = '';
    for (var i = 0; i < contexts.length; i++) { // get values from contexts
      console.log("Iterating over contexts ... ")
      if (contexts[i].name === "year") {
        providedYear = contexts[i].parameters.age.amount
        console.log("providedYear is " + providedYear)
      }
      if (contexts[i].name === "zodiac-sign") {
        zodiacSign = contexts[i].parameters.zodiacsign
        console.log("Zodiac SIgn from Context: ", zodiacSign)
      }
    }
    console.log("Triggered intent zodiacSign.year.context with params: ", providedYear);
    let chineseZodiacSign = zodiacSignModule.getChineseZodiacSign(providedYear);
    let chineseZodiacPicture = zodiacSignModule.getChineseZodiacSignPicture(providedYear);
    let response = {}
    response.speech = "Your chinese zodiac sign is " + chineseZodiacSign;
    response.displayText = "Your chinese zodiac sign is " + chineseZodiacSign;;
    response.messages = [
      {
      "type": 3,
      "imageUrl": chineseZodiacPicture
      },
      {
        "type": 0,
        "speech": "Your chinese zodiac sign is " + chineseZodiacSign + "."
      },
      {
      "type": 2,
      "title": "Want to know more about "+ zodiacSign +"?",
      "replies": ["Zodiac info", "Horoscope"]
      }
      
    ]
    return response;
  },
  
  getZodiacSignList: function() {
    console.log("Intent zodiacsign.list triggered");
    let response = {}
    response.speech = "This is a list of all the zodiac signs: Capricorn, Aquarius, Pisces, Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius";
    response.displayText = "Here is a list of all the zodiac signs: Capricorn, Aquarius, Pisces, Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius";;
    response.messages = [
      {
      "type": 2,
      "title": "Select a zodiac sign to get information about it:",
      "replies": ['Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius']
      }
      
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
            */
            {
            "type": 2,
            "title": "Want to know more about " + zodiacsign + "?",
            "replies": ["Info"]
            }
            
          ]
          resolve(response)
        }
      )
    })
  }
}