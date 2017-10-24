const zodiacSignModule = require('../zodiac-sign/zodiac-sign.js')
var response = {}

module.exports = {
  // ## API.ai intents ##
  getResponse: function(intentName, parameters, contexts) {
    return new Promise((resolve, reject) => {
      
      console.log("Triggerd intent: " + intentName + "with params: " + parameters + ".")
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

  // ### Build the responses (messages, pictures and quick replies) for the intents ### 

  /* 
  If a user enters a date we calculate the zodiac sign.
  */
  getZodiacSignCheckResponse: function(date) {
    let zodiacSign = zodiacSignModule.getZodiacSign(date);

    let responseMessageText = "Your zodiac sign is " + zodiacSign + "."

    let quickRepliesTitle = "Want to know more?"
    let quickRepliesButtons = '';

    let contextOut = [];
    let zodiacSignParameters = { "zodiacsign": zodiacSign }
    contextOut.push(this.getContextOutObject("zodiac-sign", zodiacSignParameters, 4))

    // also get chinese zodiac sign if a date in the past is provided
    let parameterDate = new Date(date);
    let currentYear = new Date().getFullYear();
    let dateYear = parameterDate.getFullYear();
    if (dateYear < currentYear) { // if a year is provided that is in the past give the user also the option to find out about the chinese zodiac sign of that year
      quickRepliesButtons = ["Horoscope", "Info", "Chinese zodiac"]
      // save the year as context that is available later for querying the chinese zodiac
      let yearParameters = { "age": { "amount": dateYear } }
      contextOut.push(this.getContextOutObject("year", yearParameters, 3))
    }
    else { // make sure there is no year context if no year is given by the user
      quickRepliesButtons = ["Horoscope", "Info"]
      let yearParameters = { "age": { "amount": dateYear } }
      contextOut.push(this.getContextOutObject("year", yearParameters, 0))
    }

    response.speech = responseMessageText
    response.displayText = responseMessageText
    response.messages = [this.getResponseMessageObject(responseMessageText), this.getQuickRepliesObject(quickRepliesTitle, quickRepliesButtons)];
    response.contextOut = contextOut;
    return response;
  },

  /* 
  Give the user a picture and information about a zodiac sign. 
  */
  getZodiacSignInfoResponse: function(zodiacSign, contexts) {
    let responseMessageText = zodiacSignModule.getZodiacSignInfo(zodiacSign);
    let zodiacSignPicturUrl = zodiacSignModule.getZodiacSignPictureUrl(zodiacSign); //toDo: rename to Image to be conssitent

    let quickRepliesTitle = "Do you want to see the horoscope for " + zodiacSign + "?"
    let quickRepliesButtons = ["Horoscope"]

    // add more quick reply buttons if a context is given
    for (var i = 0; i < contexts.length; i++) {
      if (contexts[i].name === "year") {
        quickRepliesButtons.push("Chinese Zodiac")
        quickRepliesTitle = "Do you want to see the horoscope for " + zodiacSign + " or find out the Chinese Zodiac Sign?"
      }
    }

    let zodiacSignParameters = { "zodiacsign": zodiacSign }

    response.speech = responseMessageText;
    response.displayText = responseMessageText;
    response.messages = [this.getImageObject(zodiacSignPicturUrl), this.getResponseMessageObject(responseMessageText), this.getQuickRepliesObject(quickRepliesTitle, quickRepliesButtons)];
    response.contextOut = [this.getContextOutObject("zodiac-sign", zodiacSignParameters, 4)]
    return response;
  },

  /* 
  Give the user the chinese zodiac sign for a year or age he provides. 
  */
  getZodiacSignYearResponse: function(year) {
    let chineseZodiacSign = zodiacSignModule.getChineseZodiacSign(year);
    let chineseZodiacSignPicturUrl = zodiacSignModule.getChineseZodiacSignPictureUrl(year);

    let responseMessageText = "Your chinese zodiac sign is " + chineseZodiacSign + "."
    let yearParameters = { "age": { "amount": year } }

    response.speech = responseMessageText
    response.displayText = responseMessageText
    response.messages = [this.getImageObject(chineseZodiacSignPicturUrl), this.getResponseMessageObject(responseMessageText)];
    // don't give any contextOut year at the moment (lifespan is 0)
    response.contextOut = [this.getContextOutObject("year", yearParameters, 0)]
    return response;
  },

  /* 
    This is the same function as getZodiacSignYearResponse with the difference, that we want to take the year from the context (user has given it before)
    and we want to leave the user the possibility to get more information about the zodiac sign from the context.
  */
  getZodiacSignYearContextResponse: function(contexts) {
    let providedYear = '';
    let zodiacSign = '';
    for (var i = 0; i < contexts.length; i++) { // get values from contexts
      console.log("Iterating over contexts ... ")
      if (contexts[i].name === "year") {
        providedYear = contexts[i].parameters.age.amount
        console.log("providedYear is " + providedYear)
        
        console.log("contexts[i].parameters.age.amount " + contexts[i].parameters.age.amount)
        //console.log("contexts[i].parameters " + contexts[i].parameters)
        console.log("contexts[i].parameters.age " + contexts[i].parameters.age)
      }
      if (contexts[i].name === "zodiac-sign") {
        zodiacSign = contexts[i].parameters.zodiacsign
        console.log("Zodiac SIgn from Context: ", zodiacSign)
      }
    }

    let quickRepliesTitle = "Want to know more about " + zodiacSign + "?"
    let quickRepliesButtons = ["Horoscope", "Info"]

    response = this.getZodiacSignYearResponse(providedYear);
    response.messages.push(this.getQuickRepliesObject(quickRepliesTitle, quickRepliesButtons))
    return response;
  },

  /*
    Get a list of all zodiac signs to enhance user experience: the user can just select the zodiac sign that he likes. 
    It is done here in the backend, because in dialogflow (api.ai) the maximum list number is limited to 10 and we have 12 zodiac signs.
  */
  getZodiacSignList: function() {
    let quickRepliesTitle = "Select a zodiac sign to get information about it:"
    let quickRepliesButtons = ['Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius']

    response.speech = "These are all the zodiac signs: Capricorn, Aquarius, Pisces, Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius";
    response.displayText = "Here is a list of all the zodiac signs: Capricorn, Aquarius, Pisces, Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius";;
    response.messages = [this.getQuickRepliesObject(quickRepliesTitle, quickRepliesButtons)]
    return response;
  },

  /*
  Fetch the horoscope for a provided zodiac sign from an API.
  */
  getZodiacSignHoroscopeResponse: function(zodiacSign, contexts) {
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

          let zodiacSignParameters = { "zodiacsign": zodiacSign }

          response.speech = horoscope;
          response.displayText = horoscope;
          response.messages = [this.getResponseMessageObject(horoscope), this.getQuickRepliesObject(quickRepliesTitle, quickRepliesButtons)]
          response.contextOut = [this.getContextOutObject("zodiac-sign", zodiacSignParameters, 4)]
          resolve(response)
        }
      )
    })
  },

  // ### construct the reponse objects for api.ai/dialogflow ###

  getResponseMessageObject: function(messageText) { // may be it would be better to call this a more specific name: like getResponseMessageObjectObject - because what we are doing here is creating an object!
    return {
      "type": 0,
      "speech": messageText
    }
  },

  getQuickRepliesObject: function(title, replies) {
    return {
      "type": 2,
      "title": title,
      "replies": replies
    }
  },

  getImageObject: function(imageUrl) {
    return {
      "type": 3,
      "imageUrl": imageUrl
    }
  },

  getContextOutObject: function(name, paremeters, lifespan) {
    return {
      "name": name,
      "parameters": paremeters,
      "lifespan": lifespan
    }
  },

}
