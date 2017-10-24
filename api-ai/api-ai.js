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

    let zodiacSign = zodiacSignModule.getZodiacSign(date);

    let responseMessageText = "Your zodiac sign is " + zodiacSign + "."

    let quickRepliesTitle = "Want to know more?"
    let quickRepliesButtons = '';

    let contextOut = [];
    let zodiacSignParameters = { "zodiacsign": zodiacSign }
    contextOut.push(this.getContextOut("zodiac-sign", zodiacSignParameters, 4))

    // also get chinese zodiac sign if a date in the past is provided
    let parameterDate = new Date(date);
    let currentYear = new Date().getFullYear();
    let dateYear = parameterDate.getFullYear();
    if (dateYear < currentYear) { // if a year is provided that is in the past give the user also the option to find out about the chinese zodiac sign of that year
      quickRepliesButtons = ["Horoscope", "Info", "Chinese zodiac"]
      // save the year as context that is available later for querying the chinese zodiac
      let yearParameters = { "age": { "amount": dateYear } }
      contextOut.push(this.getContextOut("year", yearParameters, 3))
    }
    else {
      quickRepliesButtons = ["Horoscope", "Info"]
      // make sure there is no year context if no year is given by the user
      let yearParameters = { "age": { "amount": dateYear } }
      contextOut.push(this.getContextOut("year", yearParameters, 0))
    }

    // build the response
    response.speech = responseMessageText
    response.displayText = responseMessageText
    response.messages = [this.getResponseMessage(responseMessageText), this.getQuickReplies(quickRepliesTitle, quickRepliesButtons)];
    response.contextOut = contextOut;
    return response;
  },

  getZodiacSignInfoResponse: function(zodiacSign, contexts) {
    console.log("Triggerd intent zodiacSign.info with params: ", zodiacSign);

    let zodiacInfo = zodiacSignModule.getZodiacSignInfo(zodiacSign);
    let zodiacSignPicturUrl = zodiacSignModule.getZodiacSignPicture(zodiacSign); //toDo: rename to Image to be conssitent

    let quickRepliesTitle = "Do you want to see the horoscope for " + zodiacSign + "?"
    let quickRepliesButtons = ["Horoscope"]

    // add more quick reply buttons if a context is given
    for (var i = 0; i < contexts.length; i++) { // get values from contexts
      // console.log("Iterating over contexts ... ")
      if (contexts[i].name === "year") {
        quickRepliesButtons.push("Chinese Zodiac")
        quickRepliesTitle = "Do you want to see the horoscope for " + zodiacSign + " or find out the Chinese Zodiac Sign?"
      }
    }

    response.speech = zodiacInfo;
    response.displayText = zodiacInfo;
    response.messages = [this.getImage(zodiacSignPicturUrl), this.getResponseMessage(zodiacInfo), this.getQuickReplies(quickRepliesTitle, quickRepliesButtons)];
    return response;
  },

  getZodiacSignYearResponse: function(year) {
    console.log("Triggered intent zodiacSign.year with params: ", year);

    let chineseZodiacSign = zodiacSignModule.getChineseZodiacSign(year);
    let chineseZodiacSignPicturUrl = zodiacSignModule.getChineseZodiacSignPicture(year);
    
    let responseMessageText = "Your chinese zodiac sign is " + chineseZodiacSign + "."
    let yearParameters = { "age": { "amount": year } }

    response.speech = responseMessageText
    response.displayText = responseMessageText
    response.messages = [this.getImage(chineseZodiacSignPicturUrl), this.getResponseMessage(responseMessageText)];
    // don't give any contextOut year at the moment (lifespan is 0)
    response.contextOut = [this.getContextOut("year", yearParameters, 0)]
    return response;
  },

  getZodiacSignYearContextResponse: function(contexts) {
    // when is this intent triggered and why do we do what we do?
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
    
    let quickRepliesTitle = "Want to know more about " + zodiacSign + "?"
    let quickRepliesButtons = ["Horoscope", "Info"]
    
    response = this.getZodiacSignYearResponse(providedYear);
    response.messages.push(this.getQuickReplies(quickRepliesTitle, quickRepliesButtons))
    return response;
  },

  getZodiacSignList: function() {
    console.log("Intent zodiacsign.list triggered");

    let quickRepliesTitle = "Select a zodiac sign to get information about it:"
    let quickRepliesButtons = ['Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius']

    response.speech = "These are all the zodiac signs: Capricorn, Aquarius, Pisces, Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius";
    response.displayText = "Here is a list of all the zodiac signs: Capricorn, Aquarius, Pisces, Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius";;
    response.messages = [this.getQuickReplies(quickRepliesTitle, quickRepliesButtons)]
    return response;
  },

  getZodiacSignHoroscopeResponse: function(zodiacSign, contexts) {
    // toDo: we have three promises now. Only because of the asynchronous API call to the horoscope API. Is there a better way to tackle this?
    console.log("Triggerd intent zodiacSign.horoscope with params: ", zodiacSign);
    return new Promise((resolve, reject) => {
      zodiacSignModule.getHoroscope(zodiacSign).then(
        (horoscope) => {

          let quickRepliesTitle = "Want to know more about " + zodiacSign + "?"
          let quickRepliesButtons = ["Info"]

          for (var i = 0; i < contexts.length; i++) {
            console.log("Iterating over contexts ... ")
            if (contexts[i].name === "year") {
              quickRepliesTitle = "Do you want to get more information about " + zodiacSign + " or find out your Chinese Zodiac Sign?"
              quickRepliesButtons.push("Chinese Zodiac")
            }
          }
          
          response.speech = horoscope;
          response.displayText = horoscope;
          response.messages = [this.getResponseMessage(horoscope), this.getQuickReplies(quickRepliesTitle, quickRepliesButtons)]
          resolve(response)
        }
      )
    })
  },

  // construct the reponse objects for api.ai/dialogflow
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
