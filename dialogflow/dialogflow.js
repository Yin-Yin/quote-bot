const quoteModule = require('../quotes/quotes.js')
var response = {}

module.exports = {
  // ## dialogflow intents ##
  getResponse: function(intentName, parameters, contexts) {
    return new Promise((resolve, reject) => {
      console.log("Triggerd intent: " + intentName + "with params: " + parameters + ".")

      switch (intentName) {
        // ## quotes ##
        case 'joke':
          resolve(this.getRandomChuckNorris())
          break;

        case 'chuck-norris':
          resolve(this.getRandomChuckNorris())
          break;

        case 'quote':
          resolve(this.getForismaticQuote())
          break;

        case 'startup':
          resolve(this.getStartupIdea())
          break;

        case 'programming':
          resolve(this.getProgrammingQuote())
          break;

        case 'trump-quote':
          resolve(this.getRandomTrumpQuote())
          break;

        case 'yes-no':
          resolve(this.getYesOrNo())
          break;
          
        case 'number-trivia':
          resolve(this.getNumberTrivia())
          break;
          
        case 'year-trivia':
          resolve(this.getYearTrivia())
          break;
          
        /*
        case 'entertain-me':
          resolve(this.getEntertainMe())
          break;*/

        default:
          console.log("Something went wrong. The default switch case was triggered. This means there was a intent triggered from api.ai that is not yet implemented in the webhook You triggered the intent: " + intentName + ", with the parameters: " + parameters)
          reject("Something went wrong. Sorry about that.")
          break;
      }
    })
  },

  // ### Build the responses (messages, pictures and quick replies) for the intents ### 

  /*
  Fetch a quote from an API.
  */

  /*
  getWebKnoxRandomJoke: function() {
    return new Promise((resolve, reject) => {
      quoteModule.getWebKnoxRandomJoke().then(
        (quote) => {

          //let quickRepliesTitle = "Want more?"
          //let quickRepliesButtons = ["Info"]

          response.speech = quote;
          response.displayText = quote;
          response.messages = [this.getResponseMessageObject(quote)]
          resolve(response)
        }
      )
    })
  },
  */

  getRandomChuckNorris: function() {
    return new Promise((resolve, reject) => {
      quoteModule.getRandomChuckNorris().then(
        (quote) => {

          //let quickRepliesTitle = "Want more?"
          //let quickRepliesButtons = ["Info"]

          response.speech = quote;
          response.displayText = quote;
          response.messages = [this.getResponseMessageObject(quote)]
          resolve(response)
        }
      )
    })
  },

  getForismaticQuote: function() {
    return new Promise((resolve, reject) => {
      quoteModule.getForismaticQuote().then(
        (quote) => {

          //let quickRepliesTitle = "Want more?"
          //let quickRepliesButtons = ["Info"]

          response.speech = quote;
          response.displayText = quote;
          response.messages = [this.getResponseMessageObject(quote)]
          resolve(response)
        }
      )
    })
  },


  getStartupIdea: function() {
    return new Promise((resolve, reject) => {
      quoteModule.getStartupIdea().then(
        (quote) => {

          //let quickRepliesTitle = "Want more?"
          //let quickRepliesButtons = ["Info"]

          response.speech = quote;
          response.displayText = quote;
          response.messages = [this.getResponseMessageObject(quote)]
          resolve(response)
        }
      )
    })
  },

  getProgrammingQuote: function() {
    return new Promise((resolve, reject) => {
      quoteModule.getProgrammingQuote().then(
        (quote) => {

          //let quickRepliesTitle = "Want more?"
          //let quickRepliesButtons = ["Info"]

          response.speech = quote;
          response.displayText = quote;
          response.messages = [this.getResponseMessageObject(quote)]
          resolve(response)
        }
      )
    })
  },


  getRandomTrumpQuote: function() {
    return new Promise((resolve, reject) => {
      quoteModule.getRandomTrumpQuote().then(
        (quote) => {

          //let quickRepliesTitle = "Want more?"
          //let quickRepliesButtons = ["Info"]

          response.speech = quote;
          response.displayText = quote;
          response.messages = [this.getResponseMessageObject(quote)]
          resolve(response)
        }
      )
    })
  },
  
  getNumberTrivia: function() {
    return new Promise((resolve, reject) => {
      quoteModule.getNumberTrivia().then(
        (quote) => {

          //let quickRepliesTitle = "Want more?"
          //let quickRepliesButtons = ["Info"]

          response.speech = quote;
          response.displayText = quote;
          response.messages = [this.getResponseMessageObject(quote)]
          resolve(response)
        }
      )
    })
    
  },
    
    getYearTrivia: function() {
    return new Promise((resolve, reject) => {
      quoteModule.getYearTrivia().then(
        (quote) => {

          //let quickRepliesTitle = "Want more?"
          //let quickRepliesButtons = ["Info"]

          response.speech = quote;
          response.displayText = quote;
          response.messages = [this.getResponseMessageObject(quote)]
          resolve(response)
        }
      )
    })
  },
  
  

  getYesOrNo: function() {
    return new Promise((resolve, reject) => {
      quoteModule.getYesOrNo().then(
        (resultObject) => {

          //let quickRepliesTitle = "Want more?"
          //let quickRepliesButtons = ["Info"]

          response.speech = resultObject.text;
          response.displayText = resultObject.text;
          response.messages = [this.getResponseMessageObject(resultObject.text), this.getImageObject(resultObject.imageUrl)]
          resolve(response)
        }
      )
    })
  },

/*
  getEntertainMe: function() {
    
    let intents = ['joke', 'programming', 'Chuck Norris']
    let randomIntent = 

    //let quickRepliesTitle = "Want more?"
    //let quickRepliesButtons = ["Info"]

    response.speech = resultObject.randomIntent;
    response.displayText = resultObject.text;
    response.messages = [this.getResponseMessageObject(resultObject.text), this.getImageObject(resultObject.imageUrl)]
    resolve(response)

  },*/





  // ### construct the reponse objects for dialogflow ###

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
