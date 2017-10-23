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
          resolve(this.getZodiacSignInfoResponse(parameters.zodiacsign, contexts))
          break;

        case 'zodiacsign.info.context':
          resolve(this.getZodiacSignInfoResponse(parameters.zodiacsign, contexts))
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
          this.getZodiacSignHoroscopeResponse(parameters.zodiacsign, contexts).
          then((response) => {
            resolve(response)
          })
          break;

        case 'zodiacsign.horoscope.context':
          this.getZodiacSignHoroscopeResponse(parameters.zodiacsign, contexts).
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
    response.displayText = "Your zodiac sign is " + zodiacSign + "."

    //toDo: Add context out and show button to get chinese zodiac sign
    // also get chinese zodiac sign if a date in the past is provided
    let parameterDate = new Date(date);
    let currentYear = new Date().getFullYear(); // I use this in another place as well => declare on top for whole module
    let dateYear = parameterDate.getFullYear();
    if (dateYear < currentYear) {
      // onsole.log("Year is different: ", dateYear)
      // console.log("Chinese Zodiac", zodiacSignModule.getChineseZodiacSign(dateYear))
      //response.messages.push({ "type": 0, "speech": "Your chinese zodiac sign is " + this.getChineseZodiacSign(dateYear) })
      response.messages = [];
      let responseMessageText = "Your zodiac sign is " + zodiacSign + "."
      response.messages.push(this.getResponseMessage(responseMessageText));

      let quickRepliesTitle = "Want to know more?"
      let quickRepliesButtons = ["Horoscope", "Info", "Chinese zodiac"]
      response.messages.push(this.getQuickReplies(quickRepliesTitle, quickRepliesButtons))

      response.contextOut = [];
      let zodiacSignParameters = { "zodiacsign": zodiacSign }
      response.contextOut.push(this.getContextOut("zodiac-sign", zodiacSignParameters, 4))
      let yearParameters = { "age": { "amount": dateYear } }
      response.contextOut.push(this.getContextOut("year", yearParameters, 3))

    }
    else {
      console.log("The date is from this year; ", dateYear);
      response.messages = [];
      let responseMessageText = "Your zodiac sign is " + zodiacSign + "."
      response.messages.push(this.getResponseMessage(responseMessageText));

      let quickRepliesTitle = "Want to know more?"
      let quickRepliesButtons = ["Horoscope", "Info"]
      response.messages.push(this.getQuickReplies(quickRepliesTitle, quickRepliesButtons))

      response.contextOut = [];
      let zodiacSignParameters = { "zodiacsign": zodiacSign }
      response.contextOut.push(this.getContextOut("zodiac-sign", zodiacSignParameters, 4))
      let yearParameters = { "age": { "amount": dateYear } }
      response.contextOut.push(this.getContextOut("year", yearParameters, 0))
    }

    return response;
  },

  getZodiacSignInfoResponse: function(zodiacSign, contexts) {
    console.log("Triggerd intent zodiacSign.info with params: ", zodiacSign);
    let response = {} // toDO: declare this on top

    response.speech = zodiacInfo;
    response.displayText = zodiacInfo;
    
    response.messages = [];
    
    let zodiacSignPicturUrl = zodiacSignModule.getZodiacSignPicture(zodiacSign); //toDo: rename to Image to be conssitent
    response.messages.push(this.getImage(zodiacSignPicturUrl))
    
    let zodiacInfo = zodiacSignModule.getZodiacSignInfo(zodiacSign);
    response.messages.push(this.getResponseMessage(zodiacInfo))

    let quickRepliesTitle = "Do you want to see the horoscope for " + zodiacSign + "?"
    let quickRepliesButtons = ["Horoscope"]

    // add more quick reply buttons if a context is given
    for (var i = 0; i < contexts.length; i++) { // get values from contexts
      console.log("Iterating over contexts ... ")
      if (contexts[i].name === "year") {
        quickRepliesButtons.push("Chinese Zodiac")
        quickRepliesTitle = "Do you want to see the horoscope for " + zodiacSign + " or find out the Chinese Zodiac Sign?"
      }
    }
    response.messages.push(this.getQuickReplies(quickRepliesTitle, quickRepliesButtons))
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
    response.messages = [{
        "type": 3,
        "imageUrl": chineseZodiacPicture
      },
      {
        "type": 0,
        "speech": "Your chinese zodiac sign is " + chineseZodiacSign + "."
      }
    ]
    response.contextOut = [{ // don't give any contextOut year at the moment
      "name": "year",
      "parameters": {
        "age": { "amount": 0 }
      },
      "lifespan": 0
    }]
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
    response.messages = [{
        "type": 3,
        "imageUrl": chineseZodiacPicture
      },
      {
        "type": 0,
        "speech": "Your chinese zodiac sign is " + chineseZodiacSign + "."
      }
    ]
    let quickRepliesTitle = "Want to know more about " + zodiacSign + "?"
    let quickRepliesButtons = ["Horoscope", "Info"]
    response.messages.push(this.getQuickReplies(quickRepliesTitle, quickRepliesButtons)) // is it better radability if we put the texts in this function here? Yes: we save a line of code and it is more obvious where we put it in --- no: if we declare the variables we know what text is used for what:: I would like to do it both in one line and may be add a comment
    return response;
  },

  getZodiacSignList: function() {
    console.log("Intent zodiacsign.list triggered");
    let response = {}
    response.speech = "This is a list of all the zodiac signs: Capricorn, Aquarius, Pisces, Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius";
    response.displayText = "Here is a list of all the zodiac signs: Capricorn, Aquarius, Pisces, Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius";;
    response.messages = [{
        "type": 2,
        "title": "Select a zodiac sign to get information about it:",
        "replies": ['Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius']
      }

    ]
    return response;
  },

  getZodiacSignHoroscopeResponse: function(zodiacSign, contexts) {
    // toDo: we have three promises now. Only because of the asynchronous API call to the horoscope API. Is there a better way to tackle this?
    console.log("Triggerd intent zodiacSign.horoscope with params: ", zodiacSign);
    return new Promise((resolve, reject) => {
      let response = {}
      zodiacSignModule.getHoroscope(zodiacSign).then(
        (horoscope) => {
          response.speech = horoscope;
          response.displayText = horoscope;

          let quickRepliesTitle = "Want to know more about " + zodiacSign + "?"
          let quickRepliesButtons = ["Info"]

          for (var i = 0; i < contexts.length; i++) {
            console.log("Iterating over contexts ... ")
            /*
            if (contexts[i].name === "zodiac-sign") {
              //zodiacSign = contexts[i].parameters.zodiacsign
              //console.log("Zodiac SIgn from Context: ", zodiacSign)
              // toDo: Can it be that there is no zodiac sign in contet and the function is triggered anyways?
              let quickRepliesTitle = "Want to know more about " + zodiacSign + "?"
              quickRepliesButtons.push("Info")
            }*/
            if (contexts[i].name === "year") {
              quickRepliesButtons.push("Chinese Zodiac")
              quickRepliesTitle = "Do you want to get more information about " + zodiacSign + " or find out your Chinese Zodiac Sign?"
            }
          }

          response.messages = [{
              "type": 0,
              "speech": horoscope
            }

          ]
          if (quickRepliesTitle) {
            response.messages.push(this.getQuickReplies(quickRepliesTitle, quickRepliesButtons))
          }
          resolve(response)
        }
      )
    })
  },

  // construct the reponse objects for api.ai 

  getResponseMessage: function(messageText) { // may be it would be better to call this a more specific name: like getResponseMessageObject - because what we are doing here is creating an object!
    return {
      "type": 0,
      "speech": messageText
    }
  },

  getQuickReplies: function(title, replies) {
    return {
      "type": 2,
      "title": title,
      "replies": replies
    }
  },

  getImage: function(imageUrl) {
    return {
      "type": 3,
      "imageUrl": imageUrl
    }
  },

  getContextOut: function(name, paremeters, lifespan) {
    return {
      "name": name,
      "parameters": paremeters,
      "lifespan": lifespan
    }
  },

}
